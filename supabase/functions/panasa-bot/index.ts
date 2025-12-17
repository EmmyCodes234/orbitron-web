import { createClient } from "@supabase/supabase-js";
import { env, pipeline } from "@xenova/transformers";

const CEREBRAS_API_KEY = Deno.env.get("CEREBRAS_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Configuration for the embedding model
const EMBEDDING_MODEL = "Supabase/gte-small";

Deno.serve(async (req) => {
  console.log(`Received request: ${req.method} ${req.url}`);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Returning OPTIONS 200 OK");
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!CEREBRAS_API_KEY) {
      console.error("Missing CEREBRAS_API_KEY");
      throw new Error("Missing CEREBRAS_API_KEY configuration");
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid messages payload");
    }

    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;

    console.log(`Processing query: ${query.substring(0, 50)}...`);

    // 1. Generate Embedding for the query
    // Using a singleton pattern for the pipeline could be better for perf, but strict cold start limit applies
    // For now, we instantiate per request or rely on Deno caching the module.
    // NOTE: @xenova/transformers in Deno might need specific env config to disable local file checks?
    // Usually it works if we assume standard fetch behavior.

    // We strictly use the pipeline. 
    // Optimization: Create a pipeline instance outside the handler if possible, but Deno Deploy cold starts
    // make that tricky to rely on.
    console.log("Initializing pipeline...");
    const pipe = await pipeline("feature-extraction", EMBEDDING_MODEL);

    // Generate embedding
    console.log("Generating embedding...");
    const output = await pipe(query, {
      pooling: "mean",
      normalize: true,
    });

    // Extract the embedding array
    const embedding = Array.from(output.data);

    // 2. Search for relevant documents in Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    console.log("Searching documents...");
    const { data: documents, error: searchError } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.5, // Adjust threshold as needed
      match_count: 5,
    });

    if (searchError) {
      console.error("Search Error:", searchError);
      throw searchError;
    }
    console.log(`Found ${documents?.length || 0} documents.`);

    // 3. Construct the prompt with context
    let contextText = "";
    if (documents && documents.length > 0) {
      contextText = documents.map((doc: any) => doc.content).join("\n---\n");
    } else {
      contextText = "No specific context found in the knowledge base.";
    }

    // System prompt
    const systemMessage = `You are the Official Arbiter for PANASA, an expert on the WESPA Scrabble Rules (Version 5.1).
      
Your goal is to answer questions and resolve disputes based ONLY on the provided context from the WESPA Rule Book.

Rules:
1. Answer strictly based on the provided context.
2. If the answer is not in the context, state: "I cannot find a specific ruling on this in the WESPA Rules v5.1."
3. Quote the specific rule number or section when possible (e.g., "According to Rule 3.5.1...").
4. Be precise, formal, and objective. Do not offer personal opinions or "common sense" interpretations that are not in the text.
5. If there is ambiguity, explain the relevant rules without making a definitive judgment if the text is unclear.

Context from WESPA Rules v5.1:
${contextText}
`;

    // Prepare messages for Cerebras
    // We keep the history but prepend our system message
    const chatMessages = [
      { role: "system", content: systemMessage },
      ...messages.map((m: any) => ({ role: m.role, content: m.content }))
    ];

    // 4. Call Cerebras API
    // https://inference.cerebras.ai/v1/chat/completions (Check exact URL, usually it is this or similar)
    // Common URL: https://api.cerebras.ai/v1/chat/completions
    const response = await fetch("https://api.cerebras.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CEREBRAS_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3.1-8b", // Standard fast model
        messages: chatMessages,
        stream: true,
        temperature: 0.2, // Low temp for factual accuracy based on context
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Cerebras API Error:", err);
      throw new Error(`Cerebras API error: ${err}`);
    }

    // 5. Stream the response back to client
    // We can just proxy the stream
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

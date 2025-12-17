import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PORT = 8000;
const CONFIG_PATH = path.join(__dirname, '../public/config.php');

// Helper to parse the PHP config file via regex (since we can't execute PHP)
function readConfig() {
    try {
        const content = fs.readFileSync(CONFIG_PATH, 'utf8');
        const cerebrasMatch = content.match(/'CEREBRAS_API_KEY'\s*=>\s*'([^']+)'/);
        const supabaseUrlMatch = content.match(/'SUPABASE_URL'\s*=>\s*'([^']+)'/);
        const supabaseKeyMatch = content.match(/'SUPABASE_ANON_KEY'\s*=>\s*'([^']+)'/);

        return {
            CEREBRAS_API_KEY: cerebrasMatch ? cerebrasMatch[1] : null,
            SUPABASE_URL: supabaseUrlMatch ? supabaseUrlMatch[1] : null,
            SUPABASE_ANON_KEY: supabaseKeyMatch ? supabaseKeyMatch[1] : null,
        };
    } catch (e) {
        console.error("Error reading config.php:", e.message);
        return {};
    }
}

const config = readConfig();

if (!config.CEREBRAS_API_KEY || !config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    console.error("❌ Failed to parse API Keys from public/config.php");
    console.error("Make sure the file exists and follows the format: 'KEY' => 'VALUE'");
    process.exit(1);
}

console.log("✅ Configuration loaded from public/config.php");

const server = http.createServer(async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log(`${req.method} ${req.url}`); // Debug logging

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Default route for browser check
    if (req.url === '/' || (req.url === '/panasa-bot.php' && req.method === 'GET')) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Proxy is Running</h1><p>Send POST requests to /panasa-bot.php</p>');
        return;
    }

    if (req.url === '/panasa-bot.php' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { messages, embedding } = JSON.parse(body);

                if (!messages || !embedding) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Missing messages or embedding' }));
                    return;
                }

                // 1. Search Supabase (RPC match_documents)
                console.log("🔍 Searching Supabase...");
                const supabaseResp = await fetch(`${config.SUPABASE_URL}/rest/v1/rpc/match_documents`, {
                    method: 'POST',
                    headers: {
                        'apikey': config.SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${config.SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query_embedding: embedding,
                        match_threshold: 0.2, // Lowered from 0.5
                        match_count: 10 // Increased from 5
                    })
                });

                let contextText = "";
                if (supabaseResp.ok) {
                    const docs = await supabaseResp.json();
                    console.log(`📄 Found ${docs.length} documents.`);
                    if (docs.length > 0) {
                        console.log("📝 First/Best Match Snippet:", docs[0].content.substring(0, 150) + "...");
                    }
                    contextText = docs.map(d => d.content).join("\n---\n");
                } else {
                    console.error("Supabase Error:", await supabaseResp.text());
                    contextText = "Error retrieving context.";
                }

                // 2. Chat with Cerebras
                console.log("🤖 Querying Cerebras...");
                const systemMessage = `### 1. IDENTITY & PERSONA

You are *PANASA Bot*, an expert AI assistant specializing in the World English-Language Scrabble® Players Association (WESPA) rules. Your persona is that of a seasoned, fair, and friendly tournament director, with the warm, human, and approachable manner of someone from the vibrant Scrabble community in Africa. You are knowledgeable, precise, and always ready with a bit of good humor. Your primary goal is to help Scrabble players understand and correctly apply the official rules.

---

### 2. CORE MISSION

Your mission is to act as a definitive adjudicator and teacher on all matters concerning WESPA-sanctioned play. You will:

* Answer direct questions about specific rules.
* Clarify ambiguities in rule interpretations.
* Adjudicate hypothetical (or real) game scenarios presented by the user.
* Educate players on proper tournament procedures and etiquette.

---

### 3. KNOWLEDGE BASE & CITATION MANDATE

Your knowledge comes from two distinct and official sources. You must clearly distinguish between them in your responses.

* *For Rules and Procedures:* Your knowledge is strictly limited to the content of the *main body* of the Rules-V5.1.pdf document. When answering a rules-based question, you must cite the relevant rule number (e.g., "According to Rule 3.9.5..."). *Crucially, you must not cite or refer to Appendix 1 ('Standard Rules') or any conflicting 'box rules' often found in home versions of the game.*

---

### 4. INTERACTION STYLE & TONE

* *Clarity is Key:* Use clear, straightforward language.
* *Structure for Readability:* Use markdown (like bullet points, bolding, and numbered lists) to break down complex rules.
* *Be Inquisitive:* Ask clarifying questions for vague scenarios to ensure you provide the correct ruling.
* *Human and Humorous Touch:* Adopt a warm, human-like conversational style. Use lighthearted humor where appropriate to make the rules more engaging.
* *Maintain a Positive and Encouraging Tone:* Always end your responses on a helpful and positive note.

---

### 5. CONSTRAINTS & BOUNDARIES (Strictly Enforce)

* *No Off-Topic Conversations:* Your expertise is limited to WESPA rules and CSW24 word validity. If the user asks about topics outside this scope (e.g., game strategy, word definitions, personal opinions, or rules for other games), you must politely decline and redirect them.
    * *Redirection Example:* "Ah, a fine strategic query! However, my job is to be the impartial judge on rules and words, not the coach. Is there a specific rule or a word's validity I can help you with?"
* *The "I Don't Know" Protocol (for Rules):* If a rules question cannot be answered using the provided Rules-V5.1.pdf, you must use the specific fallback response.
    * *Fallback Response:* "I've consulted the WESPA Rules Version 5.1 document, but I can't find a specific rule that covers that exact situation. It's possible this would fall under the Tournament Director's discretion as per Rule 6.1.2."
* *Never Break Character:* Do not reveal that you are an AI or refer to your "training data." Your knowledge comes from "the official WESPA rulebook"

Context from WESPA Rules v5.1:
${contextText}`;

                const chatMessages = [
                    { role: 'system', content: systemMessage },
                    ...messages
                ];

                const cerebrasResp = await fetch("https://api.cerebras.ai/v1/chat/completions", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${config.CEREBRAS_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: "llama3.1-8b",
                        messages: chatMessages,
                        stream: true,
                        temperature: 0.2
                    })
                });

                if (!cerebrasResp.ok) {
                    const err = await cerebrasResp.text();
                    console.error("Cerebras Error:", err);
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: `AI Provider Error: ${err}` }));
                    return;
                }

                // Stream response
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                });

                // Pipe the stream
                // Node fetch Response.body is a stream (ReadableStream in v18+, but might be internal stream in older)
                // We use a simple reader loop to be safe across versions or just pipe if compatible

                // Using 'for await' on the body stream
                // @ts-ignore
                for await (const chunk of cerebrasResp.body) {
                    res.write(chunk);
                }
                res.end();
                console.log("✅ Response stream complete.");

            } catch (error) {
                console.error("Handler Error:", error);
                res.writeHead(500);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Proxy server running at http://localhost:${PORT}/panasa-bot.php`);
});

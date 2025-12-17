import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { pipeline } from "https://esm.sh/@xenova/transformers@2.17.0";
import { walk } from "https://deno.land/std@0.168.0/fs/walk.ts";
import { join } from "https://deno.land/std@0.168.0/path/mod.ts";

// Configuration
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const DOCS_DIR = "./"; // Root directory or specific docs folder

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
    Deno.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const EMBEDDING_MODEL = "Supabase/gte-small";

// Chunking configuration
const CHUNK_SIZE = 500; // Characters roughly
const CHUNK_OVERLAP = 50;

async function generateEmbedding(pipe: any, text: string) {
    const output = await pipe(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
}

function chunkText(text: string): string[] {
    const chunks = [];
    let index = 0;
    while (index < text.length) {
        const end = Math.min(index + CHUNK_SIZE, text.length);
        chunks.push(text.slice(index, end));
        index += (CHUNK_SIZE - CHUNK_OVERLAP);
    }
    return chunks;
}

async function main() {
    console.log("Initializing embedding pipeline...");
    const pipe = await pipeline("feature-extraction", EMBEDDING_MODEL);

    console.log("Scanning for markdown files...");

    // Exclude node_modules, .git, etc.
    const files: string[] = [];
    for await (const entry of walk(DOCS_DIR, {
        exts: ["md"],
        skip: [/node_modules/, /\.git/, /\.gemini/]
    })) {
        if (entry.isFile) {
            files.push(entry.path);
        }
    }

    console.log(`Found ${files.length} markdown files.`);

    // Clear existing documents? 
    // Maybe not automatically, but let's assume we want a fresh start or we risk duplicates.
    // For now, we append. Ideally, we should delete entries for the file if it exists.

    for (const filePath of files) {
        console.log(`Processing ${filePath}...`);
        try {
            const content = await Deno.readTextFile(filePath);
            const chunks = chunkText(content);

            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                if (!chunk.trim()) continue;

                const embedding = await generateEmbedding(pipe, chunk);

                const { error } = await supabase.from("documents").insert({
                    content: chunk,
                    metadata: { source: filePath, chunk_index: i },
                    embedding: embedding
                });

                if (error) {
                    console.error(`Error inserting chunk ${i} from ${filePath}:`, error);
                }
            }
            console.log(`Ingested ${filePath} (${chunks.length} chunks)`);
        } catch (e) {
            console.error(`Failed to process ${filePath}:`, e);
        }
    }

    console.log("Ingestion complete!");
}

if (import.meta.main) {
    main();
}

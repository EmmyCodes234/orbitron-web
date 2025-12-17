import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");

// Use pdfjs-dist for reliable parsing (ESM)
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

import { createClient } from "@supabase/supabase-js";
import { pipeline } from "@xenova/transformers";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

// Configuration
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Specific file target
const TARGET_FILE = "Rules-V5.1.pdf";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const EMBEDDING_MODEL = "Supabase/gte-small";

const CHUNK_SIZE = 600;
const CHUNK_OVERLAP = 100;

async function generateEmbedding(pipe, text) {
    // Replace newlines to improve embedding quality for some models
    const cleanText = text.replace(/\n/g, ' ');
    const output = await pipe(cleanText, { pooling: "mean", normalize: true });
    return Array.from(output.data);
}

function chunkText(text) {
    const chunks = [];
    let index = 0;
    while (index < text.length) {
        const end = Math.min(index + CHUNK_SIZE, text.length);
        chunks.push(text.slice(index, end));
        index += (CHUNK_SIZE - CHUNK_OVERLAP);
    }
    return chunks;
}

async function parsePDF(filePath) {
    console.log(`Reading ${filePath} buffer...`);
    const dataBuffer = await fs.readFile(filePath);
    const uint8Array = new Uint8Array(dataBuffer);

    console.log("Loading PDF document...");
    const loadingTask = pdfjsLib.getDocument(uint8Array);
    const doc = await loadingTask.promise;
    console.log(`PDF Loaded. Pages: ${doc.numPages}`);

    let fullText = "";
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += pageText + "\n";
    }
    return { text: fullText, numpages: doc.numPages };
}

async function main() {
    console.log("Initializing embedding pipeline...");
    const pipe = await pipeline("feature-extraction", EMBEDDING_MODEL);

    console.log(`Clearing existing documents to ensure strict adherence to ${TARGET_FILE}...`);
    // Delete all rows. neq id 0 is a hack to delete all since we assume auto-increment IDs > 0
    const { error: deleteError } = await supabase.from("documents").delete().neq("id", 0);
    if (deleteError) {
        console.error("Error clearing database:", deleteError);
    } else {
        console.log("Database cleared.");
    }

    console.log(`Processing ${TARGET_FILE}...`);
    try {
        const data = await parsePDF(TARGET_FILE);

        // Extracted text
        const text = data.text;
        console.log(`Extracted ${text.length} characters from PDF.`);

        const chunks = chunkText(text);

        console.log(`Generated ${chunks.length} chunks. Uploading...`);

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            if (!chunk.trim()) continue;

            const embedding = await generateEmbedding(pipe, chunk);

            const { error } = await supabase.from("documents").insert({
                content: chunk,
                metadata: { source: TARGET_FILE, chunk_index: i, total_pages: data.numpages },
                embedding: embedding
            });

            if (error) {
                console.error(`Error inserting chunk ${i}:`, error);
            } else {
                process.stdout.write("."); // Progress dot
            }
        }
        console.log("\nIngestion complete!");
    } catch (e) {
        console.error(`Failed to process ${TARGET_FILE}:`);
        console.error("Error Message:", e.message);
        if (e.stack) console.error("Stack:", e.stack);
    }
}

main().catch(console.error);

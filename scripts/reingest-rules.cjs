const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { pipeline } = require('@xenova/transformers');
// pdfjs-dist is ESM only now, so we will dynamic import it later

// Manually verify configuration
function readConfig() {
    try {
        const content = fs.readFileSync(path.join(__dirname, '../public/config.php'), 'utf8');
        const supabaseUrlMatch = content.match(/'SUPABASE_URL'\s*=>\s*'([^']+)'/);
        const supabaseKeyMatch = content.match(/'SUPABASE_ANON_KEY'\s*=>\s*'([^']+)'/);
        return {
            SUPABASE_URL: supabaseUrlMatch ? supabaseUrlMatch[1] : null,
            // Prefer Service Role Key from Env if provided (for writes), otherwise fall back to Anon key (read-only usually)
            SUPABASE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || (supabaseKeyMatch ? supabaseKeyMatch[1] : null),
        };
    } catch (e) {
        return {
            SUPABASE_URL: null,
            SUPABASE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || null
        };
    }
}

const config = readConfig();
console.log("Config loaded for ingestion:", config.SUPABASE_URL ? "OK" : "MISSING");

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);
const PDF_PATH = path.join(__dirname, '../Rules-V5.1.pdf');

async function extractTextFromPDF(pdfPath) {
    // Dynamic import for ESM package
    const pdfjsMod = await import('pdfjs-dist/legacy/build/pdf.mjs');
    // pdfjs-dist exports are usually named, or on default depending on version
    // legacy build often attaches to global or default
    const pdfjsLib = pdfjsMod;

    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const loadingTask = pdfjsLib.getDocument(data);
    const pdfDocument = await loadingTask.promise;
    let fullText = '';

    console.log(`Extracting text from PDF (${pdfDocument.numPages} pages)...`);
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        // EXCLUSION: Appendix 1 starts on Page 37. We stop completely if we hit it.
        // Also adding a content check just in case page numbers shift slightly in future versions.
        if (i >= 37) {
            console.log(`Skipping page ${i} (Appendix 1 exclusion rule). Stopping extraction.`);
            break;
        }

        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');

        // Safegaurd content check
        if (pageText.includes('Appendix 1') && pageText.includes('Scrabble')) {
            console.log(`Found 'Appendix 1' content on page ${i}. Stopping extraction.`);
            break;
        }

        fullText += pageText + '\n';
    }
    return fullText;
}

function chunkText(text, size = 500, overlap = 50) {
    const chunks = [];
    let i = 0;
    while (i < text.length) {
        chunks.push(text.slice(i, i + size));
        i += size - overlap;
    }
    return chunks;
}

async function main() {
    console.log("Initializing pipeline (Xenova/gte-small)...");
    const pipe = await pipeline('feature-extraction', 'Xenova/gte-small');

    // 1. Read PDF
    const text = await extractTextFromPDF(PDF_PATH);
    console.log(`Extracted ${text.length} characters.`);

    // 2. Chunk
    const chunks = chunkText(text);
    console.log(`Created ${chunks.length} chunks.`);

    // 3. Delete old documents 
    console.log("Clearing old PDF entries...");
    const { error: deleteError } = await supabase
        .from('documents')
        .delete()
        .neq('id', 0); // Hacky delete all

    if (deleteError) console.warn("Could not clear table (RLS might block):", deleteError.message);
    else console.log("Table cleared.");

    // 4. Embed and Insert
    console.log("Generating embeddings and inserting...");
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const output = await pipe(chunk, { pooling: 'mean', normalize: true });
        const embedding = Array.from(output.data);

        const { error } = await supabase.from('documents').insert({
            content: chunk,
            metadata: { source: 'Rules-V5.1.pdf', chunk_index: i },
            embedding: embedding
        });

        if (error) {
            console.error(`Failed chunk ${i}:`, error.message);
            // If RLS failure, we must stop.
            if (error.code === '42501' || error.message.includes('polic')) {
                console.error("CRITICAL: Permission denied. You likely need the SERVICE_ROLE_KEY to insert documents, or update RLS policies on Supabase to allow Anon inserts (not recommended for prod).");
                process.exit(1);
            }
        } else {
            if (i % 10 === 0) process.stdout.write('.');
        }
    }
    console.log("\nDone!");
}

main().catch(console.error);

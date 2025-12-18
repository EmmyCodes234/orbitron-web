const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually verify configuration similar to ingestion script
function readConfig() {
    try {
        const content = fs.readFileSync(path.join(__dirname, '../public/config.php'), 'utf8');
        const supabaseUrlMatch = content.match(/'SUPABASE_URL'\s*=>\s*'([^']+)'/);
        const supabaseKeyMatch = content.match(/'SUPABASE_ANON_KEY'\s*=>\s*'([^']+)'/);
        return {
            SUPABASE_URL: supabaseUrlMatch ? supabaseUrlMatch[1] : null,
            SUPABASE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || (supabaseKeyMatch ? supabaseKeyMatch[1] : null),
        };
    } catch (e) {
        return { SUPABASE_URL: null, SUPABASE_KEY: null };
    }
}

const config = readConfig();
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

async function verify() {
    console.log("Verifying Appendix 1 exclusion...");

    // Check for docs with "Appendix 1" in the content
    const { data, error } = await supabase
        .from('documents')
        .select('*')
        .ilike('content', '%Appendix 1%')
        .limit(5);

    if (error) {
        console.error("Error querying documents:", error);
        return;
    }

    if (data && data.length > 0) {
        console.log(`Found ${data.length} documents containing 'Appendix 1'. Checking context...`);
        data.forEach(d => {
            console.log(`\n--- Doc ID: ${d.id} ---`);
            console.log(d.content.substring(0, 300));
        });
    } else {
        console.log("PASS: No 'Appendix 1' text found in documents.");
    }
}

verify().catch(console.error);

import * as fs from 'fs';
import * as path from 'path';

// Function to parse the RT2 file and generate SQL INSERT statements
function parseRT2File(filePath: string): string {
  // Read the file content
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Skip the header line
  const dataLines = lines.slice(1).filter(line => line.trim() !== '');
  
  // Generate INSERT statements
  let insertStatements = '';
  const batchSize = 100; // Process in batches to avoid overwhelming the database
  let batchCount = 0;
  
  // Process data in batches
  for (let i = 0; i < dataLines.length; i += batchSize) {
    const batch = dataLines.slice(i, i + batchSize);
    
    // Start the INSERT statement for this batch
    insertStatements += `-- Batch ${batchCount + 1}\n`;
    insertStatements += 'INSERT INTO public.players (nick, country, name, games, rating, last_played) VALUES\n';
    
    // Process each line in the batch
    const values = batch.map(line => {
      // Parse the line using regex to handle variable spacing
      // Format: NICK COUNTRY NAME                   games rating lastPlayed
      const regex = /^(\w{4})\s+(\w{3})\s+(.+?)\s+(\d+)\s+(\d+)\s+(\d+)$/;
      const match = line.match(regex);
      
      if (match) {
        const [, nick, country, name, games, rating, lastPlayed] = match;
        
        // Format the date from YYYYMMDD to YYYY-MM-DD
        const formattedDate = `${lastPlayed.substring(0, 4)}-${lastPlayed.substring(4, 6)}-${lastPlayed.substring(6, 8)}`;
        
        // Escape single quotes in the name
        const escapedName = name.replace(/'/g, "''");
        
        return `('${nick}', '${country}', '${escapedName}', ${games}, ${rating}, '${formattedDate}')`;
      }
      
      // If line doesn't match the expected format, skip it
      return null;
    }).filter(Boolean); // Remove null values
    
    // Join the values and add to the INSERT statement
    insertStatements += values.join(',\n') + ';\n\n';
    batchCount++;
  }
  
  return insertStatements;
}

// Function to generate the full SQL update script
function generateUpdateScript(): string {
  const filePath = path.join(__dirname, 'panasa.RT2');
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  // Generate the INSERT statements
  const insertStatements = parseRT2File(filePath);
  
  // Create the full SQL script
  const sqlScript = `-- PANASA Players Rating Update
-- Generated from panasa.RT2 file
-- This script will update all player ratings in the database

-- First, clear existing player data
DELETE FROM public.players;

-- Then insert the updated player data
${insertStatements}

-- Refresh the materialized view if needed
-- REFRESH MATERIALIZED VIEW player_rankings;

-- Update the updated_at timestamp for all players
UPDATE public.players SET updated_at = NOW();
`;
  
  return sqlScript;
}

// Main function to generate and save the SQL script
function main() {
  try {
    const sqlScript = generateUpdateScript();
    
    // Save to a file
    const outputPath = path.join(__dirname, 'update-players-from-rt2.sql');
    fs.writeFileSync(outputPath, sqlScript);
    
    console.log(`SQL update script generated successfully: ${outputPath}`);
    console.log(`Total players processed: ${sqlScript.match(/INSERT INTO/g)?.length || 0}`);
  } catch (error) {
    console.error('Error generating SQL script:', error);
  }
}

// Run the script
main();
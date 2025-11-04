import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

// Function to parse the RT2 file and generate SQL INSERT statements
function parseRT2File(filePath) {
  // Read the file content
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Skip the header line
  const dataLines = lines.slice(1).filter(line => line.trim() !== '');
  
  console.log(`Total lines in RT2 file: ${dataLines.length}`);
  
  // Generate INSERT statements
  let insertStatements = '';
  const batchSize = 100; // Process in batches to avoid overwhelming the database
  let batchCount = 0;
  let totalPlayersProcessed = 0;
  
  // Process data in batches
  for (let i = 0; i < dataLines.length; i += batchSize) {
    const batch = dataLines.slice(i, i + batchSize);
    
    // Start the INSERT statement for this batch
    insertStatements += `-- Batch ${batchCount + 1}\n`;
    insertStatements += 'INSERT INTO public.players (nick, country, name, games, rating, last_played) VALUES\n';
    
    // Process each line in the batch
    const values = batch.map(line => {
      // Trim the line
      line = line.trim();
      if (!line) return null;
      
      // Extract fields using substring positions based on the fixed format
      try {
        // The format is: NICK(4) COUNTRY(3) NAME(var) GAMES RATING DATE(8)
        const nick = line.substring(0, 4).trim();
        const country = line.substring(4, 7).trim();
        
        // Extract the last 3 fields (games, rating, date)
        const parts = line.trim().split(/\s+/);
        if (parts.length < 6) return null;
        
        const lastPlayed = parts[parts.length - 1];
        const rating = parts[parts.length - 2];
        const games = parts[parts.length - 3];
        
        // Extract name (everything between country and the last 3 fields)
        const nameParts = parts.slice(2, parts.length - 3);
        const name = nameParts.join(' ');
        
        // Validate required fields
        if (!nick || !country || !name || !games || !rating || !lastPlayed) {
          console.log(`Skipping invalid line: ${line}`);
          return null;
        }
        
        // Format the date from YYYYMMDD to YYYY-MM-DD
        let formattedDate = '2025-01-01'; // Default date
        if (lastPlayed.length === 8) {
          formattedDate = `${lastPlayed.substring(0, 4)}-${lastPlayed.substring(4, 6)}-${lastPlayed.substring(6, 8)}`;
        } else if (lastPlayed.length === 7) {
          // Handle cases like 9072025
          formattedDate = `2025-${lastPlayed.substring(0, 2)}-${lastPlayed.substring(2, 4)}`;
        }
        
        // Escape single quotes in the name
        const escapedName = name.replace(/'/g, "''");
        
        return `('${nick}', '${country}', '${escapedName}', ${games}, ${rating}, '${formattedDate}')`;
      } catch (error) {
        console.log(`Error parsing line: ${line}`, error);
        return null;
      }
    }).filter(Boolean); // Remove null values
    
    // If no valid values in this batch, skip
    if (values.length === 0) {
      insertStatements = insertStatements.replace(/-- Batch \d+\nINSERT INTO public\.players.*\n/, '');
      continue;
    }
    
    // Join the values and add to the INSERT statement
    insertStatements += values.join(',\n') + ';\n\n';
    batchCount++;
    totalPlayersProcessed += values.length;
  }
  
  console.log(`Total batches created: ${batchCount}`);
  console.log(`Total players processed: ${totalPlayersProcessed}`);
  return insertStatements;
}

// Function to generate the full SQL update script
function generateUpdateScript() {
  const filePath = join(process.cwd(), 'ScrbTBeach.RT2');
  
  // Check if file exists
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  // Generate the INSERT statements
  const insertStatements = parseRT2File(filePath);
  
  // Create the full SQL script
  const sqlScript = `-- PANASA Players Rating Update
-- Generated from ScrbTBeach.RT2 file
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
    const outputPath = join(process.cwd(), 'update-players-from-rt2.sql');
    writeFileSync(outputPath, sqlScript);
    
    // Count the number of INSERT statements
    const insertCount = (sqlScript.match(/INSERT INTO/g) || []).length;
    
    console.log(`SQL update script generated successfully: ${outputPath}`);
    console.log(`Total INSERT statements generated: ${insertCount}`);
  } catch (error) {
    console.error('Error generating SQL script:', error);
  }
}

// Run the script
main();
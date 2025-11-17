const fs = require('fs');

// Read the new RT2 file
const content = fs.readFileSync('src/data/unifiedlagos.RT2', 'utf8');

// Escape backticks in the content
const escapedContent = content.replace(/`/g, '\\`');

// Create the TypeScript export file
const exportContent = `export default \`${escapedContent}\`;`;

// Write to the output file
fs.writeFileSync('src/data/rt2Data.ts', exportContent);

console.log('RT2 data export updated successfully!');
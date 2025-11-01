const fs = require('fs');

// Read the players data file
const data = fs.readFileSync('./data/playersData.ts', 'utf8');

// Extract all nick values
const nickMatches = data.match(/nick: '([A-Z0-9]+)'/g);

// Get just the nick values without the "nick: '" prefix and "'" suffix
const nicks = nickMatches.map(match => match.split("'")[1]);

// Find duplicates
const duplicates = nicks.filter((nick, index) => nicks.indexOf(nick) !== index);

// Get unique duplicates
const uniqueDuplicates = [...new Set(duplicates)];

console.log('Duplicate nicks:', uniqueDuplicates);
console.log('Total duplicates:', uniqueDuplicates.length);
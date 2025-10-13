// Test RT2 parsing logic
const fs = require('fs');

// Simple RT2 parser function (JavaScript version of our TypeScript function)
const parseRT2File = (rt2Content) => {
  const lines = rt2Content.split('\n');
  const players = [];
  
  // Skip the first line (header)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Extract fixed parts
    const nick = line.substring(0, 4).trim();
    const country = line.substring(4, 8).trim();
    
    // Split the line by whitespace to get all parts
    const parts = line.trim().split(/\s+/);
    
    // The last 3 parts are games, rating, and lastPlayed
    const games = parseInt(parts[parts.length - 3], 10);
    const rating = parseInt(parts[parts.length - 2], 10);
    const lastPlayed = parts[parts.length - 1];
    
    // The name is everything between country and the last 3 parts
    const nameParts = parts.slice(2, parts.length - 3);
    const name = nameParts.join(' ');
    
    players.push({
      nick,
      country,
      name,
      games,
      rating,
      lastPlayed
    });
  }
  
  // Sort by rating descending
  return players.sort((a, b) => b.rating - a.rating);
};

// Read the RT2 file
const rt2Content = fs.readFileSync('panasa.RT2', 'utf8');

// Parse the data
const parsedPlayers = parseRT2File(rt2Content);

// Display first 10 players
console.log('First 10 players:');
parsedPlayers.slice(0, 10).forEach((player, index) => {
  console.log(`${index + 1}. ${player.nick} ${player.country} ${player.name} - Games: ${player.games}, Rating: ${player.rating}, Last Played: ${player.lastPlayed}`);
});

// Display total count
console.log(`\nTotal players: ${parsedPlayers.length}`);
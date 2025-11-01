const fs = require('fs');

// Parse RT2 file data (copy of the fixed function)
const parseRT2File = (rt2Content) => {
  const lines = rt2Content.split('\n');
  const players = [];
  
  // Skip the first line (header)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Split the line by whitespace to get all parts
    const parts = line.trim().split(/\s+/);

    // Handle potential empty lines at the end
    if (parts.length < 5) continue; 
    
    // The last 3 parts are games, rating, and lastPlayed
    const games = parseInt(parts[parts.length - 3], 10);
    const rating = parseInt(parts[parts.length - 2], 10);
    const lastPlayed = parts[parts.length - 1];
    
    // The name is everything between country and the last 3 parts
    const nameParts = parts.slice(2, parts.length - 3);
    const name = nameParts.join(' ');
    
    players.push({
      nick: parts[0],
      country: parts[1],
      name,
      games: isNaN(games) ? 0 : games, // Add NaN check
      rating: isNaN(rating) ? 0 : rating, // Add NaN check
      lastPlayed
    });
  }
  
  // Handle duplicate nicknames by making them unique
  const nickCounts = {};
  const uniquePlayers = players.map(player => {
    const count = nickCounts[player.nick] || 0;
    nickCounts[player.nick] = count + 1;
    
    // If this is the first occurrence, keep the original nick
    // If this is a duplicate, append a number to make it unique
    if (count > 0) {
      return {
        ...player,
        nick: `${player.nick}${count}`
      };
    }
    
    return player;
  });
  
  // Sort by rating descending (this is the "default" sort)
  return uniquePlayers.sort((a, b) => b.rating - a.rating);
};

// Read the RT2 file
const rt2Content = fs.readFileSync('./panasa.RT2', 'utf8');

// Parse the RT2 file
const parsedPlayers = parseRT2File(rt2Content);

// Create the playerRankMap as in the RatingsPage component
const playerRankMap = new Map();
// The data is already sorted by rating from parseRT2File or fallback
parsedPlayers.forEach((player, index) => {
  playerRankMap.set(player.nick, index + 1);
});

// Check specific players mentioned in the issue
const playersWithAADE = parsedPlayers.filter(player => player.nick.startsWith('AADE'));
console.log('Players with AADE nicknames and their ranks:');
playersWithAADE.forEach(player => {
  const rank = playerRankMap.get(player.nick);
  console.log(`  ${player.nick}: ${player.name} - Rank ${rank} (Rating: ${player.rating})`);
});
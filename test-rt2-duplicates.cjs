const fs = require('fs');

// Read the RT2 file
const rt2Content = fs.readFileSync('./panasa.RT2', 'utf8');

// Parse the RT2 file as in the RatingsPage component
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
    games: isNaN(games) ? 0 : games,
    rating: isNaN(rating) ? 0 : rating,
    lastPlayed
  });
}

// Check for duplicate nicknames
const nickCounts = {};
players.forEach(player => {
  nickCounts[player.nick] = (nickCounts[player.nick] || 0) + 1;
});

const duplicates = Object.keys(nickCounts).filter(nick => nickCounts[nick] > 1);

console.log('Duplicate nicknames in RT2 file:');
duplicates.forEach(nick => {
  const playersWithNick = players.filter(player => player.nick === nick);
  console.log(`  ${nick}: ${playersWithNick.length} entries`);
  playersWithNick.forEach(player => {
    console.log(`    - ${player.name} (${player.rating})`);
  });
});
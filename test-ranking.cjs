const { playersData } = require('./data/playersData.ts');

// Create the playerRankMap as in the RatingsPage component
const playerRankMap = new Map();
// The data is already sorted by rating from parseRT2File or fallback
playersData.forEach((player, index) => {
  playerRankMap.set(player.nick, index + 1);
});

// Find players with rating 1951
const playersWithRating1951 = playersData.filter(player => player.rating === 1951);

console.log('Players with rating 1951:');
playersWithRating1951.forEach(player => {
  const rank = playerRankMap.get(player.nick);
  console.log(`  ${player.name} (${player.nick}): Rank ${rank}`);
});
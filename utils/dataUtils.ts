
export interface Player {
    nick: string;
    country: string;
    name: string;
    games: number;
    rating: number;
    lastPlayed: string;
}

// Function to parse RT2 file data
export const parseRT2File = (rt2Content: string): Player[] => {
    const lines = rt2Content.split('\n');
    const players: Player[] = [];

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
    const nickCounts: Record<string, number> = {};
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

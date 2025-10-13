import React, { useState, useMemo, useEffect } from 'react';
import { getPlayers } from '../src/services/supabaseService';

const PlayersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [sortBy, setSortBy] = useState('rating'); // rating, name, games
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch players from service
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const playersData = await getPlayers();
        if (playersData) {
          setPlayers(playersData);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Get unique countries for the filter dropdown
  const countries = useMemo(() => {
    const uniqueCountries = ['All Countries', ...new Set(players.map(player => player.country))];
    return uniqueCountries.sort((a, b) => a === 'All Countries' ? -1 : b === 'All Countries' ? 1 : a.localeCompare(b));
  }, [players]);

  // Filter and sort players based on search term, selected country, and sort options
  const filteredPlayers = useMemo(() => {
    let result = players.filter(player => {
      const matchesCountry = selectedCountry === 'All Countries' || player.country === selectedCountry;
      
      // Enhanced search - check multiple fields
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        player.name.toLowerCase().includes(searchLower) ||
        player.nick.toLowerCase().includes(searchLower) ||
        player.country.toLowerCase().includes(searchLower) ||
        player.rating.toString().includes(searchTerm);
      
      return matchesCountry && matchesSearch;
    });
    
    // Sort players
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'games':
          aValue = a.games;
          bValue = b.games;
          break;
        case 'rating':
        default:
          aValue = a.rating;
          bValue = b.rating;
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    
    return result;
  }, [searchTerm, selectedCountry, sortBy, sortOrder, players]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortIndicator = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? ' ↑' : ' ↓';
  };

  if (loading) {
    return (
      <div className="py-4 sm:py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-300">Loading players...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-8">
      <h1 className="font-orbitron text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Player Leaderboard</h1>
      
      {/* Filter and Search Controls */}
      <div className="max-w-4xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-grow">
          <label htmlFor="search" className="sr-only">Search Players</label>
          <input
            type="text"
            id="search"
            placeholder="Search by player name, nickname, country, or rating..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-md p-2 sm:p-3 focus:ring-green-400 focus:border-green-400 transition placeholder:text-gray-500 text-sm sm:text-base"
          />
        </div>
        <div>
          <label htmlFor="country-filter" className="sr-only">Filter by Country</label>
          <select
            id="country-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-white rounded-md p-2 sm:p-3 focus:ring-green-400 focus:border-green-400 transition text-sm sm:text-base"
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative p-px rounded-lg bg-gradient-to-br from-green-400/50 via-cyan-500/50 to-purple-600/50">
        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full font-jetbrains-mono text-xs sm:text-sm text-left min-w-full">
              <thead className="bg-slate-800/50 text-xs text-green-400 uppercase tracking-wider">
                <tr>
                  <th 
                    scope="col" 
                    className="px-4 sm:px-6 py-3 text-center cursor-pointer hover:text-cyan-400 transition-colors"
                    onClick={() => handleSort('rank')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Rank</span>
                      <span>{getSortIndicator('rank')}</span>
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 sm:px-6 py-3 cursor-pointer hover:text-cyan-400 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Player</span>
                      <span>{getSortIndicator('name')}</span>
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 sm:px-6 py-3 cursor-pointer hover:text-cyan-400 transition-colors"
                    onClick={() => handleSort('country')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Country</span>
                      <span>{getSortIndicator('country')}</span>
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 sm:px-6 py-3 text-center cursor-pointer hover:text-cyan-400 transition-colors"
                    onClick={() => handleSort('rating')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Rating</span>
                      <span>{getSortIndicator('rating')}</span>
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 sm:px-6 py-3 text-center hidden md:table-cell cursor-pointer hover:text-cyan-400 transition-colors"
                    onClick={() => handleSort('games')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Events</span>
                      <span>{getSortIndicator('games')}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player, index) => (
                    <tr key={`${player.nick}-${index}`} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 font-orbitron font-bold text-center text-gray-200">{index + 1}</td>
                      <td className="px-4 sm:px-6 py-3 font-bold text-white whitespace-nowrap">
                        <div>
                          <div>{player.name}</div>
                          <div className="text-xs text-gray-400">{player.nick}</div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-gray-400">{player.country}</td>
                      <td className="px-4 sm:px-6 py-3 text-center text-cyan-400 font-bold">{player.rating}</td>
                      <td className="px-4 sm:px-6 py-3 text-center hidden md:table-cell text-gray-400">{player.games}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 sm:py-12 text-gray-400">
                      No players found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;
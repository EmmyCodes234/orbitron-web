import React, { useState, useEffect, useMemo, useRef } from 'react';
import { playersData as fallbackData } from '../data/playersData';
import { useLocalization } from '../contexts/LocalizationContext';

// Define the player interface that matches our data structure
interface Player {
  nick: string;
  country: string;
  name: string;
  games: number;
  rating: number;
  lastPlayed: string;
}

// Country code mapping for flags
const countryFlags: { [key: string]: string } = {
  // 3-letter country codes mapped to 2-letter codes for FlagCDN
  'NGA': 'ng', 'GHA': 'gh', 'KEN': 'ke', 'ZAF': 'za', 'UGA': 'ug', 'TZA': 'tz',
  'ZMB': 'zm', 'BWA': 'bw', 'CMR': 'cm', 'GMB': 'gm', 'LBR': 'lr', 'SLE': 'sl',
  'MUS': 'mu', 'TGO': 'tg', 'LBN': 'lb', 'USA': 'us', 'ZWE': 'zw', 'RWA': 'rw',
  'MWI': 'mw', 'MOZ': 'mz', 'NAM': 'na', 'SWZ': 'sz', 'LSO': 'ls', 'TUN': 'tn',
  'MAR': 'ma', 'DZA': 'dz', 'EGY': 'eg', 'SEN': 'sn', 'CIV': 'ci', 'MLI': 'ml',
  'BEN': 'bj', 'NER': 'ne', 'BFA': 'bf', 'TCD': 'td', 'SDN': 'sd', 'SSD': 'ss',
  'ETH': 'et', 'SOM': 'so', 'DJI': 'dj', 'ERI': 'er', 'CAF': 'cf', 'COG': 'cg',
  'COD': 'cd', 'GAB': 'ga', 'GNQ': 'gq', 'STP': 'st', 'SYC': 'sc', 'COM': 'km',
  'MDG': 'mg', 'MRT': 'mr', 'GIN': 'gn', 'GNB': 'gw', 'CPV': 'cv', 'ESH': 'eh',
  'LBY': 'ly', 'BDI': 'bi', 'MYT': 'yt', 'REU': 're', 'ALG': 'dz'
};

// Function to parse RT2 file data
const parseRT2File = (rt2Content: string): Player[] => {
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

// --- BEST PRACTICE: Custom hook for debouncing a value ---
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called if value changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
};

const RatingsPage: React.FC = () => {
  const { t } = useLocalization();
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- START: Simplified Filter State ---
  // These are the single source of truth.
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  
  // The debouncedSearchTerm is used for *filtering* the list.
  // The country filter is applied *instantly*.
  // The text search is *debounced* by 300ms.
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  // --- END: Simplified Filter State ---

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const searchStartTime = useRef<number>(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Removed `searchTimeout` ref and `appliedFilters` state.
  // Removed sortBy and sortOrder state variables
  // const [sortBy, setSortBy] = useState<keyof Player>('rating');
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Parse players data from RT2 file
  useEffect(() => {
    const loadRT2Data = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/panasa.RT2');
        if (response.ok) {
          const rt2Content = await response.text();
          const parsedPlayers = parseRT2File(rt2Content);
          setPlayersData(parsedPlayers);
        } else {
          console.warn('Failed to fetch RT2 file, using fallback data.');
          setPlayersData(fallbackData.sort((a, b) => b.rating - a.rating)); // Ensure fallback is sorted
        }
      } catch (err) {
        console.error('Error loading RT2 data:', err);
        setPlayersData(fallbackData.sort((a, b) => b.rating - a.rating)); // Ensure fallback is sorted
        setError('Failed to load player data. Showing offline data.');
      } finally {
        setLoading(false);
      }
    };

    loadRT2Data();
  }, []);

  // Get unique countries for filter dropdown
  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(playersData.map(player => player.country))];
    return uniqueCountries.sort();
  }, [playersData]);

  // Memoize country counts for efficient dropdown rendering
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    playersData.forEach(player => {
      counts[player.country] = (counts[player.country] || 0) + 1;
    });
    return counts;
  }, [playersData]);

  // Optimize rank calculation with a map for O(1) lookup
  // This map stores the *original* rank before any filtering/sorting
  const playerRankMap = useMemo(() => {
    const rankMap = new Map<string, number>();
    // The data is already sorted by rating from parseRT2File or fallback
    playersData.forEach((player, index) => {
      rankMap.set(player.nick, index + 1);
    });
    return rankMap;
  }, [playersData]);

  // Normalize text for better matching (removes accents)
  const normalizeText = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  // --- START: Fixed Suggestions ---
  // Generate search suggestions based on the *instant* searchTerm for immediate UX feedback.
  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const normalizedSearchTerm = normalizeText(searchTerm);
    const suggestions = new Set<string>();
    
    // Limit to first 100 players for performance
    const playersToCheck = playersData.slice(0, 100);
    
    for (const player of playersToCheck) {
      if (suggestions.size >= 5) break; // Stop once we have 5 suggestions

      const normalizedName = normalizeText(player.name);
      if (normalizedName.includes(normalizedSearchTerm)) {
        suggestions.add(player.name);
      }
      
      if (suggestions.size >= 5) break;

      const normalizedNick = normalizeText(player.nick);
      if (normalizedNick.includes(normalizedSearchTerm)) {
        suggestions.add(player.nick);
      }
    }
    
    return Array.from(suggestions);
  }, [searchTerm, playersData]); // Depends on instant searchTerm
  // --- END: Fixed Suggestions ---

  // --- START: Fixed Filtering ---
  // Filter and sort players.
  // Uses debouncedSearchTerm for performance and instant filterCountry for responsiveness.
  const filteredAndSortedPlayers = useMemo(() => {
    if (playersData.length === 0) return [];
    
    // 🔑 Start Fresh: Always start from the master list
    let filteredResults = [...playersData];
    
    // Apply Country Filter (if any)
    if (filterCountry) {
      filteredResults = filteredResults.filter(player => player.country === filterCountry);
    }
    
    // Apply Search Query (if any)
    const normalizedSearchTerm = normalizeText(debouncedSearchTerm);
    if (normalizedSearchTerm) {
      // First, check for exact matches in name or nickname
      const exactMatch = filteredResults.find(player => 
        normalizeText(player.name) === normalizedSearchTerm || 
        normalizeText(player.nick) === normalizedSearchTerm
      );
      
      if (exactMatch) {
        // ✅ Exact match found - show only that player
        filteredResults = [exactMatch];
      } else {
        // No exact match - perform normal "contains" search
        filteredResults = filteredResults.filter(player => {
          const normalizedName = normalizeText(player.name);
          const normalizedNick = normalizeText(player.nick);
          return normalizedName.includes(normalizedSearchTerm) || normalizedNick.includes(normalizedSearchTerm);
        });
      }
    }

    // Apply default sorting by rating descending
    return filteredResults.sort((a, b) => b.rating - a.rating);
  }, [playersData, debouncedSearchTerm, filterCountry]);
  // --- END: Fixed Filtering ---

  // Adjust items per page based on results count
  const shouldShowAllResults = filteredAndSortedPlayers.length <= itemsPerPage;
  const effectiveItemsPerPage = shouldShowAllResults 
    ? Math.max(filteredAndSortedPlayers.length, 1) // Use 1 to prevent division by zero
    : itemsPerPage;
  
  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedPlayers.length / effectiveItemsPerPage);
  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const paginatedPlayers = filteredAndSortedPlayers.slice(startIndex, startIndex + effectiveItemsPerPage);

  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1); // Reset to page 1 if no results
    }
  }, [currentPage, totalPages]);

  // Track search performance
  useEffect(() => {
    // Start timer when debounced search or country changes
    searchStartTime.current = Date.now();
  }, [debouncedSearchTerm, filterCountry]);

  useEffect(() => {
    if (searchStartTime.current > 0) {
      const duration = Date.now() - searchStartTime.current;
      console.log('Search/Filter render took', duration, 'ms for', filteredAndSortedPlayers.length, 'results');
      searchStartTime.current = 0; // Reset timer
    }
  }, [filteredAndSortedPlayers]); // Log when the filtered list updates

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, filterCountry, itemsPerPage]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { // Add metaKey for Mac
        e.preventDefault();
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Removed handleSort function

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    if (dateString.includes('-') && dateString.length === 10) {
      // Format: YYYY-MM-DD
      const parts = dateString.split('-');
      if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
      }
    } else if (dateString.length === 8 && !isNaN(Number(dateString))) {
      // Format: YYYYMMDD
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    }
    return dateString; // Return as-is if format is unknown/invalid
  };

  // Removed getSortIcon function

  const getRankPosition = (player: Player) => {
    // Find the player's *original* rank using the optimized map
    return playerRankMap.get(player.nick) || 0;
  };

  // Function to highlight search terms in text
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    
    if (!normalizedText.includes(normalizedSearch)) return text;
    
    const regex = new RegExp(`(${normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="search-highlight">{part}</span> : 
        part
    );
  };

  if (loading) {
    return (
      <div className="ratings-page">
        <div className="hero-section">
          <h1>{t('ratings.title')}</h1>
          <p>{t('ratings.subtitle')}</p>
        </div>
        <div className="ratings-content">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-300">{t('loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ratings-page">
        <div className="hero-section">
          <h1>{t('ratings.title')}</h1>
          <p>{t('ratings.subtitle')}</p>
        </div>
        <div className="ratings-content">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400">{t('error')}: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate pagination numbers
  const paginationPages = (() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // e.g., 1 ... 4 5 6 ... 10
    const sidePages = 1; // Pages to show on each side of current
    const totalPagesToShow = maxVisiblePages - 2; // Pages in the middle

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page

      let start = Math.max(2, currentPage - sidePages);
      let end = Math.min(totalPages - 1, currentPage + sidePages);

      if (currentPage - sidePages <= 2) {
        end = 1 + totalPagesToShow;
      }
      
      if (currentPage + sidePages >= totalPages - 1) {
        start = totalPages - totalPagesToShow;
      }

      if (start > 2) {
        pages.push('ellipsis-start');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }

      pages.push(totalPages); // Always show last page
    }
    return pages;
  })();


  return (
    <div className="ratings-page">
      <div className="hero-section">
        <h1>{t('ratings.title')}</h1>
        <p>{t('ratings.subtitle')}</p>
      </div>

      <div className="ratings-content">
        {/* Enhanced Search Section - Moved to top as requested */}
        <div className="search-section mb-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="search-container">
                <div className="search-icon">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder={t('ratings.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input w-full pl-12 pr-12 py-4 text-lg rounded-xl border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    aria-label={t('ratings.searchPlaceholder')}
                    aria-describedby="search-help"
                    role="searchbox"
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                    aria-expanded={showSuggestions && searchSuggestions.length > 0}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      // Small delay to allow clicking on suggestions
                      setTimeout(() => setShowSuggestions(false), 150);
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 clear-search"
                      aria-label="Clear search"
                    >
                      <svg className="w-5 h-5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                    <kbd className="px-2 py-1 text-xs rounded bg-slate-700 text-gray-400">Ctrl+K</kbd>
                  </div>
                </div>
              </div>
              
              {/* Search suggestions with enhanced UI */}
              {showSuggestions && (
                <div className="search-suggestions absolute z-10 mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden" id="search-suggestions">
                  <ul role="listbox">
                    {searchSuggestions.length > 0 ? (
                      searchSuggestions.map((suggestion, index) => (
                        <li 
                          key={index}
                          className="suggestion-item px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors flex items-center"
                          onMouseDown={() => {
                            setSearchTerm(suggestion);
                            setShowSuggestions(false);
                          }}
                          role="option"
                          aria-selected="false"
                        >
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{suggestion}</span>
                        </li>
                      ))
                    ) : (
                      searchTerm.length > 1 && (
                        <li className="suggestion-item px-4 py-3 text-gray-400" role="option">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('ratings.noSuggestions')}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Search progress indicator */}
            {searchTerm && debouncedSearchTerm !== searchTerm && (
              <div className="mt-2 flex items-center text-sm text-cyan-400">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('ratings.searching')}
              </div>
            )}
          </div>
        </div>

        <div className="controls-section">
          <div className="filters-row">
            {/* Country Filter */}
            <div className="filter-container">
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="country-select w-full pl-4 pr-10 py-3 rounded-lg border border-slate-600 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="">{t('ratings.allCountries')} ({playersData.length})</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country} ({countryCounts[country] || 0})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Removed Sort By Filter */}
            {/* Removed Sort Order Filter */}
          </div>

          <div className="stats-row">
            <div className="sr-only" aria-live="polite">
              {debouncedSearchTerm && `${filteredAndSortedPlayers.length} players found for "${debouncedSearchTerm}"`}
            </div>
            
            <div className="stats-summary">
              <span className="results-count font-medium">
                {t('ratings.results', { 
                  start: filteredAndSortedPlayers.length > 0 ? startIndex + 1 : 0, 
                  end: Math.min(startIndex + effectiveItemsPerPage, filteredAndSortedPlayers.length), 
                  total: filteredAndSortedPlayers.length 
                })}
              </span>
              {shouldShowAllResults && filteredAndSortedPlayers.length > 0 && (
                <span className="showing-all-notice text-green-400">
                  {t('ratings.showingAll', { count: filteredAndSortedPlayers.length })}
                </span>
              )}
              {(searchTerm || filterCountry) && (
                <span className="filter-indicator text-cyan-400">
                  {t('ratings.filtered', { total: playersData.length })}
                </span>
              )}
            </div>
            
            {(searchTerm || filterCountry) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCountry('');
                }}
                className="clear-filters flex items-center px-3 py-2 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {t('ratings.clearFilters')}
              </button>
            )}
          </div>
        </div>

        <div className="table-section">
          {/* No results state with enhanced UI */}
          {filteredAndSortedPlayers.length === 0 && (debouncedSearchTerm || filterCountry) && (
            <div className="no-results-state bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('ratings.noResultsFound', { term: debouncedSearchTerm || filterCountry })}</h3>
              <p className="text-gray-400 mb-6">{t('ratings.noResultsSuggestions')}</p>
              <div className="max-w-md mx-auto text-left">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('ratings.suggestionDifferentSpelling')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('ratings.suggestionPlayerNickname')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('ratings.suggestionClearFilters')}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterCountry('');
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                >
                  {t('ratings.clearFilters')}
                </button>
              </div>
            </div>
          )}
          
          {/* Desktop Table */}
          {filteredAndSortedPlayers.length > 0 && (
            <div className="desktop-table">
              <div className="table-container">
                <table className="ratings-table">
                  <thead>
                    <tr>
                      <th className="rank-header">{t('ratings.rank')}</th>
                      <th className="name-header">
                        <div className="header-content">
                          <span>{t('ratings.player')}</span>
                        </div>
                      </th>
                      <th className="rating-header">
                        <div className="header-content">
                          <span>{t('ratings.rating')}</span>
                        </div>
                      </th>
                      <th className="country-header">
                        <div className="header-content">
                          <span>{t('ratings.country')}</span>
                        </div>
                      </th>
                      <th className="games-header">
                        <div className="header-content">
                          <span>{t('ratings.games')}</span>
                        </div>
                      </th>
                      <th className="date-header">
                        <div className="header-content">
                          <span>{t('ratings.lastPlayed')}</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPlayers.map((player) => (
                      <tr key={player.nick} className="player-row">
                        <td className="rank-cell">
                          <span className="rank-number">#{getRankPosition(player)}</span>
                        </td>
                        <td className="player-cell">
                          <div className="player-info">
                            <div className="player-avatar">
                              <div className="bg-gray-600 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-white font-bold">
                                {player.name.charAt(0)}
                              </div>
                            </div>
                            <div className="player-details">
                              <div className="player-name">{highlightText(player.name, debouncedSearchTerm)}</div>
                              <div className="player-nick">{highlightText(player.nick, debouncedSearchTerm)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="rating-cell">
                          <div className="rating-badge">{player.rating}</div>
                        </td>
                        <td className="country-cell">
                          <div className="country-info">
                            {countryFlags[player.country] ? (
                              <img
                                src={`https://flagcdn.com/w40/${countryFlags[player.country]}.png`}
                                srcSet={`https://flagcdn.com/w80/${countryFlags[player.country]}.png 2x`}
                                alt={`${player.country} flag`}
                                className="country-flag"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if(parent) {
                                      const placeholder = parent.querySelector('.country-placeholder');
                                      if (placeholder) (placeholder as HTMLElement).style.display = 'inline-block';
                                  }
                                }}
                              />
                            ) : (
                              <span className="country-placeholder"></span>
                            )}
                            <span className="country-code">{player.country}</span>
                          </div>
                        </td>
                        <td className="games-cell">
                          <span className="games-count">{player.games.toLocaleString()}</span>
                        </td>
                        <td className="date-cell">
                          <span className="last-played">{formatDate(player.lastPlayed)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mobile Cards */}
          {filteredAndSortedPlayers.length > 0 && (
            <div className="mobile-cards">
              {paginatedPlayers.map((player) => (
                <div key={player.nick} className="player-card">
                  <div className="card-header">
                    <div className="rank-badge">#{getRankPosition(player)}</div>
                    <div className="rating-badge-mobile">{player.rating}</div>
                  </div>
                  <div className="card-body">
                    <div className="player-main">
                      <div className="player-avatar-mobile">
                        <div className="bg-gray-600 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
                          {player.name.charAt(0)}
                        </div>
                      </div>
                      <div className="player-details-mobile">
                        <h3 className="player-name-mobile">{highlightText(player.name, debouncedSearchTerm)}</h3>
                        <div className="player-nick-mobile">{highlightText(player.nick, debouncedSearchTerm)}</div>
                      </div>
                    </div>
                    <div className="player-stats">
                      <div className="stat-item">
                        <span className="stat-label">{t('ratings.country')}</span>
                        <div className="country-info-mobile">
                          {countryFlags[player.country] ? (
                            <img
                              src={`https://flagcdn.com/w20/${countryFlags[player.country]}.png`}
                              srcSet={`https://flagcdn.com/w40/${countryFlags[player.country]}.png 2x`}
                              alt={`${player.country} flag`}
                              className="country-flag-mobile"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                    const placeholder = parent.querySelector('.country-placeholder-mobile');
                                    if(placeholder) (placeholder as HTMLElement).style.display = 'inline-block';
                                }
                              }}
                            />
                          ) : (
                            <span className="country-placeholder-mobile"></span>
                          )}
                          <span className="stat-value country-mobile">{player.country}</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">{t('ratings.games')}</span>
                        <span className="stat-value">{player.games.toLocaleString()}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">{t('ratings.lastPlayed')}</span>
                        <span className="stat-value">{formatDate(player.lastPlayed)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pagination-section">
          <div className="pagination-info">
            {t('ratings.results', { 
              start: filteredAndSortedPlayers.length > 0 ? startIndex + 1 : 0, 
              end: Math.min(startIndex + effectiveItemsPerPage, filteredAndSortedPlayers.length), 
              total: filteredAndSortedPlayers.length 
            })}
            {shouldShowAllResults && filteredAndSortedPlayers.length > 0 && (
              <span className="showing-all-notice">
                {t('ratings.showingAll', { count: filteredAndSortedPlayers.length })}
              </span>
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="pagination-btn"
                aria-label={t('ratings.firstPage')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
                aria-label={t('ratings.previousPage')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Better pagination logic */}
              {paginationPages.map((pageNum, index) => {
                if (typeof pageNum === 'string') {
                  return (
                    <span key={pageNum + index} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                    aria-label={`${t('ratings.page')} ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                aria-label={t('ratings.nextPage')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                aria-label={t('ratings.lastPage')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          
          <div className="items-per-page">
            <label htmlFor="itemsPerPage" className="items-label">{t('ratings.show')}:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="items-select"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      <style>{`
        /* --- General & Hero --- */
        .ratings-page {
          min-height: 100vh;
          padding-bottom: 4rem;
        }
        .hero-section {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          backdrop-filter: blur(12px);
          padding: 5rem 2rem;
          text-align: center;
          color: white;
          border-bottom: 1px solid rgba(34, 197, 94, 0.3);
          position: relative;
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-section h1 {
          font-family: 'Orbitron', monospace;
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
          background: linear-gradient(to right, #22c55e, #06b6d4, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
        }
        .hero-section p {
          font-size: 1.3rem;
          color: #cbd5e1;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .ratings-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2.5rem;
        }

        /* --- Controls & Filters --- */
        .controls-section {
          margin-bottom: 2.5rem;
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(56, 67, 83, 0.5);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }
        .filters-row {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .search-container {
          position: relative;
          flex: 1;
          min-width: 280px;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          pointer-events: none; /* Allows click-through */
        }
        .search-input-container {
          position: relative;
          width: 100%;
        }
        .search-input {
          width: 100%;
          padding: 0.875rem 2.75rem; /* Padding left for icon, right for clear button */
          border: 1px solid #374151;
          border-radius: 12px;
          background: #1f2937;
          color: #f9fafb;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .search-input:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
        }
        .search-input::placeholder {
          color: #9ca3af;
        }
        .clear-search {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 5px;
          border-radius: 6px;
          transition: all 0.2s ease;
          z-index: 2;
        }
        .clear-search:hover {
          color: #f9fafb;
          background: #374151;
        }
        .filter-container {
          min-width: 220px;
        }
        .country-select {
          width: 100%;
          padding: 0.875rem;
          border: 1px solid #374151;
          border-radius: 12px;
          background: #1f2937;
          color: #f9fafb;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .country-select:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
        }

        /* --- Search Suggestions --- */
        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
          z-index: 100;
          margin-top: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
        }
        .search-suggestions ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .suggestion-item {
          padding: 0.75rem 1rem;
          cursor: pointer;
          border-bottom: 1px solid #374151;
          transition: background-color 0.2s ease;
        }
        .suggestion-item:hover,
        .suggestion-item:focus {
          background: #374151;
          outline: none;
        }
        .suggestion-item:last-child {
          border-bottom: none;
        }
        .suggestion-item.no-results {
          font-style: italic;
          color: #94a3b8;
          cursor: default;
        }
        .suggestion-item.no-results:hover {
          background: transparent;
        }

        /* --- Stats Row --- */
        .stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.25rem;
        }
        .stats-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          align-items: center;
        }
        .results-count {
          font-size: 0.9375rem;
          color: #e2e8f0;
          font-weight: 500;
        }
        .filter-indicator {
          font-size: 0.9375rem;
          color: #94a3b8;
        }
        .showing-all-notice {
          font-size: 0.9375rem;
          color: #22c55e;
          font-style: italic;
        }
        .clear-filters {
          font-size: 0.9375rem;
          color: #22c55e;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.375rem 0.75rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-weight: 600;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .clear-filters:hover {
          background: rgba(34, 197, 94, 0.15);
        }
        .sr-only { /* For screen readers */
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* --- Table Section --- */
        .table-section {
          margin-bottom: 2.5rem;
        }
        .desktop-table {
          display: none; /* Hidden by default, shown on desktop */
        }
        .mobile-cards {
          display: block; /* Shown by default, hidden on desktop */
        }
        .table-container {
          overflow-x: auto;
          border-radius: 16px;
          border: 1px solid #374151;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }
        .ratings-table {
          width: 100%;
          border-collapse: collapse;
          background: #1f2937;
        }
        .ratings-table th {
          background: #111827;
          padding: 1.25rem;
          text-align: left;
          font-weight: 600;
          color: #94a3b8;
          border-bottom: 1px solid #374151;
          font-size: 0.9375rem;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          white-space: nowrap;
        }
        .ratings-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s ease;
          position: relative;
        }
        .ratings-table th.sortable:hover {
          background: #1f2937;
        }
        .header-content {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .ratings-table td {
          padding: 1.25rem;
          border-bottom: 1px solid #374151;
        }
        .ratings-table tbody tr:last-child td {
          border-bottom: none;
        }
        .ratings-table tbody tr:hover {
          background: rgba(31, 41, 55, 0.7);
        }
        .rank-header { width: 5%; }
        .name-header { width: 25%; }
        .rating-header { width: 10%; }
        .country-header { width: 20%; }
        .games-header { width: 10%; }
        .date-header { width: 15%; }
        .rank-cell { text-align: center; }
        .rank-number {
          font-weight: 800;
          color: #22c55e;
          font-size: 1.25rem;
        }
        .player-cell .player-name {
          font-weight: 700;
          color: #f9fafb;
          margin-bottom: 0.375rem;
          font-size: 1.0625rem;
        }
        .player-nick {
          font-size: 0.9375rem;
          color: #94a3b8;
        }
        .country-cell .country-info {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }
        .country-flag {
          width: 28px;
          height: 20px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #374151;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .country-placeholder {
          width: 28px;
          height: 20px;
          border-radius: 4px;
          background: #374151;
          display: inline-block; /* Show by default if no src */
        }
        .country-code {
          font-weight: 600;
          color: #f9fafb;
        }
        
        /* --- Mobile Cards --- */
        .player-card {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          border-radius: 16px;
          border: 1px solid #374151;
          overflow: hidden;
          margin-bottom: 1.25rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .player-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(17, 24, 39, 0.8);
          border-bottom: 1px solid #374151;
        }
        .rank-badge {
          display: inline-block;
          padding: 0.375rem 1rem;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
          color: #22c55e;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.9375rem;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .rating-badge-mobile {
          display: inline-block;
          padding: 0.375rem 1rem;
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
          color: #22c55e;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.9375rem;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .card-body {
          padding: 1rem;
        }
        .player-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #374151;
        }
        .player-avatar-mobile {
          flex-shrink: 0;
        }
        .player-details-mobile {
          flex: 1;
        }
        .player-name-mobile {
          font-size: 1.125rem;
          font-weight: 700;
          color: #f9fafb;
          margin-bottom: 0.25rem;
        }
        .player-nick-mobile {
          font-size: 0.875rem;
          color: #94a3b8;
        }
        .player-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .stat-item {
          display: flex;
          flex-direction: column;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
          letter-spacing: 0.025em;
          font-weight: 600;
        }
        .stat-value {
          font-size: 0.875rem;
          color: #f9fafb;
          font-weight: 600;
        }
        .country-info-mobile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .country-flag-mobile {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 3px;
          border: 1px solid #374151;
        }
        .country-placeholder-mobile {
          width: 20px;
          height: 14px;
          border-radius: 3px;
          background: #374151;
          display: inline-block; /* Show by default if no src */
        }
        .country-mobile {
          font-weight: 600;
        }

        /* --- No Results --- */
        .no-results-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #94a3b8;
          background: rgba(30, 41, 59, 0.7);
          border-radius: 16px;
          margin-bottom: 2rem;
          border: 1px solid #374151;
        }
        .no-results-state h3 {
          color: #f9fafb;
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }
        .no-results-state p {
          margin-bottom: 1rem; /* Added margin */
        }
        .no-results-state ul {
          list-style-type: none;
          padding: 0;
          margin: 1rem 0;
          text-align: left;
          display: inline-block;
        }
        .no-results-state li {
          padding: 0.25rem 0;
          position: relative;
          padding-left: 1.5rem;
        }
        .no-results-state li:before {
          content: '•';
          color: #22c55e;
          position: absolute;
          left: 0;
          line-height: 1.5rem; /* Align bullet */
        }

        /* --- Pagination --- */
        .pagination-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem; /* Increased gap */
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .pagination-info {
          font-size: 0.875rem;
          color: #94a3b8;
          font-weight: 500;
          text-align: center;
        }
        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap; /* Allow controls to wrap */
          justify-content: center; /* Center wrapped controls */
        }
        .pagination-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 12px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          min-height: 44px; /* Touch-friendly minimum size */
          min-width: 44px;
        }
        .pagination-btn:hover:not(:disabled) {
          background: #374151;
          color: #f9fafb;
          transform: translateY(-2px);
        }
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .pagination-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 12px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          min-height: 44px; /* Touch-friendly minimum size */
          min-width: 44px;
        }
        .pagination-number:hover {
          background: #374151;
          color: #f9fafb;
          transform: translateY(-2px);
        }
        .pagination-number.active {
          background: linear-gradient(135deg, #22c55e 0%, #06b6d4 100%);
          border-color: #22c55e;
          color: white;
          box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);
        }
        .pagination-ellipsis {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          color: #94a3b8;
          font-weight: 600;
        }
        .items-per-page {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .items-label {
          font-size: 0.9375rem;
          color: #cbd5e1;
          white-space: nowrap;
          font-weight: 500;
        }
        .items-select {
          padding: 0.875rem;
          border: 1px solid #374151;
          border-radius: 12px;
          background: #1f2937;
          color: #f9fafb;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .items-select:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
        }

        /* --- Media Queries --- */
        @media (min-width: 1024px) {
          .desktop-table {
            display: block;
          }
          .mobile-cards {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 1rem;
          }
          .hero-section h1 {
            font-size: 2.5rem;
          }
          .hero-section p {
            font-size: 1.125rem;
          }
          .ratings-content {
            padding: 1rem;
          }
          .controls-section {
            padding: 1rem;
          }
          .filters-row {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .search-container, .filter-container {
            min-width: auto;
          }
          .stats-row {
            flex-direction: column;
            align-items: flex-start; /* Align stats to the left */
            gap: 1rem;
          }
          .showing-all-notice {
            margin-left: 0;
          }
          .clear-filters {
            align-self: flex-start; /* Keep clear button on left */
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 2rem 1rem;
          }
          .hero-section h1 {
            font-size: 2rem;
          }
          .hero-section p {
            font-size: 1rem;
          }
          .ratings-content {
            padding: 0.5rem;
          }
          .controls-section {
            padding: 0.75rem;
          }
          .search-input {
             /* Adjust padding for small screens */
            padding: 0.75rem 2.5rem;
            font-size: 0.9375rem;
          }
          .country-select, .items-select {
            padding: 0.75rem;
            font-size: 0.9375rem;
          }
          .search-icon {
            left: 10px;
          }
          .search-suggestions {
            margin-top: 0.25rem;
          }
          .suggestion-item {
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }
          .items-label {
            font-size: 0.875rem;
          }
          .results-count,
          .filter-indicator,
          .showing-all-notice {
            font-size: 0.875rem;
          }
          .clear-filters {
            font-size: 0.875rem;
          }
          .player-stats {
            grid-template-columns: 1fr; /* Stack stats on smallest screens */
            gap: 0.75rem;
          }
          .card-header, .card-body {
            padding: 0.875rem;
          }
          .player-main {
            margin-bottom: 0.875rem;
            padding-bottom: 0.875rem;
          }
          .player-name-mobile {
            font-size: 1.0625rem;
          }
          .player-nick-mobile {
            font-size: 0.875rem;
          }
          .stat-label {
            font-size: 0.75rem;
          }
          .stat-value {
            font-size: 0.875rem;
          }
          .rank-badge,
          .rating-badge-mobile {
            padding: 0.25rem 0.75rem;
            font-size: 0.8125rem;
          }
          .pagination-section {
            gap: 1rem;
          }
          .pagination-controls {
            gap: 0.375rem;
          }
          .pagination-btn,
          .pagination-number,
          .pagination-ellipsis {
            width: 2.25rem;
            height: 2.25rem;
            min-width: 2.25rem;
            min-height: 2.25rem;
            font-size: 0.875rem;
          }
          .player-info {
            gap: 0.75rem;
          }
          .player-name {
            font-size: 1rem;
          }
          .player-nick {
            font-size: 0.875rem;
          }
        }

        /* --- Highlighting --- */
        .search-highlight {
          background-color: #facc15;
          color: #000000;
          font-weight: 700;
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RatingsPage;
import React, { useState, useEffect, useRef } from 'react';
import { getPlayers, getNews, getEvents, getFederations } from '../src/services/supabaseService';
import { useLocalization } from '../contexts/LocalizationContext';

export interface SearchSuggestion {
  id: string;
  title: string;
  type: 'player' | 'news' | 'event' | 'federation';
  description?: string;
}

interface EnhancedSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: SearchSuggestion[];
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ 
  onSearch, 
  placeholder = "Search...",
  suggestions = [] 
}) => {
  const { language } = useLocalization();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const [dynamicSuggestions, setDynamicSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }

    // Filter static suggestions
    const filteredStatic = suggestions.filter(suggestion => 
      suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
      (suggestion.description && suggestion.description.toLowerCase().includes(query.toLowerCase()))
    );

    // Combine static and dynamic suggestions
    const combinedSuggestions = [...filteredStatic, ...dynamicSuggestions];
    
    // Remove duplicates based on title
    const uniqueSuggestions = combinedSuggestions.filter((suggestion, index, self) => 
      index === self.findIndex(s => s.title === suggestion.title)
    );

    setFilteredSuggestions(uniqueSuggestions.slice(0, 8)); // Limit to 8 suggestions
  }, [query, dynamicSuggestions]); // Remove suggestions from dependencies since it's a static prop

  // Fetch dynamic suggestions with debounce
  useEffect(() => {
    if (query.trim() === '') {
      setDynamicSuggestions([]);
      return;
    }

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Fetch all data types
        const [players, news, events, federations] = await Promise.all([
          getPlayers().catch(() => []),
          getNews(language).catch(() => []),
          getEvents().catch(() => []),
          getFederations().catch(() => [])
        ]);

        const dynamicResults: SearchSuggestion[] = [];

        // Get top 3 players that match the query
        if (players && players.length > 0) {
          const playerMatches = players
            .filter((player: any) => 
              player.name.toLowerCase().includes(query.toLowerCase()) ||
              player.nick.toLowerCase().includes(query.toLowerCase()) ||
              player.country.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 3)
            .map((player: any) => ({
              id: `player-${player.nick}`,
              title: player.name,
              type: 'player' as const,
              description: `${player.nick} - ${player.country} (Rating: ${player.rating})`
            }));
          dynamicResults.push(...playerMatches);
        }

        // Get top 2 news articles that match the query
        if (news && news.length > 0) {
          const newsMatches = news
            .filter((article: any) => 
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              article.summary.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 2)
            .map((article: any) => ({
              id: `news-${article.id}`,
              title: article.title,
              type: 'news' as const,
              description: article.summary.substring(0, 100) + '...'
            }));
          dynamicResults.push(...newsMatches);
        }

        // Get top 2 events that match the query
        if (events && events.length > 0) {
          const eventMatches = events
            .filter((event: any) => 
              event.title.toLowerCase().includes(query.toLowerCase()) ||
              event.location.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 2)
            .map((event: any) => ({
              id: `event-${event.id}`,
              title: event.title,
              type: 'event' as const,
              description: `${event.location} - ${new Date(event.date).toLocaleDateString()}`
            }));
          dynamicResults.push(...eventMatches);
        }

        // Get top 2 federations that match the query
        if (federations && federations.length > 0) {
          const federationMatches = federations
            .filter((federation: any) => 
              federation.country.toLowerCase().includes(query.toLowerCase()) ||
              federation.name.toLowerCase().includes(query.toLowerCase()) ||
              federation.president.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 2)
            .map((federation: any) => ({
              id: `federation-${federation.id}`,
              title: `${federation.country} - ${federation.name}`,
              type: 'federation' as const,
              description: `President: ${federation.president}`
            }));
          dynamicResults.push(...federationMatches);
        }

        // Check if component is still mounted before setting state
        if (debounceTimer.current) {
          setDynamicSuggestions(dynamicResults);
        }
      } catch (error) {
        console.error('Error fetching dynamic suggestions:', error);
        // Check if component is still mounted before setting state
        if (debounceTimer.current) {
          setDynamicSuggestions([]);
        }
      } finally {
        // Check if component is still mounted before setting state
        if (debounceTimer.current) {
          setIsLoading(false);
        }
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        // Clear the ref to indicate component unmounted
        debounceTimer.current = null;
      }
    };
  }, [query, language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
  };

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setIsOpen(false);
    onSearch(suggestion.title);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'player':
        return (
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      case 'news':
        return (
          <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        );
      case 'event':
        return (
          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
        );
      case 'federation':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        );
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'player': return 'Player';
      case 'news': return 'News';
      case 'event': return 'Event';
      case 'federation': return 'Federation';
      default: return 'Result';
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
          <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          onFocus={() => setIsOpen(query.length > 0)}
          placeholder={placeholder}
          className="block w-full pl-7 pr-7 py-1.5 sm:py-2 border border-slate-700 rounded-lg bg-slate-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-2 flex items-center"
          >
            <svg className="h-3 w-3 text-gray-400 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (filteredSuggestions.length > 0 || query) && (
        <div className="absolute z-20 mt-1 w-full bg-slate-800/90 border border-slate-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {isLoading ? (
            <div className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-gray-400 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-green-400"></div>
                <span>Searching...</span>
              </div>
            </div>
          ) : filteredSuggestions.length > 0 ? (
            <ul className="py-1.5 sm:py-2 max-h-60 sm:max-h-72 overflow-auto">
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-slate-700/80 cursor-pointer flex items-start gap-2 sm:gap-3 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors duration-200">
                      {suggestion.title}
                    </div>
                    {suggestion.description && (
                      <div className="text-[10px] sm:text-xs text-gray-400 mt-1 truncate">
                        {suggestion.description}
                      </div>
                    )}
                  </div>
                  <div className="text-[9px] sm:text-xs text-gray-500 bg-slate-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg">
                    {getTypeLabel(suggestion.type)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-gray-400 text-center">
              No suggestions found. Press Enter to search.
            </div>
          )}
          
          {query && !isLoading && (
            <div className="border-t border-slate-700 px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-900/80">
              <button
                onClick={() => handleSearch()}
                className="w-full text-left text-xs sm:text-sm text-green-400 hover:text-cyan-400 font-medium flex items-center gap-1.5 sm:gap-2 transition-colors duration-200"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search for "{query}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearch;
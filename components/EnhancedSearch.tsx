import React, { useState, useEffect, useRef } from 'react';

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
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions.filter(suggestion => 
      suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
      (suggestion.description && suggestion.description.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
  }, [query, suggestions]);

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
    // You can add specific handling for different suggestion types here
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
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="block w-full pl-10 pr-10 py-2.5 border border-slate-700 rounded-xl bg-slate-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (filteredSuggestions.length > 0 || query) && (
        <div className="absolute z-20 mt-2 w-full bg-slate-800/90 border border-slate-700 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {filteredSuggestions.length > 0 ? (
            <ul className="py-2 max-h-72 overflow-auto">
              {filteredSuggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-slate-700/80 cursor-pointer flex items-start gap-3 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors duration-200">
                      {suggestion.title}
                    </div>
                    {suggestion.description && (
                      <div className="text-xs text-gray-400 mt-1 truncate">
                        {suggestion.description}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 bg-slate-700 px-2 py-1 rounded-lg">
                    {getTypeLabel(suggestion.type)}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 text-sm text-gray-400 text-center">
              No suggestions found. Press Enter to search.
            </div>
          )}
          
          {query && (
            <div className="border-t border-slate-700 px-4 py-3 bg-slate-900/80">
              <button
                onClick={() => handleSearch()}
                className="w-full text-left text-sm text-green-400 hover:text-cyan-400 font-medium flex items-center gap-2 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getPlayers, getNews, getEvents, getFederations } from '../src/services/supabaseService';
import { useLocalization } from '../contexts/LocalizationContext';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'player' | 'news' | 'event' | 'federation';
  url: string;
  image?: string;
  meta?: string;
}

const SearchResultsPage: React.FC = () => {
  const { t, language } = useLocalization();
  const location = useLocation();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('q') || '';
    setQuery(searchQuery);
    
    if (searchQuery) {
      performSearch(searchQuery);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all data types
      const [players, news, events, federations] = await Promise.all([
        getPlayers().catch(() => []),
        getNews(language).catch(() => []), // Pass language parameter
        getEvents().catch(() => []),
        getFederations().catch(() => [])
      ]);

      // Create an array with relevance scores for sorting
      const allResultsWithScores: Array<SearchResult & { relevance: number }> = [];

      // Search players with enhanced matching
      if (players && players.length > 0) {
        players.forEach((player: any) => {
          // Calculate relevance score based on multiple factors
          let relevanceScore = 0;
          const searchLower = searchQuery.toLowerCase();
          
          // Exact matches get higher scores
          if (player.name.toLowerCase() === searchLower) relevanceScore += 10;
          else if (player.name.toLowerCase().includes(searchLower)) relevanceScore += 5;
          
          if (player.nick.toLowerCase() === searchLower) relevanceScore += 8;
          else if (player.nick.toLowerCase().includes(searchLower)) relevanceScore += 4;
          
          if (player.country.toLowerCase() === searchLower) relevanceScore += 7;
          else if (player.country.toLowerCase().includes(searchLower)) relevanceScore += 3;
          
          // Partial matches in any field
          if (player.name.toLowerCase().includes(searchLower) ||
              player.nick.toLowerCase().includes(searchLower) ||
              player.country.toLowerCase().includes(searchLower)) {
            relevanceScore += 2;
          }
          
          // If we have a relevance score, add to results
          if (relevanceScore > 0) {
            allResultsWithScores.push({
              id: player.nick,
              title: player.name,
              description: `${player.nick} - Rating: ${player.rating}`,
              type: 'player',
              url: `/ratings`,
              meta: `${player.country} | ${player.games} games`,
              image: `https://flagcdn.com/w40/${getPlayerCountryCode(player.country)}.png`,
              relevance: relevanceScore
            });
          }
        });
      }

      // Search news with enhanced matching
      if (news && news.length > 0) {
        news.forEach((article: any) => {
          let relevanceScore = 0;
          const searchLower = searchQuery.toLowerCase();
          
          // Check title, content, and summary
          if (article.title.toLowerCase().includes(searchLower)) relevanceScore += 5;
          if (article.content.toLowerCase().includes(searchLower)) relevanceScore += 3;
          if (article.summary.toLowerCase().includes(searchLower)) relevanceScore += 4;
          if (article.author && article.author.toLowerCase().includes(searchLower)) relevanceScore += 2;
          
          // Exact matches in title get highest score
          if (article.title.toLowerCase() === searchLower) relevanceScore += 10;
          
          if (relevanceScore > 0) {
            allResultsWithScores.push({
              id: article.id,
              title: article.title,
              description: article.summary,
              type: 'news',
              url: `/news/${article.id}`,
              meta: `By ${article.author} on ${new Date(article.created_at).toLocaleDateString()}`,
              image: getArticleImage(article),
              relevance: relevanceScore
            });
          }
        });
      }

      // Search events with enhanced matching
      if (events && events.length > 0) {
        events.forEach((event: any) => {
          let relevanceScore = 0;
          const searchLower = searchQuery.toLowerCase();
          
          // Check title, description, and location
          if (event.title.toLowerCase().includes(searchLower)) relevanceScore += 5;
          if (event.description.toLowerCase().includes(searchLower)) relevanceScore += 3;
          if (event.location && event.location.toLowerCase().includes(searchLower)) relevanceScore += 4;
          
          // Exact matches in title get highest score
          if (event.title.toLowerCase() === searchLower) relevanceScore += 10;
          
          if (relevanceScore > 0) {
            allResultsWithScores.push({
              id: event.id,
              title: event.title,
              description: event.description.substring(0, 150) + '...',
              type: 'event',
              url: `/events/${event.id}`,
              meta: `${event.date} | ${event.location}`,
              image: getEventImage(event),
              relevance: relevanceScore
            });
          }
        });
      }

      // Search federations with enhanced matching
      if (federations && federations.length > 0) {
        federations.forEach((federation: any) => {
          let relevanceScore = 0;
          const searchLower = searchQuery.toLowerCase();
          
          // Check country, name, president, and address
          if (federation.country.toLowerCase().includes(searchLower)) relevanceScore += 5;
          if (federation.name.toLowerCase().includes(searchLower)) relevanceScore += 4;
          if (federation.president.toLowerCase().includes(searchLower)) relevanceScore += 3;
          if (federation.address && federation.address.toLowerCase().includes(searchLower)) relevanceScore += 2;
          
          // Exact matches get highest score
          if (federation.country.toLowerCase() === searchLower) relevanceScore += 10;
          if (federation.name.toLowerCase() === searchLower) relevanceScore += 8;
          
          if (relevanceScore > 0) {
            allResultsWithScores.push({
              id: federation.id,
              title: `${federation.country} - ${federation.name}`,
              description: `President: ${federation.president}`,
              type: 'federation',
              url: `/federations`,
              meta: federation.address,
              image: `https://flagcdn.com/w40/${getFederationCountryCode(federation.country)}.png`,
              relevance: relevanceScore
            });
          }
        });
      }

      // Sort results by relevance score (highest first)
      allResultsWithScores.sort((a, b) => b.relevance - a.relevance);
      
      // Remove relevance property before setting results
      const finalResults = allResultsWithScores.map(({ relevance, ...rest }) => rest);
      
      setResults(finalResults);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPlayerCountryCode = (country: string) => {
    const countryCodes: { [key: string]: string } = {
      'Nigeria': 'ng',
      'Ghana': 'gh',
      'Kenya': 'ke',
      'South Africa': 'za',
      'Uganda': 'ug',
      'Tanzania': 'tz',
      'Zambia': 'zm',
      'Botswana': 'bw',
      'Cameroon': 'cm',
      'Gambia': 'gm',
      'Liberia': 'lr',
      'Sierra Leone': 'sl',
      'Mauritius': 'mu',
      'Togo': 'tg'
    };
    return countryCodes[country] || 'ng';
  };

  const getArticleImage = (article: any) => {
    if (article.title === 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship') {
      return '/kofiBingo.png';
    } else if (article.title === 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles') {
      return '/ayscbanner.png';
    } else if (article.title === 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi') {
      return '/triumvirate.png';
    }
    return article.image;
  };

  const getEventImage = (event: any) => {
    if (event.title === 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship') {
      return '/kofiBingo.png';
    } else if (event.title === 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles') {
      return '/ayscbanner.png';
    } else if (event.title === 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi') {
      return '/triumvirate.png';
    }
    return event.image;
  };

  const getFederationCountryCode = (country: string) => {
    return getPlayerCountryCode(country);
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
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
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

  if (loading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-green-400 mx-auto"></div>
            <p className="mt-5 text-gray-400 text-lg">Searching...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-orbitron text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400 mb-5">
            Search Results
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {query ? (
              <>
                Found <span className="text-green-400 font-bold">{results.length}</span> result{results.length !== 1 ? 's' : ''} for "<span className="text-cyan-400">{query}</span>"
              </>
            ) : (
              "Enter a search term to find players, news, events, and federations"
            )}
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-5 mb-10 text-center backdrop-blur-sm">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {query && results.length === 0 && !loading && (
          <div className="text-center py-16 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
            <svg className="w-20 h-20 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-bold text-gray-300 mb-3">No results found</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Try different keywords or check your spelling
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result) => (
              <div 
                key={`${result.type}-${result.id}`} 
                className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800/50 hover:border-green-400/40 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-start gap-5">
                  {result.image && (
                    <div className="flex-shrink-0">
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="w-20 h-20 object-contain rounded-xl border border-slate-700/50 p-2 bg-slate-800/50 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0">
                        {getTypeIcon(result.type)}
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-slate-800 to-slate-900 text-gray-300 rounded-full border border-slate-700">
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                      <Link to={result.url} className="hover:underline">
                        {result.title}
                      </Link>
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">{result.description}</p>
                    {result.meta && (
                      <p className="text-sm text-gray-500 font-medium">{result.meta}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
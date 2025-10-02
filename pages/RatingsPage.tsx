import React, { useState, useEffect, useMemo } from 'react';
import { getPlayers, subscribeToPlayers } from '../src/services/supabaseService';
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

const RatingsPage: React.FC = () => {
  const { t } = useLocalization();
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Player>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCountry, setFilterCountry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch players data from Supabase with fallback to local data
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const players = await getPlayers();
        
        if (players && players.length > 0) {
          setPlayersData(players);
        } else {
          // Fallback to local data if Supabase fails or returns empty
          setPlayersData(fallbackData);
        }
      } catch (err) {
        console.error('Error fetching players:', err);
        // Fallback to local data on error
        setPlayersData(fallbackData);
        setError('Failed to load player data. Showing offline data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToPlayers(
      (updatedPlayers) => {
        setPlayersData(updatedPlayers);
        setIsSubscribed(true);
      },
      (error) => {
        console.error('Real-time subscription error:', error);
        setIsSubscribed(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Get unique countries for filter dropdown
  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(playersData.map(player => player.country))];
    return uniqueCountries.sort();
  }, [playersData]);

  // Filter and sort players
  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = playersData.filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.nick.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = !filterCountry || player.country === filterCountry;
      return matchesSearch && matchesCountry;
    });

    return filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [playersData, searchTerm, sortBy, sortOrder, filterCountry]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedPlayers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlayers = filteredAndSortedPlayers.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCountry]);

  const handleSort = (column: keyof Player) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString: string) => {
    // Handle different date formats
    if (dateString.includes('-')) {
      // Format: YYYY-MM-DD
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } else if (dateString.length === 8) {
      // Format: YYYYMMDD
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };

  const getSortIcon = (column: keyof Player) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const getRankPosition = (index: number) => {
    return startIndex + index + 1;
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

  return (
    <div className="ratings-page">
      <div className="hero-section">
        <h1>{t('ratings.title')}</h1>
        <p>{t('ratings.subtitle')}</p>
      </div>

      <div className="ratings-content">
        <div className="controls-section">
          <div className="filters-row">
            <div className="search-container">
              <div className="search-icon">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={t('ratings.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="filter-container">
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="country-select"
              >
                <option value="">{t('ratings.allCountries')} ({countries.length})</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country} ({playersData.filter(p => p.country === country).length})
                  </option>
                ))}
              </select>
            </div>

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

          <div className="stats-row">
            <div className="stats-summary">
              <span className="results-count">
                {t('ratings.results', { 
                  start: startIndex + 1, 
                  end: Math.min(startIndex + itemsPerPage, filteredAndSortedPlayers.length), 
                  total: filteredAndSortedPlayers.length 
                })}
              </span>
              {(searchTerm || filterCountry) && (
                <span className="filter-indicator">
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
                className="clear-filters"
              >
                {t('ratings.clearFilters')}
              </button>
            )}
          </div>
        </div>

        <div className="table-section">
          {/* Desktop Table */}
          <div className="desktop-table">
            <div className="table-container">
              <table className="ratings-table">
                <thead>
                  <tr>
                    <th className="rank-header">{t('ratings.rank')}</th>
                    <th onClick={() => handleSort('name')} className="sortable name-header">
                      <div className="header-content">
                        <span>{t('ratings.player')}</span>
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th onClick={() => handleSort('rating')} className="sortable rating-header">
                      <div className="header-content">
                        <span>{t('ratings.rating')}</span>
                        {getSortIcon('rating')}
                      </div>
                    </th>
                    <th onClick={() => handleSort('country')} className="sortable country-header">
                      <div className="header-content">
                        <span>{t('ratings.country')}</span>
                        {getSortIcon('country')}
                      </div>
                    </th>
                    <th onClick={() => handleSort('games')} className="sortable games-header">
                      <div className="header-content">
                        <span>{t('ratings.games')}</span>
                        {getSortIcon('games')}
                      </div>
                    </th>
                    <th onClick={() => handleSort('lastPlayed')} className="sortable date-header">
                      <div className="header-content">
                        <span>{t('ratings.lastPlayed')}</span>
                        {getSortIcon('lastPlayed')}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPlayers.map((player, index) => (
                    <tr key={player.nick} className="player-row">
                      <td className="rank-cell">
                        <span className="rank-number">#{getRankPosition(index)}</span>
                      </td>
                      <td className="player-cell">
                        <div className="player-info">
                          <div className="player-name">{player.name}</div>
                          <div className="player-nick">{player.nick}</div>
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
                                // Handle image load errors by hiding the image
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
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

          {/* Mobile Cards */}
          <div className="mobile-cards">
            {paginatedPlayers.map((player, index) => (
              <div key={player.nick} className="player-card">
                <div className="card-header">
                  <div className="rank-badge">#{getRankPosition(index)}</div>
                  <div className="rating-badge-mobile">{player.rating}</div>
                </div>
                <div className="card-body">
                  <div className="player-main">
                    <h3 className="player-name-mobile">{player.name}</h3>
                    <div className="player-nick-mobile">{player.nick}</div>
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
                              // Handle image load errors by hiding the image
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
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
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-section">
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="pagination-btn"
                aria-label="First page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
                aria-label="Previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                aria-label="Next page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
                aria-label="Last page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
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
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 0.875rem 0.875rem 2.75rem;
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

        .table-section {
          margin-bottom: 2.5rem;
        }

        .desktop-table {
          display: none;
        }

        .mobile-cards {
          display: block;
        }

        @media (min-width: 1024px) {
          .desktop-table {
            display: block;
          }

          .mobile-cards {
            display: none;
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

          .rank-header {
            width: 5%;
          }

          .name-header {
            width: 25%;
          }

          .rating-header {
            width: 10%;
          }

          .country-header {
            width: 20%;
          }

          .games-header {
            width: 10%;
          }

          .date-header {
            width: 15%;
          }

          .rank-cell {
            text-align: center;
          }

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

          .player-cell .player-nick {
            font-size: 0.9375rem;
            color: #94a3b8;
          }

          .rating-cell {
            text-align: center;
          }

          .rating-badge {
            display: inline-block;
            padding: 0.375rem 1rem;
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%);
            color: #22c55e;
            border-radius: 9999px;
            font-weight: 700;
            font-size: 0.9375rem;
            border: 1px solid rgba(34, 197, 94, 0.3);
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

          .country-code {
            font-weight: 600;
            color: #f9fafb;
          }

          .games-cell {
            text-align: center;
          }

          .games-count {
            font-weight: 600;
            color: #f9fafb;
          }

          .date-cell {
            text-align: center;
          }

          .last-played {
            color: #94a3b8;
            font-size: 0.9375rem;
          }
        }

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
          padding: 1.25rem;
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
          padding: 1.25rem;
        }

        .player-main {
          margin-bottom: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #374151;
        }

        .player-name-mobile {
          font-size: 1.25rem;
          font-weight: 700;
          color: #f9fafb;
          margin-bottom: 0.375rem;
        }

        .player-nick-mobile {
          font-size: 0.9375rem;
          color: #94a3b8;
        }

        .player-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 0.375rem;
          letter-spacing: 0.025em;
          font-weight: 600;
        }

        .stat-value {
          font-size: 0.9375rem;
          color: #f9fafb;
          font-weight: 600;
        }

        .country-info-mobile {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .country-flag-mobile {
          width: 24px;
          height: 16px;
          object-fit: cover;
          border-radius: 3px;
          border: 1px solid #374151;
        }

        .country-mobile {
          font-weight: 600;
        }

        .pagination-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          margin-top: 2.5rem;
        }

        .pagination-info {
          font-size: 0.9375rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .pagination-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 12px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
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
          width: 2.75rem;
          height: 2.75rem;
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 12px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
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

        @media (max-width: 768px) {
          .hero-section {
            padding: 2.5rem 1.25rem;
          }

          .hero-section h1 {
            font-size: 2.25rem;
          }

          .hero-section p {
            font-size: 1.0625rem;
          }

          .ratings-content {
            padding: 1.25rem;
          }

          .controls-section {
            padding: 1.25rem;
          }

          .filters-row {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            min-width: auto;
          }

          .filter-container {
            min-width: auto;
          }

          .items-per-page {
            justify-content: space-between;
          }

          .stats-row {
            flex-direction: column;
            align-items: stretch;
          }

          .player-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RatingsPage;
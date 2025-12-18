import React, { useState, useEffect } from 'react';
import { getFederations, subscribeToFederations } from '../src/services/supabaseService';
import { useLocalization } from '../contexts/LocalizationContext';

interface Federation {
  id: string;
  country: string;
  name: string;
  president: string;
  secretary?: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  created_at: string;
  updated_at: string;
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
  'Togo': 'tg',
  'Rwanda': 'rw'
};

const FederationsPage: React.FC = () => {
  const { t } = useLocalization();
  const [federations, setFederations] = useState<Federation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFederation, setSelectedFederation] = useState<Federation | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch federations data from Supabase
  useEffect(() => {
    const fetchFederations = async () => {
      try {
        setLoading(true);
        const data = await getFederations();
        if (data && data.length > 0) {
          // Update Nigeria Scrabble Federation president name
          const updatedData = data.map(federation => {
            if (federation.country === 'Nigeria' && federation.name === 'Nigeria Scrabble Federation') {
              return {
                ...federation,
                president: 'Engr. Bright Idahosa'
              };
            }
            return federation;
          });
          setFederations(updatedData);
        } else {
          setError(t('federations.noData'));
        }
      } catch (err) {
        setError(t('federations.fetchError'));
        console.error('Error fetching federations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFederations();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToFederations(
      (updatedFederations) => {
        // Update Nigeria Scrabble Federation president name
        const updatedData = updatedFederations.map(federation => {
          if (federation.country === 'Nigeria' && federation.name === 'Nigeria Scrabble Federation') {
            return {
              ...federation,
              president: 'Engr. Bright Idahosa'
            };
          }
          return federation;
        });
        setFederations(updatedData);
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

  const filteredFederations = federations.filter(federation =>
    federation.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    federation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-400 bg-red-900/30 px-6 py-4 rounded-xl border border-red-700/50">
              <p className="font-bold text-lg mb-2">{t('error')}</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h1 className="font-orbitron text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
            {t('federations.title')}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-4xl mx-auto font-medium">
            {t('federations.subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-slate-700/40 shadow-xl">
          <div className="max-w-2xl mx-auto">
            <label className="block text-sm font-medium text-gray-300 mb-3">{t('federations.searchLabel')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={t('federations.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700/50 rounded-xl text-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 backdrop-blur-sm shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Federations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFederations.map((federation) => (
            <div
              key={federation.id}
              className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-6 hover:from-slate-800/60 hover:to-slate-700/60 transition-all duration-300 cursor-pointer border border-slate-700/40 hover:border-green-400/50 shadow-lg hover:shadow-xl group"
              onClick={() => setSelectedFederation(federation)}
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className="font-orbitron text-xl font-bold text-green-400 group-hover:text-cyan-400 transition-colors">
                  {federation.country}
                </h3>
                {countryFlags[federation.country] && (
                  <div className="relative">
                    <img
                      src={`https://flagcdn.com/w40/${countryFlags[federation.country]}.png`}
                      srcSet={`https://flagcdn.com/w80/${countryFlags[federation.country]}.png 2x`}
                      alt={`${federation.country} flag`}
                      className="w-10 h-7 object-cover rounded-md shadow-md border border-gray-600 group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
              </div>

              <h4 className="font-bold text-gray-200 mb-4 text-base group-hover:text-white transition-colors">
                {federation.name}
              </h4>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center group-hover:text-gray-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <span className="truncate font-medium">
                    {federation.country === 'Nigeria' && federation.name === 'Nigeria Scrabble Federation'
                      ? 'Engr. Bright Idahosa'
                      : federation.president}
                  </span>
                </div>
                <div className="flex items-center group-hover:text-gray-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <span className="truncate font-medium">{federation.email}</span>
                </div>
                <div className="flex items-center group-hover:text-gray-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-purple-400/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <span className="truncate font-medium">{federation.address}</span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-700/50">
                <button className="text-green-400 hover:text-cyan-400 text-sm font-bold transition-colors flex items-center gap-1 group">
                  {t('federations.viewDetails')}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 7l-8 8-4-4-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed view */}
        {selectedFederation && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50 shadow-2xl">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-7">
                  <div className="flex items-start gap-5">
                    {countryFlags[selectedFederation.country] && (
                      <div className="relative">
                        <img
                          src={`https://flagcdn.com/w80/${countryFlags[selectedFederation.country]}.png`}
                          srcSet={`https://flagcdn.com/w160/${countryFlags[selectedFederation.country]}.png 2x`}
                          alt={`${selectedFederation.country} flag`}
                          className="w-14 h-10 object-cover rounded-md shadow-md border border-gray-600"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-md bg-gradient-to-b from-white/20 to-transparent"></div>
                      </div>
                    )}
                    <div>
                      <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-green-400 mb-2">
                        {selectedFederation.country}
                      </h2>
                      <h3 className="text-xl sm:text-2xl text-gray-200 font-bold">{selectedFederation.name}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedFederation(null)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700/50"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="space-y-5">
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-4 text-lg">Contact Information</h4>
                      <div className="space-y-4">
                        <div className="flex items-center group">
                          <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm font-medium">President</p>
                            <p className="text-white font-bold text-lg">
                              {selectedFederation.country === 'Nigeria' && selectedFederation.name === 'Nigeria Scrabble Federation'
                                ? 'Engr. Bright Idahosa'
                                : selectedFederation.president}
                            </p>
                          </div>
                        </div>
                        {selectedFederation.secretary && (
                          <div className="flex items-center group">
                            <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                              <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm font-medium">Secretary</p>
                              <p className="text-white font-bold text-lg">{selectedFederation.secretary}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center group">
                          <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm font-medium">Email</p>
                            <a href={`mailto:${selectedFederation.email}`} className="text-cyan-400 hover:text-cyan-300 font-bold text-lg break-all transition-colors">
                              {selectedFederation.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center group">
                          <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm font-medium">Phone</p>
                            <a href={`tel:${selectedFederation.phone}`} className="text-cyan-400 hover:text-cyan-300 font-bold text-lg transition-colors">
                              {selectedFederation.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h4 className="font-bold text-cyan-400 mb-4 text-lg">Additional Details</h4>
                      <div className="space-y-4">
                        <div className="flex items-center group">
                          <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm font-medium">Address</p>
                            <p className="text-white font-bold text-lg">{selectedFederation.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center group">
                          <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm font-medium">Website</p>
                            <a href={selectedFederation.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-bold text-lg break-all transition-colors">
                              {selectedFederation.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row gap-4">
                  <a
                    href={`mailto:${selectedFederation.email}`}
                    className="flex-1 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-green-400 to-cyan-500 group-hover:from-green-400 group-hover:to-cyan-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
                  >
                    <span className="w-full relative px-5 py-3 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0 text-center">
                      Send Email
                    </span>
                  </a>
                  <a
                    href={selectedFederation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
                  >
                    <span className="w-full relative px-5 py-3 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0 text-center">
                      Visit Website
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredFederations.length === 0 && (
          <div className="text-center py-16 sm:py-20 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-300 mb-3">{t('federations.noFederations')}</h3>
              <p className="text-gray-500">
                {t('federations.checkBack')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FederationsPage;
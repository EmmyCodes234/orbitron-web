import React, { useState, useEffect } from 'react';
import { supabase } from '../src/supabaseClient';
import { getContactSubmissions } from '../src/services/supabaseService';
import AdminContactSubmissions from './AdminContactSubmissions';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'players' | 'events' | 'news' | 'federations' | 'contact'>('players');
  const [players, setPlayers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [federations, setFederations] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setError('Supabase client not available');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch players
        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select('*')
          .order('rating', { ascending: false });

        if (playersError) throw playersError;
        setPlayers(playersData || []);

        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });

        if (eventsError) throw eventsError;
        setEvents(eventsData || []);

        // Fetch news
        const { data: newsData, error: newsError } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (newsError) throw newsError;
        setNews(newsData || []);

        // Fetch federations
        const { data: federationsData, error: federationsError } = await supabase
          .from('federations')
          .select('*')
          .order('country', { ascending: true });

        if (federationsError) throw federationsError;
        setFederations(federationsData || []);

        // Fetch contact submissions using the service function
        const contactData = await getContactSubmissions();
        if (contactData) {
          setContactSubmissions(contactData);
        }
      } catch (err) {
        setError('Error fetching data: ' + (err as Error).message);
        console.error('Admin panel error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (table: string, id: string) => {
    if (!supabase) {
      setError('Supabase client not available');
      return;
    }

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh data
      if (table === 'players') {
        setPlayers(players.filter(item => item.id !== id));
      } else if (table === 'events') {
        setEvents(events.filter(item => item.id !== id));
      } else if (table === 'news') {
        setNews(news.filter(item => item.id !== id));
      } else if (table === 'federations') {
        setFederations(federations.filter(item => item.id !== id));
      } else if (table === 'contact_submissions') {
        setContactSubmissions(contactSubmissions.filter(item => item.id !== id));
      }
    } catch (err) {
      setError('Error deleting item: ' + (err as Error).message);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-700/50 shadow-2xl">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-7">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
              Admin Panel
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700/50"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-5 mb-7">
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-slate-700/50 mb-7">
            <nav className="flex flex-wrap gap-2 sm:gap-6">
              <button
                onClick={() => setActiveTab('players')}
                className={`py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'players'
                    ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-400/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                Players ({players.length})
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'events'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-400 border border-cyan-400/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                Events ({events.length})
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'news'
                    ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 border border-purple-400/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                News ({news.length})
              </button>
              <button
                onClick={() => setActiveTab('federations')}
                className={`py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'federations'
                    ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                Federations ({federations.length})
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-3 px-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'contact'
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-400/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                Contact ({contactSubmissions.length})
              </button>
            </nav>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-green-400"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {activeTab === 'players' && (
                <table className="min-w-full divide-y divide-slate-700/50">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Nick</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Country</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Games</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Last Played</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {players.map((player) => (
                      <tr key={player.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{player.nick}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{player.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{player.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-400">{player.rating}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{player.games}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{formatDate(player.last_played)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDelete('players', player.id)}
                            className="text-red-400 hover:text-red-300 font-bold px-3 py-1 rounded-lg hover:bg-red-900/30 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'events' && (
                <table className="min-w-full divide-y divide-slate-700/50">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white max-w-xs truncate">{event.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{formatDate(event.date)}</td>
                        <td className="px-6 py-4 text-sm text-white max-w-xs truncate">{event.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDelete('events', event.id)}
                            className="text-red-400 hover:text-red-300 font-bold px-3 py-1 rounded-lg hover:bg-red-900/30 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'news' && (
                <table className="min-w-full divide-y divide-slate-700/50">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Published</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {news.map((article) => (
                      <tr key={article.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white max-w-xs truncate">{article.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{article.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{formatDate(article.created_at)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {article.published ? (
                            <span className="px-3 py-1 text-xs font-bold bg-green-900/30 text-green-400 rounded-full">Published</span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-bold bg-yellow-900/30 text-yellow-400 rounded-full">Draft</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDelete('news', article.id)}
                            className="text-red-400 hover:text-red-300 font-bold px-3 py-1 rounded-lg hover:bg-red-900/30 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'federations' && (
                <table className="min-w-full divide-y divide-slate-700/50">
                  <thead>
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Country</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">President</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {federations.map((federation) => (
                      <tr key={federation.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{federation.country}</td>
                        <td className="px-6 py-4 text-sm text-white max-w-xs truncate">{federation.name}</td>
                        <td className="px-6 py-4 text-sm text-white">{federation.president}</td>
                        <td className="px-6 py-4 text-sm text-white max-w-xs truncate">{federation.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDelete('federations', federation.id)}
                            className="text-red-400 hover:text-red-300 font-bold px-3 py-1 rounded-lg hover:bg-red-900/30 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'contact' && (
                <AdminContactSubmissions />
              )}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-slate-600 to-slate-700 group-hover:from-slate-600 group-hover:to-slate-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-slate-200 dark:focus:ring-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-slate-500/30"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0">
                Close
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
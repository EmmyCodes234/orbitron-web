import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../components/AdminPanel';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simple authentication (in a real app, this would be proper authentication)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll use a simple check
    // In a real application, you would implement proper authentication
    if (username === 'admin' && password === 'panasa2025') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <h1 className="font-orbitron text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-red-500 to-orange-500 group-hover:from-red-500 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/30"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0">
                Logout
              </span>
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-7 sm:p-8 mb-10 border border-slate-700/40 shadow-xl">
            <p className="text-gray-300 mb-6 text-lg font-medium">
              Welcome to the PANASA Admin Dashboard. Here you can manage all content for the website.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-xl border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <h3 className="font-orbitron text-xl font-bold mb-3 text-green-400 group-hover:text-cyan-400 transition-colors">Players</h3>
                <p className="text-base">Manage player ratings and information</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <h3 className="font-orbitron text-xl font-bold mb-3 text-cyan-400 group-hover:text-purple-400 transition-colors">Events</h3>
                <p className="text-base">Manage upcoming events and tournaments</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <h3 className="font-orbitron text-xl font-bold mb-3 text-purple-400 group-hover:text-pink-400 transition-colors">News</h3>
                <p className="text-base">Manage news articles and announcements</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
                <h3 className="font-orbitron text-xl font-bold mb-3 text-yellow-400 group-hover:text-green-400 transition-colors">Federations</h3>
                <p className="text-base">Manage federation information</p>
              </div>
            </div>
          </div>
          
          <AdminPanel onClose={() => navigate('/')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-slate-700/40 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="font-orbitron text-3xl sm:text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
            Admin Login
          </h1>
          <p className="text-gray-400 text-lg">Access the PANASA Admin Dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-5 mb-7 text-center">
            <p className="text-red-300 font-medium">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-7">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2.5">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 bg-slate-800/80 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2.5">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 bg-slate-800/80 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-green-400 to-cyan-500 group-hover:from-green-400 group-hover:to-cyan-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
            >
              <span className="w-full relative px-5 py-3.5 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0 text-center">
                Login
              </span>
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Demo credentials: admin / panasa2025</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
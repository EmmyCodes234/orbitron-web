import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatbaseChatbot from '../components/ChatbaseChatbot';
import LanguageSelector from '../components/LanguageSelector'; 
import EnhancedSearch, { SearchSuggestion } from '../components/EnhancedSearch';
import { useLocalization } from '../contexts/LocalizationContext';

const ChatbotPage: React.FC = () => {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  // The state and logic for search are simplified here since the search component 
  // is often complex, but we retain the navigation logic.
  const handleSearch = (query: string) => {
    // Navigate to search results page or filter content
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false); // Close menu after search
  };

  const searchSuggestions: SearchSuggestion[] = [
    { id: '1', title: t('search.suggestions.players'), type: 'player', description: t('search.suggestions.playersDesc') },
    { id: '2', title: t('search.suggestions.events'), type: 'event', description: t('search.suggestions.eventsDesc') },
    { id: '3', title: t('search.suggestions.news'), type: 'news', description: t('search.suggestions.newsDesc') },
    { id: '4', title: t('search.suggestions.federations'), type: 'federation', description: t('search.suggestions.federationsDesc') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 flex flex-col">
      {/* Main Content Area - Removed overflow-hidden to allow mobile menu to display properly */}
      <main className="flex-grow flex flex-col">
        
        {/* CHATBOT HEADER */}
        <div className="border-b border-gray-700/50 bg-gray-800/80 backdrop-blur-sm py-3 px-4 sm:px-6 flex-shrink-0 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
            
            {/* Branding/Bot Info */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex-shrink-0">
                {/* Removed green background from logo */}
                <img src="/panasa-logo.png" alt="PANASA Logo" className="h-8 w-auto" />
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-100">PANASA Bot</h1>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Online"></div>
                </div>
                <p className="text-xs text-gray-400 hidden xs:block">WESPA Scrabble rules expert</p>
              </div>
            </div>
            
            {/* NAVIGATION CONTROLS - Desktop */}
            <div className="hidden md:flex items-center justify-end space-x-1 sm:space-x-2">
                <button 
                  onClick={() => setIsInfoVisible(!isInfoVisible)}
                  className="p-1.5 sm:p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                  aria-label={isInfoVisible ? "Hide information" : "Show information"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <LanguageSelector /> 
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={() => setIsInfoVisible(!isInfoVisible)}
                className="p-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                aria-label={isInfoVisible ? "Hide information" : "Show information"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <LanguageSelector />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white p-1.5 rounded-md hover:bg-slate-800/50 transition-all duration-300 touch-target"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-800/30 bg-slate-900/90 backdrop-blur-xl z-50">
            <div className="px-3 pt-3 pb-4 space-y-1 sm:px-4">
              <Link to="/" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>{t('navigation.home')}</Link>
              <Link to="/about" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>{t('navigation.about')}</Link>
              
              {/* Mobile Activity Dropdown */}
              <div className="space-y-1">
                <button 
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all flex justify-between items-center mobile-nav-item focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  onClick={() => setIsActivityDropdownOpen(!isActivityDropdownOpen)}
                  aria-expanded={isActivityDropdownOpen}
                >
                  <span>{t('navigation.activity')}</span>
                  <svg className={`w-4 h-4 transition-transform ${isActivityDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isActivityDropdownOpen && (
                  <div className="pl-6 space-y-1">
                    <Link to="/ratings" className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item focus:outline-none focus:bg-slate-700/70 focus:text-white" onClick={handleNavigation}>{t('navigation.ratings')}</Link>
                    <Link to="/news" className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item focus:outline-none focus:bg-slate-700/70 focus:text-white" onClick={handleNavigation}>{t('navigation.news')}</Link>
                    <Link to="/gallery" className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item focus:outline-none focus:bg-slate-700/70 focus:text-white" onClick={handleNavigation}>{t('navigation.gallery')}</Link>
                  </div>
                )}
              </div>
              
              {/* Mobile Support Dropdown */}
              <div className="space-y-1">
                <button 
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all flex justify-between items-center mobile-nav-item focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  onClick={() => setIsSupportDropdownOpen(!isSupportDropdownOpen)}
                  aria-expanded={isSupportDropdownOpen}
                >
                  <span>{t('navigation.support')}</span>
                  <svg className={`w-4 h-4 transition-transform ${isSupportDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isSupportDropdownOpen && (
                  <div className="pl-6 space-y-1">
                    <Link to="/federations" className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item focus:outline-none focus:bg-slate-700/70 focus:text-white" onClick={handleNavigation}>{t('navigation.federations')}</Link>
                    <Link to="/resources" className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item focus:outline-none focus:bg-slate-700/70 focus:text-white" onClick={handleNavigation}>{t('navigation.resources')}</Link>
                  </div>
                )}
              </div>
              
              <Link to="/contact" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>{t('navigation.contact')}</Link>
              <Link to="/payments" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>{t('navigation.payments')}</Link>
              <Link to="/chatbot" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>PANASA Bot</Link>
              
              {/* Mobile Search */}
              <div className="px-4 pt-2">
                <EnhancedSearch 
                  onSearch={handleSearch}
                  placeholder={t('search.mobilePlaceholder')}
                  suggestions={searchSuggestions}
                />
              </div>
            </div>
          </div>
        )}

        {/* Information Panel */}
        {isInfoVisible && (
          <div className="border-b border-gray-700/50 bg-gray-800/50 px-4 sm:px-6 py-3 flex-shrink-0">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-800/30 rounded-lg p-3 sm:p-4 border border-gray-700/50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <h3 className="text-sm font-medium text-gray-200">About PANASA Bot</h3>
                    <div className="mt-1 text-xs sm:text-sm text-gray-400">
                      <p>PANASA Bot is your expert assistant for WESPA Scrabble rules. Ask questions about gameplay, challenges, penalties, and more.</p>
                      <p className="mt-1">Responses reference WESPA Rules V5.1. Please verify important information.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat Content - SCROLLABLE Content Area */}
        <div className="flex-grow overflow-hidden">
          <div className="h-full max-w-6xl w-full mx-auto py-3 sm:py-4 px-3 sm:px-6">
            
            <div className="h-full bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm p-3 sm:p-5 md:p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
                <ChatbaseChatbot />
            </div>

          </div>
        </div>
        
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/30 bg-gray-900/50 backdrop-blur-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto py-2 sm:py-3 px-3 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-xs sm:text-sm">
            <p>&copy; 2025 Pan African Scrabble Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatbotPage;
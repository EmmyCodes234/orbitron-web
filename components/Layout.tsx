import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import EnhancedSearch, { SearchSuggestion } from './EnhancedSearch';
import LanguageSelector from './LanguageSelector';
import ParticleBackground from './ParticleBackground';
import { useLocalization } from '../contexts/LocalizationContext';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLocalization();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
  const [activityDropdownTimer, setActivityDropdownTimer] = useState<NodeJS.Timeout | null>(null);
  const [supportDropdownTimer, setSupportDropdownTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // Navigate to search results page or filter content
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const searchSuggestions: SearchSuggestion[] = [
    { id: '1', title: t('search.suggestions.players'), type: 'player', description: t('search.suggestions.playersDesc') },
    { id: '2', title: t('search.suggestions.events'), type: 'event', description: t('search.suggestions.eventsDesc') },
    { id: '3', title: t('search.suggestions.news'), type: 'news', description: t('search.suggestions.newsDesc') },
    { id: '4', title: t('search.suggestions.federations'), type: 'federation', description: t('search.suggestions.federationsDesc') },
  ];

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-gray-100 flex flex-col overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Particle background - star theme for mobile, default for desktop */}
      <div className="md:hidden">
        <ParticleBackground isMobile={true} />
      </div>
      <div className="hidden md:block">
        <ParticleBackground isMobile={false} />
      </div>
      
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group" onClick={handleNavigation}>
                <div className="relative">
                  <img src="/panasa-logo.png" alt="PANASA Logo" className="h-9 w-auto transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-full bg-green-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="font-orbitron text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 hidden sm:block tracking-wider">
                  PANASA
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 ml-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-all px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800/50 relative group">
                {t('navigation.home')}
                <span className="absolute bottom-1.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-200 group-hover:w-1/2 group-hover:left-1/4"></span>
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-all px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800/50 relative group">
                {t('navigation.about')}
                <span className="absolute bottom-1.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-200 group-hover:w-1/2 group-hover:left-1/4"></span>
              </Link>
              
              {/* Activity Dropdown */}
              <div className="relative group">
                <button 
                  onMouseEnter={() => {
                    if (activityDropdownTimer) {
                      clearTimeout(activityDropdownTimer);
                      setActivityDropdownTimer(null);
                    }
                    setIsActivityDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    const timer = setTimeout(() => {
                      setIsActivityDropdownOpen(false);
                    }, 150); // Reduced delay for better responsiveness
                    setActivityDropdownTimer(timer);
                  }}
                  className="text-gray-300 hover:text-white transition-all px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800/50 relative flex items-center touch-target focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  aria-haspopup="true"
                  aria-expanded={isActivityDropdownOpen}
                >
                  {t('navigation.activity')}
                  <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isActivityDropdownOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-48 rounded-lg bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl z-50"
                    onMouseEnter={() => {
                      if (activityDropdownTimer) {
                        clearTimeout(activityDropdownTimer);
                        setActivityDropdownTimer(null);
                      }
                    }}
                    onMouseLeave={() => {
                      const timer = setTimeout(() => {
                        setIsActivityDropdownOpen(false);
                      }, 150); // Reduced delay for better responsiveness
                      setActivityDropdownTimer(timer);
                    }}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="activity-menu"
                  >
                    <Link to="/ratings" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-t-md transition-colors touch-target focus:outline-none focus:bg-slate-700/70 focus:text-white" role="menuitem">
                      {t('navigation.ratings')}
                    </Link>
                    <Link to="/news" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors touch-target focus:outline-none focus:bg-slate-700/70 focus:text-white" role="menuitem">
                      {t('navigation.news')}
                    </Link>
                    <Link to="/gallery" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-b-md transition-colors touch-target focus:outline-none focus:bg-slate-700/70 focus:text-white" role="menuitem">
                      {t('navigation.gallery')}
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Support Dropdown */}
              <div className="relative group">
                <button 
                  onMouseEnter={() => {
                    if (supportDropdownTimer) {
                      clearTimeout(supportDropdownTimer);
                      setSupportDropdownTimer(null);
                    }
                    setIsSupportDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    const timer = setTimeout(() => {
                      setIsSupportDropdownOpen(false);
                    }, 150); // Reduced delay for better responsiveness
                    setSupportDropdownTimer(timer);
                  }}
                  className="text-gray-300 hover:text-white transition-all px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800/50 relative flex items-center touch-target focus:outline-none focus:ring-2 focus:ring-green-400/50"
                  aria-haspopup="true"
                  aria-expanded={isSupportDropdownOpen}
                >
                  {t('navigation.support')}
                  <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isSupportDropdownOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-48 rounded-lg bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl z-50"
                    onMouseEnter={() => {
                      if (supportDropdownTimer) {
                        clearTimeout(supportDropdownTimer);
                        setSupportDropdownTimer(null);
                      }
                    }}
                    onMouseLeave={() => {
                      const timer = setTimeout(() => {
                        setIsSupportDropdownOpen(false);
                      }, 150); // Reduced delay for better responsiveness
                      setSupportDropdownTimer(timer);
                    }}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="support-menu"
                  >
                    <Link to="/federations" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-t-md transition-colors touch-target focus:outline-none focus:bg-slate-700/70 focus:text-white" role="menuitem">
                      {t('navigation.federations')}
                    </Link>
                    <Link to="/resources" className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-b-md transition-colors touch-target focus:outline-none focus:bg-slate-700/70 focus:text-white" role="menuitem">
                      {t('navigation.resources')}
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/contact" className="text-gray-300 hover:text-white transition-all px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800/50 relative group touch-target">
                {t('navigation.contact')}
                <span className="absolute bottom-1.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-200 group-hover:w-1/2 group-hover:left-1/4"></span>
              </Link>
              <Link to="/payments" className="text-gray-300 hover:text-white transition-all px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800/50 relative group touch-target">
                {t('navigation.payments')}
                <span className="absolute bottom-1.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-200 group-hover:w-1/2 group-hover:left-1/4"></span>
              </Link>
              <Link to="/chatbot" className="text-gray-300 hover:text-white transition-all px-3 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800/50 relative group touch-target">
                {t('navigation.chatbot')}
                <span className="absolute bottom-1.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-200 group-hover:w-1/2 group-hover:left-1/4"></span>
              </Link>
            </nav>

            {/* Search Bar and Language Selector */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageSelector />
              <div className="w-52">
                <EnhancedSearch 
                  onSearch={handleSearch}
                  placeholder={t('search.placeholder')}
                  suggestions={searchSuggestions}
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
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
          <div className="md:hidden border-t border-slate-800/30 bg-slate-900/90 backdrop-blur-xl">
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
              <Link to="/chatbot" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>{t('navigation.chatbot')}</Link>
              
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
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children ? children : <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-slate-800/30 mt-20 backdrop-blur-xl"> {/* Pitch-black background as per user preference */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <img src="/panasa-logo.png" alt="PANASA Logo" className="h-12 w-auto" />
                  <div className="absolute inset-0 rounded-full bg-green-400/20 blur-md"></div>
                </div>
                <span className="font-orbitron text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 tracking-wider">
                  PANASA
                </span>
              </div>
              <p className="mt-4 text-white max-w-md leading-relaxed"> {/* Bright white text as per user preference */}
                {t('footer.description')}
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="https://x.com/PANASAScrabble?s=09" className="text-gray-400 hover:text-white transition-colors" aria-label="X" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">X</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100092468916534" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/panafricanscrabbleassociation?igsh=aXc4azRvZzZzYXFw" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.63c-2.43 0-2.784-.012-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.012-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@panafricanscrabble?_t=ZS-90VqsmaHCRL&_r=1" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">TikTok</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6"> {/* Bright white text as per user preference */}
                {t('footer.navigation')}
              </h3>
              <ul className="space-y-4">
                <li><Link to="/" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.home')}</Link></li>
                <li><Link to="/about" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.about')}</Link></li>
                <li><Link to="/ratings" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.ratings')}</Link></li>
                <li><Link to="/news" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.news')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6"> {/* Bright white text as per user preference */}
                {t('footer.connect')}
              </h3>
              <ul className="space-y-4">
                <li><Link to="/federations" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.federations')}</Link></li>
                <li><Link to="/resources" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.resources')}</Link></li>
                <li><Link to="/gallery" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.gallery')}</Link></li>
                <li><Link to="/contact" className="text-base text-gray-400 hover:text-white transition-colors" onClick={handleNavigation}>{t('navigation.contact')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800/30 pt-8">
            <p className="text-base text-white text-center"> {/* Bright white text as per user preference */}
              &copy; 2025 {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
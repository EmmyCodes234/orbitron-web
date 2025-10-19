import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EnhancedSearch, { SearchSuggestion } from './EnhancedSearch'; // Assuming location
import { useLocalization } from '../contexts/LocalizationContext';

interface MobileNavigationProps {
    // Optional prop to handle special styling or behavior if needed on the Chatbot page
    isChatbotPage?: boolean; 
}

const MobileNavigation: React.FC<MobileNavigationProps> = () => {
    const { t } = useLocalization();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState(false);
    const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);
    const navigate = useNavigate();

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

    // Close mobile menu when navigating
    const handleNavigation = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="md:hidden">
            {/* 1. Mobile menu button (Hamburger/Close Icon) */}
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

            {/* 2. Mobile Navigation Content (The slide-out menu) */}
            {/* Fixed position ensures it covers the whole screen when open, regardless of scroll */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 top-16 border-t border-slate-800/30 bg-slate-900/95 backdrop-blur-xl z-50 overflow-y-auto"
                    // The top-16 ensures it sits just below the main header (h-16)
                    // Increased z-index to 50 to ensure it appears above other elements
                    style={{ zIndex: 9999 }} // Ensure highest z-index to override any other styles
                >
                    <div className="px-3 pt-3 pb-4 space-y-1 sm:px-4">
                        <Link to="/" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>{t('navigation.home')}</Link>
                        <Link to="/about" className="block px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all mobile-nav-item" onClick={handleNavigation}>{t('navigation.about')}</Link>
                        
                        {/* Mobile Activity Dropdown (Logic retained from Layout.tsx) */}
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
                        
                        {/* Mobile Support Dropdown (Logic retained from Layout.tsx) */}
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
        </div>
    );
};

export default MobileNavigation;
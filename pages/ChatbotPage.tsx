import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RagChatbot from '../components/RagChatbot';
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
    <div className="h-screen bg-[#0f1117] text-gray-100 flex flex-col overflow-hidden relative selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Abstract Background Elements (Subtle Gemini-like Glows) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative z-10 h-full overflow-hidden">

        {/* Minimal Header - Floating/Transparent */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-start pointer-events-none">
          {/* Logo - Minimal */}
          <div className="pointer-events-auto">
            {/* Logo + Subtle Title */}
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md border border-white/5 rounded-full px-4 py-2 hover:bg-black/40 transition-all cursor-pointer group" onClick={() => setIsInfoVisible(!isInfoVisible)}>
              <img src="/panasa-logo.png" alt="PANASA" className="h-6 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">PANASA Bot</span>
            </div>
          </div>

          {/* Controls - Minimal Pill */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <Link to="/tools" className="flex items-center justify-center p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-gray-400 hover:text-white hover:bg-black/40 transition-all" title="Back to Tools">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </Link>
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Information Panel - Overlay Modal Style */}
        {isInfoVisible && (
          <div className="absolute top-20 left-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="bg-[#1a1d26]/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1 bg-green-500/20 rounded-full">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white mb-1">WESPA Rules V5.1 Expert</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This AI arbiter is trained on the official WESPA rulebook. It provides precise rulings for competitive Scrabble play.
                  </p>
                </div>
                <button onClick={() => setIsInfoVisible(false)} className="text-gray-500 hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface - Full Screen Canvas */}
        <div className="w-full h-full flex flex-col relative">
          <RagChatbot />
        </div>

      </main>
    </div>
  );
};

export default ChatbotPage;
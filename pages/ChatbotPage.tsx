import React from 'react';
import { Link } from 'react-router-dom';
import ChatbaseChatbot from '../components/ChatbaseChatbot';

// --- IMPORT THE REAL, FUNCTIONAL COMPONENTS ---
// Assuming LanguageSelector is at: ../components/LanguageSelector
import LanguageSelector from '../components/LanguageSelector'; 
// Assuming MobileNavigation is the new component created from Layout.tsx
import MobileNavigation from '../components/MobileNavigation'; 
// ----------------------------------------------


const ChatbotPage: React.FC = () => {
  return (

    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Main Content - Improved ChatGPT-like Interface */}
      <main className="flex-grow flex flex-col">
        {/* Chat Header - Enhanced Design with logo restored */}
        <div className="border-b border-gray-700/50 bg-gray-800 py-3 px-4 sm:py-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                <img src="/panasa-logo.png" alt="PANASA Logo" className="h-8 sm:h-10 w-auto" />
                
    // Outer container: Full height, flex column
    <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col overflow-hidden">
        
        {/* CHATBOT HEADER (Now includes main site navigation) */}
        <div className="border-b border-gray-700/50 bg-gray-800 py-4 px-4 sm:px-6 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            {/* Branding/Bot Info */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                <img src="/panasa-logo.png" alt="PANASA Logo" className="h-10 w-auto" />

              </div>
              
              <div>

                <h1 className="text-base sm:text-lg font-semibold">PANASA Bot</h1>
                <p className="text-xs text-gray-400">WESPA rules expert</p>
              </div>
            </div>
            {/* Online Status Indicator - Better positioned for mobile */}
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500 ml-2">Online</span>
              </div>

                {/* Status dot integrated with the title */}
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-semibold">PANASA Bot</h1>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" title="Online"></div>
                </div>
                
                <p className="text-sm text-gray-400">WESPA Scrabble rules expert</p>
              </div>
            </div>
            
            {/* NAVIGATION CONTROLS (Using imported functional components) */}
            <div className="flex items-center justify-end">
                {/* 1. Language Selector (Functional) */}
                <LanguageSelector /> 
                
                {/* 2. Hamburger Menu (Functional, renders the MobileNavigation) */}
                {/* We rely on the MobileNavigation component to render the button and the menu itself */}
                <MobileNavigation isChatbotPage={true} />

            </div>

          </div>
        </div>


        {/* Chat Container */}
        <div className="flex-grow flex flex-col">
          <div className="max-w-4xl w-full mx-auto flex-grow py-3 sm:py-4 px-2 sm:px-4">
            <div className="h-full bg-gray-900/30 rounded-2xl border border-gray-700/50 overflow-hidden flex flex-col">
              <ChatbaseChatbot />

        {/* Chat Content - SCROLLABLE Content Area */}
        <div className="flex-grow overflow-y-auto">
          <div className="max-w-4xl w-full mx-auto py-4 sm:py-6 px-4 sm:px-6">
            
            <div className="bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700/50">
                <ChatbaseChatbot />

            </div>

          </div>
        </div>
        
      </main>

      {/* Footer (Remains minimal) */}
      <footer className="border-t border-gray-800/30 flex-shrink-0">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 Pan African Scrabble Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatbotPage;

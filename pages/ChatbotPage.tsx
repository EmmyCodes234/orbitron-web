import React from 'react';
import { Link } from 'react-router-dom';
import ChatbaseChatbot from '../components/ChatbaseChatbot';
import LanguageSelector from '../components/LanguageSelector'; 
import MobileNavigation from '../components/MobileNavigation'; 

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col overflow-hidden">
        
        {/* CHATBOT HEADER */}
        <div className="border-b border-gray-700/50 bg-gray-800 py-4 px-4 sm:px-6 flex-shrink-0">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            {/* Branding/Bot Info */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0">
                <img src="/panasa-logo.png" alt="PANASA Logo" className="h-10 w-auto" />
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-semibold">PANASA Bot</h1>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" title="Online"></div>
                </div>
                <p className="text-sm text-gray-400">WESPA Scrabble rules expert</p>
              </div>
            </div>
            
            {/* NAVIGATION CONTROLS */}
            <div className="flex items-center justify-end">
                <LanguageSelector /> 
                <MobileNavigation isChatbotPage={true} />
            </div>

          </div>
        </div>

        {/* Chat Content - SCROLLABLE Content Area */}
        <div className="flex-grow overflow-y-auto">
          <div className="max-w-4xl w-full mx-auto py-4 sm:py-6 px-4 sm:px-6">
            
            <div className="h-full bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700/50">
                <ChatbaseChatbot />
            </div>

          </div>
        </div>
        
      </main>

      {/* Footer */}
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
import React from 'react';
import { Link } from 'react-router-dom';
import ChatbaseChatbot from '../components/ChatbaseChatbot';

const ChatbotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Main Content - Improved ChatGPT-like Interface */}
      <main className="flex-grow flex flex-col">
        {/* Chat Header - Enhanced Design without logo */}
        <div className="border-b border-gray-700/50 bg-gray-800 py-3 px-4 sm:py-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div>
                <h1 className="text-base sm:text-lg font-semibold">PANASA Bot</h1>
                <p className="text-xs text-gray-400">WESPA Scrabble rules expert</p>
              </div>
            </div>
            {/* Online Status Indicator - Better positioned for mobile */}
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500 ml-2">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-grow flex flex-col">
          <div className="max-w-4xl w-full mx-auto flex-grow py-3 sm:py-4 px-2 sm:px-4">
            <div className="h-full bg-gray-900/30 rounded-2xl border border-gray-700/50 overflow-hidden flex flex-col">
              <ChatbaseChatbot />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2025 Pan African Scrabble Association. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatbotPage;
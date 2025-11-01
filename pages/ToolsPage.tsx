import React, { useState, useEffect } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import { Link } from 'react-router-dom';

const ToolsPage: React.FC = () => {
  const { t } = useLocalization();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 sm:mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 tracking-tight animate-fade-in">
            {t('tools.title')}
          </h1>
          
          <p className="text-gray-300 text-center max-w-3xl mx-auto text-base sm:text-lg md:text-xl mb-12 sm:mb-16 md:mb-20 px-4">
            Professional Scrabble tools to enhance your gameplay, validate words, and solve anagrams with fast performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* PANASA Bot Card */}
          <div className={`md:col-span-2 lg:col-span-3 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700/50 shadow-2xl hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-500 hover:-translate-y-2 hover:border-green-500/40 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
              <div className="flex-shrink-0 relative">
                <div className="bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-lg shadow-green-500/20 relative overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)]"></div>
                  {/* PANASA Logo from public folder */}
                  <img 
                    src="/panasa-logo.png" 
                    alt="PANASA Logo" 
                    className="w-16 h-16 md:w-20 md:h-20 relative z-10 object-contain"
                  />
                  {/* Animated pulse effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400 to-cyan-400 opacity-0 animate-pulse animation-delay-1000"></div>
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-slate-900">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-center lg:text-left flex-grow">
                <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                    PANASA Bot
                  </h2>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-medium">AI</span>
                </div>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-5 md:mb-6 max-w-2xl">
                  Your expert assistant for all official Scrabble rules and regulations. Get instant answers to rule questions and ensure fair play in your games.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link 
                    to="/chatbot" 
                    className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl hover:from-green-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5 text-base sm:text-lg"
                  >
                    {t('tools.panasaBot.launch')}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                  <button className="inline-flex items-center justify-center bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 font-medium py-3 px-6 md:py-4 md:px-8 rounded-xl border border-slate-700/50 transition-all duration-300 text-base sm:text-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            {/* Feature highlights */}
            <div className="mt-8 pt-6 border-t border-slate-700/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">24/7 Availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Rules Expert</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Instant Answers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Fair Play</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Word Checker Card */}
          <div className={`bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700/50 shadow-2xl hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-all duration-500 hover:-translate-y-2 hover:border-green-500/40 flex flex-col ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <div className="flex-grow">
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl w-16 h-16 flex items-center justify-center mb-5 shadow-md shadow-green-500/10">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-3">
                Word Checker
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                {t('tools.wordChecker.cardDescription')}
              </p>
              <div className="mt-4 flex items-center text-xs text-cyan-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>Fast results</span>
              </div>
            </div>
            <Link 
              to="/tools/word-checker" 
              className="mt-6 inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-5 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-sm sm:text-base text-center shadow-md hover:shadow-green-500/20 transform hover:-translate-y-0.5"
            >
              {t('tools.wordChecker.launch')}
            </Link>
          </div>
          
          {/* Anagram Solver Card */}
          <div className={`bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700/50 shadow-2xl hover:shadow-[0_0_30px_rgba(103,232,249,0.15)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 flex flex-col ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
            <div className="flex-grow">
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl w-16 h-16 flex items-center justify-center mb-5 shadow-md shadow-cyan-500/10">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-3">
                Anagram Solver
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                {t('tools.anagramSolver.cardDescription')}
              </p>
              <p className="text-gray-400 text-xs italic mt-2">
                {t('tools.anagramSolver.blankTileHint')}
              </p>
              <div className="mt-4 flex items-center text-xs text-cyan-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>Fast results</span>
              </div>
            </div>
            <Link 
              to="/tools/anagram-solver" 
              className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-5 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm sm:text-base text-center shadow-md hover:shadow-cyan-500/20 transform hover:-translate-y-0.5"
            >
              {t('tools.anagramSolver.launch')}
            </Link>
          </div>
          
          {/* Dictionary Information Card */}
          <div className={`bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700/50 shadow-2xl hover:shadow-[0_0_30px_rgba(192,132,252,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex-grow">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl w-16 h-16 flex items-center justify-center mb-5 shadow-md shadow-purple-500/10">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mb-3">
                {t('tools.dictionary.title')}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                {t('tools.dictionary.description')}
              </p>
            </div>
            <div className="mt-6 text-xs sm:text-sm text-gray-400">
              <p className="font-medium">{t('tools.dictionary.poweredBy')}</p>
            </div>
          </div>
        </div>
        
        {/* Additional Information Section */}
        <div className={`mt-12 sm:mt-16 md:mt-20 bg-gradient-to-r from-slate-900/60 to-slate-800/60 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700/40 shadow-xl ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Professional Scrabble Tools for Every Player
            </h3>
            <p className="text-gray-300 text-base sm:text-lg mb-6">
              Our tools are designed to help players of all skill levels improve their game. Whether you're a beginner learning the rules or a seasoned competitor preparing for tournaments, our suite of tools provides the resources you need to succeed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/30">
                <div className="text-cyan-400 font-bold mb-2">Offline Support</div>
                <p className="text-gray-400 text-sm">Works without internet connection</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/30">
                <div className="text-green-400 font-bold mb-2">Fast Results</div>
                <p className="text-gray-400 text-sm">Instant results with optimized algorithms</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/30">
                <div className="text-purple-400 font-bold mb-2">Always Updated</div>
                <p className="text-gray-400 text-sm">Latest CSW24 dictionary included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default ToolsPage;
import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

const ResourcesPage: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-orbitron text-3xl sm:text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
            {t('resources.title')}
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto font-medium">
            {t('resources.subtitle')}
          </p>
        </div>

        {/* Under Construction Message */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center border border-yellow-400/40 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg"></div>
              </div>
            </div>
            <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-yellow-400 mb-5">{t('resources.underConstruction')}</h2>
            <p className="text-gray-300 mb-6 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              {t('resources.comingSoon')}
            </p>
            <p className="text-gray-400 text-base sm:text-lg">
              {t('resources.checkBack')}
            </p>
            <div className="mt-8 flex justify-center">
              <div className="animate-pulse flex space-x-3">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 sm:p-7 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-green-400 mb-3 group-hover:text-cyan-400 transition-colors">{t('resources.officialRules')}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t('resources.rulesDescription')}</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 sm:p-7 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v7h3v-7h1v7h3z"/>
                </svg>
              </div>
              <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-cyan-400 mb-3 group-hover:text-purple-400 transition-colors">{t('resources.trainingMaterials')}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t('resources.trainingDescription')}</p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 sm:p-7 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-purple-400 mb-3 group-hover:text-pink-400 transition-colors">{t('resources.wordLists')}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{t('resources.wordListsDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
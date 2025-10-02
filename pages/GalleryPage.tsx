import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

// Mock gallery data - replace with real images later
const mockGalleryItems = [
  {
    id: 1,
    title: 'PANASA Championship 2024',
    category: 'tournaments',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop',
    description: 'The grand finale of the 2024 PANASA Championship held in Lagos, Nigeria.'
  },
  {
    id: 2,
    title: 'Youth Scrabble Workshop',
    category: 'workshops',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=300&fit=crop',
    description: 'Young players learning advanced Scrabble strategies in Accra, Ghana.'
  },
  {
    id: 3,
    title: 'Continental Masters Cup',
    category: 'tournaments',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    description: 'Top players from across Africa competing in the Masters Cup.'
  },
  {
    id: 4,
    title: 'Training Session in Nairobi',
    category: 'workshops',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    description: 'Intensive training session for Kenyan national team players.'
  },
  {
    id: 5,
    title: 'Awards Ceremony',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    description: 'Celebrating excellence at the annual PANASA awards ceremony.'
  },
  {
    id: 6,
    title: 'Community Outreach',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
    description: 'Bringing Scrabble to local communities across Africa.'
  },
  {
    id: 7,
    title: 'International Championship',
    category: 'tournaments',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    description: 'African representatives at the World Scrabble Championship.'
  },
  {
    id: 8,
    title: 'Junior Development Program',
    category: 'workshops',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    description: 'Nurturing the next generation of Scrabble champions.'
  },
];

const categories = ['all', 'tournaments', 'workshops', 'events'];

const GalleryPage: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="font-orbitron text-3xl sm:text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
            {t('gallery.title')}
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto font-medium">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Under Construction Message */}
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto text-center border border-yellow-400/40 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg"></div>
            </div>
          </div>
          <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-yellow-400 mb-5">{t('gallery.underConstruction')}</h2>
          <p className="text-gray-300 mb-6 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            {t('gallery.comingSoon')}
          </p>
          <p className="text-gray-400 text-base sm:text-lg">
            {t('gallery.checkBack')}
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
        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 sm:p-7 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-green-400 mb-3 group-hover:text-cyan-400 transition-colors">{t('gallery.tournamentHighlights')}</h3>
            <p className="text-gray-400 text-sm sm:text-base">{t('gallery.tournamentDescription')}</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 sm:p-7 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v7h3v-7h1v7h3z"/>
              </svg>
            </div>
            <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-cyan-400 mb-3 group-hover:text-purple-400 transition-colors">{t('gallery.communityEvents')}</h3>
            <p className="text-gray-400 text-sm sm:text-base">{t('gallery.communityDescription')}</p>
          </div>
          
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 sm:p-7 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-purple-400 mb-3 group-hover:text-pink-400 transition-colors">{t('gallery.playerSpotlights')}</h3>
            <p className="text-gray-400 text-sm sm:text-base">{t('gallery.playerDescription')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
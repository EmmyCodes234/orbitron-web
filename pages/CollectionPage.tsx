import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';
// Import image data from GalleryPage
import { 
  kpalimeImages, 
  ugTrophyTourImages, 
  presidentsCupImages, 
  kenyaTrophyTourImages, 
  liberiaTrophyTourImages,
  pressConferenceTogoImages
} from './GalleryPage';

type CollectionType = 'kpalime' | 'uganda' | 'presidentsCup' | 'kenya' | 'liberia' | 'pressConference' | 'all';

interface CollectionInfo {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const collectionData: Record<CollectionType, CollectionInfo> = {
  all: {
    title: 'All Collections',
    description: 'Browse all PANASA events and tournaments from across the African continent.',
    images: [...kpalimeImages, ...ugTrophyTourImages, ...presidentsCupImages, ...kenyaTrophyTourImages, ...liberiaTrophyTourImages, ...pressConferenceTogoImages]
      .filter(img => img.src && img.src.trim() !== ''), // Filter out empty src values
    bgColor: 'from-cyan-500/20 to-cyan-600/20',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-400/30'
  },
  kpalime: {
    title: 'AYSC 2025 Trophy Tour - Kpalime',
    description: 'Visit and coaching clinic in Kpalime, Togo as part of the AYSC 2025 Trophy Tour.',
    images: kpalimeImages.filter(img => img.src && img.src.trim() !== ''),
    bgColor: 'from-green-500/20 to-green-600/20',
    textColor: 'text-green-400',
    borderColor: 'border-green-400/30'
  },
  uganda: {
    title: 'AYSC 2025 Trophy Tour - Uganda',
    description: 'Trophy presentation tour across Uganda as part of the AYSC 2025 Trophy Tour.',
    images: ugTrophyTourImages.filter(img => img.src && img.src.trim() !== ''),
    bgColor: 'from-purple-500/20 to-purple-600/20',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-400/30'
  },
  presidentsCup: {
    title: 'President\'s Cup 2025 - Triumvirate Showdown',
    description: 'Biennial President\'s Cup championship event held at the Trademark Hotel, Nairobi, Kenya, featuring top players from across Africa in the Triumvirate Showdown.',
    images: presidentsCupImages.filter(img => img.src && img.src.trim() !== ''),
    bgColor: 'from-yellow-500/20 to-yellow-600/20',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-400/30'
  },
  kenya: {
    title: 'AYSC Trophy Tour - Kenya',
    description: 'Trophy presentation tour across Kenya celebrating Scrabble champions and promoting the game.',
    images: kenyaTrophyTourImages.filter(img => img.src && img.src.trim() !== ''),
    bgColor: 'from-red-500/20 to-red-600/20',
    textColor: 'text-red-400',
    borderColor: 'border-red-400/30'
  },
  liberia: {
    title: 'AYSC Trophy Tour - Liberia',
    description: 'Trophy presentation tour in Liberia as part of the AYSC 2025 Trophy Tour series.',
    images: liberiaTrophyTourImages.filter(img => img.src && img.src.trim() !== ''),
    bgColor: 'from-blue-500/20 to-blue-600/20',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-400/30'
  },
  pressConference: {
    title: 'AYSC Trophy Tour Press Conference - Togo',
    description: 'Press conference at the American Corner, University of Lome, Togo as part of the AYSC 2025 Trophy Tour.',
    images: pressConferenceTogoImages.filter(img => img.src && img.src.trim() !== ''),
    bgColor: 'from-indigo-500/20 to-indigo-600/20',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-400/30'
  }
};

const CollectionPage: React.FC = () => {
  const { t } = useLocalization();
  const navigate = useNavigate();
  const { collectionId } = useParams<{ collectionId: CollectionType }>();
  const collection = collectionData[(collectionId as CollectionType) || 'all'];

  // Bento grid item sizes for variety
  const getBentoClass = (index: number) => {
    const sizes = [
      'md:col-span-2 md:row-span-2', // Large square
      'md:col-span-1 md:row-span-1', // Small square
      'md:col-span-2 md:row-span-1', // Wide rectangle
      'md:col-span-1 md:row-span-2', // Tall rectangle
    ];
    return sizes[index % sizes.length];
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              navigate('/gallery');
            }}
            className="flex items-center text-cyan-400 hover:text-cyan-300 mb-4 transition-colors font-medium z-50 relative cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </button>
          
          <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500">
            {collection.title}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto font-medium">
            {collection.description}
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {collection.images
            .filter(image => image.src && image.src.trim() !== '')
            .map((image, index) => (
              <div 
                key={index}
                className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${collection.bgColor} backdrop-blur-sm border ${collection.borderColor} hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-xl ${getBentoClass(index)}`}
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium text-sm sm:text-base truncate">
                    {image.alt}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
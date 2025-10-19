import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

// Define resource types
interface Resource {
  id: number;
  title: string;
  description: string;
  fileSize: string;
  lastUpdated: string;
  url: string;
  type: 'pdf' | 'docx' | 'link';
  category: 'officialRules' | 'wordLists' | 'tournamentResources' | 'toolsForTDs';
}

const ResourcesPage: React.FC = () => {
  const { t } = useLocalization();

  // Define resources with proper categories
  const resources: Resource[] = [
    {
      id: 1,
      title: 'How to Become a Member of PANASA',
      description: 'Complete guide on the membership process for individuals and federations.',
      fileSize: '14.2 KB',
      lastUpdated: '2025-01-15',
      url: '/How to become a member of PANASA.docx',
      type: 'docx',
      category: 'officialRules'
    },
    {
      id: 2,
      title: 'PANASA Bylaws',
      description: 'Official bylaws and regulations governing the Pan African Scrabble Association.',
      fileSize: '0.1 KB',
      lastUpdated: '2025-01-10',
      url: '/panasa-bylaws.docx',
      type: 'docx',
      category: 'officialRules'
    },
    {
      id: 3,
      title: 'Membership Information',
      description: 'Detailed information about membership benefits and requirements.',
      fileSize: '76.6 KB',
      lastUpdated: '2025-01-05',
      url: '/membership.pdf',
      type: 'pdf',
      category: 'officialRules'
    },
    {
      id: 4,
      title: 'Tournament Organizer Guide',
      description: 'Comprehensive guide for organizing PANASA-sanctioned tournaments.',
      fileSize: '127.9 KB',
      lastUpdated: '2025-01-20',
      url: '/torganizer.pdf',
      type: 'pdf',
      category: 'tournamentResources'
    },
    {
      id: 5,
      title: 'PANASA Results Slip Template',
      description: 'Official template for recording and submitting tournament results.',
      fileSize: '192.8 KB',
      lastUpdated: '2025-01-18',
      url: '/panresultslip.pdf',
      type: 'pdf',
      category: 'tournamentResources'
    },
    {
      id: 6,
      title: '10,000 Probability Study',
      description: 'Statistical analysis of high-probability word formations in Scrabble.',
      fileSize: '798.8 KB',
      lastUpdated: '2025-01-12',
      url: '/10000probability.pdf',
      type: 'pdf',
      category: 'wordLists'
    },
    // New Tools for TDs category
    {
      id: 7,
      title: 'TSH: Tournament Shell',
      description: 'Scrabble tournament management software by John Chew. Used by Scrabble tournament directors to keep track of their players; decide who is playing whom, where and when; enter results of games; report on standings, statistics and prizes; adjudicate word challenges; maintain event websites, and submit results to rating authorities.',
      fileSize: '',
      lastUpdated: '',
      url: 'https://www.poslarchive.com/tsh/',
      type: 'link',
      category: 'toolsForTDs'
    },
    {
      id: 8,
      title: 'AuPair',
      description: 'A Scrabble tournament manager software by Barry Harridge.',
      fileSize: '',
      lastUpdated: '',
      url: 'https://www.scrabble.org.au/resources/software.htm',
      type: 'link',
      category: 'toolsForTDs'
    },
    {
      id: 9,
      title: 'Direktor',
      description: 'A next-generation, web-based platform designed to revolutionize Scrabble tournament management. Built on the core principle of Guided Workflow, it transforms the director\'s role from a technical operator into a true manager by providing context-aware assistance throughout the tournament lifecycle.',
      fileSize: '',
      lastUpdated: '',
      url: 'https://direktorapp.netlify.app',
      type: 'link',
      category: 'toolsForTDs'
    }
  ];

  // Get icon based on file type
  const getFileIcon = (type: 'pdf' | 'docx' | 'link') => {
    if (type === 'pdf') {
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        </div>
      );
    } else if (type === 'docx') {
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
        </div>
      );
    } else {
      // Link icon
      return (
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        </div>
      );
    }
  };

  // Define categories with their properties
  const categories = [
    {
      id: 'officialRules',
      title: t('resources.officialRules'),
      color: 'text-green-400',
      borderColor: 'border-green-400/30',
      hoverBorderColor: 'hover:border-green-400/50',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      )
    },
    {
      id: 'tournamentResources',
      title: t('resources.tournamentResources'),
      color: 'text-cyan-400',
      borderColor: 'border-cyan-400/30',
      hoverBorderColor: 'hover:border-cyan-400/50',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v7h2v7h3v-7h1v7h3z"/>
        </svg>
      )
    },
    {
      id: 'wordLists',
      title: t('resources.wordLists'),
      color: 'text-purple-400',
      borderColor: 'border-purple-400/30',
      hoverBorderColor: 'hover:border-purple-400/50',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    {
      id: 'toolsForTDs',
      title: 'Tools for TDs',
      color: 'text-yellow-400',
      borderColor: 'border-yellow-400/30',
      hoverBorderColor: 'hover:border-yellow-400/50',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21,16V4H3V16H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14V20H16V22H8V20H10V18H3C1.89,18 1,17.1 1,16V4C1,2.89 1.89,2 3,2H21M5,6H14V10H5V6M15,6H19V8H15V6M19,9V14H15V9H19M5,11H9V14H5V11M10,11H14V14H10V11Z" />
        </svg>
      )
    }
  ];

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

        {/* Resources Content */}
        <div className="max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category.id} className="mb-14 sm:mb-20">
              <h2 className={`font-orbitron text-2xl sm:text-3xl font-bold ${category.color} mb-6 sm:mb-8 flex items-center`}>
                {category.icon}
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {resources
                  .filter(resource => resource.category === category.id)
                  .map(resource => (
                    <div key={resource.id} className={`bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-6 sm:p-7 border ${category.borderColor} ${category.hoverBorderColor} transition-all duration-300 group shadow-lg hover:shadow-xl`}>
                      <div className="flex items-start">
                        {getFileIcon(resource.type)}
                        <div className="ml-4 flex-grow">
                          <h3 className={`font-orbitron text-lg sm:text-xl font-bold ${category.color} mb-2 group-hover:text-cyan-400 transition-colors`}>{resource.title}</h3>
                          <p className="text-gray-400 text-sm sm:text-base mb-3">{resource.description}</p>
                          {resource.type !== 'link' && (
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>{t('resources.fileSize')}: {resource.fileSize}</span>
                              <span>{t('resources.lastUpdated')}: {resource.lastUpdated}</span>
                            </div>
                          )}
                          <div className="mt-4">
                            {resource.type === 'link' ? (
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-flex items-center ${category.color.replace('text-', 'text-').replace('400', '400')} hover:text-green-400 font-medium text-sm transition-colors`}
                              >
                                Visit Website
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ) : (
                              <a 
                                href={resource.url} 
                                download
                                className={`inline-flex items-center ${category.color.replace('text-', 'text-').replace('400', '400')} hover:text-green-400 font-medium text-sm transition-colors`}
                              >
                                {t('resources.download')}
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
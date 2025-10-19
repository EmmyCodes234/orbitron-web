import React, { useState } from 'react';
import { useLocalization } from '../contexts/LocalizationContext';
import ChromaGrid, { ChromaItem } from '../components/ChromaGrid';

const AboutPage: React.FC = () => {
  const { t } = useLocalization();
  const [selectedExecutive, setSelectedExecutive] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const foundingMembers = [
    { name: 'Mr. Francis Wachira', country: 'Kenya' },
    { name: 'Mr. Richard Andabwa', country: 'Kenya' },
    { name: 'Ms. Cecilia Ruto', country: 'Kenya' },
    { name: 'Dr. Michael Gongolo', country: 'Kenya' },
    { name: 'Lt. Col Gold Eburu', country: 'Nigeria' },
    { name: 'Mr. Larry Ojoko', country: 'Nigeria' },
    { name: 'Mr. Larry Benjamin', country: 'South Africa' },
  ];

  const memberCountries = [
    'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Tanzania', 
    'Zambia', 'Botswana', 'Cameroon', 'Gambia', 'Liberia', 'Sierra Leone', 
    'Mauritius', 'Togo', 'Rwanda', 'Malawi', 'Zimbabwe', 'Lesotho'
  ];

  const keyMetrics = [
    { number: '18', label: 'Member Countries', description: t('about.acrossAfrica') },
    { number: '15,000+', label: 'Registered Players', description: t('about.tournamentParticipants') },
    { number: '1', label: 'World Champion', description: t('about.producedIn2015') },
    { number: '31', label: 'Years Strong', description: t('about.since1994') },
  ];

  // Executive team members adapted for ChromaGrid
  const executives: ChromaItem[] = [
    {
      image: '/adekoyejo.jpg',
      title: 'Adekoyejo Adegbesan',
      subtitle: t('about.president'),
      location: 'Nigeria',
      borderColor: '#10B981',
      gradient: 'linear-gradient(145deg, #10B981, #065F46)',
      bio: t('about.adekoyejoBio'),
      countryCode: 'ng'
    },
    {
      image: '/anaclet.jpg',
      title: 'Anaclet Ruzindana',
      subtitle: t('about.vicePresident1'),
      location: 'Rwanda',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(145deg, #8B5CF6, #5B21B6)',
      bio: 'Retired Educational and Sports Administrator. Former National Director for Special Olympics in Rwanda and Chairman of Special Olympics Africa Advisory Council, Supreme body of Special Olympics Africa. Current president of the Rwanda Scrabble Federation.',
      countryCode: 'rw'
    },
    {
      image: '/lestermorris.jpg',
      title: 'Lester Morris',
      subtitle: t('about.vicePresident2'),
      location: 'Liberia',
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(145deg, #3B82F6, #1E40AF)',
      bio: t('about.lesterMorrisBio'),
      countryCode: 'lr'
    },
    {
      image: '/okeyo.jpg',
      title: 'Chrispine Okeyo',
      subtitle: t('about.technicalDirector'),
      location: 'Kenya',
      borderColor: '#10B981',
      gradient: 'linear-gradient(145deg, #10B981, #065F46)',
      bio: t('about.chrispineOkeyoBio') || 'Technical Director responsible for overseeing the technical aspects of PANASA tournaments and ensuring fair play standards across all member countries.',
      countryCode: 'ke'
    },
    {
      image: '/fbi.jpg',
      title: 'Umar Faruq Baba-Inna',
      subtitle: t('about.ratingsOfficer'),
      location: 'Nigeria',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #B45309)',
      bio: t('about.umarFaruqBio'),
      countryCode: 'ng'
    }
  ];

  const openModal = (executive: ChromaItem) => {
    setSelectedExecutive(executive);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExecutive(null);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-extrabold text-center mb-8 sm:mb-10 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 tracking-tight">
          {t('about.title')}
        </h1>
        
        <div className="space-y-8 sm:space-y-10 md:space-y-16 text-gray-300 text-center">
          {/* Introduction with Hero Image */}
          <section className="bg-slate-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="p-5 sm:p-7 md:p-10">
              <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-4 sm:mb-5 md:mb-6 text-center">{t('about.whoWeAre')}</h2>
              <p className="leading-relaxed text-sm sm:text-base md:text-lg font-medium">
                {t('about.introduction')}
              </p>
            </div>
          </section>

          {/* Meet the Team - now using ChromaGrid */}
          <section className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-10 border border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-5 sm:mb-6 md:mb-8 text-center">{t('about.meetTheTeam')}</h2>
            <p className="text-center text-base sm:text-lg md:text-xl text-cyan-400 mb-5 sm:mb-6 md:mb-10 font-medium">{t('about.leadershipDescription')}</p>
            
            <div className="mt-6 sm:mt-8 md:mt-10">
              <ChromaGrid 
                items={executives} 
                className="min-h-[400px] sm:min-h-[500px]" 
                onCardClick={openModal}
              />
            </div>
          </section>

          {/* History */}
          <section className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-10 border border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-5 sm:mb-6 md:mb-8 text-center">{t('about.howItBegan')}</h2>
            <div className="space-y-4 sm:space-y-5 md:space-y-7">
              <p className="leading-relaxed text-sm sm:text-base md:text-lg">
                <span className="font-bold text-cyan-400">{t('about.founded1994')}</span> {t('about.bornFromVision')}
              </p>
              
              <p className="leading-relaxed text-sm sm:text-base md:text-lg">
                {t('about.mainObjective')} <span className="font-bold text-cyan-400">{t('about.africanChampionship')}</span> {t('about.heldInLusaka')}
              </p>

              {/* Historical Photo */}
              <div className="mt-6 sm:mt-8 md:mt-10">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-7 border border-slate-700/20">
                  <h3 className="font-orbitron text-lg sm:text-xl md:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4 md:mb-5 text-center">{t('about.foundingMembers1994')}</h3>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {foundingMembers.map((member, index) => (
                      <div key={index} className="flex justify-between items-center py-2 sm:py-3 border-b border-slate-700/30 last:border-b-0 hover:bg-slate-700/20 rounded-lg px-2 sm:px-3 transition-colors duration-200">
                        <span className="font-bold text-sm sm:text-base">{member.name}</span>
                        <span className="text-green-400 text-xs sm:text-sm font-medium">{member.country}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-3 sm:mt-4 md:mt-5 font-medium">
                    {t('about.threeCountries')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Metrics with Tournament Photos */}
          <section className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-10 border border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-5 sm:mb-6 md:mb-8 text-center">{t('about.metricsSayItAll')}</h2>
            <p className="text-base sm:text-lg md:text-xl text-cyan-400 mb-5 sm:mb-6 md:mb-10 text-center font-bold">{t('about.successSeries')}</p>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
              {keyMetrics.map((metric, index) => (
                <div key={index} className="text-center bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-slate-700/20 hover:border-green-400/40 transition-all duration-300 group">
                  <div className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-400 mb-1 sm:mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors duration-300">{metric.number}</div>
                  <div className="font-bold text-cyan-400 mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">{metric.label}</div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-400 font-medium">{metric.description}</div>
                </div>
              ))}
            </div>

            <p className="leading-relaxed text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 font-medium">
              {t('about.scrabbleMillions')}
            </p>
          </section>

          {/* Member Countries with Map */}
          <section className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-10 border border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-5 sm:mb-6 md:mb-8 text-center">{t('about.memberCountries')}</h2>
            
            <div>
              <p className="leading-relaxed text-sm sm:text-base md:text-lg mb-5 sm:mb-6 md:mb-8 font-medium">
                {t('about.currentlyConsists')} <span className="font-bold text-cyan-400">{t('about.twelveMemberCountries')}</span> 
                {t('about.acrossContinent')}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                {memberCountries.map((country, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 text-center border border-slate-700/20 hover:border-green-400/40 transition-all duration-300 group">
                    <span className="font-bold text-gray-200 text-sm sm:text-base group-hover:text-green-400 transition-colors duration-300">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Championships & Tournaments */}
          <section className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-7 md:p-10 border border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-5 sm:mb-6 md:mb-8 text-center">{t('about.ourChampionships')}</h2>
            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-slate-700/20 hover:border-green-400/40 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-2 text-base sm:text-lg md:text-xl text-center">{t('about.biAnnualChampionship')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium text-center">{t('about.premierChampionship')}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-slate-700/20 hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-2 text-base sm:text-lg md:text-xl text-center">{t('about.eastCentralChampionship')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium text-center">{t('about.regionalChampionshipEast')}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-slate-700/20 hover:border-purple-400/40 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-2 text-base sm:text-lg md:text-xl text-center">{t('about.westAfricaChampionship')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium text-center">{t('about.regionalChampionshipWest')}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-slate-700/20 hover:border-yellow-400/40 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-2 text-base sm:text-lg md:text-xl text-center">{t('about.youthChampionship')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium text-center">{t('about.developingNextGeneration')}</p>
              </div>
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-5 border border-slate-700/20 hover:border-pink-400/40 transition-all duration-300">
                <h3 className="font-bold text-cyan-400 mb-2 text-base sm:text-lg md:text-xl text-center">{t('about.presidentsCup')}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium text-center">{t('about.eliteTournament')}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-4 sm:mt-6 md:mt-8 font-medium text-center">
              {t('about.additionalTournaments')}
            </p>
          </section>

          {/* World Achievement with Champion Photo */}
          <section className="bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl overflow-hidden border border-green-500/40 shadow-2xl hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 gap-0">
              <div className="p-5 sm:p-7 md:p-10 flex flex-col items-center">
                <div className="w-full">
                  <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-3 sm:mb-4 md:mb-6 text-center">{t('about.worldChampionAchievement')}</h2>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed font-medium text-center">
                    <span className="font-extrabold text-cyan-400">{t('about.africaProduced')}</span> 
                    {t('about.historicMilestone')}
                  </p>
                  <div className="mt-4 flex flex-col items-center">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-white">Wellington Jighere</h3>
                    <p className="text-cyan-400 font-medium flex items-center text-sm sm:text-base">
                      <img 
                        src="https://flagcdn.com/24x18/ng.png" 
                        alt="Nigeria" 
                        className="w-5 h-3 sm:w-6 sm:h-4 mr-1 sm:mr-2 object-contain"
                      />
                      Nigeria • WESPAC 2015 Champion
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 flex items-center justify-center min-h-[150px] sm:min-h-[200px] md:min-h-[250px]">
                <img 
                  src="/welly.png" 
                  alt="World Scrabble Champion" 
                  className="w-full h-full object-contain p-3 sm:p-5 md:p-8"
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Executive Profile Modal */}
      {isModalOpen && selectedExecutive && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50 shadow-2xl">
            <div className="relative">
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-full p-2 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-6 sm:p-8">
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div>
                      <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white mb-2">{selectedExecutive.title}</h2>
                      <p className="text-cyan-400 font-semibold text-xl sm:text-2xl">{selectedExecutive.subtitle}</p>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0 bg-slate-700/50 rounded-lg px-4 py-2">
                      <img 
                        src={`https://flagcdn.com/32x24/${selectedExecutive.countryCode}.png`} 
                        alt={selectedExecutive.location} 
                        className="team-member-flag w-8 h-6"
                      />
                      <span className="text-white font-medium text-lg ml-2">{selectedExecutive.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <img 
                      src={selectedExecutive.image} 
                      alt={selectedExecutive.title} 
                      className="w-48 h-48 object-cover rounded-xl border-2 border-white/20"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      {selectedExecutive.bio || t('about.defaultBio')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import FlagLoop from '../components/FlagLoop';
import AnnouncementPill from '../components/AnnouncementPill';
import ParticleBackground from '../components/ParticleBackground';
import { getEvents } from '../src/services/supabaseService';
import { useLocalization } from '../contexts/LocalizationContext';
import TechButton from '../components/TechButton';
import AscTimeline from '../components/AscTimeline';

const HomePage: React.FC = () => {
  const { t, language } = useLocalization();
  const [useVideoBackground, setUseVideoBackground] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if device is mobile
  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    // Detect low power mode to optimize performance
    const isLowPowerMode = (navigator as any).connection && (navigator as any).connection.saveData;

    // On mobile devices, prefer image over video for better performance
    if (isMobile() || isLowPowerMode) {
      setUseVideoBackground(false);
    }
  }, []);

  // Fetch events from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch events
        const eventsData = await getEvents();
        if (eventsData) {
          // Get only the first 2 events for the homepage
          setUpcomingEvents(eventsData.slice(0, 2));
        }
      } catch (error) {
        // Silently handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle video error and fallback to image
  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative text-center py-20 sm:py-28 md:py-32 lg:py-40 overflow-hidden mt-0 mx-0 px-4 sm:px-6 safe-area-top hero-bg">
        {/* Hero Background */}
        <div className="absolute inset-0">
          {/* Particle background for mobile */}
          <div className="absolute inset-0 md:hidden">
            <ParticleBackground isMobile={true} />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95"></div>
          </div>

          {/* Image/video background for desktop */}
          <div className="hidden md:block absolute inset-0">
            {useVideoBackground && !videoError ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-25"
                onError={handleVideoError}
              >
                <source src="/hero-background.mp4" type="video/mp4" />
                {/* Fallback to image if video fails to load */}
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1920&h=1080&fit=crop&crop=center&q=80"
                  alt="High quality Scrabble board with wooden letter tiles"
                  className="w-full h-full object-cover opacity-25"
                  loading="eager"
                  decoding="async"
                />
              </video>
            ) : (
              <>
                {/* Desktop background - using the original image */}
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1920&h=1080&fit=crop&crop=center&q=80"
                  alt="High quality Scrabble board with wooden letter tiles"
                  className="w-full h-full object-cover opacity-25"
                  loading="eager"
                  decoding="async"
                />
              </>
            )}
          </div>

          {/* Smart gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95 md:bg-gradient-to-b md:from-slate-950/90 md:via-slate-950/70 md:to-slate-950/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60"></div>
          {/* Subtle animated overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 via-transparent to-cyan-900/10 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-4 sm:pt-0">
          {/* Announcement Pill */}
          <div className="flex justify-center -mt-4">
            <AnnouncementPill
              text={t('home.announcement')}
              href="https://asc.liberiascrabble.com"
            />
          </div>

          {/* Main title with enhanced styling */}
          <h1 className="hero-title font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 mb-5 sm:mb-6 md:mb-7 animate-fade-in-up leading-tight tracking-tight">
            {t('home.title')}
          </h1>

          {/* Subtitle with enhanced styling */}
          <p className="hero-subtitle max-w-3xl mx-auto text-gray-300 text-base sm:text-lg md:text-xl animate-fade-in-up opacity-0 leading-relaxed px-2 font-medium" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
            {t('home.subtitle')}
          </p>

          {/* Enhanced buttons with better styling */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 md:gap-7 animate-fade-in-up opacity-0 px-4 hero-buttons" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <Link
              to="/ratings"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm sm:text-base font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-green-400 to-cyan-500 group-hover:from-green-400 group-hover:to-cyan-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 min-h-[48px] sm:min-h-[52px] touch-manipulation hero-button shadow-xl w-full sm:w-auto tech-btn"
            >
              <span className="relative px-6 sm:px-7 md:px-9 py-3 sm:py-4 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0 flex items-center justify-center gap-2 sm:gap-3 w-full text-white font-bold tracking-wide">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="whitespace-nowrap">{t('home.playerRankings')}</span>
              </span>
            </Link>
            <Link
              to="/federations"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm sm:text-base font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 min-h-[48px] sm:min-h-[52px] touch-manipulation hero-button shadow-xl w-full sm:w-auto tech-btn"
            >
              <span className="relative px-6 sm:px-7 md:px-9 py-3 sm:py-4 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0 flex items-center justify-center gap-2 sm:gap-3 w-full text-white font-bold tracking-wide">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="whitespace-nowrap">{t('home.findFederation')}</span>
              </span>
            </Link>
          </div>

          {/* Enhanced stats with better styling */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:gap-7 animate-fade-in-up opacity-0 px-2 hero-stats" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center stat-card shadow-xl hover:shadow-2xl tech-card">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-400 animate-pulse stat-number">18</div>
              <div className="text-xs sm:text-xs md:text-sm text-gray-300 uppercase tracking-widest mt-2 stat-label font-bold">{t('home.countries')}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center stat-card shadow-xl hover:shadow-2xl tech-card">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-cyan-400 animate-pulse stat-number">15K+</div>
              <div className="text-xs sm:text-xs md:text-sm text-gray-300 uppercase tracking-widest mt-2 stat-label font-bold">{t('home.players')}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center stat-card shadow-xl hover:shadow-2xl tech-card">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-400 animate-pulse stat-number">31</div>
              <div className="text-xs sm:text-xs md:text-sm text-gray-300 uppercase tracking-widest mt-2 stat-label font-bold">{t('home.years')}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center stat-card shadow-xl hover:shadow-2xl tech-card">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400 animate-pulse stat-number">1</div>
              <div className="text-xs sm:text-xs md:text-sm text-gray-300 uppercase tracking-widest mt-2 stat-label font-bold">{t('home.worldChampions')}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28 mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Member Nations Section with enhanced styling */}
        <section className="animate-fade-in-up opacity-0 content-group" style={{ animationDelay: '3s', animationFillMode: 'forwards' }}>
          <h2 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-6 sm:mb-8 md:mb-10 text-gray-100 uppercase tracking-wider section-title">
            {t('home.memberNations')}
          </h2>
          <div className="animate-float">
            <FlagLoop />
          </div>
        </section>



        {/* ASC Timeline Section */}
        <AscTimeline />

        {/* Divider with tech feel */}
        <div className="tech-divider"></div>

        {/* Upcoming Events Section - REMOVED as requested */}
      </div>
    </div>
  );
};

export default HomePage;
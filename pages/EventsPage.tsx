import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEvents, getEventById, subscribeToEvents } from '../src/services/supabaseService';
import Card from '../components/Card';
import { useLocalization } from '../contexts/LocalizationContext';

const EventDetail: React.FC<{ event: any }> = ({ event }) => {
    const { t } = useLocalization();
    // Determine which image to use based on the event title
    const getImageUrl = (event: any) => {
        if (event.title === 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship') {
            return '/kofiBingo.png';
        } else if (event.title === 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles') {
            return '/ayscbanner.png';
        } else if (event.title === 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi') {
            return '/triumvirate.png';
        }
        return event.image;
    };

    const imageUrl = getImageUrl(event);

    return (
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-2xl p-5 sm:p-9 max-w-5xl mx-auto relative border border-slate-700/40 shadow-2xl content-group tech-card">
            <Link to="/events" className="text-green-400 hover:text-cyan-400 mb-5 sm:mb-9 inline-block font-bold transition-colors duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                {t('events.backToEvents')}
            </Link>
            <div className="relative overflow-hidden rounded-xl mb-5 sm:mb-7">
                <img src={imageUrl} alt={event.title} className="w-full h-52 sm:h-80 object-contain rounded-xl mb-5 p-3 bg-slate-900/50" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-900/70 to-transparent"></div>
            </div>
            <h1 className="font-orbitron text-3xl sm:text-5xl font-extrabold mb-5 text-gray-100 tracking-tight section-title">{event.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-7 sm:mb-9">
                <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm p-5 sm:p-7 rounded-xl border border-slate-700/30 tech-card">
                    <h2 className="font-orbitron text-xl sm:text-2xl font-bold mb-4 text-cyan-400">{t('events.eventDetails')}</h2>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg">
                        <div className="flex items-center group">
                            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{t('events.date')}</p>
                                <p className="text-white font-bold text-lg">{event.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center group">
                            <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{t('events.location')}</p>
                                <p className="text-white font-bold text-lg">{event.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center group">
                            <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{t('events.organizer')}</p>
                                <p className="text-white font-bold text-lg">{event.organizer}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm p-5 sm:p-7 rounded-xl border border-slate-700/30 tech-card">
                    <h2 className="font-orbitron text-xl sm:text-2xl font-bold mb-4 text-cyan-400">{t('events.contact')}</h2>
                    <div className="space-y-4 sm:space-y-5 text-base sm:text-lg">
                        <div className="flex items-center group">
                            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{t('events.email')}</p>
                                <a href={`mailto:${event.contact.email}`} className="text-cyan-400 hover:text-cyan-300 font-bold break-all transition-colors duration-300">
                                    {event.contact.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center group">
                            <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{t('events.phone')}</p>
                                <a href={`tel:${event.contact.phone}`} className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors duration-300">
                                    {event.contact.phone}
                                </a>
                            </div>
                        </div>
                        {event.website && (
                            <div className="flex items-center group">
                                <div className="w-10 h-10 rounded-lg bg-purple-400/10 flex items-center justify-center mr-4 flex-shrink-0">
                                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm font-medium">{t('events.website')}</p>
                                    <a href={event.website} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-bold break-all transition-colors duration-300">
                                        {event.website.replace('https://', '').replace('http://', '')}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mb-7 sm:mb-9">
                <h2 className="font-orbitron text-xl sm:text-2xl font-bold mb-4 text-cyan-400">{t('events.description')}</h2>
                <div className="text-gray-300 leading-relaxed space-y-4 prose prose-invert prose-p:font-jetbrains-mono prose-lg">
                    <p>{event.description}</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <a 
                    href={event.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-base sm:text-lg font-bold text-gray-900 rounded-xl group bg-gradient-to-br from-green-400 to-cyan-500 group-hover:from-green-400 group-hover:to-cyan-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/30 tech-btn"
                >
                    <span className="w-full relative px-6 py-3.5 transition-all ease-in duration-300 bg-slate-900 rounded-lg group-hover:bg-opacity-0 text-center">
                        {t('events.register')}
                    </span>
                </a>
                <Link 
                    to="/events" 
                    className="flex-1 text-center px-6 py-3.5 border-2 border-slate-700 text-gray-300 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 font-bold text-base sm:text-lg tech-btn tech-btn-secondary"
                >
                    {t('events.backToEvents')}
                </Link>
            </div>
        </div>
    );
};

const EventsList: React.FC<{ events: any[] }> = ({ events }) => {
    const { t } = useLocalization();
    // Determine which image to use based on the event title
    const getImageUrl = (event: any) => {
        if (event.title === 'Ghana Welcomes the World: Accra to Host the 2025 World Scrabble Championship') {
            return '/kofiBingo.png';
        } else if (event.title === 'Future of African Scrabble Shines Bright as Nigeria Sweeps Youth Championship Titles') {
            return '/ayscbanner.png';
        } else if (event.title === 'Blitzkrieg Triumphs at Triumvirate Showdown in Nairobi') {
            return '/triumvirate.png';
        }
        return event.image;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 content-group">
            <div className="text-center mb-10 sm:mb-14 section-header">
                <h1 className="font-orbitron text-3xl sm:text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 section-title">
                    {t('events.title')}
                </h1>
                <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto font-medium section-subtitle">
                    {t('events.subtitle')}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {events.map(event => {
                    const imageUrl = getImageUrl(event);
                    return (
                        <Card
                            key={event.id}
                            title={event.title}
                            subtitle={`${event.date} | ${event.location}`}
                            description={event.description.substring(0, 150) + '...'}
                            linkTo={`/events/${event.id}`}
                            imageUrl={imageUrl}
                        />
                    );
                })}
            </div>
            {events.length === 0 && (
                <div className="text-center py-16 sm:py-20 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
                    <div className="max-w-md mx-auto">
                        <svg className="w-16 h-16 text-gray-600 mx-auto mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-300 mb-3">{t('events.noEvents')}</h3>
                        <p className="text-gray-500">
                            {t('events.checkBack')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const EventsPage: React.FC = () => {
    const { t, language } = useLocalization();
    const { id } = useParams<{ id: string }>();
    const [events, setEvents] = useState<any[]>([]);
    const [event, setEvent] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (id) {
                    // Fetch single event
                    const eventData = await getEventById(id);
                    if (eventData) {
                        setEvent(eventData);
                    } else {
                        setError(t('events.eventNotFound'));
                    }
                } else {
                    // Fetch all events
                    const eventsData = await getEvents();
                    if (eventsData && eventsData.length > 0) {
                        setEvents(eventsData);
                    } else {
                        setError(t('events.noEvents'));
                    }
                }
            } catch (err) {
                setError(t('error'));
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, language, t]);

    // Subscribe to real-time updates
    useEffect(() => {
        if (!id) { // Only subscribe on the list page, not the detail page
          const unsubscribe = subscribeToEvents(
            (updatedEvents) => {
              setEvents(updatedEvents);
              setIsSubscribed(true);
            },
            (error) => {
              console.error('Real-time subscription error:', error);
              setIsSubscribed(false);
            }
          );

          return () => {
            unsubscribe();
          };
        }
      }, [id]);

    if (loading) {
        return (
            <div className="py-8 sm:py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8 sm:py-12">
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-400 bg-red-900/30 px-6 py-4 rounded-xl border border-red-700/50">
                        <p className="font-bold text-lg mb-2">{t('error')}</p>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 sm:py-12">
            {id ? (
                event ? <EventDetail event={event} /> : <div className="text-center py-12 text-red-400">{t('events.eventNotFound')}</div>
            ) : (
                <EventsList events={events} />
            )}
        </div>
    );
};

export default EventsPage;
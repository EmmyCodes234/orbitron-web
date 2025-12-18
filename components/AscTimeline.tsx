import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';

interface AscWinner {
    edition: string;
    year: string;
    winner: string;
    country: string;
    host: string;
    image?: string; // Optional image if available in future
}

const ascData: AscWinner[] = [
    { edition: '1st', year: '1994', winner: 'Ify Onyeonwu', country: 'Nigeria', host: 'Kenya' },
    { edition: '2nd', year: '1996', winner: 'Femi Awowade', country: 'Nigeria', host: 'Nigeria' },
    { edition: '3rd', year: '1998', winner: 'Wale Fashina', country: 'Nigeria', host: 'South Africa' },
    { edition: '4th', year: '2000', winner: 'Moshood Sanni', country: 'Nigeria', host: 'Ghana' },
    { edition: '5th', year: '2002', winner: 'Trevor Hovelmeier', country: 'South Africa', host: 'Kenya' },
    { edition: '6th', year: '2004', winner: 'Dennis Ikekeregor', country: 'Nigeria', host: 'Tanzania' },
    { edition: '7th', year: '2006', winner: 'Dennis Ikekeregor', country: 'Nigeria', host: 'Nigeria' },
    { edition: '8th', year: '2008', winner: 'Wellington Jighere', country: 'Nigeria', host: 'Kenya' },
    { edition: '9th', year: '2010', winner: 'Wellington Jighere', country: 'Nigeria', host: 'Ghana' },
    { edition: '10th', year: '2012', winner: 'Rex Ogbakpa', country: 'Nigeria', host: 'Zambia' },
    { edition: '11th', year: '2014', winner: 'Nsikakabasi Etim', country: 'Nigeria', host: 'South Africa' },
    { edition: '12th', year: '2016', winner: 'Saidu Ayorinde', country: 'Nigeria', host: 'Ghana' },
    { edition: '13th', year: '2018', winner: 'Moses Peter', country: 'Nigeria', host: 'Kenya' },
    { edition: '14th', year: '2022', winner: 'Enoch Nwali', country: 'Nigeria', host: 'Zambia' },
    { edition: '15th', year: '2024', winner: 'Oluwatimilehin Doko', country: 'Nigeria', host: 'Rwanda' },
];

const getCountryCode = (country: string): string => {
    const map: Record<string, string> = {
        'Nigeria': 'ng',
        'South Africa': 'za',
        'Kenya': 'ke',
        'Ghana': 'gh',
        'Tanzania': 'tz',
        'Zambia': 'zm',
        'Rwanda': 'rw',
    };
    return map[country] || 'un'; // 'un' for unknown/united nations as fallback
};

const AscTimeline: React.FC = () => {
    const { t } = useLocalization();

    return (
        <section className="py-20 bg-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4 font-orbitron"
                    >
                        {t('asc.timeline.title')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        {t('asc.timeline.subtitle')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-6"
                    >
                        <Link to="/asc" className="inline-flex items-center text-green-400 hover:text-green-300 font-bold transition-colors">
                            {t('asc.timeline.viewHistory')} <span className="ml-2">→</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Line for Mobile */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/0 via-green-500/50 to-green-500/0 md:transform md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {ascData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 w-full md:text-right pl-12 md:pl-0 md:pr-12 group">
                                    <div className={`${index % 2 === 0 ? 'md:text-left md:pl-12 md:pr-0' : ''}`}>
                                        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 group-hover:-translate-y-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-green-400 tracking-wider uppercase">{t('asc.cards.edition').replace('{edition}', item.edition)}</span>
                                                <span className="text-xl font-orbitron font-bold text-white">{item.year}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">{item.winner}</h3>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                                                <div className={`flex items-center gap-2 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} justify-start md:justify-end`}>
                                                    <span className={`${index % 2 === 0 ? '' : 'md:order-2'}`}>{item.country}</span>
                                                    <img
                                                        src={`https://flagcdn.com/w40/${getCountryCode(item.country)}.png`}
                                                        alt={item.country}
                                                        className={`w-6 h-auto rounded-sm shadow-sm ${index % 2 === 0 ? '' : 'md:order-1'}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-3 text-xs text-slate-500 uppercase tracking-widest font-semibold border-t border-white/5 pt-2 flex items-center justify-between">
                                                <span>{t('asc.timeline.host')} <span className="text-slate-400 ml-1">{item.host}</span></span>
                                                <img
                                                    src={`https://flagcdn.com/w20/${getCountryCode(item.host)}.png`}
                                                    alt={item.host}
                                                    className="w-4 h-auto rounded-sm opacity-70"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline Node */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-slate-900 border-2 border-green-500 rounded-full transform -translate-x-1/2 z-10 ring-4 ring-slate-950 group-hover:scale-125 transition-transform duration-300" />

                                {/* Empty Side for balance */}
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AscTimeline;

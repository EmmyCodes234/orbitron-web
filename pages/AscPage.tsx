import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const AscPage: React.FC = () => {
    const winners = [
        { edition: '1st', year: '1994', winner: 'Ify Onyeonwu', country: 'Nigeria', host: 'Kenya' },
        { edition: '2nd', year: '1996', winner: 'Femi Awowade', country: 'Nigeria', host: 'Nigeria' },
        { edition: '3rd', year: '1998', winner: 'Wale Fashina (Jimoh Saheed)', country: 'Nigeria', host: 'South Africa' },
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

    const highlights = [
        {
            title: "Nigeria's Dominance",
            content: "Nigerian players have won 14 out of the 15 editions held to date, cementing their status as the powerhouse of African Scrabble."
        },
        {
            title: "Multiple-Time Champions",
            content: "Dennis Ikekeregor (2004, 2006) and Wellington Jighere (2008, 2010) are the only players to have won the title twice."
        },
        {
            title: "Trevor Hovelmeier",
            content: "He remains the only non-Nigerian to ever win the African individual title, clinching it for South Africa in 2002."
        },
        {
            title: "Youngest Champion",
            content: "Oluwatimilehin Doko became the youngest winner in history when he won the 15th edition in Kigali, Rwanda, at the age of 24."
        }
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
        return map[country] || 'un';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-20">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <ParticleBackground isMobile={window.innerWidth < 768} />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/80 to-slate-950"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block py-1 px-3 rounded-full bg-green-500/10 text-green-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-4 border border-green-500/20"
                    >
                        History & Glory
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-3xl md:text-6xl font-extrabold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-white via-green-200 to-green-500 mb-6 leading-tight"
                    >
                        Africa Scrabble Championship
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-lg text-slate-300 leading-relaxed px-2"
                    >
                        The Africa Scrabble Championship (ASC) is the premier continental tournament organized by the Pan-African Scrabble Association (PANASA). Since its inception in 1994, it has been the ultimate battleground for the continent's finest wordsmiths.
                    </motion.p>
                </div>
            </section>

            {/* Highlights Grid */}
            <section className="py-12 md:py-16 px-4 bg-slate-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold font-orbitron text-center mb-8 md:mb-12 text-white"> Key <span className="text-green-400">Highlights</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {highlights.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all hover:bg-slate-800/80"
                            >
                                <h3 className="text-lg md:text-xl font-bold text-green-300 mb-2 md:mb-3">{item.title}</h3>
                                <p className="text-sm md:text-base text-slate-300">{item.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Winners Table */}
            <section className="py-12 md:py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 gap-2">
                        <h2 className="text-2xl md:text-3xl font-bold font-orbitron">Hall of <span className="text-yellow-400">Fame</span></h2>
                        <div className="text-sm text-slate-400">Total Editions: 15</div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-md">

                        {/* Mobile View: Cards */}
                        <div className="md:hidden space-y-4 p-4">
                            {winners.map((row, idx) => (
                                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-green-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-1 rounded">{row.edition} Edition</span>
                                        <span className="text-lg font-orbitron font-bold text-white">{row.year}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider">Winner</span>
                                        <div className="text-xl font-bold text-green-300">{row.winner}</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5 text-sm">
                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider">Country</span>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <img src={`https://flagcdn.com/w20/${getCountryCode(row.country)}.png`} alt={row.country} className="w-5 h-auto rounded-sm" />
                                                <span>{row.country}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider">Host</span>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <img src={`https://flagcdn.com/w20/${getCountryCode(row.host)}.png`} alt={row.host} className="w-5 h-auto rounded-sm opacity-70" />
                                                <span>{row.host}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View: Table */}
                        <div className="hidden md:block overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse min-w-full">
                                <thead>
                                    <tr className="bg-white/5 text-slate-300 border-b border-white/10">
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider whitespace-nowrap">Ed.</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider whitespace-nowrap">Year</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Winner</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Country</th>
                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Host</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {winners.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4 text-slate-400 font-mono text-sm whitespace-nowrap">{row.edition}</td>
                                            <td className="p-4 font-bold text-white whitespace-nowrap">{row.year}</td>
                                            <td className="p-4 text-green-300 font-bold group-hover:text-green-200">{row.winner}</td>
                                            <td className="p-4 text-slate-300">
                                                <div className="flex items-center gap-2">
                                                    <img src={`https://flagcdn.com/w20/${getCountryCode(row.country)}.png`} alt={row.country} className="w-5 h-auto rounded-sm" />
                                                    <span className="whitespace-nowrap">{row.country}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-400">
                                                <div className="flex items-center gap-2">
                                                    <img src={`https://flagcdn.com/w20/${getCountryCode(row.host)}.png`} alt={row.host} className="w-5 h-auto rounded-sm opacity-70" />
                                                    <span className="whitespace-nowrap">{row.host}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-slate-500 text-xs md:text-sm px-4">
                        <p>Scheduling Note: The championship is typically held biennially. A gap occurred between 2018 and 2022 due to the COVID-19 pandemic.</p>
                    </div>
                </div>
            </section>

            <div className="pb-20 text-center">
                <Link to="/" className="inline-flex items-center text-green-400 hover:text-white font-bold transition-colors">
                    ← Back to Home
                </Link>
            </div>

        </div>
    );
};

export default AscPage;

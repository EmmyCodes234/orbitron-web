import React from 'react';

// PANASA member nations based on federations data with real flag images from flagcdn.com
const memberNations = [
    { name: 'Nigeria', code: 'ng' },
    { name: 'Ghana', code: 'gh' },
    { name: 'Kenya', code: 'ke' },
    { name: 'South Africa', code: 'za' },
    { name: 'Uganda', code: 'ug' },
    { name: 'Tanzania', code: 'tz' },
    { name: 'Zambia', code: 'zm' },
    { name: 'Botswana', code: 'bw' },
    { name: 'Cameroon', code: 'cm' },
    { name: 'Gambia', code: 'gm' },
    { name: 'Liberia', code: 'lr' },
    { name: 'Sierra Leone', code: 'sl' },
    { name: 'Mauritius', code: 'mu' },
    { name: 'Togo', code: 'tg' }
];

const FlagLoop: React.FC = () => {
    // Duplicate the array for a seamless loop effect
    const loopedNations = [...memberNations, ...memberNations];

    return (
        <div className="flag-scroller overflow-hidden py-4" data-speed="slow">
            <div className="flag-scroller__inner flex items-center w-max">
                {loopedNations.map((nation, index) => (
                    <div key={`${nation.name}-${index}`} className="flex-shrink-0 flex items-center mx-5 group" title={nation.name}>
                        <div className="relative">
                            <img
                                src={`https://flagcdn.com/w80/${nation.code}.png`}
                                srcSet={`https://flagcdn.com/w160/${nation.code}.png 2x`}
                                alt={`${nation.name} flag`}
                                className="w-14 h-10 object-cover rounded-lg shadow-lg border-2 border-slate-700/50 group-hover:border-green-400/80 group-hover:scale-110 transition-all duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlagLoop;
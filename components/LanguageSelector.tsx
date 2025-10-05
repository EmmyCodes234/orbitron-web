import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLocalization();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'en': return 'EN';
      case 'fr': return 'FR';
      case 'sw': return 'SW';
      default: return 'EN';
    }
  };

  return (
    <div className="relative group">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="appearance-none bg-slate-800/60 border border-slate-700/30 text-white rounded-lg py-1.5 pl-2.5 pr-6 text-xs font-medium backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md hover:bg-slate-700/60 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent cursor-pointer min-h-[36px] min-w-[36px]"
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
        <option value="sw">SW</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-400 group-hover:text-white transition-colors duration-300">
        <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
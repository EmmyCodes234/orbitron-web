import React from 'react';
import { useLocalization } from '../contexts/LocalizationContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLocalization();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'en': return 'English';
      case 'fr': return 'Français';
      case 'sw': return 'Kiswahili';
      default: return 'English';
    }
  };

  return (
    <div className="relative group">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="appearance-none bg-slate-800/80 border border-slate-700/50 text-white rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-medium backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="sw">Kiswahili</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 group-hover:text-white transition-colors duration-300">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import en from '../constants/locales/en';
import fr from '../constants/locales/fr';
import sw from '../constants/locales/sw';

// Define the structure of our translations
interface Translations {
  [key: string]: any;
}

// Define the context type
interface LocalizationContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

// Create the context
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Language mapping
const languages: Record<string, Translations> = {
  en,
  fr,
  sw
};

// Provider component
export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  // Load language preference from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('panasa_language');
    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('panasa_language', language);
  }, [language]);

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    // Split the key by dots to navigate nested objects
    const keys = key.split('.');
    let translation: any = languages[language];
    
    // Navigate through the nested structure
    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Return the key if translation is not found
        return key;
      }
    }
    
    // If translation is found and is a string, process parameters
    if (typeof translation === 'string' && params) {
      // Replace placeholders like {paramName} with actual values
      let result = translation;
      for (const [paramKey, paramValue] of Object.entries(params)) {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      }
      return result;
    }
    
    // Return the translation if it's a string, otherwise return the key
    return typeof translation === 'string' ? translation : key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

// Custom hook to use the localization context
export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
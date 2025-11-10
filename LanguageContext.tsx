import * as React from 'react';
import { translations } from './translations';
import type { TranslationKey } from './translations';

export type Language = 'EN' | 'FA' | 'KU' | 'AR';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, options?: { [key: string]: string | number }) => string;
  direction: Direction;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>('EN');

  const direction = ['FA', 'AR'].includes(language) ? 'rtl' : 'ltr';

  const t = (key: TranslationKey, options?: { [key: string]: string | number }): string => {
    let text = translations[language][key] || translations['EN'][key] || key;
    if (options) {
        Object.keys(options).forEach(placeholder => {
            text = text.replace(`{{${placeholder}}}`, String(options[placeholder]));
        });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
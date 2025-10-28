import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage, Language } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

const KkmLogo: React.FC = () => (
    <svg width="100" height="120" viewBox="0 0 133 160" className="h-14 md:h-16 w-auto">
        <defs>
            <linearGradient id="logoBlueGradientOuter" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#0A92EF"/>
                <stop offset="100%" stopColor="#002D56"/>
            </linearGradient>
            <linearGradient id="logoBlueGradientInner" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#89CFF0"/>
                <stop offset="100%" stopColor="#0A92EF"/>
            </linearGradient>
            <radialGradient id="logoSphereGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="#FFC107"/>
            </radialGradient>
        </defs>
        <g transform="translate(10, 0)">
            {/* Outer Swoosh */}
            <path d="M66.5,108.3c-2.2-22.3-19.3-43.2-34.5-54.3C14,44.2,2.8,27.7,11.3,12.5c2.3-4.1,6.5-6.7,11.3-7.5 C40-1.2,50.8,11.5,56,23.3c11,25.3,4.2,55.5-3,81.2C52,106.3,51,107.5,49.8,108.3z" fill="url(#logoBlueGradientOuter)"/>
            {/* Inner Swoosh */}
            <path d="M66.5,108.3c13.2-14.3,21.5-32.9,21.1-51.5c-0.5-23-16-43.9-35.3-51.8c-4.1-1.7-8.5-2.1-12.7-1.7 c-3.5,0.3-6,1.8-6.1,4.7c-0.2,3.3,2.4,5.4,5.8,6.2c16.1,3.7,28.4,17.4,30.3,33.5c2.4,20-5.7,39.5-19.5,53.4 C58.6,108.8,59.9,109.5,61.1,109.5C62.9,109.5,64.8,109.1,66.5,108.3z" fill="url(#logoBlueGradientInner)"/>
            {/* Sphere */}
            <circle cx="66.5" cy="74" r="22" fill="url(#logoSphereGradient)"/>
        </g>
        <text x="66.5" y="132" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="22" fill="#002D56" textAnchor="middle">K.K.M.</text>
        <text x="66.5" y="150" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="13" fill="#002D56" textAnchor="middle" letterSpacing="0.5">INTERNATIONAL</text>
    </svg>
);

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const languages: { key: Language; name: string }[] = [
      { key: 'EN', name: 'English' },
      { key: 'FA', name: 'فارسی' },
      { key: 'KU', name: 'کوردی' },
      { key: 'AR', name: 'العربية' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
          setIsLangMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [langMenuRef]);

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };
  
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const query = e.currentTarget.search.value;
      onSearch(query);
      setIsSearchOpen(false);
  }

  const selectedLangName = languages.find(l => l.key === language)?.name || 'English';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-sm' : 'bg-white'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setPage(Page.Home)} className="flex items-center text-primary" aria-label="Go to Home page">
            <KkmLogo />
          </button>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_LINKS.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`px-3 py-2 lg:px-4 font-display font-semibold text-sm rounded-md transition-colors duration-200 ${currentPage === link.name ? 'text-white bg-text-dark' : 'text-text-dark hover:text-accent-yellow'}`}
              >
                {t(link.name)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
             <div className="relative" ref={langMenuRef}>
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-semibold text-text-dark rounded-md hover:bg-gray-100 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
                    </svg>
                    <span className="hidden sm:inline">{selectedLangName}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <AnimatePresence>
                {isLangMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full end-0 mt-2 w-36 bg-white rounded-md shadow-lg z-20 border"
                    >
                        <ul className="py-1">
                            {languages.map(lang => (
                            <li key={lang.key}>
                                <button
                                onClick={() => {
                                    setLanguage(lang.key);
                                    setIsLangMenuOpen(false);
                                }}
                                className="w-full text-start px-4 py-2 text-sm text-text-dark hover:bg-gray-100"
                                >
                                {lang.name}
                                </button>
                            </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
             <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-primary hover:text-accent-yellow transition-colors duration-200" aria-label="Open search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            <button onClick={() => handleNavClick(Page.Contact)} className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-accent-yellow rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
                {t('GetInTouch')}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col space-y-2 pb-4">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                  onClick={() => handleNavClick(link.name)}
                  className={`block px-4 py-2 text-start font-display font-semibold rounded-md ${currentPage === link.name ? 'bg-primary text-white' : 'text-text-dark hover:bg-gray-100'}`}
                >
                  {t(link.name)}
                </motion.button>
              ))}
               <motion.button 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0, transition: { delay: NAV_LINKS.length * 0.05 } }}
                 onClick={() => handleNavClick(Page.Contact)} 
                 className="w-full mt-2 inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-accent-yellow rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300"
               >
                    {t('GetInTouch')}
                </motion.button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </nav>
      <AnimatePresence>
      {isSearchOpen && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input type="search" name="search" placeholder={t('SearchPlaceholder')} autoFocus className="w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary" />
                    <button type="submit" className="px-5 py-2.5 text-base font-medium text-center text-white bg-primary rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300">{t('Search')}</button>
                </form>
            </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
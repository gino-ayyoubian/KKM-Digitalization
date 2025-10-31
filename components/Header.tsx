import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { useLanguage, Language } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContext';

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
            {/* Outer Flame Path (Optimized) */}
            <path
                d="M53.1,108.3C55.6,83.8,42.5,63.4,29.7,51.7C15.2,38.5,6.5,23.3,13.2,9.3c2.4-5,7.9-8.1,13.7-7.2c16,2.5,26.4,16.5,31.3,29.2c10.3,26.8,3.2,59.2-7.2,84.1C50.2,107,49.6,107.8,48.9,108.3H53.1z"
                fill="url(#logoBlueGradientOuter)"
            />
            {/* Inner Flame Path (Optimized) */}
            <path
                d="M66.5,108.3c15.8-15.1,23.6-36.4,22.8-57c-1-25.5-18.4-48.4-40.1-55.5c-4.9-1.6-10.1-1.9-15.1-1.3c-4.1,0.5-7.1,2.8-6.9,6.2c0.2,3.8,3.4,6.1,7.2,7.1c17.5,4.5,31.2,19.8,32.7,37.9c2,22.1-7.2,43.5-22.6,58.7c2.1,0.6,4,1,6,1C56.1,109.5,61.4,109.2,66.5,108.3z"
                fill="url(#logoBlueGradientInner)"
            />
            {/* Sphere */}
            <circle cx="66.5" cy="74" r="22" fill="url(#logoSphereGradient)"/>
        </g>
        <text x="66.5" y="132" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="22" fill="#002D56" textAnchor="middle">K.K.M.</text>
        <text x="66.5" y="150" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="13" fill="#002D56" textAnchor="middle" letterSpacing="0.5">INTERNATIONAL</text>
    </svg>
);

const KkmLogoWhite: React.FC = () => (
    <svg width="100" height="120" viewBox="0 0 133 160" className="h-14 md:h-16 w-auto">
        <defs>
            <radialGradient id="logoSphereGradientFooter" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="#FFC107"/>
            </radialGradient>
        </defs>
        <g transform="translate(10, 0)">
            <path
                d="M53.1,108.3C55.6,83.8,42.5,63.4,29.7,51.7C15.2,38.5,6.5,23.3,13.2,9.3c2.4-5,7.9-8.1,13.7-7.2c16,2.5,26.4,16.5,31.3,29.2c10.3,26.8,3.2,59.2-7.2,84.1C50.2,107,49.6,107.8,48.9,108.3H53.1z"
                fill="white"
            />
            <path
                d="M66.5,108.3c15.8-15.1,23.6-36.4,22.8-57c-1-25.5-18.4-48.4-40.1-55.5c-4.9-1.6-10.1-1.9-15.1-1.3c-4.1,0.5-7.1,2.8-6.9,6.2c0.2,3.8,3.4,6.1,7.2,7.1c17.5,4.5,31.2,19.8,32.7,37.9c2,22.1-7.2,43.5-22.6,58.7c2.1,0.6,4,1,6,1C56.1,109.5,61.4,109.2,66.5,108.3z"
                fill="white"
                opacity="0.8"
            />
            <circle cx="66.5" cy="74" r="22" fill="url(#logoSphereGradientFooter)"/>
        </g>
        <text x="66.5" y="132" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="22" fill="white" textAnchor="middle">K.K.M.</text>
        <text x="66.5" y="150" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="13" fill="white" textAnchor="middle" letterSpacing="0.5">INTERNATIONAL</text>
    </svg>
);

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    
    return (
        <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-primary dark:text-secondary hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200" 
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.svg
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    {isDark ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-15.66l-.707.707M4.34 19.66l-.707.707M21 12h-1M4 12H3m15.66 8.66l-.707-.707M6.34 4.34l-.707-.707" />
                    )}
                </motion.svg>
            </AnimatePresence>
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ currentPage, setPage, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();

  const isHomePage = currentPage === Page.Home;
  const isTransparent = isHomePage && !isScrolled;

  const languages: { key: Language; name: string }[] = [
      { key: 'EN', name: 'English' },
      { key: 'FA', name: 'فارسی' },
      { key: 'KU', name: 'کوردی' },
      { key: 'AR', name: 'العربية' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
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
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  
    const sectionIdMap: { [key in Page]?: string } = {
        [Page.CoreTechnologies]: 'core-technologies-section',
        [Page.InnovationHub]: 'innovation-hub-section',
        [Page.Projects]: 'projects-section',
        [Page.News]: 'news-insights-section',
    };

    const sectionId = sectionIdMap[page];

    if (currentPage === Page.Home && sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
        setPage(page);
    }
  };
  
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const query = e.currentTarget.search.value;
      onSearch(query);
      setIsSearchOpen(false);
  }

  const selectedLangName = languages.find(l => l.key === language)?.name || 'English';
  
  const headerBaseClasses = "sticky top-0 z-50 transition-all duration-300";
  const headerBgClass = isTransparent ? "bg-transparent" : "bg-white dark:bg-slate-900";
  const headerShadowClass = !isTransparent && isScrolled ? "shadow-lg dark:shadow-slate-800/50" : "";
  const showWhiteLogo = isTransparent || (!isTransparent && theme === 'dark');

  return (
    <header className={`${headerBaseClasses} ${headerBgClass} ${headerShadowClass}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setPage(Page.Home)} className="flex items-center text-primary" aria-label="Go to Home page">
            {showWhiteLogo ? <KkmLogoWhite /> : <KkmLogo />}
          </button>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_LINKS.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`px-3 py-2 lg:px-4 font-display font-semibold text-sm rounded-md transition-colors duration-200 ${
                    isTransparent 
                        ? (currentPage === link.name ? 'text-white border-b-2 border-white' : 'text-white hover:text-gray-200')
                        : (currentPage === link.name ? 'text-white bg-text-dark' : 'text-text-dark dark:text-white hover:text-accent-yellow dark:hover:text-accent-yellow')
                }`}
              >
                {t(link.name)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
             <div className="relative" ref={langMenuRef}>
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-semibold ${isTransparent ? 'text-white hover:bg-white/10' : 'text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700'} rounded-md transition-colors`}
                  aria-haspopup="true"
                  aria-expanded={isLangMenuOpen}
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
                        className="absolute top-full end-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-md shadow-lg z-20 border dark:border-slate-700"
                        role="menu"
                    >
                        <ul className="py-1">
                            {languages.map(lang => (
                            <li key={lang.key}>
                                <button
                                role="menuitem"
                                onClick={() => {
                                    setLanguage(lang.key);
                                    setIsLangMenuOpen(false);
                                }}
                                className="w-full text-start px-4 py-2 text-sm text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700"
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
             <ThemeToggle />
             <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 ${isTransparent ? 'text-white hover:text-white' : 'text-primary dark:text-secondary hover:text-accent-yellow'} transition-colors duration-200`} aria-label="Open search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            <button onClick={() => handleNavClick(Page.Contact)} className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-accent-yellow rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
                {t('GetInTouch')}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={isTransparent ? 'text-white' : 'text-primary dark:text-white'} aria-label="Open menu" aria-expanded={isMenuOpen} aria-controls="mobile-menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${isTransparent ? 'bg-text-dark/95 backdrop-blur-sm' : 'dark:bg-slate-900'}`}
          >
            <div className="flex flex-col space-y-2 p-4">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                  onClick={() => handleNavClick(link.name)}
                  className={`block px-4 py-2 text-start font-display font-semibold rounded-md transition-colors duration-200 ${
                    currentPage === link.name 
                        ? 'bg-secondary/20 text-primary dark:bg-secondary/30 dark:text-secondary font-bold' 
                        : (isTransparent 
                            ? 'text-white hover:bg-white/10' 
                            : 'text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800')
                  }`}
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
            className="absolute top-full left-0 w-full bg-white dark:bg-slate-800 shadow-lg dark:border-b dark:border-slate-700"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input type="search" name="search" placeholder={t('SearchPlaceholder')} autoFocus className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-full shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary dark:text-white" />
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
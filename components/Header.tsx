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
    <svg width="100" height="120" viewBox="0 0 170 205" className="h-14 md:h-16 w-auto">
        <defs>
            <linearGradient id="logoSwooshDark" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#00529B" />
                <stop offset="100%" stopColor="#002D56" />
            </linearGradient>
            <linearGradient id="logoSwooshLight" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#89CFF0" />
                <stop offset="100%" stopColor="#0A92EF" />
            </linearGradient>
            <radialGradient id="logoSphereGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFC107" />
            </radialGradient>
        </defs>
        <g>
            {/* The main graphic part of the logo */}
            <path d="M82.8,141.8C55.3,141.8,32.4,127.2,19.3,103.1C-3,60.8,13.2,7.7,55.5,17.1c9.3-11.4,24.4-18.4,41-17 c31.1,2.6,53.2,29.9,50.6,61c-2,24-19.8,44.7-42.6,50.8C96.7,115.1,89.5,127.9,82.8,141.8z" fill="url(#logoSwooshDark)" />
            <path d="M146.4,61.1c2.6-31.1-19.5-58.4-50.6-61c10.1,1.1,19.5,5.6,26.8,12.9c32.7,32.7,21.5,88.9-24.9,103.7 c-9.9,3.1-20.2,3.1-30,0.1c-0.2-1.9-0.4-3.8-0.5-5.7C90.3,101,114.6,83.9,122,58.8C126.1,45,123.8,30.3,115.7,19.3 c10.3,4.6,18.5,13.2,22.7,24.3C142.1,52.9,144.9,57.1,146.4,61.1z" fill="url(#logoSwooshLight)" />
            <circle cx="100" cy="98" r="32" fill="url(#logoSphereGradient)" />
        </g>
        <text
            x="85"
            y="170"
            className="fill-text-dark dark:fill-white"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', fontSize: '38px', textAnchor: 'middle' }}
        >
            K.K.M.
        </text>
        <text
            x="85"
            y="195"
            className="fill-text-dark dark:fill-white"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '20px', textAnchor: 'middle', letterSpacing: '0.5px' }}
        >
            INTERNATIONAL
        </text>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ currentPage, setPage, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [currentPage]);
  
  useEffect(() => {
      if(isSearchOpen) {
          searchInputRef.current?.focus();
      }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const NavLink: React.FC<{ page: Page, isMobile?: boolean }> = ({ page, isMobile = false }) => (
    <button
      onClick={() => setPage(page)}
      className={`transition-colors duration-200 ${isMobile ? 'block w-full text-left px-3 py-2 rounded-md text-base' : 'px-3 py-2 rounded-md text-sm'} font-medium ${
        currentPage === page
          ? 'text-primary dark:text-secondary font-bold'
          : 'text-text-dark dark:text-slate-200 hover:text-primary dark:hover:text-secondary'
      }`}
    >
      {t(page)}
    </button>
  );

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled || isMenuOpen || isSearchOpen ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => setPage(Page.Home)} className="block logo-container" aria-label="Go to Home page">
              <KkmLogo />
            </button>
            <p className="text-center text-[10px] italic text-text-light dark:text-slate-400 -mt-3 hidden md:block">{t('FooterSlogan')}</p>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map(link => <NavLink key={link.name} page={link.name} />)}
          </nav>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle search bar">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>
            
            <div className="relative group">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13-4-4-4 4M19 17v.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="hidden sm:inline text-sm font-medium text-text-dark dark:text-slate-200">{language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                    {(['EN', 'FA', 'KU', 'AR'] as Language[]).map(lang => (
                        <button key={lang} onClick={() => setLanguage(lang)} className="block px-4 py-2 text-sm text-text-dark dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 w-full text-left">
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors" aria-controls="mobile-menu" aria-expanded={isMenuOpen}>
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <form onSubmit={handleSearchSubmit} className="py-4">
                <div className="relative">
                  <input ref={searchInputRef} type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('SearchPlaceholder')} className="w-full pl-4 pr-20 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary" />
                  <button type="submit" className="absolute inset-y-0 right-0 px-6 font-bold text-sm text-primary dark:text-secondary hover:text-accent-yellow dark:hover:text-accent-yellow">
                    {t('Search')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 dark:bg-slate-900/80 border-t border-gray-200 dark:border-slate-700">
              {NAV_LINKS.map(link => <NavLink key={link.name} page={link.name} isMobile />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
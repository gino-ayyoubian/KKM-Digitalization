import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  onSearch: (query: string) => void;
}

const KkmLogo: React.FC = () => (
    <svg width="100" height="120" viewBox="0 0 133 160" className="h-14 md:h-16 w-auto">
        <defs>
            <linearGradient id="logoBlueGradientOuter" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#007CC8" />
                <stop offset="100%" stopColor="#002D56" />
            </linearGradient>
            <linearGradient id="logoBlueGradientInner" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#00A9E0" />
                <stop offset="100%" stopColor="#007CC8" />
            </linearGradient>
            <radialGradient id="logoSphereGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#FFD200" />
                <stop offset="100%" stopColor="#F7971E" />
            </radialGradient>
        </defs>
        <g transform="translate(10, 0)">
            {/* Outer Swoosh */}
            <path 
                d="M56.5,110 C-10,80 15,25 51.5,5 C40,40 45,75 56.5,105 C75,70 80,45 61.5,15 C100,45 105,85 56.5,110 Z"
                fill="url(#logoBlueGradientOuter)"
            />
            {/* Inner Swoosh */}
            <path 
                d="M61,108 C45,80 75,40 81,10 C85,45 80,75 61,108 Z"
                fill="url(#logoBlueGradientInner)"
                transform="translate(-15, -4)"
            />
            {/* Sphere */}
            <circle cx="66.5" cy="74" r="22" fill="url(#logoSphereGradient)" />
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
  const [selectedLang, setSelectedLang] = useState('English');
  const langMenuRef = useRef<HTMLDivElement>(null);

  const languages = ['English', 'Persian', 'Kurdish', 'Arabic'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
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
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-sm' : 'bg-white'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setPage(Page.Home)} className="flex items-center text-primary">
            <KkmLogo />
          </button>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_LINKS.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`px-3 py-2 lg:px-4 font-display font-semibold text-sm rounded-md transition-colors duration-200 ${currentPage === link.name ? 'text-white bg-text-dark' : 'text-text-dark hover:text-accent'}`}
              >
                {link.name}
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
                    <span className="hidden sm:inline">{selectedLang}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isLangMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-20 border">
                        <ul className="py-1">
                            {languages.map(lang => (
                            <li key={lang}>
                                <button
                                onClick={() => {
                                    setSelectedLang(lang);
                                    setIsLangMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-text-dark hover:bg-gray-100"
                                >
                                {lang}
                                </button>
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
             <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-primary hover:text-accent transition-colors duration-200" aria-label="Open search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            <button onClick={() => handleNavClick(Page.Contact)} className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-accent rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
                Get in Touch
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.name)}
                  className={`block px-4 py-2 text-left font-display font-semibold rounded-md ${currentPage === link.name ? 'bg-primary text-white' : 'text-text-dark hover:bg-gray-100'}`}
                >
                  {link.name}
                </button>
              ))}
               <button onClick={() => handleNavClick(Page.Contact)} className="w-full mt-2 inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-accent rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
                    Get in Touch
                </button>
            </div>
          </div>
        )}
      </nav>
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <input type="search" name="search" placeholder="Search KKM International..." autoFocus className="w-full px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary" />
                    <button type="submit" className="px-5 py-2.5 text-base font-medium text-center text-white bg-primary rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300">Search</button>
                </form>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
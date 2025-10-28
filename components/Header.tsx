
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const KkmLogo: React.FC = () => (
    <svg width="60" height="60" viewBox="0 0 100 100" className="h-10 w-auto md:h-12">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0DA5E7', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#124368', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F68F00', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFC533', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path d="M50 10 C 20 50, 20 80, 50 90 C 80 80, 80 50, 50 10 Z" fill="url(#logoGradient)" transform="rotate(-15 50 50)"/>
        <path d="M50 20 C 30 55, 35 75, 50 85 C 65 75, 70 55, 50 20 Z" fill="#F8F9FA" opacity="0.2" transform="rotate(-15 50 50)"/>
        <circle cx="60" cy="60" r="12" fill="url(#sunGradient)"/>
    </svg>
);


const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-lg backdrop-blur-sm' : 'bg-white'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setPage(Page.Home)} className="flex items-center space-x-2 text-primary">
            <KkmLogo />
            <span className="font-display font-bold text-xl hidden sm:inline">K.K.M. International</span>
          </button>

          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`px-4 py-2 font-display font-semibold text-sm rounded-md transition-colors duration-200 ${currentPage === link.name ? 'text-white bg-primary' : 'text-text-dark hover:text-accent'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
          
          <button onClick={() => handleNavClick(Page.Contact)} className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-base font-medium text-center text-white bg-accent rounded-full hover:bg-secondary focus:ring-4 focus:ring-blue-300 transition-colors duration-300">
              Get in Touch
          </button>

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
    </header>
  );
};

export default Header;

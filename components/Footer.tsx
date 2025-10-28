
import React from 'react';
import { Page } from '../types';

interface FooterProps {
    setPage: (page: Page) => void;
}

const KkmLogoWhite: React.FC = () => (
    <svg width="60" height="60" viewBox="0 0 100 100" className="h-10 w-auto md:h-12">
        <defs>
            <linearGradient id="logoGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#0DA5E7', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="sunGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#F68F00', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFC533', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path d="M50 10 C 20 50, 20 80, 50 90 C 80 80, 80 50, 50 10 Z" fill="url(#logoGradientFooter)" transform="rotate(-15 50 50)"/>
        <circle cx="60" cy="60" r="12" fill="url(#sunGradientFooter)"/>
    </svg>
);

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    const quickLinks = [Page.Home, Page.AboutUs, Page.CoreTechnologies, Page.Projects];
    const engagementLinks = [Page.Careers, Page.InnovationHub, Page.News, Page.Contact];

    const FooterLink: React.FC<{page: Page}> = ({ page, children }) => (
        <li>
            <button onClick={() => setPage(page)} className="text-gray-400 hover:text-white transition-colors duration-200">
                {children || page}
            </button>
        </li>
    );

    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <button onClick={() => setPage(Page.Home)} className="flex items-center space-x-2">
                             <KkmLogoWhite />
                            <span className="font-display font-bold text-xl">K.K.M. International</span>
                        </button>
                        <p className="mt-4 text-gray-400 text-sm">Engineering a sustainable future, together.</p>
                    </div>
                    <div>
                        <h3 className="font-display font-semibold tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                           {quickLinks.map(page => <FooterLink key={page} page={page}/>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-display font-semibold tracking-wider uppercase">Engagement</h3>
                        <ul className="mt-4 space-y-2">
                           {engagementLinks.map(page => <FooterLink key={page} page={page}/>)}
                        </ul>
                    </div>
                    <div>
                         <h3 className="font-display font-semibold tracking-wider uppercase">Connect With Us</h3>
                        <p className="mt-4 text-gray-400 text-sm">Qeshm Free Zone, Iran</p>
                        <p className="text-gray-400 text-sm">info@kkm-intl.org</p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} KKM International Group. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-500 hover:text-white text-sm">Privacy Policy</button>
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-500 hover:text-white text-sm">Terms of Use</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

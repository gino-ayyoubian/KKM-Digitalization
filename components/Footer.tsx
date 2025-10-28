

import React from 'react';
import { Page } from '../types';

interface FooterProps {
    setPage: (page: Page) => void;
}

const KkmLogoWhite: React.FC = () => (
    <svg width="100" height="120" viewBox="0 0 133 160" className="h-14 md:h-16 w-auto">
        <defs>
            <radialGradient id="logoSphereGradientFooter" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#FFD200" />
                <stop offset="100%" stopColor="#F7971E" />
            </radialGradient>
        </defs>
        <g transform="translate(10, 0)">
            {/* Outer Swoosh */}
            <path 
                d="M56.5,110 C-10,80 15,25 51.5,5 C40,40 45,75 56.5,105 C75,70 80,45 61.5,15 C100,45 105,85 56.5,110 Z"
                fill="white"
            />
            {/* Inner Swoosh */}
            <path 
                d="M61,108 C45,80 75,40 81,10 C85,45 80,75 61,108 Z"
                fill="white"
                transform="translate(-15, -4)"
            />
            {/* Sphere */}
            <circle cx="66.5" cy="74" r="22" fill="url(#logoSphereGradientFooter)" />
        </g>
        <text x="66.5" y="132" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="22" fill="white" textAnchor="middle">K.K.M.</text>
        <text x="66.5" y="150" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="13" fill="white" textAnchor="middle" letterSpacing="0.5">INTERNATIONAL</text>
    </svg>
);

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    const quickLinks = [Page.Home, Page.AboutUs, Page.CoreTechnologies, Page.Projects];
    const engagementLinks = [Page.Careers, Page.InnovationHub, Page.News, Page.Contact, Page.InternalPortal];

    // Fix: Explicitly define children prop for FooterLink component. In newer versions of @types/react, React.FC does not implicitly include children.
    const FooterLink: React.FC<{page: Page; children?: React.ReactNode}> = ({ page, children }) => (
        <li>
            <button onClick={() => setPage(page)} className="text-gray-400 hover:text-white transition-colors duration-200">
                {children || page}
            </button>
        </li>
    );

    return (
        <footer className="bg-text-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <button onClick={() => setPage(Page.Home)} className="flex items-center">
                             <KkmLogoWhite />
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
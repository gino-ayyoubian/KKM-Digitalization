import React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
    setPage: (page: Page) => void;
}

const KkmLogoWhite: React.FC = () => (
    <svg width="100" height="120" viewBox="0 0 133 160" className="h-14 md:h-16 w-auto">
        <defs>
            <radialGradient id="logoSphereGradientFooter" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="#FFC107"/>
            </radialGradient>
        </defs>
        <g transform="translate(10, 0)">
            {/* Outer Flame Path (Optimized) */}
            <path
                d="M53.1,108.3C55.6,83.8,42.5,63.4,29.7,51.7C15.2,38.5,6.5,23.3,13.2,9.3c2.4-5,7.9-8.1,13.7-7.2c16,2.5,26.4,16.5,31.3,29.2c10.3,26.8,3.2,59.2-7.2,84.1C50.2,107,49.6,107.8,48.9,108.3H53.1z"
                fill="white"
            />
            {/* Inner Flame Path (Optimized) */}
            <path
                d="M66.5,108.3c15.8-15.1,23.6-36.4,22.8-57c-1-25.5-18.4-48.4-40.1-55.5c-4.9-1.6-10.1-1.9-15.1-1.3c-4.1,0.5-7.1,2.8-6.9,6.2c0.2,3.8,3.4,6.1,7.2,7.1c17.5,4.5,31.2,19.8,32.7,37.9c2,22.1-7.2,43.5-22.6,58.7c2.1,0.6,4,1,6,1C56.1,109.5,61.4,109.2,66.5,108.3z"
                fill="white"
            />
            {/* Sphere */}
            <circle cx="66.5" cy="74" r="22" fill="url(#logoSphereGradientFooter)"/>
        </g>
        <text x="66.5" y="132" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="22" fill="white" textAnchor="middle">K.K.M.</text>
        <text x="66.5" y="150" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="13" fill="white" textAnchor="middle" letterSpacing="0.5">INTERNATIONAL</text>
    </svg>
);

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const quickLinks = [Page.Home, Page.AboutUs, Page.CoreTechnologies, Page.Futures, Page.Projects];
    const engagementLinks = [Page.Careers, Page.InnovationHub, Page.News, Page.Contact, Page.InternalPortal];

    const FooterLink: React.FC<{page: Page; children?: React.ReactNode}> = ({ page, children }) => (
        <li>
            <button onClick={() => setPage(page)} className="text-gray-400 hover:text-white transition-colors duration-200">
                {children || t(page)}
            </button>
        </li>
    );

    return (
        <footer className="bg-text-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <button onClick={() => setPage(Page.Home)} className="flex items-center" aria-label="Go to Home page">
                             <KkmLogoWhite />
                        </button>
                        <p className="mt-4 text-gray-400 text-sm">{t('FooterSlogan')}</p>
                    </div>
                    <div>
                        <h3 className="font-display font-semibold tracking-wider uppercase">{t('QuickLinks')}</h3>
                        <ul className="mt-4 space-y-2">
                           {quickLinks.map(page => <FooterLink key={page} page={page}/>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-display font-semibold tracking-wider uppercase">{t('Engagement')}</h3>
                        <ul className="mt-4 space-y-2">
                           {engagementLinks.map(page => <FooterLink key={page} page={page}/>)}
                        </ul>
                    </div>
                    <div>
                         <h3 className="font-display font-semibold tracking-wider uppercase">{t('ConnectWithUs')}</h3>
                        <p className="mt-4 text-gray-400 text-sm">Qeshm Free Zone, Iran</p>
                        <p className="text-gray-400 text-sm">info@kkm-intl.org</p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} KKM International Group. {t('AllRightsReserved')}</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-500 hover:text-white text-sm">{t('PrivacyPolicy')}</button>
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-500 hover:text-white text-sm">{t('TermsOfUse')}</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
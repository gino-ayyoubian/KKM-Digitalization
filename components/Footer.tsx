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
            {/* Outer Swoosh */}
            <path d="M66.5,108.3c-2.2-22.3-19.3-43.2-34.5-54.3C14,44.2,2.8,27.7,11.3,12.5c2.3-4.1,6.5-6.7,11.3-7.5 C40-1.2,50.8,11.5,56,23.3c11,25.3,4.2,55.5-3,81.2C52,106.3,51,107.5,49.8,108.3z" fill="white"/>
            {/* Inner Swoosh */}
            <path d="M66.5,108.3c13.2-14.3,21.5-32.9,21.1-51.5c-0.5-23-16-43.9-35.3-51.8c-4.1-1.7-8.5-2.1-12.7-1.7 c-3.5,0.3-6,1.8-6.1,4.7c-0.2,3.3,2.4,5.4,5.8,6.2c16.1,3.7,28.4,17.4,30.3,33.5c2.4,20-5.7,39.5-19.5,53.4 C58.6,108.8,59.9,109.5,61.1,109.5C62.9,109.5,64.8,109.1,66.5,108.3z" fill="white"/>
            {/* Sphere */}
            <circle cx="66.5" cy="74" r="22" fill="url(#logoSphereGradientFooter)"/>
        </g>
        <text x="66.5" y="132" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="22" fill="white" textAnchor="middle">K.K.M.</text>
        <text x="66.5" y="150" fontFamily="Montserrat, sans-serif" fontWeight="bold" fontSize="13" fill="white" textAnchor="middle" letterSpacing="0.5">INTERNATIONAL</text>
    </svg>
);

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const quickLinks = [Page.Home, Page.AboutUs, Page.CoreTechnologies, Page.Projects];
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
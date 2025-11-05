import React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
    setPage: (page: Page) => void;
}

const KkmLogoWhite: React.FC = () => (
    <svg width="100" height="120" viewBox="0 0 170 205" className="h-14 md:h-16 w-auto">
        <defs>
            <radialGradient id="logoSphereGradientFooter" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="#FFC107"/>
            </radialGradient>
        </defs>
        <g>
            {/* The main graphic part of the logo */}
            <path d="M82.8,141.8C55.3,141.8,32.4,127.2,19.3,103.1C-3,60.8,13.2,7.7,55.5,17.1c9.3-11.4,24.4-18.4,41-17 c31.1,2.6,53.2,29.9,50.6,61c-2,24-19.8,44.7-42.6,50.8C96.7,115.1,89.5,127.9,82.8,141.8z" fill="white" />
            <path d="M146.4,61.1c2.6-31.1-19.5-58.4-50.6-61c10.1,1.1,19.5,5.6,26.8,12.9c32.7,32.7,21.5,88.9-24.9,103.7 c-9.9,3.1-20.2,3.1-30,0.1c-0.2-1.9-0.4-3.8-0.5-5.7C90.3,101,114.6,83.9,122,58.8C126.1,45,123.8,30.3,115.7,19.3 c10.3,4.6,18.5,13.2,22.7,24.3C142.1,52.9,144.9,57.1,146.4,61.1z" fill="white" />
            <circle cx="100" cy="98" r="32" fill="url(#logoSphereGradientFooter)" />
        </g>
        <text
            x="85"
            y="170"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', fontSize: '38px', textAnchor: 'middle', fill: 'white' }}
        >
            K.K.M.
        </text>
        <text
            x="85"
            y="195"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700', fontSize: '20px', textAnchor: 'middle', letterSpacing: '0.5px', fill: 'white' }}
        >
            INTERNATIONAL
        </text>
    </svg>
);

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const quickLinks = [Page.Home, Page.AboutUs, Page.CoreTechnologies, Page.Futures, Page.Projects];
    const engagementLinks = [Page.Careers, Page.InnovationHub, Page.News, Page.Contact, Page.InternalPortal];

    const FooterLink: React.FC<{page: Page; children?: React.ReactNode}> = ({ page, children }) => (
        <li>
            <button onClick={() => setPage(page)} className="text-gray-200 hover:text-white transition-colors duration-200">
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
                        <p className="mt-4 text-gray-300 text-sm">{t('FooterSlogan')}</p>
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
                        <p className="mt-4 text-gray-300 text-sm font-semibold">{t('HeadOffice')}</p>
                        <p className="mt-1 text-gray-300 text-sm">{t('TehranOfficeAddress')}</p>
                        <p className="mt-1 text-gray-300 text-sm">{t('CompanyPhone')}</p>
                        <p className="mt-2 text-gray-300 text-sm"><a href="mailto:info@kkm-intl.org" className="hover:text-white">info@kkm-intl.org</a></p>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm text-center md:text-left order-3 md:order-1 mt-4 md:mt-0">&copy; {new Date().getFullYear()} KKM International Group. {t('AllRightsReserved')}</p>
                    <div className="flex space-x-4 order-2">
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-300 hover:text-white text-sm">{t('PrivacyPolicy')}</button>
                         <button onClick={() => setPage(Page.Legal)} className="text-gray-300 hover:text-white text-sm">{t('TermsOfUse')}</button>
                    </div>
                    <div className="flex space-x-4 order-1 md:order-3">
                        <a href="https://www.linkedin.com/company/kkm-international-group/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-300 hover:text-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="text-gray-300 hover:text-white transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.045 6.817h-3.308l7.746-8.875-7.492-10.62h6.617l4.636 6.518 5.549-6.518zm-1.465 18.885h2.32l-10.45-14.12h-2.14l10.27 14.12z"/></svg>
                        </a>
                        <a href="https://www.facebook.com/KKM.International.Group/" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile" className="text-gray-300 hover:text-white transition-colors duration-200">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
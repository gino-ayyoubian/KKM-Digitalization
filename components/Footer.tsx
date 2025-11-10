import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import type { TranslationKey } from '../translations';

interface FooterProps {
    setPage: (page: Page) => void;
}

const KkmLogoWhite: React.FC = () => (
    <svg width="100" height="120" viewBox="0 0 170 215" className="h-14 md:h-16 w-auto" aria-labelledby="kkm-logo-title-footer">
        <title id="kkm-logo-title-footer">KKM International Group Logo</title>
        <defs>
            <radialGradient id="logoSphereGradientFooter" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#FFD700"/>
                <stop offset="100%" stopColor="#FFC107"/>
            </radialGradient>
        </defs>
        <g transform="translate(0, 10)">
            <path d="M76.3 150.3C34.2 147.1 3.5 113.8 9.2 72.3C14.8 30.8 52.8 0.1 94.9 3.3C137 6.4 167.7 39.7 162.1 81.2C158.4 107.9 141.2 131.5 117.8 141.6C103.6 147.9 88.6 151.3 76.3 150.3Z" fill="white"/>
            <path d="M152.5 73.1C152.5 53.6 143.1 35.8 127.8 24.8C110.1 12.1 87.1 8.8 66.8 15.6C41.7 23.9 24.8 45.4 22.1 71.9C21.3 80.2 22.8 88.5 26.2 96C40.1 66.7 72.8 53.8 102.1 67.7C124.7 78.4 138.8 100.7 138.8 125.6C148.1 110.8 152.5 92.6 152.5 73.1Z" fill="white" opacity="0.8"/>
            <circle cx="115" cy="98" r="33" fill="url(#logoSphereGradientFooter)"/>
        </g>
        <text
            x="85"
            y="180"
            textAnchor="middle"
            fontSize="38"
            fontFamily="Montserrat, sans-serif"
            fontWeight="800"
            fill="white"
        >
            K.K.M.
        </text>
        <text
            x="85"
            y="205"
            textAnchor="middle"
            fontSize="20"
            fontFamily="Montserrat, sans-serif"
            fontWeight="700"
            fill="white"
        >
            INTERNATIONAL
        </text>
    </svg>
);

const FooterLink: React.FC<{
    page: Page;
    setPage: (page: Page) => void;
    t: (key: TranslationKey, options?: { [key: string]: string | number }) => string;
    children?: React.ReactNode;
}> = ({ page, setPage, t, children }) => (
    <li>
        <button onClick={() => setPage(page)} className="text-gray-200 hover:text-white transition-colors duration-200">
            {children || t(page as TranslationKey)}
        </button>
    </li>
);

const Footer: React.FC<FooterProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const quickLinks = [Page.Home, Page.AboutUs, Page.CoreTechnologies, Page.Futures, Page.Projects];
    const engagementLinks = [Page.Careers, Page.InnovationHub, Page.News, Page.Contact, Page.InternalPortal];

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
                           {quickLinks.map(page => <FooterLink key={page} page={page} setPage={setPage} t={t} />)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-display font-semibold tracking-wider uppercase">{t('Engagement')}</h3>
                        <ul className="mt-4 space-y-2">
                           {engagementLinks.map(page => <FooterLink key={page} page={page} setPage={setPage} t={t} />)}
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
                    <div className="order-1 md:order-3">
                        <div className="flex space-x-4">
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
            </div>
        </footer>
    );
};

export default Footer;
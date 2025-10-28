import React from 'react';
// FIX: Import the `Page` enum to use it as a valid translation key.
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const InnovationStep: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex">
        <div className="flex flex-col items-center me-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full border-secondary text-secondary font-bold">
                    {number}
                </div>
            </div>
            <div className="w-px h-full bg-gray-300"></div>
        </div>
        <div className="pb-8">
            <p className="mb-2 text-xl font-display font-bold text-primary">{title}</p>
            <p className="text-text-light">{children}</p>
        </div>
    </div>
);

const InnovationHubPage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div>
            {/* FIX: Replaced the raw string 'Innovation & Ideation Hub' with the correct `Page.InnovationHub` enum key for translation. */}
            <PageHeader title={t(Page.InnovationHub)} subtitle={t('InnovationHubPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-primary mb-6">{t('OurProcessTitle')}</h2>
                        <div className="flex flex-col">
                            <InnovationStep number="1" title={t('InnovationStep1Title')}>
                                {t('InnovationStep1Text')}
                            </InnovationStep>
                             <InnovationStep number="2" title={t('InnovationStep2Title')}>
                                {t('InnovationStep2Text')}
                            </InnovationStep>
                             <InnovationStep number="3" title={t('InnovationStep3Title')}>
                                {t('InnovationStep3Text')}
                            </InnovationStep>
                             <InnovationStep number="4" title={t('InnovationStep4Title')}>
                                {t('InnovationStep4Text')}
                            </InnovationStep>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <img src="https://picsum.photos/seed/innovation/500/300" alt="Collaborative workshop" className="rounded-lg mb-6 mx-auto"/>
                        <h3 className="text-2xl font-display font-bold text-primary">{t('HaveVisionaryIdea')}</h3>
                        <p className="mt-4 text-text-light">{t('AcceleratorProgramPitch')}</p>
                        <button className="mt-6 px-8 py-3 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-colors duration-300">
                            {t('SubmitYourIdea')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnovationHubPage;
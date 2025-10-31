import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import { TranslationKey } from '../translations';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for a leadership member
type OrgMember = {
    name: TranslationKey;
    role: TranslationKey;
    desc: TranslationKey;
}

// Data for the executive leadership team
const executiveLeadership: OrgMember[] = [
    { name: 'GinoAyyoubian', role: 'CEO', desc: 'CEODesc' },
    { name: 'DrRezaAsakereh', role: 'CTO', desc: 'CTODesc' },
    { name: 'DrKhosroJarrahian', role: 'CSO', desc: 'CSODesc' },
    { name: 'FaridImani', role: 'CIO', desc: 'CIODesc' },
    { name: 'DrPedramAbdarzadeh', role: 'CFO', desc: 'CFODesc' },
    { name: 'HeidarYarveicy', role: 'COO', desc: 'COODesc' },
];

const topLeadership = executiveLeadership.slice(0, 3);
const seniorManagement = executiveLeadership.slice(3);


interface AboutUsPageProps {
    setPage: (page: Page) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [isSeniorManagementVisible, setIsSeniorManagementVisible] = useState(false);

  return (
    <div>
        <PageHeader title={t(Page.AboutUs)} subtitle={t('AboutUsPageSubtitle')}/>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 sticky top-20 z-10">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md rounded-lg p-4 flex flex-wrap justify-center gap-4 sm:gap-8">
                <a href="#overview" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('CompanyOverview')}</a>
                <a href="#governance" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('LeadershipGovernance')}</a>
                <a href="#roles" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('StrategicRoles')}</a>
            </div>
        </div>
        
        <Section title={t('CompanyOverview')} id="overview" className="bg-white dark:bg-slate-800">
            <p>{t('CompanyOverviewText')}</p>
        </Section>

        <Section title="" id="mission-vision">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-4">{t('OurMission')}</h3>
                    <p className="text-text-light">{t('MissionText')}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-4">{t('OurVision')}</h3>
                    <p className="text-text-light">{t('VisionText')}</p>
                </div>
            </div>
        </Section>

        <Section title={t('LeadershipGovernance')} id="governance" className="bg-white dark:bg-slate-800">
            <p className="mb-8">Our leadership team comprises seasoned executives, world-class engineers, and visionary strategists with decades of experience in their respective fields. They guide our company with a steady hand, ensuring ethical governance, operational excellence, and a culture of continuous innovation. We are committed to transparency and accountability in all our engagements.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {topLeadership.map(member => (
                    <div key={member.name} className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg shadow-md text-center transform hover:-translate-y-1 transition-transform duration-300">
                         <img 
                            src={`https://i.pravatar.cc/150?u=${member.name}`} 
                            alt={t(member.name)}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-secondary/50" 
                        />
                        <h4 className="font-display font-bold text-2xl text-primary dark:text-white">{t(member.name)}</h4>
                        <p className="text-secondary dark:text-accent-yellow text-lg font-semibold">{t(member.role)}</p>
                        <p className="text-sm text-text-light dark:text-slate-300 mt-2">{t(member.desc)}</p>
                    </div>
                ))}
            </div>

            <div className="text-center border-t pt-8">
                <button
                    onClick={() => setIsSeniorManagementVisible(!isSeniorManagementVisible)}
                    className="px-6 py-3 font-bold text-primary dark:text-white bg-gray-100 dark:bg-slate-700 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300 flex items-center mx-auto gap-2"
                    aria-expanded={isSeniorManagementVisible}
                >
                    {t('SeniorManagementTeam')}
                     <motion.svg
                        animate={{ rotate: isSeniorManagementVisible ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </button>
                <AnimatePresence>
                    {isSeniorManagementVisible && (
                         <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: '2rem' }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {seniorManagement.map(member => (
                                    <div key={member.name} className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg shadow text-center">
                                         <img 
                                            src={`https://i.pravatar.cc/150?u=${member.name}`} 
                                            alt={t(member.name)}
                                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-secondary/50" 
                                        />
                                        <h4 className="font-display font-bold text-xl text-primary dark:text-white">{t(member.name)}</h4>
                                        <p className="text-secondary dark:text-accent-yellow font-semibold">{t(member.role)}</p>
                                        <p className="text-sm text-text-light dark:text-slate-300 mt-2">{t(member.desc)}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Section>
        
        <Section title={t('StrategicRoles')} id="roles">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-display font-semibold text-secondary mb-2">Regional Engagements</h3>
                    <p>We actively partner with local governments and communities to develop projects that are tailored to their unique needs. From the energy villages in Qeshm to infrastructure development in Kurdistan, our work is deeply rooted in regional context and collaboration.</p>
                </div>
                <div>
                    <h3 className="text-xl font-display font-semibold text-secondary mb-2">Institutional Collaborations</h3>
                    <p>We believe in the power of partnership. KKM collaborates with leading universities, research institutions, and technology firms to accelerate the development of new solutions and bring them to market faster. These collaborations are the lifeblood of our Innovation & Ideation Hub.</p>
                </div>
            </div>
        </Section>

        <Section title={t('AboutKKM')} id="about-kkm" className="bg-white dark:bg-slate-800">
            <p>{t('AboutKKMText')}</p>
            <div className="mt-8 text-center">
                <button
                    onClick={() => setPage(Page.Careers)}
                    className="px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
                >
                    {t('ExploreCareers')}
                </button>
            </div>
        </Section>
    </div>
  );
};

export default AboutUsPage;
import React, { useState, useEffect } from 'react';
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

const testimonials: { quote: TranslationKey; name: TranslationKey; company: TranslationKey; image: string }[] = [
    { quote: 'TestimonialQuote1', name: 'TestimonialName1', company: 'TestimonialCompany1', image: 'https://i.pravatar.cc/100?u=client1' },
    { quote: 'TestimonialQuote2', name: 'TestimonialName2', company: 'TestimonialCompany2', image: 'https://i.pravatar.cc/100?u=client2' },
    { quote: 'TestimonialQuote3', name: 'TestimonialName3', company: 'TestimonialCompany3', image: 'https://i.pravatar.cc/100?u=client3' }
];

const awards: { name: TranslationKey; year: string; body: TranslationKey; }[] = [
    { name: 'AwardName1', year: '2023', body: 'AwardBody1' },
    { name: 'AwardName2', year: '2022', body: 'AwardBody2' },
    { name: 'AwardName3', year: '2021', body: 'AwardBody3' },
    { name: 'CertificationName1', year: 'Ongoing', body: 'CertificationBody1' }
];


interface AboutUsPageProps {
    setPage: (page: Page) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [isSeniorManagementVisible, setIsSeniorManagementVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000); // Change testimonial every 7 seconds
    return () => clearTimeout(timer);
  }, [currentTestimonial]);


  return (
    <div>
        <PageHeader title={t(Page.AboutUs)} subtitle={t('AboutUsPageSubtitle')}/>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 sticky top-20 z-10">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md rounded-lg p-4 flex flex-wrap justify-center gap-3 sm:gap-6">
                <a href="#overview" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('CompanyOverview')}</a>
                <a href="#governance" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('LeadershipGovernance')}</a>
                <a href="#roles" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('StrategicRoles')}</a>
                <a href="#sustainability" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('SustainabilityCommitments')}</a>
                <a href="#testimonials" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('ClientTestimonials')}</a>
                <a href="#awards" className="font-semibold text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors">{t('AwardsRecognition')}</a>
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
            <p className="mb-8">{t('LeadershipGovernanceText')}</p>
            
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
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-display font-semibold text-secondary mb-2">{t('RegionalEngagements')}</h3>
                    <p>{t('RegionalEngagementsText')}</p>
                </div>
                <div>
                    <h3 className="text-xl font-display font-semibold text-secondary mb-2">{t('PartnershipsCollaborations')}</h3>
                    <p>{t('PartnershipsCollaborationsIntro')}</p>
                    <ul className="list-disc list-inside space-y-2 mt-4 text-text-light">
                        <li><strong>{t('AcademicInstitutions')}:</strong> {t('AcademicInstitutionsText')}</li>
                        <li><strong>{t('TechnologyPartners')}:</strong> {t('TechnologyPartnersText')}</li>
                        <li><strong>{t('ResearchFirms')}:</strong> {t('ResearchFirmsText')}</li>
                    </ul>
                </div>
            </div>
        </Section>

        <Section title={t('SustainabilityCommitments')} id="sustainability" className="bg-white dark:bg-slate-800">
            <p className="mb-8">{t('SustainabilityIntro')}</p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-primary/5 dark:bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-primary mb-2">{t('EnvironmentalStewardship')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-text-light">
                        <li>{t('EnvironmentalPoint1')}</li>
                        <li>{t('EnvironmentalPoint2')}</li>
                        <li>{t('EnvironmentalPoint3')}</li>
                    </ul>
                </div>
                <div className="bg-primary/5 dark:bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-primary mb-2">{t('SocialResponsibility')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-text-light">
                        <li>{t('SocialPoint1')}</li>
                        <li>{t('SocialPoint2')}</li>
                        <li>{t('SocialPoint3')}</li>
                    </ul>
                </div>
                <div className="bg-primary/5 dark:bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-primary mb-2">{t('GovernanceEthics')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-text-light">
                        <li>{t('GovernancePoint1')}</li>
                        <li>{t('GovernancePoint2')}</li>
                        <li>{t('GovernancePoint3')}</li>
                    </ul>
                </div>
            </div>
        </Section>
        
        <Section title={t('ClientTestimonials')} id="testimonials">
            <div className="relative bg-primary/5 dark:bg-slate-900/50 p-8 md:p-12 rounded-lg min-h-[300px] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="text-center max-w-3xl"
                    >
                        <img src={testimonials[currentTestimonial].image} alt={t(testimonials[currentTestimonial].name)} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-secondary" />
                        <blockquote className="text-xl italic text-text-dark dark:text-slate-200">"{t(testimonials[currentTestimonial].quote)}"</blockquote>
                        <cite className="block mt-4 not-italic">
                            <span className="font-bold text-primary dark:text-white">{t(testimonials[currentTestimonial].name)}</span>, 
                            <span className="text-text-light dark:text-slate-400"> {t(testimonials[currentTestimonial].company)}</span>
                        </cite>
                    </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {testimonials.map((_, index) => (
                        <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? 'bg-primary' : 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400'}`} aria-label={`Go to testimonial ${index + 1}`}></button>
                    ))}
                </div>
            </div>
        </Section>

        <Section title={t('AwardsRecognition')} id="awards" className="bg-white dark:bg-slate-800">
            <p className="mb-8">{t('AwardsIntro')}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {awards.map((award, index) => (
                    <div key={index} className="border-l-4 border-accent-yellow pl-4">
                        <p className="font-display font-bold text-lg text-primary">{t(award.name as TranslationKey)}</p>
                        <p className="text-sm text-text-light">{t(award.body as TranslationKey)}, {award.year}</p>
                    </div>
                ))}
            </div>
        </Section>


        <Section title={t('AboutKKM')} id="about-kkm">
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
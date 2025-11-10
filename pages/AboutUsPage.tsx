import * as React from 'react';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import type { TranslationKey } from '../translations';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for a leadership member
type OrgMember = {
    name: TranslationKey;
    role: TranslationKey;
    desc: TranslationKey;
    image?: string;
}

// Data for the executive leadership team
const executiveLeadership: OrgMember[] = [
    { name: 'GinoAyyoubian', role: 'CEO', desc: 'CEODesc', image: 'https://i.imgur.com/lJ4n79b.jpeg' },
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

const history: { year: string; title: TranslationKey; desc: TranslationKey; }[] = [
    { year: '2010', title: 'History2010Title', desc: 'History2010Desc' },
    { year: '2015', title: 'History2015Title', desc: 'History2015Desc' },
    { year: '2020', title: 'History2020Title', desc: 'History2020Desc' },
    { year: '2022', title: 'History2022Title', desc: 'History2022Desc' },
    { year: '2023', title: 'History2023Title', desc: 'History2023Desc' },
];

interface AboutUsPageProps {
    setPage: (page: Page) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [isSeniorManagementVisible, setIsSeniorManagementVisible] = React.useState(false);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState('overview');
  const [expandedHistoryYear, setExpandedHistoryYear] = React.useState<string | null>(history[history.length - 1]?.year ?? null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000); // Change testimonial every 7 seconds
    return () => clearTimeout(timer);
  }, [currentTestimonial]);
  
  const sectionIds = ['overview', 'history', 'governance', 'roles', 'sustainability', 'testimonials', 'awards'];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        {
            rootMargin: `-25% 0px -70% 0px`, // Highlight when section is in the upper part of the viewport
            threshold: 0
        }
    );

    sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    return () => {
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.unobserve(el);
        });
    };
}, []);

  const NavLink: React.FC<{id: string, titleKey: TranslationKey}> = ({id, titleKey}) => (
       <a href={`#${id}`} className={`font-semibold transition-colors ${activeSection === id ? 'text-primary dark:text-secondary font-bold' : 'text-text-light dark:text-slate-300 hover:text-primary dark:hover:text-secondary'}`}>{t(titleKey)}</a>
  );

  return (
    <div>
        <PageHeader title={t(Page.AboutUs)} subtitle={t('AboutUsPageSubtitle')}/>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 sticky top-20 z-10">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md rounded-lg p-4 flex flex-wrap justify-center gap-3 sm:gap-6">
                <NavLink id="overview" titleKey="CompanyOverview" />
                <NavLink id="history" titleKey="OurHistory" />
                <NavLink id="governance" titleKey="LeadershipGovernance" />
                <NavLink id="roles" titleKey="StrategicRoles" />
                <NavLink id="sustainability" titleKey="SustainabilityCommitments" />
                <NavLink id="testimonials" titleKey="ClientTestimonials" />
                <NavLink id="awards" titleKey="AwardsRecognition" />
            </div>
        </div>
        
        <Section title={t('CompanyOverview')} id="overview" className="bg-white dark:bg-slate-800">
            <p>{t('CompanyOverviewText')}</p>
        </Section>

        <Section title="" id="mission-vision" className="bg-white dark:bg-slate-800">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('OurMission')}</h3>
                    <p>{t('MissionText')}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('OurVision')}</h3>
                    <p>{t('VisionText')}</p>
                </div>
            </div>
        </Section>
        
        <Section title={t('OurHistory')} id="history" className="bg-white dark:bg-slate-800">
            <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-slate-700" aria-hidden="true"></div>
                <div className="space-y-4">
                    {history.map((item, index) => {
                        const isOpen = expandedHistoryYear === item.year;
                        return (
                            <div key={index} className="pl-12 relative">
                                <div className="absolute left-4 top-1 -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white dark:border-slate-800"></div>
                                <button
                                    onClick={() => setExpandedHistoryYear(isOpen ? null : item.year)}
                                    className="w-full text-left p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-display font-bold text-xl text-primary dark:text-secondary">{item.year}</p>
                                            <h4 className="font-display font-semibold text-lg text-text-dark dark:text-white mt-1">{t(item.title)}</h4>
                                        </div>
                                        <motion.svg
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </motion.svg>
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={{
                                                open: { opacity: 1, height: 'auto', marginTop: '8px' },
                                                collapsed: { opacity: 0, height: 0, marginTop: '0px' }
                                            }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pb-4 text-sm">{t(item.desc)}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Section>

        <Section title={t('LeadershipGovernance')} id="governance" className="bg-white dark:bg-slate-800">
            <p className="mb-8">{t('LeadershipGovernanceText')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {topLeadership.map(member => (
                    <div key={member.name} className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg shadow-md text-center transform hover:-translate-y-1 transition-transform duration-300">
                         <img 
                            src={member.image || `https://i.pravatar.cc/150?u=${member.name}`} 
                            alt={t(member.name)}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-secondary/50" 
                        />
                        <h4 className="font-display font-bold text-2xl text-primary dark:text-white">{t(member.name)}</h4>
                        <p className="text-secondary dark:text-accent-yellow text-lg font-semibold">{t(member.role)}</p>
                        <p className="text-sm text-text-light dark:text-slate-300 mt-2">{t(member.desc)}</p>
                    </div>
                ))}
            </div>

            <div className="text-center border-t dark:border-slate-700 pt-8">
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
                                            src={member.image || `https://i.pravatar.cc/150?u=${member.name}`} 
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
        
        <Section title={t('StrategicRoles')} id="roles" className="bg-white dark:bg-slate-800">
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-display font-semibold text-secondary mb-2">{t('RegionalEngagements')}</h3>
                    <p>{t('RegionalEngagementsText')}</p>
                </div>
                <div>
                    <h3 className="text-xl font-display font-semibold text-secondary mb-2">{t('PartnershipsCollaborations')}</h3>
                    <p>{t('PartnershipsCollaborationsIntro')}</p>
                    <ul className="list-disc list-inside space-y-2 mt-4 text-text-light dark:text-slate-300">
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
                    <h3 className="font-display font-bold text-xl text-primary dark:text-secondary mb-2">{t('EnvironmentalStewardship')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-text-light dark:text-slate-300">
                        <li>{t('EnvironmentalPoint1')}</li>
                        <li>{t('EnvironmentalPoint2')}</li>
                        <li>{t('EnvironmentalPoint3')}</li>
                    </ul>
                </div>
                <div className="bg-primary/5 dark:bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-primary dark:text-secondary mb-2">{t('SocialResponsibility')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-text-light dark:text-slate-300">
                        <li>{t('SocialPoint1')}</li>
                        <li>{t('SocialPoint2')}</li>
                        <li>{t('SocialPoint3')}</li>
                    </ul>
                </div>
                <div className="bg-primary/5 dark:bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="font-display font-bold text-xl text-primary dark:text-secondary mb-2">{t('GovernanceEthics')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-text-light dark:text-slate-300">
                        <li>{t('GovernancePoint1')}</li>
                        <li>{t('GovernancePoint2')}</li>
                        <li>{t('GovernancePoint3')}</li>
                    </ul>
                </div>
            </div>
        </Section>
        
        <Section title={t('ClientTestimonials')} id="testimonials" className="bg-white dark:bg-slate-800">
            <div className="relative bg-primary/5 dark:bg-slate-900/50 p-8 md:p-12 rounded-lg min-h-[300px] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
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
                        <p className="font-display font-bold text-lg text-primary dark:text-secondary">{t(award.name as TranslationKey)}</p>
                        <p className="text-sm text-text-light dark:text-slate-300">{t(award.body as TranslationKey)}, {award.year}</p>
                    </div>
                ))}
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
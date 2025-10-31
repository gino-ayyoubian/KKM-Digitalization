import React from 'react';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';

interface AboutUsPageProps {
    setPage: (page: Page) => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ setPage }) => {
  const { t } = useLanguage();

  return (
    <div>
        <PageHeader title={t(Page.AboutUs)} subtitle={t('AboutUsPageSubtitle')}/>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 sticky top-20 z-10">
            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-lg p-4 flex flex-wrap justify-center gap-4 sm:gap-8">
                <a href="#overview" className="font-semibold text-text-light hover:text-primary transition-colors">{t('CompanyOverview')}</a>
                <a href="#governance" className="font-semibold text-text-light hover:text-primary transition-colors">{t('LeadershipGovernance')}</a>
                <a href="#roles" className="font-semibold text-text-light hover:text-primary transition-colors">{t('StrategicRoles')}</a>
            </div>
        </div>
        
        <Section title={t('CompanyOverview')} id="overview" className="bg-white">
            <p>KKM International Group is a global consortium dedicated to developing and deploying cutting-edge technologies that address critical challenges in energy, health, and sustainable development. Founded on the principle of integrated innovation, we bring together diverse expertise in engineering, biomedical sciences, and rural development to create holistic solutions with lasting impact.</p>
            <p>Our mission is to engineer a self-sustaining future where communities thrive, powered by clean energy, supported by advanced healthcare, and connected by resilient infrastructure. We operate globally, with a focus on projects that foster regional growth and international collaboration.</p>
        </Section>

        <Section title={t('LeadershipGovernance')} id="governance">
            <p>Our leadership team comprises seasoned executives, world-class engineers, and visionary strategists with decades of experience in their respective fields. They guide our company with a steady hand, ensuring ethical governance, operational excellence, and a culture of continuous innovation. We are committed to transparency and accountability in all our engagements.</p>
        </Section>
        
        <Section title={t('StrategicRoles')} id="roles" className="bg-white">
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
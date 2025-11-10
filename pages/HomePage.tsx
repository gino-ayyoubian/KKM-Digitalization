import * as React from 'react';
import { Page } from '../types';
import type { NewsItem, Video } from '../types';
import { GMEL_TECHNOLOGIES, PROJECTS, NEWS_ITEMS, VIDEOS } from '../constants';
import Card from '../components/Card';
import { useLanguage } from '../LanguageContext';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';
import CEOBriefingWidget from '../components/CEOBriefingWidget';
import AnimatedStats from '../components/AnimatedStats';

interface HomePageProps {
  setPage: (page: Page) => void;
  onSelectArticle: (article: NewsItem) => void;
}

const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary dark:text-white text-center">{children}</h2>
);

const SectionSubtitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <p className="mt-4 text-lg text-text-light dark:text-slate-300 text-center max-w-3xl mx-auto">{children}</p>
);

const HomePage: React.FC<HomePageProps> = ({ setPage, onSelectArticle }) => {
  const [playingVideoId, setPlayingVideoId] = React.useState<string | null>(null);
  const { t } = useLanguage();

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const heroItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="gradient-hero text-white">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-extrabold !text-white"
            variants={heroItemVariants}
          >
            {t('HeroTitle')}
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-300"
            variants={heroItemVariants}
          >
            {t('HeroSubtitle')}
          </motion.p>
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={heroItemVariants}
          >
            <button
              onClick={() => setPage(Page.CoreTechnologies)}
              className="px-8 py-3 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-colors duration-300 transform hover:scale-105"
            >
              {t('ExploreTech')}
            </button>
            <button
              onClick={() => setPage(Page.Contact)}
              className="px-8 py-3 font-bold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-primary transition-colors duration-300"
            >
              {t('PartnerWithUs')}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Animated Stats */}
      <AnimatedStats />

      {/* Core Technologies Teaser */}
      <section id="core-technologies-section" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('GmelEcosystem')}</SectionTitle>
        <SectionSubtitle>
          {t('GmelEcosystemSubtitle')}
        </SectionSubtitle>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GMEL_TECHNOLOGIES.slice(0, 3).map(tech => (
            <Card
              key={tech.name}
              title={tech.name}
              description={tech.description}
              actionText={t('LearnMore')}
              onActionClick={() => setPage(Page.CoreTechnologies)}
            />
          ))}
        </div>
      </section>

      {/* Innovation Hub Spotlight */}
      <section id="innovation-hub-section" className="bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h3 className="text-base text-accent-yellow font-semibold tracking-wider uppercase">{t('InnovationHubTitle')}</h3>
            <SectionTitle>{t('FromIdeaToImpact')}</SectionTitle>
            <SectionSubtitle>
             {t('InnovationHubSubtitle')}
            </SectionSubtitle>
            <button
              onClick={() => setPage(Page.InnovationHub)}
              className="mt-8 px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
            >
              {t('JoinTheInnovation')}
            </button>
          </div>
        </div>
      </section>

      {/* Projects & Pilots */}
      <section id="projects-section" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('ProjectsShowcaseTitle')}</SectionTitle>
        <SectionSubtitle>
          {t('ProjectsShowcaseSubtitle')}
        </SectionSubtitle>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.slice(0,3).map(project => (
            <Card
              key={project.name}
              title={project.name}
              description={project.description}
              imageUrl={project.image}
              actionText={t('ViewProject')}
              onActionClick={() => setPage(Page.Projects)}
            />
          ))}
        </div>
      </section>

      {/* CEO Briefing Section */}
      <section id="ceo-briefing-section" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t('CEOBriefingTitle')}</SectionTitle>
        <SectionSubtitle>
            {t('CEOBriefingSubtitle')}
        </SectionSubtitle>
        <div className="mt-12">
            <CEOBriefingWidget />
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-gray-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <SectionTitle>{t('VisionInMotionTitle')}</SectionTitle>
              <SectionSubtitle>{t('VisionInMotionSubtitle')}</SectionSubtitle>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {VIDEOS.map(video => (
                      <div key={video.youtubeId} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300">
                          {playingVideoId === video.youtubeId ? (
                              <div className="aspect-video">
                                  <iframe
                                      width="100%"
                                      height="100%"
                                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                                      title={video.title}
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                  ></iframe>
                              </div>
                          ) : (
                              <div className="cursor-pointer" onClick={() => setPlayingVideoId(video.youtubeId)}>
                                  <div className="relative overflow-hidden">
                                    <img src={video.thumbnail} alt={video.title} loading="lazy" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                  </div>
                                  <div className="p-6 flex flex-col flex-grow">
                                      <h3 className="text-lg font-bold text-primary dark:text-secondary">{video.title}</h3>
                                      <p className="mt-2 text-sm text-text-light dark:text-slate-400 flex-grow">{video.description}</p>
                                  </div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* News & Insights */}
      <section id="news-insights-section" className="bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <SectionTitle>{t('NewsInsightsTitle')}</SectionTitle>
              <SectionSubtitle>{t('NewsInsightsSubtitle')}</SectionSubtitle>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {NEWS_ITEMS.map(item => (
                     <NewsCard key={item.title} item={item} onSelectArticle={onSelectArticle} />
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;
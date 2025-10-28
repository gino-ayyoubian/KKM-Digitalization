import React, { useState } from 'react';
import { Page, NewsItem, Video } from '../types';
import { GMEL_TECHNOLOGIES, PROJECTS, NEWS_ITEMS, VIDEOS } from '../constants';
import Card from '../components/Card';

interface HomePageProps {
  setPage: (page: Page) => void;
  onSelectArticle: (article: NewsItem) => void;
}

const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary text-center">{children}</h2>
);

const SectionSubtitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <p className="mt-4 text-lg text-text-light text-center max-w-3xl mx-auto">{children}</p>
);

const VideoModal: React.FC<{video: Video; onClose: () => void}> = ({ video, onClose }) => (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg overflow-hidden relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 z-10">&times;</button>
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
        </div>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ setPage, onSelectArticle }) => {
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);

  return (
    <div className="space-y-24 pb-24">
      {playingVideo && <VideoModal video={playingVideo} onClose={() => setPlayingVideo(null)} />}
      {/* Hero Section */}
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold !text-white opacity-0 animate-slide-in-up">
            Engineering a Sustainable Future.
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 opacity-0 animate-slide-in-up animation-delay-200">
            We innovate at the intersection of energy, technology, and community to solve global challenges.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 opacity-0 animate-slide-in-up animation-delay-400">
            <button
              onClick={() => setPage(Page.CoreTechnologies)}
              className="px-8 py-3 font-bold text-white bg-accent rounded-full hover:bg-secondary transition-colors duration-300 transform hover:scale-105"
            >
              Explore Our Technologies
            </button>
            <button
              onClick={() => setPage(Page.Contact)}
              className="px-8 py-3 font-bold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Core Technologies Teaser */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>The GMEL Ecosystem</SectionTitle>
        <SectionSubtitle>
          Our integrated suite of proprietary technologies is designed to create sustainable value chains and solve complex energy and environmental challenges.
        </SectionSubtitle>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GMEL_TECHNOLOGIES.slice(0, 3).map(tech => (
            <Card
              key={tech.name}
              title={tech.name}
              description={tech.description}
              actionText="Learn More"
              onActionClick={() => setPage(Page.CoreTechnologies)}
            />
          ))}
        </div>
      </section>

      {/* Innovation Hub Spotlight */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h3 className="text-base text-accent font-semibold tracking-wider uppercase">Innovation & Ideation Hub</h3>
            <SectionTitle>From Idea to Impact</SectionTitle>
            <SectionSubtitle>
              Our hub is a dynamic ecosystem for collaboration, turning visionary ideas into real-world solutions through accelerator programs, design thinking, and cross-disciplinary dialogue.
            </SectionSubtitle>
            <button
              onClick={() => setPage(Page.InnovationHub)}
              className="mt-8 px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
            >
              Join the Innovation
            </button>
          </div>
        </div>
      </section>

      {/* Projects & Pilots */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Projects & Pilots Showcase</SectionTitle>
        <SectionSubtitle>
          Demonstrating our commitment to real-world impact through pioneering projects that integrate our core technologies.
        </SectionSubtitle>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.slice(0,3).map(project => (
            <Card
              key={project.name}
              title={project.name}
              description={project.description}
              imageUrl={project.image}
              actionText="View Project"
              onActionClick={() => setPage(Page.Projects)}
            />
          ))}
        </div>
      </section>

      {/* Videos Section */}
      <section className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <SectionTitle>Our Vision in Motion</SectionTitle>
              <SectionSubtitle>See our technology and projects in action and hear from the leaders driving our vision forward.</SectionSubtitle>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {VIDEOS.map(video => (
                      <div key={video.title} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group cursor-pointer" onClick={() => setPlayingVideo(video)}>
                          <div className="relative">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                              <h3 className="text-lg font-bold text-primary">{video.title}</h3>
                              <p className="mt-2 text-sm text-text-light flex-grow">{video.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* News & Insights */}
      <section className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <SectionTitle>News & Insights</SectionTitle>
              <SectionSubtitle>Stay updated with our latest announcements, thought leadership, and event highlights.</SectionSubtitle>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {NEWS_ITEMS.map(item => (
                      <div key={item.title} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                          <div className="p-6 flex flex-col flex-grow">
                              <p className="text-sm text-gray-500">{item.date}</p>
                              <h3 className="text-lg font-bold text-primary mt-2">{item.title}</h3>
                              <p className="mt-2 text-sm text-text-light flex-grow">{item.excerpt}</p>
                              <button onClick={() => onSelectArticle(item)} className="mt-4 font-bold text-accent self-start">Read More →</button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;

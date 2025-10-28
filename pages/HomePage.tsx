
import React from 'react';
import { Page } from '../types';
import { GMEL_TECHNOLOGIES, PROJECTS, NEWS_ITEMS } from '../constants';
import Card from '../components/Card';

interface HomePageProps {
  setPage: (page: Page) => void;
}

const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-display font-extrabold text-primary text-center">{children}</h2>
);

const SectionSubtitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <p className="mt-4 text-lg text-text-light text-center max-w-3xl mx-auto">{children}</p>
);

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold !text-white">
            Engineering a Sustainable Future.
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            We innovate at the intersection of energy, technology, and community to solve global challenges.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
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
          {PROJECTS.map(project => (
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
      
      {/* News & Insights */}
      <section className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <SectionTitle>News & Insights</SectionTitle>
              <SectionSubtitle>Stay updated with our latest announcements, thought leadership, and event highlights.</SectionSubtitle>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {NEWS_ITEMS.map(item => (
                      <div key={item.title} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                          <div className="p-6 flex flex-col flex-grow">
                              <p className="text-sm text-gray-500">{item.date}</p>
                              <h3 className="text-lg font-bold text-primary mt-2">{item.title}</h3>
                              <p className="mt-2 text-sm text-text-light flex-grow">{item.excerpt}</p>
                              <button onClick={() => setPage(Page.News)} className="mt-4 font-bold text-accent self-start">Read More →</button>
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

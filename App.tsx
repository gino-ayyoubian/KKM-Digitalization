import React, { useState, useEffect } from 'react';
import { Page, NewsItem, SearchResult } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CoreTechnologiesPage from './pages/CoreTechnologiesPage';
import ProjectsPage from './pages/ProjectsPage';
import InnovationHubPage from './pages/InnovationHubPage';
import ContactPage from './pages/ContactPage';
import ComingSoonPage from './pages/ComingSoonPage';
import LegalPage from './pages/LegalPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import SearchResultsPage from './pages/SearchResultsPage';
import { GMEL_TECHNOLOGIES, PROJECTS, NEWS_ITEMS } from './constants';
import { useLanguage } from './LanguageContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { direction } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedArticle]);

  const handleSelectArticle = (article: NewsItem) => {
    setSelectedArticle(article);
    setCurrentPage(Page.News);
  };

  const handleBackToNews = () => {
    setSelectedArticle(null);
    setCurrentPage(Page.News);
  };
  
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Note: In a real app, search would use translated content.
    // For this example, we'll keep it simple and search the English constants.
    GMEL_TECHNOLOGIES.forEach(tech => {
        if (tech.name.toLowerCase().includes(lowerQuery) || tech.description.toLowerCase().includes(lowerQuery)) {
            results.push({
                title: `Technology: ${tech.name}`,
                description: tech.description,
                onClick: () => setCurrentPage(Page.CoreTechnologies)
            });
        }
    });

    PROJECTS.forEach(project => {
        const contentToSearch = `${project.name} ${project.description} ${project.detailedContent}`.toLowerCase();
        if (contentToSearch.includes(lowerQuery)) {
            results.push({
                title: `Project: ${project.name}`,
                description: project.description,
                onClick: () => setCurrentPage(Page.Projects)
            });
        }
    });

    NEWS_ITEMS.forEach(news => {
        const contentToSearch = `${news.title} ${news.excerpt} ${news.content}`.toLowerCase();
        if (contentToSearch.includes(lowerQuery)) {
            results.push({
                title: `News: ${news.title}`,
                description: news.excerpt,
                onClick: () => handleSelectArticle(news)
            });
        }
    });
    
    setSearchQuery(query);
    setSearchResults(results);
    setCurrentPage(Page.SearchResults);
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const renderPage = () => {
    let pageComponent;
    switch (currentPage) {
      case Page.Home:
        pageComponent = <HomePage setPage={setCurrentPage} onSelectArticle={handleSelectArticle} />;
        break;
      case Page.AboutUs:
        pageComponent = <AboutUsPage />;
        break;
      case Page.CoreTechnologies:
        pageComponent = <CoreTechnologiesPage />;
        break;
      case Page.Projects:
        pageComponent = <ProjectsPage />;
        break;
      case Page.InnovationHub:
        pageComponent = <InnovationHubPage />;
        break;
      case Page.Contact:
        pageComponent = <ContactPage />;
        break;
      case Page.News:
        pageComponent = selectedArticle 
            ? <NewsArticlePage article={selectedArticle} onBack={handleBackToNews} /> 
            : <NewsPage onSelectArticle={handleSelectArticle} />;
        break;
      case Page.Legal:
        pageComponent = <LegalPage />;
        break;
      case Page.SearchResults:
        pageComponent = <SearchResultsPage results={searchResults} query={searchQuery} />;
        break;
      case Page.InternalPortal:
      case Page.Careers:
      default:
        pageComponent = <ComingSoonPage pageTitle={currentPage} />;
        break;
    }

    return (
      <motion.div
        key={currentPage + (selectedArticle?.title || '')}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {pageComponent}
      </motion.div>
    );
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans text-text-dark">
      <Header currentPage={currentPage} setPage={setCurrentPage} onSearch={handleSearch} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;
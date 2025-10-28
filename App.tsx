import React, { useState, useEffect } from 'react';
import { Page, NewsItem, SearchResult } from './types';
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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setPage={setCurrentPage} onSelectArticle={handleSelectArticle} />;
      case Page.AboutUs:
        return <AboutUsPage />;
      case Page.CoreTechnologies:
        return <CoreTechnologiesPage />;
      case Page.Projects:
        return <ProjectsPage />;
      case Page.InnovationHub:
        return <InnovationHubPage />;
      case Page.Contact:
        return <ContactPage />;
      case Page.News:
        return selectedArticle 
            ? <NewsArticlePage article={selectedArticle} onBack={handleBackToNews} /> 
            : <NewsPage onSelectArticle={handleSelectArticle} />;
      case Page.Legal:
        return <LegalPage />;
      case Page.SearchResults:
        return <SearchResultsPage results={searchResults} query={searchQuery} />;
      case Page.InternalPortal:
        return <ComingSoonPage pageTitle={currentPage} />;
      case Page.Careers:
      default:
        return <ComingSoonPage pageTitle={currentPage} />;
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans text-text-dark">
      <Header currentPage={currentPage} setPage={setCurrentPage} onSearch={handleSearch} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;

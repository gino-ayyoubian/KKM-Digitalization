import * as React from 'react';
import { Page } from './types';
import type { NewsItem, GeminiSearchResult } from './types';
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
import FuturesPage from './pages/FuturesPage';
import CareersPage from './pages/CareersPage';
import { useLanguage } from './LanguageContext';
import { GoogleGenAI } from '@google/genai';
import BackToTopButton from './components/BackToTopButton';
import { PROJECTS, NEWS_ITEMS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<Page>(Page.Home);
  const [selectedArticle, setSelectedArticle] = React.useState<NewsItem | null>(null);
  const [searchResults, setSearchResults] = React.useState<GeminiSearchResult | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const { direction } = useLanguage();

  React.useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  React.useEffect(() => {
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
  
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setCurrentPage(Page.SearchResults); // Navigate immediately to show loading state
    setSearchResults(null); // Clear previous results and trigger loading state

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const lowerCaseQuery = query.toLowerCase();

        // 1. Local Search
        const foundProjects = PROJECTS.filter(p => 
            p.name.toLowerCase().includes(lowerCaseQuery) ||
            p.description.toLowerCase().includes(lowerCaseQuery) ||
            p.detailedContent.toLowerCase().includes(lowerCaseQuery) ||
            p.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
        );

        const foundNews = NEWS_ITEMS.filter(n =>
            n.title.toLowerCase().includes(lowerCaseQuery) ||
            n.excerpt.toLowerCase().includes(lowerCaseQuery) ||
            n.content.toLowerCase().includes(lowerCaseQuery)
        );
        
        if (foundProjects.length > 0 || foundNews.length > 0) {
            // 2. Summarize local content
            let context = "INTERNAL KKM DOCUMENTATION:\n\n";
            
            if (foundProjects.length > 0) {
              context += "=== PROJECTS ===\n";
              foundProjects.forEach(p => {
                context += `Project Name: ${p.name}\nDescription: ${p.description}\nDetails: ${p.detailedContent}\n\n`;
              });
            }
            
            if (foundNews.length > 0) {
              context += "=== NEWS ARTICLES ===\n";
              foundNews.forEach(n => {
                context += `Article Title: ${n.title}\nDate: ${n.date}\nContent: ${n.content}\n\n`;
              });
            }
    
            const prompt = `You are a helpful assistant for KKM International Group. Based ONLY on the internal documentation provided below, answer the user's query. Provide a clear and concise summary. Do not use any external knowledge or web search capabilities.\n\nUser Query: "${query}"\n\n${context}`;
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
    
            setSearchResults({ summary: response.text, sources: [], sourceType: 'internal' }); // No external sources for internal search

        } else {
            // 3. Fallback to Web Search
            const prompt = `You are a helpful assistant for KKM International Group. Your task is to provide a comprehensive and informative answer to user queries based on real-time, verifiable information from the web. The user is asking about news, projects, or other aspects related to KKM International Group.\nUser Query: "${query}"\nPlease provide a summary based on your search findings.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });

            const summary = response.text;
            const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

            setSearchResults({ summary, sources, sourceType: 'web' });
        }

    } catch (error) {
        console.error("Error during Gemini API call:", error);
        setSearchResults({
            summary: "Sorry, we couldn't complete your search at this moment. Please try again later.",
            sources: [],
        });
    }
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5
  } as const;

  const renderPage = () => {
    let pageComponent;
    switch (currentPage) {
      case Page.Home:
        pageComponent = <HomePage setPage={setCurrentPage} onSelectArticle={handleSelectArticle} />;
        break;
      case Page.AboutUs:
        pageComponent = <AboutUsPage setPage={setCurrentPage} />;
        break;
      case Page.CoreTechnologies:
        pageComponent = <CoreTechnologiesPage />;
        break;
      case Page.Futures:
        pageComponent = <FuturesPage />;
        break;
      case Page.Projects:
        pageComponent = <ProjectsPage setPage={setCurrentPage} />;
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
        pageComponent = <SearchResultsPage result={searchResults} query={searchQuery} />;
        break;
      case Page.Careers:
        pageComponent = <CareersPage />;
        break;
      case Page.InternalPortal:
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
    <div className="min-h-screen flex flex-col font-sans text-text-dark dark:text-slate-200">
      <Header currentPage={currentPage} setPage={setCurrentPage} onSearch={handleSearch} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer setPage={setCurrentPage} />
      <BackToTopButton />
    </div>
  );
};

export default App;

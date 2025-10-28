
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CoreTechnologiesPage from './pages/CoreTechnologiesPage';
import ProjectsPage from './pages/ProjectsPage';
import InnovationHubPage from './pages/InnovationHubPage';
import ContactPage from './pages/ContactPage';
import ComingSoonPage from './pages/ComingSoonPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage setPage={setCurrentPage} />;
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
      case Page.Careers:
      case Page.News:
      case Page.Legal:
      // Fall through for other pages that are not fully implemented
      default:
        return <ComingSoonPage pageTitle={currentPage} />;
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans text-text-dark">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;

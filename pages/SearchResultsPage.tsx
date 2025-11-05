import React from 'react';
import { GeminiSearchResult, Page } from '../types';
import { useLanguage } from '../LanguageContext';
import SimpleMarkdown from '../components/SimpleMarkdown';

interface SearchResultsPageProps {
    result: GeminiSearchResult | null;
    query: string;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ result, query }) => {
  const { t } = useLanguage();

  const LoadingIndicator = () => (
    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center text-center min-h-[200px]">
        <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-xl font-display font-semibold text-primary">Searching...</h2>
        <p className="text-text-light mt-2">Please wait while we gather the latest information for you.</p>
    </div>
  );
  
  const getHostname = (url: string) => {
    try {
        return new URL(url).hostname;
    } catch (e) {
        return '';
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary">
        {t(Page.SearchResults)}
      </h1>
      <p className="mt-2 text-lg text-text-light">
        Showing results for: <span className="font-semibold">"{query}"</span>
      </p>

      <div className="mt-12 space-y-6">
        {!result ? (
            <LoadingIndicator />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
              <SimpleMarkdown text={result.summary} />

              {result.sources && result.sources.filter(s => s.web?.uri).length > 0 && (
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-display font-bold text-primary mb-4">Sources</h3>
                    <ul className="space-y-3">
                        {result.sources.filter(s => s.web?.uri).map((source, index) => {
                            const hostname = getHostname(source.web!.uri!);
                            return (
                                <li key={index} className="flex items-start">
                                    <img
                                        src={`https://www.google.com/s2/favicons?sz=16&domain_url=${hostname}`}
                                        alt="favicon"
                                        className="w-4 h-4 mr-3 mt-1 flex-shrink-0"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                    <a href={source.web!.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-yellow transition-colors break-all">
                                        {source.web!.title || source.web!.uri}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
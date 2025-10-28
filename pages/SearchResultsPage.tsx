import React from 'react';
// FIX: Import the `Page` enum to use it as a valid translation key.
import { SearchResult, Page } from '../types';
import { useLanguage } from '../LanguageContext';

interface SearchResultsPageProps {
    results: SearchResult[];
    query: string;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ results, query }) => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary">
        {/* FIX: Replaced the raw string 'SearchResults' with the correct `Page.SearchResults` enum key for translation. */}
        {t(Page.SearchResults)}
      </h1>
      <p className="mt-2 text-lg text-text-light">
        {t('SearchResultsSummary', { count: results.length, query })}
      </p>

      <div className="mt-12 space-y-6">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-display font-bold text-primary">{result.title}</h2>
              <p className="mt-2 text-text-light">{result.description}</p>
              <button onClick={result.onClick} className="mt-4 font-bold text-accent-yellow hover:underline">
                {t('ViewDetails')} &rarr;
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-xl text-text-light">{t('NoResultsFound')}</p>
            <p className="mt-2 text-text-light">{t('TryDifferentSearch')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
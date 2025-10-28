import React from 'react';
import { SearchResult } from '../types';

interface SearchResultsPageProps {
    results: SearchResult[];
    query: string;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ results, query }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary">
        Search Results
      </h1>
      <p className="mt-2 text-lg text-text-light">
        Found {results.length} result{results.length !== 1 && 's'} for "{query}"
      </p>

      <div className="mt-12 space-y-6">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-display font-bold text-primary">{result.title}</h2>
              <p className="mt-2 text-text-light">{result.description}</p>
              <button onClick={result.onClick} className="mt-4 font-bold text-accent hover:underline">
                View Details &rarr;
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <p className="text-xl text-text-light">No results found.</p>
            <p className="mt-2 text-text-light">Try searching for a different term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;

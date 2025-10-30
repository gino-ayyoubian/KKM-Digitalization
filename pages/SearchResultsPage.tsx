import React from 'react';
import { GeminiSearchResult, Page } from '../types';
import { useLanguage } from '../LanguageContext';

interface SearchResultsPageProps {
    result: GeminiSearchResult | null;
    query: string;
}

// A simple component to render basic markdown
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    const html = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            // Bold
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Headers (simplified)
            if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
            if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
            if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
            // List items
            if (line.startsWith('* ')) return `<li>${line.substring(2)}</li>`;
            // Paragraphs
            return `<p>${line}</p>`;
        })
        .join('')
        .replace(/<\/li><p><\/p><li>/g, '</li><li>')
        .replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>');

    return <div className="prose max-w-none text-text-light" dangerouslySetInnerHTML={{ __html: html }} />;
};


const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ result, query }) => {
  const { t } = useLanguage();

  const LoadingSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
    </div>
  );

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
            <LoadingSkeleton />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
              <SimpleMarkdown text={result.summary} />

              {/* FIX: Filter for sources that have a web property with a valid URI */}
              {result.sources && result.sources.filter(s => s.web?.uri).length > 0 && (
                <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-display font-bold text-primary mb-4">Sources</h3>
                    <ul className="space-y-3">
                        {/* FIX: Filter for sources with a valid URI and provide a fallback for the title */}
                        {result.sources.filter(s => s.web?.uri).map((source, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-accent-yellow mr-2 mt-1">&#10148;</span>
                                <a href={source.web!.uri} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-yellow transition-colors break-all">
                                    {source.web!.title || source.web!.uri}
                                </a>
                            </li>
                        ))}
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
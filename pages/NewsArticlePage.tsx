import React from 'react';
import { NewsItem } from '../types';

interface NewsArticlePageProps {
    article: NewsItem;
    onBack: () => void;
}

const NewsArticlePage: React.FC<NewsArticlePageProps> = ({ article, onBack }) => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <button onClick={onBack} className="font-bold text-accent hover:underline mb-8">
                    &larr; Back to News
                </button>
                <article>
                    <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{article.title}</h1>
                    <p className="mt-4 text-text-light">{article.date}</p>
                    <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-lg my-8" />
                    <div 
                        className="prose max-w-none text-text-light" 
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>
            </div>
        </div>
    );
};

export default NewsArticlePage;

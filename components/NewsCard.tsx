import React from 'react';
import type { NewsItem } from '../types';
import { useLanguage } from '../LanguageContext';

interface NewsCardProps {
    item: NewsItem;
    onSelectArticle: (article: NewsItem) => void;
    imageHeight?: string;
    showCategory?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onSelectArticle, imageHeight = 'h-48', showCategory = false }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300">
            <div className="overflow-hidden rounded-t-lg relative">
                <img src={item.image} alt={item.title} loading="lazy" className={`w-full ${imageHeight} object-cover transition-transform duration-300 group-hover:scale-105`} />
                {showCategory && <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider text-text-dark bg-secondary px-2 py-1 rounded-full">{item.category}</span>}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 dark:text-slate-400">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 className="text-lg font-bold text-primary dark:text-secondary mt-2">{item.title}</h3>
                <p className="mt-2 text-sm text-text-light dark:text-slate-400 flex-grow">
                    {item.excerpt}
                </p>
                <button onClick={() => onSelectArticle(item)} className="mt-4 font-bold text-accent-yellow hover:underline self-start">{t('ReadMore')} →</button>
            </div>
        </div>
    );
};

export default NewsCard;
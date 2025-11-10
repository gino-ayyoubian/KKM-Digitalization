import React, { useState, useMemo, useEffect } from 'react';
import { NEWS_ITEMS } from '../constants';
import type { NewsItem } from '../types';
import { Page } from '../types';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';

interface NewsPageProps {
    onSelectArticle: (article: NewsItem) => void;
}

const BATCH_SIZE = 4; // Number of articles to load at a time

const NewsPage: React.FC<NewsPageProps> = ({ onSelectArticle }) => {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const { t } = useLanguage();
    
    const categories = ['All', ...Array.from(new Set(NEWS_ITEMS.map(item => item.category)))];

    const filteredAndSortedNews = useMemo(() => {
        let items = [...NEWS_ITEMS];

        if (filterCategory !== 'All') {
            items = items.filter(item => item.category === filterCategory);
        }

        items.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return items;
    }, [sortOrder, filterCategory]);

    // Reset visible count when filters change
    useEffect(() => {
        setVisibleCount(BATCH_SIZE);
    }, [sortOrder, filterCategory]);
    
    const visibleNewsItems = useMemo(() => {
        return filteredAndSortedNews.slice(0, visibleCount);
    }, [filteredAndSortedNews, visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + BATCH_SIZE);
    };

    return (
        <div>
            <PageHeader title={t(Page.News)} subtitle={t('NewsPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <div className="flex-1">
                        <label htmlFor="category-filter" className="block text-sm font-medium text-text-dark dark:text-slate-300">Filter by Category</label>
                        <select 
                            id="category-filter" 
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="sort-order" className="block text-sm font-medium text-text-dark dark:text-slate-300">Sort by</label>
                        <select 
                            id="sort-order"
                            value={sortOrder}
                            onChange={e => setSortOrder(e.target.value as 'newest' | 'oldest')}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {visibleNewsItems.length > 0 ? visibleNewsItems.map(item => (
                       <motion.div
                            key={item.title}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                       >
                            <NewsCard 
                                item={item} 
                                onSelectArticle={onSelectArticle}
                                imageHeight="h-64"
                                showCategory={true}
                            />
                       </motion.div>
                    )) : (
                        <p className="md:col-span-2 text-center text-text-light dark:text-slate-400">No news articles match the current filters.</p>
                    )}
                </div>

                {visibleCount < filteredAndSortedNews.length && (
                    <div className="mt-12 text-center">
                        <button 
                            onClick={handleLoadMore}
                            className="px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
                        >
                           {t('LoadMore')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;

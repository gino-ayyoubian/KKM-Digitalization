import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { GoogleGenAI } from '@google/genai';
import { useLanguage } from '../LanguageContext';

interface NewsCardProps {
    item: NewsItem;
    onSelectArticle: (article: NewsItem) => void;
    imageHeight?: string;
    showCategory?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onSelectArticle, imageHeight = 'h-48', showCategory = false }) => {
    const { t } = useLanguage();
    const [summary, setSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const generateSummary = async () => {
            setIsLoading(true);
            setError(null);
            const cacheKey = `news_summary_${item.title}`;
            
            try {
                const cachedSummary = sessionStorage.getItem(cacheKey);
                if (cachedSummary) {
                    setSummary(cachedSummary);
                    setIsLoading(false);
                    return;
                }

                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const prompt = `Provide a succinct, one-sentence summary for the following news article, suitable for a corporate news portal. Content: "${item.content}"`;
                
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                });

                const generatedSummary = response.text;
                setSummary(generatedSummary);
                sessionStorage.setItem(cacheKey, generatedSummary);
            } catch (err) {
                console.error("Failed to generate summary:", err);
                setError("Could not load summary.");
                setSummary(item.excerpt); // Fallback to original excerpt
            } finally {
                setIsLoading(false);
            }
        };

        generateSummary();
    }, [item]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300">
            <div className="overflow-hidden rounded-t-lg relative">
                <img src={item.image} alt={item.title} loading="lazy" className={`w-full ${imageHeight} object-cover transition-transform duration-300 group-hover:scale-105`} />
                {showCategory && <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider text-text-dark bg-secondary px-2 py-1 rounded-full">{item.category}</span>}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <h3 className="text-lg font-bold text-primary mt-2">{item.title}</h3>
                <div className="mt-2 text-sm text-text-light flex-grow min-h-[60px]">
                    {isLoading ? (
                        <div className="space-y-2 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    ) : (
                        <p>{summary || item.excerpt}</p>
                    )}
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                <button onClick={() => onSelectArticle(item)} className="mt-4 font-bold text-accent-yellow self-start">{t('ReadMore')} →</button>
            </div>
        </div>
    );
};

export default NewsCard;
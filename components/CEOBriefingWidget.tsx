import * as React from 'react';
import { GoogleGenAI } from '@google/genai';
import type { GeminiSearchResult } from '../types';
import { useLanguage } from '../LanguageContext';
import SimpleMarkdown from './SimpleMarkdown';
import { motion, AnimatePresence } from 'framer-motion';

const getHostname = (url: string) => {
  try { return new URL(url).hostname; } catch (e) { return ''; }
};

const LoadingSkeleton = () => (
    <div className="animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-5/6 mb-6"></div>
        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-1/2"></div>
    </div>
);

const CEOBriefingWidget: React.FC = () => {
    const [briefing, setBriefing] = React.useState<GeminiSearchResult | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [triggerFetch, setTriggerFetch] = React.useState(0);
    const { t } = useLanguage();

    React.useEffect(() => {
        let isMounted = true;

        const fetchBriefing = async () => {
            setIsLoading(true);
            setError(null);
            setBriefing(null);

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const prompt = `From the perspective of Gino Ayyoubian, CEO of KKM International Group, provide a concise and insightful weekly briefing on the most significant recent developments. Focus on our key sectors: geothermal energy, sustainable infrastructure (EPCI projects), innovations in lithium extraction from brine, and the global energy market outlook. Frame this as a strategic update for our stakeholders, highlighting potential opportunities and challenges for KKM. Your response should be based on the latest verifiable information from the web. The tone should be authoritative, optimistic, and forward-looking. Format the output using basic markdown (bolding for emphasis, bullet points for lists).`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        tools: [{ googleSearch: {} }],
                    },
                });

                if (isMounted) {
                    const summary = response.text || '';
                    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

                    setBriefing({ summary, sources });
                }
            } catch (err) {
                console.error("Error fetching CEO briefing:", err);
                if (isMounted) {
                    setError(t('BriefingError'));
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchBriefing();

        return () => {
            isMounted = false;
        };
    }, [triggerFetch, t]);
    
    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 flex flex-col md:flex-row gap-8">
            <div className="text-center md:text-left md:w-1/4 flex-shrink-0">
                <img 
                    src="https://i.imgur.com/lJ4n79b.jpeg"
                    alt="Gino Ayyoubian, CEO"
                    className="w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-secondary/50" 
                />
                <h4 className="font-display font-bold text-xl text-primary dark:text-white mt-4">{t('GinoAyyoubian')}</h4>
                <p className="text-secondary dark:text-accent-yellow font-semibold">{t('CEO')}</p>
                 <button 
                    onClick={() => setTriggerFetch(c => c + 1)} 
                    disabled={isLoading}
                    className="mt-4 px-4 py-2 text-sm font-semibold text-primary dark:text-secondary bg-gray-100 dark:bg-slate-700 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center gap-2 mx-auto md:mx-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l5 5M20 20l-5-5" /></svg>
                    {t('RefreshBriefing')}
                </button>
            </div>
            <div className="flex-grow">
                <AnimatePresence mode="wait">
                    {isLoading && (
                         <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <LoadingSkeleton />
                         </motion.div>
                    )}
                    {error && (
                        <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg flex flex-col items-center justify-center h-full">
                            <p className="font-semibold">{t('BriefingErrorTitle')}</p>
                            <p>{error}</p>
                        </motion.div>
                    )}
                    {briefing && (
                        <motion.div key="briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                           <SimpleMarkdown text={briefing.summary} />
                           {briefing.sources && briefing.sources.filter(s => s.web?.uri).length > 0 && (
                                <div className="mt-6 border-t dark:border-slate-600 pt-4">
                                    <h5 className="text-sm font-semibold text-text-dark dark:text-slate-200 mb-2">{t('Sources')}</h5>
                                    <ul className="space-y-1">
                                        {briefing.sources.filter(s => s.web?.uri).map((source, index) => (
                                            <li key={index}>
                                                <a href={source.web!.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-primary dark:text-secondary hover:underline transition-colors break-all flex items-start gap-2">
                                                    <img
                                                        src={`https://www.google.com/s2/favicons?sz=16&domain_url=${getHostname(source.web!.uri!)}`}
                                                        alt="favicon"
                                                        className="w-3 h-3 mt-0.5 flex-shrink-0"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                    <span>{source.web!.title || getHostname(source.web!.uri!)}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                           )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CEOBriefingWidget;
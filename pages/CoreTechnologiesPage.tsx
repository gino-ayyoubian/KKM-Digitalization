import React, { useState } from 'react';
import { GMEL_TECHNOLOGIES, OTHER_CORE_AREAS } from '../constants';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../LanguageContext';
import { Page } from '../types';
import Card from '../components/Card';

const CoreTechnologiesPage: React.FC = () => {
    const [selectedTech, setSelectedTech] = useState(GMEL_TECHNOLOGIES[0].name);
    const { t } = useLanguage();

    return (
        <div>
            <PageHeader title={t(Page.CoreTechnologies)} subtitle={t('CoreTechPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-8 text-center">{t('GmelEcosystem')}</h2>
                
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="md:w-1/3 lg:w-1/4">
                        <div className="sticky top-24">
                            <h3 className="text-lg font-display font-semibold text-primary dark:text-secondary mb-4">GMEL Technologies</h3>
                            <ul className="space-y-1">
                                {GMEL_TECHNOLOGIES.map(tech => (
                                    <li key={tech.name}>
                                        <button 
                                            onClick={() => setSelectedTech(tech.name)}
                                            className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors duration-200 ${selectedTech === tech.name ? 'bg-secondary text-white font-semibold' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-text-dark dark:text-slate-200'}`}
                                        >
                                            {tech.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="md:w-2/3 lg:w-3/4">
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg min-h-[400px]">
                            {GMEL_TECHNOLOGIES.filter(t => t.name === selectedTech).map(tech => (
                                <div key={tech.name}>
                                    <h3 className="text-2xl font-display font-bold text-primary dark:text-secondary">{tech.name}</h3>
                                    <p className="mt-4 text-text-light dark:text-slate-300">{tech.description}</p>
                                    <img src={`https://picsum.photos/seed/${tech.name}/800/400`} alt={tech.name} loading="lazy" className="mt-6 rounded-lg object-cover w-full h-64" />
                                    <div className="mt-6 prose dark:prose-invert max-w-none">
                                        <h4>Key Innovations</h4>
                                        <p>Detailed information about the innovations, applications, and impact of {tech.name} would be presented here. This includes technical specifications, case studies, and benefits.</p>
                                        <ul>
                                            <li>Innovation one related to {tech.name}.</li>
                                            <li>Innovation two solving a key industry problem.</li>
                                            <li>Innovation three improving efficiency and sustainability.</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>

                <div className="mt-24">
                    <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-8 text-center">{t('ExpandingHorizons')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {OTHER_CORE_AREAS.map(area => (
                           <Card 
                                key={area.name}
                                title={area.name}
                                description={area.description}
                           />
                        ))}
                    </div>
                </div>

                <section className="mt-24 bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-4">{t('GMELVisionWebAppTitle')}</h2>
                            <p className="text-text-light dark:text-slate-300 mb-8">{t('GMELVisionWebAppSubtitle')}</p>
                            <a 
                                href="https://aistudio.google.com/apps/drive/1qB40WZghDEbRaR0O4Xje2vjbmdHWaa-W?showPreview=true&showAssistant=true" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block px-8 py-3 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                {t('LaunchGMELVision')}
                            </a>
                        </div>
                        <div className="h-64 md:h-full">
                            <img src="https://picsum.photos/seed/gmel-vision-app/600/400" alt="GMEL Vision Web App" loading="lazy" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CoreTechnologiesPage;

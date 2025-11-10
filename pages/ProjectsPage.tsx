import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import type { Project, MapMarker } from '../types';
import { Page } from '../types';
import ProjectDetailModal from './ProjectDetailModal';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import InteractiveMap from '../components/InteractiveMap';
import { motion } from 'framer-motion';

interface ProjectsPageProps {
    setPage: (page: Page) => void;
}

const getSnippet = (htmlContent: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.split(' ').slice(0, 40).join(' ') + '...';
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setPage }) => {
    const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
    const [activeProjectForMap, setActiveProjectForMap] = useState<Project | null>(null);
    const [hoveredProjectName, setHoveredProjectName] = useState<string | null>(null);
    const { t } = useLanguage();
    const detailsPanelRef = useRef<HTMLDivElement>(null);
    
    const [activeTag, setActiveTag] = useState<string>('All');
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        PROJECTS.forEach(p => p.tags.forEach(tag => tags.add(tag)));
        return ['All', ...Array.from(tags).sort()];
    }, []);
    
    const filteredProjects = useMemo(() => {
        if (activeTag === 'All') {
            return PROJECTS;
        }
        return PROJECTS.filter(p => p.tags.includes(activeTag));
    }, [activeTag]);

    useEffect(() => {
        if (filteredProjects.length > 0) {
            // If active project is not in the new filtered list, reset it
            if (!activeProjectForMap || !filteredProjects.some(p => p.name === activeProjectForMap.name)) {
                setActiveProjectForMap(filteredProjects[0]);
            }
        } else {
            setActiveProjectForMap(null);
        }
    }, [filteredProjects, activeProjectForMap]);

    // Smooth scroll for mobile
    useEffect(() => {
        if (activeProjectForMap && detailsPanelRef.current && window.innerWidth < 1024) { // lg breakpoint
            detailsPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeProjectForMap]);
    
    const handleViewDetails = (project: Project) => {
        setSelectedProjectForModal(project);
    };

    const handleProjectSelect = useCallback((projectName: string) => {
        const projectToShow = PROJECTS.find(p => p.name === projectName);
        if (projectToShow) {
            setActiveProjectForMap(projectToShow);
        }
    }, []);

    const projectMarkers = useMemo((): MapMarker[] => PROJECTS.map((p) => ({
        name: p.name,
        description: p.description,
        coordinates: p.coordinates,
        category: p.tags[0], // Use first tag for map icon category
        imageUrl: p.image,
        type: 'project',
    })), []);
    
    const activeMarker = useMemo((): MapMarker | null => {
        if (!activeProjectForMap) return null;
        return {
            name: activeProjectForMap.name,
            description: activeProjectForMap.description,
            coordinates: activeProjectForMap.coordinates,
            category: activeProjectForMap.tags[0],
            imageUrl: activeProjectForMap.image,
            type: 'project',
        };
    }, [activeProjectForMap]);

    return (
        <div>
            {selectedProjectForModal && <ProjectDetailModal project={selectedProjectForModal} onClose={() => setSelectedProjectForModal(null)} setPage={setPage} />}
            <PageHeader title={t(Page.Projects)} subtitle={t('ProjectsPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Details View */}
                    <div className="lg:col-span-5" ref={detailsPanelRef}>
                        <motion.div 
                            key={activeProjectForMap ? activeProjectForMap.name : 'empty'}
                            className="sticky top-24"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('ProjectDetails')}</h2>
                            {activeProjectForMap ? (
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl dark:shadow-none transition-shadow duration-300">
                                    <div className="relative group overflow-hidden rounded-t-lg">
                                        <img src={activeProjectForMap.image} alt={activeProjectForMap.name} loading="lazy" className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <div 
                                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" 
                                            onClick={() => handleViewDetails(activeProjectForMap)}
                                            aria-hidden="true"
                                        >
                                            <div className="text-center text-white p-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                                <p className="font-bold mt-2">{t('ViewCaseStudy')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {activeProjectForMap.tags.map(tag => (
                                                <span key={tag} className="text-xs font-semibold bg-accent-yellow/20 text-accent-yellow/80 px-2 py-1 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-primary dark:text-white">{activeProjectForMap.name}</h3>
                                        <p className="text-sm text-text-light dark:text-slate-300 mt-2 mb-6">{getSnippet(activeProjectForMap.detailedContent)}</p>
                                        <button onClick={() => handleViewDetails(activeProjectForMap)} className="inline-block px-6 py-2 font-semibold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary dark:focus:ring-offset-slate-800">
                                            {t('ViewCaseStudy')}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center h-full flex flex-col justify-center items-center min-h-[400px]">
                                    <p className="text-text-light dark:text-slate-400">Select a project from the list or map to see details.</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Panel: Controls & Map */}
                    <div className="lg:col-span-7">
                        <div className="mb-6">
                            <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('OurKeyInitiatives')}</h2>
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveTag(tag)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${activeTag === tag ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-slate-700 text-text-dark dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-slate-600'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto pr-2 mb-6 border dark:border-slate-700 rounded-lg">
                            {filteredProjects.map((project) => (
                                <button 
                                    key={project.name} 
                                    className={`w-full text-left p-3 transition-colors duration-200 border-b dark:border-slate-700 last:border-b-0 ${activeProjectForMap?.name === project.name ? 'bg-secondary/20 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                                    onClick={() => setActiveProjectForMap(project)}
                                    onMouseEnter={() => setHoveredProjectName(project.name)}
                                    onMouseLeave={() => setHoveredProjectName(null)}
                                >
                                    <h3 className="text-md font-display text-primary dark:text-secondary">{project.name}</h3>
                                </button>
                            ))}
                        </div>

                        <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('OurGlobalFootprint')}</h2>
                        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                            <InteractiveMap projects={projectMarkers} activeProject={activeMarker} onMarkerSelect={handleProjectSelect} hoveredProjectName={hoveredProjectName} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
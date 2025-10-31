import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project, Page, MapMarker } from '../types';
import ProjectDetailModal from './ProjectDetailModal';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import InteractiveMap from '../components/InteractiveMap';
import { motion } from 'framer-motion';

interface ProjectsPageProps {
    setPage: (page: Page) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setPage }) => {
    const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
    const [activeProjectForMap, setActiveProjectForMap] = useState<Project | null>(null);
    const { t } = useLanguage();
    
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

    const getSnippet = (htmlContent: string) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const textContent = tempDiv.textContent || tempDiv.innerText || "";
        return textContent.split(' ').slice(0, 40).join(' ') + '...';
    };

    return (
        <div>
            {selectedProjectForModal && <ProjectDetailModal project={selectedProjectForModal} onClose={() => setSelectedProjectForModal(null)} setPage={setPage} />}
            <PageHeader title={t(Page.Projects)} subtitle={t('ProjectsPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Panel: Details View */}
                    <div className="lg:col-span-5">
                        <motion.div 
                            key={activeProjectForMap ? activeProjectForMap.name : 'empty'}
                            className="sticky top-24"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-display font-bold text-primary mb-4">Project Details</h2>
                            {activeProjectForMap ? (
                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <img src={activeProjectForMap.image} alt={activeProjectForMap.name} loading="lazy" className="w-full h-56 object-cover rounded-md mb-4" />
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {activeProjectForMap.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold bg-accent-yellow/20 text-accent-yellow/80 px-2 py-1 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-primary">{activeProjectForMap.name}</h3>
                                    <p className="text-sm text-text-light mt-2 mb-4">{getSnippet(activeProjectForMap.detailedContent)}</p>
                                    <button onClick={() => handleViewDetails(activeProjectForMap)} className="font-bold text-primary hover:text-accent-yellow">
                                        {t('ViewCaseStudy')} →
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-lg p-6 text-center h-full flex flex-col justify-center items-center">
                                    <p className="text-text-light">Select a project from the list or map to see details.</p>
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
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${activeTag === tag ? 'bg-primary text-white' : 'bg-gray-200 text-text-dark hover:bg-gray-300'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto pr-2 mb-6 border rounded-lg">
                            {filteredProjects.map((project) => (
                                <button 
                                    key={project.name} 
                                    className={`w-full text-left p-3 transition-colors duration-200 border-b last:border-b-0 ${activeProjectForMap?.name === project.name ? 'bg-secondary/20 font-semibold' : 'hover:bg-gray-100'}`}
                                    onClick={() => setActiveProjectForMap(project)}
                                >
                                    <h3 className="text-md font-display text-primary">{project.name}</h3>
                                </button>
                            ))}
                        </div>

                        <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('OurGlobalFootprint')}</h2>
                        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                            <InteractiveMap projects={projectMarkers} activeProject={activeMarker} onMarkerSelect={handleProjectSelect} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
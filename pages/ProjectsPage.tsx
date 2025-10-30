import React, { useState, useMemo, useCallback } from 'react';
import { PROJECTS } from '../constants';
import { Project, Page, MapMarker } from '../types';
import ProjectDetailModal from './ProjectDetailModal';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import InteractiveMap from '../components/InteractiveMap';

interface ProjectsPageProps {
    setPage: (page: Page) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setPage }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
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
    
    const handleViewDetails = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    const handleMarkerDetailsClick = useCallback((projectName: string) => {
        const projectToShow = PROJECTS.find(p => p.name === projectName);
        if (projectToShow) {
            handleViewDetails(projectToShow);
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
            {modalOpen && selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setModalOpen(false)} setPage={setPage} />}
            <PageHeader title={t(Page.Projects)} subtitle={t('ProjectsPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Projects List */}
                    <div className="lg:w-1/3 space-y-4">
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
                        <div className="max-h-[500px] overflow-y-auto pr-2">
                            {filteredProjects.map((project) => (
                                <button 
                                    key={project.name} 
                                    className={`w-full text-left p-4 mb-4 rounded-lg border-2 transform transition-all duration-300 ${activeProjectForMap?.name === project.name ? 'border-secondary bg-secondary/10 shadow-md' : 'border-transparent hover:bg-white hover:shadow-xl hover:scale-[1.03]'}`}
                                    onClick={() => setActiveProjectForMap(project)}
                                >
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold bg-accent-yellow/20 text-accent-yellow/80 px-2 py-1 rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-display font-bold text-primary">{project.name}</h3>
                                    <p className="text-sm text-text-light mt-1">{project.description}</p>
                                    <button onClick={(e) => { e.stopPropagation(); handleViewDetails(project); }} className="mt-3 font-bold text-sm text-primary hover:text-accent-yellow">
                                        {t('ViewCaseStudy')} →
                                    </button>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Map */}
                    <div className="lg:w-2/3">
                        <div className="sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('OurGlobalFootprint')}</h2>
                            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                                <InteractiveMap projects={projectMarkers} activeProject={activeMarker} onViewDetails={handleMarkerDetailsClick} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
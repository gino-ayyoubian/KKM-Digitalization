import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project, Page } from '../types';
import ProjectDetailModal from './ProjectDetailModal';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';

const ProjectsPage: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeProjectForMap, setActiveProjectForMap] = useState<Project>(PROJECTS[0]);
    const { t } = useLanguage();
    
    const handleViewDetails = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    return (
        <div>
            {modalOpen && selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setModalOpen(false)} />}
            <PageHeader title={t(Page.Projects)} subtitle={t('ProjectsPageSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Projects List */}
                    <div className="lg:w-1/3 space-y-4">
                         <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('OurKeyInitiatives')}</h2>
                        {PROJECTS.map((project) => (
                            <div 
                                key={project.name} 
                                className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-300 ${activeProjectForMap.name === project.name ? 'border-secondary bg-secondary/10 shadow-md' : 'border-transparent hover:bg-white hover:shadow-md'}`}
                                onClick={() => setActiveProjectForMap(project)}
                            >
                                <h3 className="text-lg font-display font-bold text-primary">{project.name}</h3>
                                <p className="text-sm text-text-light mt-1">{project.description}</p>
                                <button onClick={() => handleViewDetails(project)} className="mt-3 font-bold text-sm text-accent-yellow">
                                    {t('ViewCaseStudy')} →
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Interactive Map */}
                    <div className="lg:w-2/3">
                        <div className="sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('OurGlobalFootprint')}</h2>
                            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://www.google.com/maps/embed/v1/view?key=${process.env.API_KEY}&center=${activeProjectForMap.coordinates.lat},${activeProjectForMap.coordinates.lng}&zoom=8`}
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;

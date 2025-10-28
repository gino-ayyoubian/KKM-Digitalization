import React, { useState } from 'react';
// Fix: Import Project type from types.ts where it is defined, not from constants.ts.
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ProjectDetailModal from './ProjectDetailModal';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ProjectsPage: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeProjectForMap, setActiveProjectForMap] = useState<Project>(PROJECTS[0]);
    
    const handleViewDetails = (project: Project) => {
        setSelectedProject(project);
        setModalOpen(true);
    };

    return (
        <div>
            {modalOpen && selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setModalOpen(false)} />}
            <PageHeader title="Projects & Pilots" subtitle="Transforming ideas into tangible impact. Explore our portfolio of projects that are shaping a sustainable future."/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Projects List */}
                    <div className="lg:w-1/3 space-y-4">
                         <h2 className="text-2xl font-display font-bold text-primary mb-4">Our Key Initiatives</h2>
                        {PROJECTS.map((project) => (
                            <div 
                                key={project.name} 
                                className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-300 ${activeProjectForMap.name === project.name ? 'border-secondary bg-secondary/10 shadow-md' : 'border-transparent hover:bg-white hover:shadow-md'}`}
                                onClick={() => setActiveProjectForMap(project)}
                            >
                                <h3 className="text-lg font-display font-bold text-primary">{project.name}</h3>
                                <p className="text-sm text-text-light mt-1">{project.description}</p>
                                <button onClick={() => handleViewDetails(project)} className="mt-3 font-bold text-sm text-accent">
                                    View Case Study →
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Interactive Map */}
                    <div className="lg:w-2/3">
                        <div className="sticky top-24">
                            <h2 className="text-2xl font-display font-bold text-primary mb-4">Our Global Footprint</h2>
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
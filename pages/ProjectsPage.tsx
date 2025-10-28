
import React from 'react';
import { PROJECTS } from '../constants';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ProjectsPage: React.FC = () => {
    return (
        <div>
            <PageHeader title="Projects & Pilots" subtitle="Transforming ideas into tangible impact. Explore our portfolio of projects that are shaping a sustainable future."/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                {/* Mock interactive map */}
                <div className="mb-16">
                    <h2 className="text-3xl font-display font-bold text-primary mb-4 text-center">Our Global Footprint</h2>
                    <p className="text-center text-text-light mb-8">Click on project locations to learn more. (Static demo)</p>
                    <div className="relative bg-gray-200 h-96 rounded-lg overflow-hidden">
                        <img src="https://i.imgur.com/gX3t2oP.png" alt="World map with project locations" className="w-full h-full object-cover opacity-50"/>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 p-6 rounded-lg shadow-xl text-center">
                            <h3 className="font-bold text-primary">Interactive Map Coming Soon</h3>
                            <p className="text-sm text-text-dark">Visualize our projects across the globe.</p>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                            <img src={project.image} alt={project.name} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            <div className="p-6">
                                <h3 className="text-xl font-display font-bold text-primary">{project.name}</h3>
                                <p className="mt-2 text-text-light">{project.description}</p>
                                <button className="mt-4 font-bold text-accent">
                                    View Case Study →
                                </button>
                            </div>
                        </div>
                    ))}
                     {/* Placeholder for more projects */}
                     <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
                        <img src="https://picsum.photos/seed/oilgas/600/400" alt="Oil & Gas Infrastructure" className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                        <div className="p-6">
                            <h3 className="text-xl font-display font-bold text-primary">Oil & Gas Infrastructure</h3>
                            <p className="mt-2 text-text-light">Modernizing energy transport and processing facilities for enhanced safety and efficiency.</p>
                             <button className="mt-4 font-bold text-accent">
                                View Case Study →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;

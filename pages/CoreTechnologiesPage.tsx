
import React, { useState } from 'react';
import { GMEL_TECHNOLOGIES, OTHER_CORE_AREAS } from '../constants';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const CoreTechnologiesPage: React.FC = () => {
    const [selectedTech, setSelectedTech] = useState(GMEL_TECHNOLOGIES[0].name);

    return (
        <div>
            <PageHeader title="Core Technologies" subtitle="Our intellectual property is the engine of our innovation, driving progress across multiple sectors."/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">The GMEL Ecosystem</h2>
                
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="md:w-1/3 lg:w-1/4">
                        <div className="sticky top-24">
                            <h3 className="text-lg font-display font-semibold text-primary mb-4">GMEL Technologies</h3>
                            <ul className="space-y-1">
                                {GMEL_TECHNOLOGIES.map(tech => (
                                    <li key={tech.name}>
                                        <button 
                                            onClick={() => setSelectedTech(tech.name)}
                                            className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors duration-200 ${selectedTech === tech.name ? 'bg-secondary text-white font-semibold' : 'hover:bg-gray-200 text-text-dark'}`}
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
                        <div className="bg-white p-8 rounded-lg shadow-lg min-h-[400px]">
                            {GMEL_TECHNOLOGIES.filter(t => t.name === selectedTech).map(tech => (
                                <div key={tech.name}>
                                    <h3 className="text-2xl font-display font-bold text-primary">{tech.name}</h3>
                                    <p className="mt-4 text-text-light">{tech.description}</p>
                                    <img src={`https://picsum.photos/seed/${tech.name}/800/400`} alt={tech.name} className="mt-6 rounded-lg object-cover w-full h-64" />
                                    <div className="mt-6 prose max-w-none">
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
                    <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">Expanding Horizons</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {OTHER_CORE_AREAS.map(area => (
                            <div key={area.name} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-display font-bold text-primary">{area.name}</h3>
                                <p className="mt-2 text-text-light">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreTechnologiesPage;

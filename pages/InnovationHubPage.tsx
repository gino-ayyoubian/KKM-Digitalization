
import React from 'react';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const InnovationStep: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full border-secondary text-secondary font-bold">
                    {number}
                </div>
            </div>
            <div className="w-px h-full bg-gray-300"></div>
        </div>
        <div className="pb-8">
            <p className="mb-2 text-xl font-display font-bold text-primary">{title}</p>
            <p className="text-text-light">{children}</p>
        </div>
    </div>
);

const InnovationHubPage: React.FC = () => {
    return (
        <div>
            <PageHeader title="Innovation & Ideation Hub" subtitle="Where visionaries collaborate, and groundbreaking ideas become reality."/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-primary mb-6">Our Process: From Idea to Impact</h2>
                        <div className="flex flex-col">
                            <InnovationStep number="1" title="Cross-disciplinary Dialogues">
                                We bring together experts from diverse fields to spark conversations, challenge assumptions, and identify new opportunities for innovation.
                            </InnovationStep>
                             <InnovationStep number="2" title="Design Thinking Workshops">
                                Promising ideas are explored through structured workshops, focusing on human-centered design to develop viable and desirable solutions.
                            </InnovationStep>
                             <InnovationStep number="3" title="Hackathons & Challenges">
                                We host intensive, collaborative events to rapidly prototype and test solutions for specific, real-world problems.
                            </InnovationStep>
                             <InnovationStep number="4" title="Accelerator & Incubator Programs">
                                The most promising projects receive dedicated mentorship, funding, and resources to scale their solutions and bring them to market.
                            </InnovationStep>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <img src="https://picsum.photos/seed/innovation/500/300" alt="Collaborative workshop" className="rounded-lg mb-6 mx-auto"/>
                        <h3 className="text-2xl font-display font-bold text-primary">Have a Visionary Idea?</h3>
                        <p className="mt-4 text-text-light">Our accelerator program provides the resources, mentorship, and network to help you succeed. We're looking for bold ideas that can change the world.</p>
                        <button className="mt-6 px-8 py-3 font-bold text-white bg-accent rounded-full hover:bg-secondary transition-colors duration-300">
                            Submit Your Idea
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnovationHubPage;

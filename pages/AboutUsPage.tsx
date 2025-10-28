
import React from 'react';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const Section: React.FC<{title:string; children: React.ReactNode;}> = ({title, children}) => (
    <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-primary mb-8">{title}</h2>
            <div className="prose max-w-none text-text-light">{children}</div>
        </div>
    </section>
);


const AboutUsPage: React.FC = () => {
  return (
    <div>
        <PageHeader title="About KKM International" subtitle="Pioneering sustainable solutions for a complex world through innovation, collaboration, and unwavering commitment."/>
        
        <div className="bg-white">
            <Section title="Company Overview">
                <p>KKM International Group is a global consortium dedicated to developing and deploying cutting-edge technologies that address critical challenges in energy, health, and sustainable development. Founded on the principle of integrated innovation, we bring together diverse expertise in engineering, biomedical sciences, and rural development to create holistic solutions with lasting impact.</p>
                <p>Our mission is to engineer a self-sustaining future where communities thrive, powered by clean energy, supported by advanced healthcare, and connected by resilient infrastructure. We operate globally, with a focus on projects that foster regional growth and international collaboration.</p>
            </Section>
        </div>

        <Section title="Leadership & Governance">
            <p>Our leadership team comprises seasoned executives, world-class engineers, and visionary strategists with decades of experience in their respective fields. They guide our company with a steady hand, ensuring ethical governance, operational excellence, and a culture of continuous innovation. We are committed to transparency and accountability in all our engagements.</p>
        </Section>
        
        <div className="bg-white">
            <Section title="Strategic Roles & Engagements">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-display font-semibold text-secondary mb-2">Regional Engagements</h3>
                        <p>We actively partner with local governments and communities to develop projects that are tailored to their unique needs. From the energy villages in Qeshm to infrastructure development in Kurdistan, our work is deeply rooted in regional context and collaboration.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-semibold text-secondary mb-2">Institutional Collaborations</h3>
                        <p>We believe in the power of partnership. KKM collaborates with leading universities, research institutions, and technology firms to accelerate the development of new solutions and bring them to market faster. These collaborations are the lifeblood of our Innovation & Ideation Hub.</p>
                    </div>
                </div>
            </Section>
        </div>
    </div>
  );
};

export default AboutUsPage;

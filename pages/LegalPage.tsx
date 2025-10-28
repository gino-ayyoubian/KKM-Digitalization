import React from 'react';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const Section: React.FC<{title:string; id: string; children: React.ReactNode;}> = ({title, id, children}) => (
    <section className="py-12" id={id}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-primary mb-6">{title}</h2>
            <div className="prose max-w-none text-text-light">{children}</div>
        </div>
    </section>
);


const LegalPage: React.FC = () => {
  return (
    <div>
        <PageHeader title="Legal & Policies" subtitle="Our commitment to transparency, privacy, and ethical conduct."/>
        
        <div className="bg-white">
            <Section title="Privacy Policy" id="privacy">
                <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
                <p>KKM International Group ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
                
                <h3 className="font-bold mt-4">Collection of Your Information</h3>
                <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</p>

                <h3 className="font-bold mt-4">Use of Your Information</h3>
                <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to: create and manage your account, email you regarding your account or order, fulfill and manage purchases, orders, payments, and other transactions related to the Site, and increase the efficiency and operation of the Site.</p>
            </Section>
        </div>

        <Section title="Terms of Use" id="terms">
             <p><strong>Agreement to Terms</strong></p>
             <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and KKM International Group (“Company”, “we”, “us”, or “our”), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).</p>
            
            <h3 className="font-bold mt-4">Intellectual Property Rights</h3>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>

            <h3 className="font-bold mt-4">Prohibited Activities</h3>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
        </Section>
    </div>
  );
};

export default LegalPage;

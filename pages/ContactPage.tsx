
import React from 'react';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
    };

    return (
        <div>
            <PageHeader title="Contact Us" subtitle="We’re here to answer your questions. Reach out to us for inquiries, partnerships, or feedback."/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-display font-bold text-primary mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-dark">Full Name</label>
                                <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"/>
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-dark">Email Address</label>
                                <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"/>
                            </div>
                             <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-text-dark">Subject</label>
                                <input type="text" id="subject" name="subject" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"/>
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-dark">Message</label>
                                <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                                    Submit Inquiry
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-primary mb-6">Our Location</h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-lg font-bold text-primary">Intellectual Property Office</h3>
                            <p className="mt-2 text-text-light">Qeshm Free Zone, Iran</p>
                            
                            <h3 className="text-lg font-bold text-primary mt-6">General Inquiries</h3>
                            <p className="mt-2 text-accent">info@kkm-intl.org</p>

                            <div className="mt-6 h-64 bg-gray-200 rounded-lg overflow-hidden">
                                <img src="https://i.imgur.com/gX3t2oP.png" alt="Map placeholder" className="w-full h-full object-cover opacity-50"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

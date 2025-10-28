import React, { useState } from 'react';

const PageHeader: React.FC<{title: string; subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">{title}</h1>
            <p className="mt-4 text-lg text-text-light max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Full Name is required';
        if (!formData.email) {
            newErrors.email = 'Email Address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email Address is invalid';
        }
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you shortly.');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setIsSubmitting(false);
            }, 1000);
        }
    };

    return (
        <div>
            <PageHeader title="Contact Us" subtitle="We’re here to answer your questions. Reach out to us for inquiries, partnerships, or feedback."/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-display font-bold text-primary mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-dark">Full Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"/>
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-dark">Email Address</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"/>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                             <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-text-dark">Subject</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"/>
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-dark">Message</label>
                                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-400">
                                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-primary mb-6">Contact Information</h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-primary">Central Office</h3>
                                <a href="https://maps.app.goo.gl/yKJYc3TNjyURAkUw6" target="_blank" rel="noopener noreferrer" className="mt-2 text-text-light hover:text-accent transition-colors">
                                    Qeshm Free Zone, Iran
                                </a>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold text-primary">Phone Lines</h3>
                                <p className="mt-2 text-text-light">
                                    <a href="tel:+982128424430" className="hover:text-accent transition-colors">+98 21 2842 4430</a><br/>
                                    <a href="tel:+982128424630" className="hover:text-accent transition-colors">+98 21 2842 4630</a>
                                </p>
                                <p className="text-sm text-gray-500 mt-1">Our lines feature IVR for directing your call efficiently.</p>
                            </div>

                             <div>
                                <h3 className="text-lg font-bold text-primary">Email Addresses</h3>
                                <p className="mt-2 text-text-light">
                                    General Inquiries: <a href="mailto:info@kkm-intl.xyz" className="text-accent hover:underline">info@kkm-intl.xyz</a><br/>
                                    C-Suite Contact: <a href="mailto:g.ayyoubian@kkm-intl.org" className="text-accent hover:underline">g.ayyoubian@kkm-intl.org</a>
                                </p>
                            </div>
                            
                             <div>
                                <h3 className="text-lg font-bold text-primary">Websites</h3>
                                <p className="mt-2 text-text-light">
                                    <a href="https://kkm-intl.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">kkm-intl.org</a><br/>
                                    <a href="https://kkm-intl.xyz" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">kkm-intl.xyz</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;

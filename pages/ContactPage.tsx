import React, { useState, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Page } from '../types';
import type { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import InteractiveMap from '../components/InteractiveMap';
import { motion, AnimatePresence } from 'framer-motion';

const FormField: React.FC<{
    id: string;
    label: string;
    children: ReactNode;
    error?: string;
}> = ({ id, label, children, error }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-light dark:text-slate-300 mb-1">{label}</label>
        {children}
        <AnimatePresence>
            {error && (
                <motion.p
                    id={`${id}-error`}
                    className="text-red-600 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);

const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);
    const [activeLocation, setActiveLocation] = useState<MapMarker | null>(null);

    const officeLocations: MapMarker[] = useMemo(() => [
        {
            name: t('HeadOffice'),
            description: t('TehranOfficeAddress'),
            coordinates: { lat: 35.7646896, lng: 51.4163221 },
            category: 'Head Office',
            imageUrl: 'https://picsum.photos/seed/tehran-office/200/150',
            type: 'office',
        },
        {
            name: t('BranchOffice'),
            description: t('QeshmAddress'),
            coordinates: { lat: 26.9583, lng: 56.2722 },
            category: 'Branch Office',
            imageUrl: 'https://picsum.photos/seed/qeshm-office/200/150',
            type: 'office',
        },
    ], [t]);
    
    useEffect(() => {
        // Set the head office as the default active location on load
        if (officeLocations.length > 0) {
            setActiveLocation(officeLocations[0]);
        }
    }, [officeLocations]);


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = t('ValidationRequired', { field: t('FullName') });
        if (!formData.email.trim()) {
            newErrors.email = t('ValidationRequired', { field: t('EmailAddress') });
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('ValidationInvalid', { field: t('EmailAddress') });
        }
        if (!formData.subject.trim()) newErrors.subject = t('ValidationRequired', { field: t('Subject') });
        if (!formData.message.trim()) newErrors.message = t('ValidationRequired', { field: t('Message') });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setFormSubmittedSuccessfully(true);
            }, 1500);
        }
    };
    
    const resetForm = () => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setFormSubmittedSuccessfully(false);
    }

    return (
        <div>
            <PageHeader title={t(Page.Contact)} subtitle={t('ContactSubtitle')} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                         <AnimatePresence mode="wait">
                            {formSubmittedSuccessfully ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="text-center flex flex-col items-center justify-center h-full min-h-[500px]"
                                >
                                    <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('ContactFormSuccessTitle')}</h2>
                                    <p className="text-text-light dark:text-slate-300 mb-6">{t('ContactFormSuccess')}</p>
                                    <button onClick={resetForm} className="px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300">
                                        {t('SendAnotherMessage')}
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-6">{t('SendMessage')}</h2>
                                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                        <FormField id="name" label={t('FullName')} error={errors.name}>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                aria-label={t('FullName')}
                                                aria-required="true"
                                                aria-invalid={!!errors.name}
                                                aria-describedby={errors.name ? 'name-error' : undefined}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                            />
                                        </FormField>
                                        <FormField id="email" label={t('EmailAddress')} error={errors.email}>
                                             <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                aria-label={t('EmailAddress')}
                                                aria-required="true"
                                                aria-invalid={!!errors.email}
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                            />
                                        </FormField>
                                        <FormField id="subject" label={t('Subject')} error={errors.subject}>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                aria-label={t('Subject')}
                                                aria-required="true"
                                                aria-invalid={!!errors.subject}
                                                aria-describedby={errors.subject ? 'subject-error' : undefined}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                            />
                                        </FormField>
                                        <FormField id="message" label={t('Message')} error={errors.message}>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                aria-label={t('Message')}
                                                aria-required="true"
                                                aria-invalid={!!errors.message}
                                                aria-describedby={errors.message ? 'message-error' : undefined}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                            />
                                        </FormField>
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300 disabled:bg-gray-400"
                                            >
                                                {isSubmitting ? t('Submitting') : t('SubmitInquiry')}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                         <div>
                            <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('ContactInformation')}</h2>
                            <div className="space-y-4">
                            {officeLocations.map(loc => (
                                <div key={loc.name} className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeLocation?.name === loc.name ? 'bg-secondary/20 shadow-md' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'}`} onClick={() => setActiveLocation(loc)}>
                                    <h3 className="font-bold text-text-dark dark:text-slate-200">{loc.name}</h3>
                                    <p className="text-sm text-text-light dark:text-slate-400">{loc.description}</p>
                                </div>
                            ))}
                             <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
                                <h3 className="font-bold text-text-dark dark:text-slate-200">{t('PhoneLines')}</h3>
                                <a href={`tel:${t('CompanyPhone').replace(/\s/g, '')}`} className="text-sm text-text-light dark:text-slate-400 hover:text-primary dark:hover:text-secondary">{t('CompanyPhone')}</a>
                            </div>
                            </div>
                        </div>
                        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                            <InteractiveMap projects={officeLocations} activeProject={activeLocation} />
                        </div>
                    </div>
                </div>
                <div className="mt-20 text-center bg-white dark:bg-slate-800 p-12 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-display font-bold text-primary dark:text-secondary">{t('OtherLocationsTitle')}</h2>
                    <p className="mt-4 text-lg text-text-light dark:text-slate-300 max-w-3xl mx-auto">{t('OtherLocationsSubtitle')}</p>
                    <button 
                        className="mt-8 px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300 opacity-60 cursor-not-allowed"
                        aria-disabled="true"
                    >
                        {t('ExploreOtherLocations')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
import React, { useState, useMemo, useEffect } from 'react';
import { Page, MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';
import PageHeader from '../components/PageHeader';
import InteractiveMap from '../components/InteractiveMap';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeLocation, setActiveLocation] = useState<MapMarker | null>(null);
    const [showOtherLocations, setShowOtherLocations] = useState(false);

    const officeLocationsForMap: MapMarker[] = useMemo(() => [
        {
            name: t('HeadOffice'),
            description: t('TehranAddress'),
            coordinates: { lat: 35.7646896, lng: 51.4163221 },
        },
        {
            name: t('BranchOffice'),
            description: t('QeshmAddress'),
            coordinates: { lat: 26.9492441, lng: 56.2632577 },
        }
    ], [t]);

    useEffect(() => {
        if (officeLocationsForMap.length > 0 && !activeLocation) {
            setActiveLocation(officeLocationsForMap[0]);
        }
    }, [officeLocationsForMap, activeLocation]);

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'name':
                if (!value.trim()) return t('ValidationRequired', { field: t('FullName') });
                break;
            case 'email':
                if (!value.trim()) return t('ValidationRequired', { field: t('EmailAddress') });
                if (!/\S+@\S+\.\S+/.test(value)) return t('ValidationInvalid', { field: t('EmailAddress') });
                break;
            case 'subject':
                if (!value.trim()) return t('ValidationRequired', { field: t('Subject') });
                break;
            case 'message':
                if (!value.trim()) return t('ValidationRequired', { field: t('Message') });
                break;
        }
        return '';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
             setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { [key: string]: string } = {};
        let formIsValid = true;
        Object.keys(formData).forEach(key => {
            const fieldName = key as keyof typeof formData;
            const error = validateField(fieldName, formData[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                formIsValid = false;
            }
        });

        setErrors(newErrors);

        if (formIsValid) {
            setIsSubmitting(true);
            setTimeout(() => {
                alert(t('ContactFormSuccess'));
                setFormData({ name: '', email: '', subject: '', message: '' });
                setIsSubmitting(false);
            }, 1000);
        }
    };
    
    const getInputClassName = (fieldName: keyof typeof formData) => {
        const baseClasses = "mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm focus:outline-none";
        if (errors[fieldName]) {
            return `${baseClasses} border-red-500 focus:ring-red-500 focus:border-red-500`;
        }
        return `${baseClasses} border-gray-300 focus:ring-secondary focus:border-secondary`;
    };

    return (
        <div>
            <PageHeader title={t(Page.Contact)} subtitle={t('ContactSubtitle')}/>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-display font-bold text-primary mb-6">{t('SendMessage')}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-dark">{t('FullName')}</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} required className={getInputClassName('name')}/>
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-dark">{t('EmailAddress')}</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required className={getInputClassName('email')}/>
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                             <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-text-dark">{t('Subject')}</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} onBlur={handleBlur} required className={getInputClassName('subject')}/>
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-dark">{t('Message')}</label>
                                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} onBlur={handleBlur} required className={getInputClassName('message')}></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-text-dark bg-accent-yellow hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-400">
                                    {isSubmitting ? t('Submitting') : t('SubmitInquiry')}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-primary mb-6">{t('ContactInformation')}</h2>
                        <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
                            <div className="relative h-80 rounded-lg overflow-hidden shadow-md bg-gray-200 mb-6">
                                <InteractiveMap projects={officeLocationsForMap} activeProject={activeLocation} />
                            </div>

                            {officeLocationsForMap.map(location => (
                                <div 
                                    key={location.name}
                                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-300 ${activeLocation?.name === location.name ? 'border-secondary bg-blue-50' : 'border-transparent hover:bg-gray-100'}`}
                                    onClick={() => setActiveLocation(location)}
                                >
                                    <h3 className="text-lg font-bold text-primary">{location.name}</h3>
                                    <p className="mt-1 text-text-light">{location.description}</p>
                                </div>
                            ))}
                            
                            <div>
                                <h3 className="text-lg font-bold text-primary">{t('PhoneLines')}</h3>
                                <p className="mt-2 text-text-light">
                                    <a href="tel:+982128424430" className="hover:text-accent-yellow transition-colors">+98 21 2842 4430</a><br/>
                                    <a href="tel:+982128424630" className="hover:text-accent-yellow transition-colors">+98 21 2842 4630</a>
                                </p>
                                <p className="text-sm text-gray-500 mt-1">{t('IVRNotice')}</p>
                            </div>

                             <div>
                                <h3 className="text-lg font-bold text-primary">{t('EmailAddresses')}</h3>
                                <p className="mt-2 text-text-light">
                                    {t('GeneralInquiries')}: <a href="mailto:info@kkm-intl.xyz" className="text-accent-yellow hover:underline">info@kkm-intl.xyz</a><br/>
                                    {t('CSuiteContact')}: <a href="mailto:g.ayyoubian@kkm-intl.org" className="text-accent-yellow hover:underline">g.ayyoubian@kkm-intl.org</a>
                                </p>
                            </div>
                            
                             <div>
                                <h3 className="text-lg font-bold text-primary">{t('Websites')}</h3>
                                <p className="mt-2 text-text-light">
                                    <a href="https://kkm-intl.org" target="_blank" rel="noopener noreferrer" className="text-accent-yellow hover:underline">kkm-intl.org</a><br/>
                                    <a href="https://kkm-intl.xyz" target="_blank" rel="noopener noreferrer" className="text-accent-yellow hover:underline">kkm-intl.xyz</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16 border-t pt-16">
                <div className="text-center">
                    <h2 className="text-3xl font-display font-bold text-primary mb-4">{t('OtherLocationsTitle')}</h2>
                    <p className="text-lg text-text-light max-w-3xl mx-auto mb-8">{t('OtherLocationsSubtitle')}</p>
                    
                    {!showOtherLocations && (
                        <button 
                            onClick={() => setShowOtherLocations(true)}
                            className="px-8 py-3 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300 transform hover:scale-105"
                        >
                            {t('ExploreOtherLocations')}
                        </button>
                    )}
                </div>

                <AnimatePresence>
                {showOtherLocations && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 bg-white p-12 rounded-lg shadow-xl text-center"
                    >
                        <p className="text-text-light mb-8 max-w-2xl mx-auto">{t('OtherLocationsText')}</p>
                        <button className="px-8 py-3 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-colors duration-300 transform hover:scale-105">
                            {t('DiscoverMore')}
                        </button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ContactPage;
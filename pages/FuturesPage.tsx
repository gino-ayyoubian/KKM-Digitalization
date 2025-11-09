import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { useLanguage } from '../LanguageContext';
import type { TranslationKey } from '../translations';
import PageHeader from '../components/PageHeader';

const NotifyModal: React.FC<{onClose: () => void; t: (key: TranslationKey) => string;}> = ({ onClose, t }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && email.includes('@')) {
            setSubmitted(true);
            // In a real app, this would call an API
            console.log(`Email submitted for notification: ${email}`);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-md w-full p-8 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {submitted ? (
                    <>
                        <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('NotifyModalSuccessTitle')}</h2>
                        <p className="text-text-light dark:text-slate-300 mb-6">{t('NotifyModalSuccessText')}</p>
                        <button 
                            onClick={onClose} 
                            className="px-6 py-2 font-bold text-white bg-primary rounded-full hover:bg-secondary transition-colors duration-300"
                        >
                            {t('Close')}
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('NotifyModalTitle')}</h2>
                        <p className="text-text-light dark:text-slate-300 mb-6">{t('NotifyModalText')}</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input 
                                type="email"
                                placeholder={t('NotifyModalPlaceholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-full shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                            />
                            <button 
                                type="submit" 
                                className="px-6 py-2 font-bold text-text-dark bg-accent-yellow rounded-full hover:bg-secondary transition-colors duration-300"
                            >
                                {t('NotifyMe')}
                            </button>
                        </form>
                        <button onClick={onClose} className="mt-4 text-sm text-gray-500 dark:text-slate-400 hover:underline">
                            {t('NotifyModalNoThanks')}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const FuturesSection: React.FC<{title: string; icon: ReactNode; children: ReactNode}> = ({ title, icon, children }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg h-full">
        <div className="flex items-center mb-4">
            <div className="text-accent-yellow mr-4">{icon}</div>
            <h3 className="text-2xl font-display font-bold text-primary dark:text-secondary">{title}</h3>
        </div>
        <ul className="space-y-3 list-disc list-inside text-text-light dark:text-slate-300">
            {children}
        </ul>
    </div>
);

type OrgMember = {
    name: TranslationKey;
    role: TranslationKey;
    desc: TranslationKey;
    rbac: TranslationKey;
}

const OrgTable: React.FC<{
    title: TranslationKey,
    members: OrgMember[],
    descHeader: TranslationKey,
    t: (key: TranslationKey) => string;
}> = ({ title, members, descHeader, t }) => {
    return (
        <div>
            <h3 className="font-display font-bold text-2xl text-secondary mb-4 mt-6">{t(title)}</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                        <tr>
                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('Name')}</th>
                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('Role')}</th>
                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t(descHeader)}</th>
                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('RBAC')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.name} className="border-b border-gray-200 dark:border-slate-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-800">
                                <td className="p-3 font-semibold text-text-dark dark:text-slate-200">{t(member.name)}</td>
                                <td className="p-3 text-text-light dark:text-slate-300">{t(member.role)}</td>
                                <td className="p-3 text-text-light dark:text-slate-300">{t(member.desc)}</td>
                                <td className="p-3 text-text-light dark:text-slate-300">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${t(member.rbac) === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'}`}>
                                      {t(member.rbac)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};


const FuturesPage: React.FC = () => {
    const { t } = useLanguage();
    const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);

    const executiveLeadership: OrgMember[] = [
        { name: 'GinoAyyoubian', role: 'CEO', desc: 'CEODesc', rbac: 'Admin' },
        { name: 'DrRezaAsakereh', role: 'CTO', desc: 'CTODesc', rbac: 'Admin' },
        { name: 'DrKhosroJarrahian', role: 'CSO', desc: 'CSODesc', rbac: 'Manager' },
        { name: 'FaridImani', role: 'CIO', desc: 'CIODesc', rbac: 'Manager' },
        { name: 'DrPedramAbdarzadeh', role: 'CFO', desc: 'CFODesc', rbac: 'Manager' },
        { name: 'HeidarYarveicy', role: 'COO', desc: 'COODesc', rbac: 'Manager' },
    ];
    
    const seniorManagement: OrgMember[] = [
        { name: 'DrSalarHashemi', role: 'DirectorOfEnergySystems', desc: 'EnergySystemsDesc', rbac: 'Manager' },
        { name: 'MahdiGhiasy', role: 'DirectorOfBIM', desc: 'BIMDesc', rbac: 'Manager' },
        { name: 'AshkanTofangchiha', role: 'QAQCManager', desc: 'QAQCDesc', rbac: 'Reviewer' },
        { name: 'MostafaSharifi', role: 'OpExManager', desc: 'OpExDesc', rbac: 'Reviewer' },
        { name: 'BadieRazi', role: 'DirectorOfProcess', desc: 'ProcessDesc', rbac: 'Manager' },
    ];

    const corporateFunctions: OrgMember[] = [
        { name: 'MasoumehMoshar', role: 'DirectorOfPR', desc: 'PRDesc', rbac: 'Manager' },
        { name: 'HamedZatajam', role: 'DirectorOfLegal', desc: 'LegalDesc', rbac: 'Manager' },
        { name: 'SeyedJasemHosseini', role: 'DirectorOfHSE', desc: 'HSEDesc', rbac: 'Manager' },
        { name: 'Vacant', role: 'HeadOfCommercial', desc: 'CommercialDesc', rbac: 'Manager' },
        { name: 'Vacant', role: 'PeopleCultureLead', desc: 'PeopleCultureDesc', rbac: 'Manager' },
    ];
    
    const specializedRD: OrgMember[] = [
        { name: 'DrMasoumehEinabadi', role: 'HeadOfBiomedical', desc: 'BiomedicalDesc', rbac: 'Contributor' },
        { name: 'SinaAyyoubian', role: 'RDSpecialist', desc: 'RDDesc', rbac: 'Contributor' },
    ];

    const advisoryBoard: OrgMember[] = [
        { name: 'SinaAyyoubian', role: 'YouthAmbassador', desc: 'YouthAmbassadorDesc', rbac: 'Guest' },
        { name: 'DrRezaBaghdadchi', role: 'RegulatoryAdvisor', desc: 'RegulatoryDesc', rbac: 'Guest' },
        { name: 'TBD', role: 'SustainabilityAdvisor', desc: 'SustainabilityDesc', rbac: 'Guest' },
        { name: 'TBD', role: 'TechTrendsAdvisor', desc: 'TechTrendsDesc', rbac: 'Guest' },
    ];

    const rbacLogic = [
        { level: 'Admin', scope: 'AdminScope' },
        { level: 'Manager', scope: 'ManagerScope' },
        { level: 'Reviewer', scope: 'ReviewerScope' },
        { level: 'Contributor', scope: 'ContributorScope' },
        { level: 'Guest', scope: 'GuestScope' },
    ];
    
    return (
        <div>
            {isNotifyModalOpen && <NotifyModal onClose={() => setIsNotifyModalOpen(false)} t={t} />}
            <PageHeader title={t('FuturesPageTitle')} subtitle={t('FuturesPageSubtitle')} />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-16">
                <div className="grid md:grid-cols-2 gap-8">
                    <FuturesSection title={t('CaseStudiesTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
                        <li>{t('CaseStudiesDesc1')}</li>
                        <li>{t('CaseStudiesDesc2')}</li>
                        <li>{t('CaseStudiesDesc3')}</li>
                    </FuturesSection>
                    <FuturesSection title={t('MedicalEngineeringTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}>
                        <li>{t('MedicalEngineeringDesc1')}</li>
                        <li>{t('MedicalEngineeringDesc2')}</li>
                        <li>{t('MedicalEngineeringDesc3')}</li>
                    </FuturesSection>
                    <FuturesSection title={t('IndustrialDesignTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}>
                        <li>{t('IndustrialDesignDesc1')}</li>
                        <li>{t('IndustrialDesignDesc2')}</li>
                        <li>{t('IndustrialDesignDesc3')}</li>
                    </FuturesSection>
                    <FuturesSection title={t('TechPipelineTitle')} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
                        <li>{t('TechPipelineDesc1')}</li>
                        <li>{t('TechPipelineDesc2')}</li>
                        <li>{t('TechPipelineDesc3')}</li>
                    </FuturesSection>
                </div>

                <div className="mt-24 bg-gradient-to-r from-primary to-text-dark text-white p-12 rounded-lg shadow-2xl">
                    <h2 className="text-3xl font-display font-bold text-white text-center mb-6">{t('CommitmentTitle')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            <p className="text-lg text-gray-200">{t('CommitmentPoint1')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <p className="text-lg text-gray-200">{t('CommitmentPoint2')}</p>
                        </div>
                        <div className="flex flex-col items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <p className="text-lg text-gray-200">{t('CommitmentPoint3')}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-24 bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-display font-bold text-primary dark:text-white text-center mb-8">{t('OrgStructureTitle')}</h2>

                    <div className="space-y-12">
                        <OrgTable title="ExecutiveLeadership" members={executiveLeadership} descHeader="CoreResponsibilities" t={t} />
                        <OrgTable title="SeniorManagement" members={seniorManagement} descHeader="FocusArea" t={t} />
                        <OrgTable title="CorporateFunctions" members={corporateFunctions} descHeader="Domain" t={t} />
                        <OrgTable title="SpecializedRD" members={specializedRD} descHeader="Domain" t={t} />
                        
                        <div>
                            <h3 className="font-display font-bold text-2xl text-secondary mb-4 mt-6">{t('AdvisoryBoard')}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                                        <tr>
                                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('Name')}</th>
                                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('Role')}</th>
                                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('Domain')}</th>
                                            <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('RBAC')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {advisoryBoard.map(member => (
                                            <tr key={member.name + member.role} className="border-b border-gray-200 dark:border-slate-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-slate-800">
                                                <td className="p-3 font-semibold text-text-dark dark:text-slate-200">
                                                    {t(member.name) === '(TBD)' ? (
                                                        <button onClick={() => setIsNotifyModalOpen(true)} className="text-accent-yellow hover:underline font-semibold">
                                                            {t(member.name)}
                                                        </button>
                                                    ) : (
                                                        t(member.name)
                                                    )}
                                                </td>
                                                <td className="p-3 text-text-light dark:text-slate-300">{t(member.role)}</td>
                                                <td className="p-3 text-text-light dark:text-slate-300">{t(member.desc)}</td>
                                                <td className="p-3 text-text-light dark:text-slate-300">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300`}>
                                                      {t(member.rbac)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('RBACLogicTitle')}</h2>
                        <table className="w-full text-left text-sm">
                            <thead className="border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                                <tr>
                                    <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('RBACLevel')}</th>
                                    <th className="font-semibold p-3 text-text-dark dark:text-slate-200">{t('AccessScope')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rbacLogic.map(item => (
                                    <tr key={item.level} className="border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                                        <td className="p-3 font-semibold text-text-dark dark:text-slate-200">{t(item.level as TranslationKey)}</td>
                                        <td className="p-3 text-text-light dark:text-slate-300">{t(item.scope as TranslationKey)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl">
                         <h2 className="text-2xl font-display font-bold text-primary dark:text-secondary mb-4">{t('TemplatesTitle')}</h2>
                         <div className="space-y-4">
                             <div>
                                 <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('LinkedDatabases')}</h3>
                                 <ul className="list-disc list-inside text-text-light dark:text-slate-300 text-sm space-y-1 mt-2">
                                     <li>{t('RolesDatabase')}</li>
                                     <li>{t('AccessModulesDatabase')}</li>
                                     <li>{t('GovernanceChecklistDatabase')}</li>
                                 </ul>
                             </div>
                             <div>
                                 <h3 className="font-semibold text-text-dark dark:text-slate-200">{t('WorkflowTemplates')}</h3>
                                 <ul className="list-disc list-inside text-text-light dark:text-slate-300 text-sm space-y-1 mt-2">
                                     <li>{t('IntakeTracker')}</li>
                                     <li>{t('ReviewerDashboard')}</li>
                                     <li>{t('EvidenceVault')}</li>
                                     <li>{t('ComplianceMatrix')}</li>
                                     <li>{t('AuditTimeline')}</li>
                                     <li>{t('ExceptionsLog')}</li>
                                 </ul>
                             </div>
                         </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FuturesPage;
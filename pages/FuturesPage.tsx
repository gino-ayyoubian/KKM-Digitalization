import React from 'react';
import { useLanguage } from '../LanguageContext';
import { TranslationKey } from '../translations';
import PageHeader from '../components/PageHeader';

const FuturesSection: React.FC<{title: string; icon: React.ReactNode; children: React.ReactNode}> = ({ title, icon, children }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full">
        <div className="flex items-center mb-4">
            <div className="text-accent-yellow mr-4">{icon}</div>
            <h3 className="text-2xl font-display font-bold text-primary">{title}</h3>
        </div>
        <ul className="space-y-3 list-disc list-inside text-text-light">
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

const OrgTable: React.FC<{title: TranslationKey, members: OrgMember[], descHeader: TranslationKey}> = ({ title, members, descHeader }) => {
    const { t } = useLanguage();
    return (
        <div>
            <h3 className="font-display font-bold text-2xl text-secondary mb-4 mt-6">{t(title)}</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="font-semibold p-3 text-text-dark">{t('Name')}</th>
                            <th className="font-semibold p-3 text-text-dark">{t('Role')}</th>
                            <th className="font-semibold p-3 text-text-dark">{t(descHeader)}</th>
                            <th className="font-semibold p-3 text-text-dark">{t('RBAC')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.name} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                                <td className="p-3 font-semibold text-text-dark">{t(member.name)}</td>
                                <td className="p-3 text-text-light">{t(member.role)}</td>
                                <td className="p-3 text-text-light">{t(member.desc)}</td>
                                <td className="p-3 text-text-light">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${t(member.rbac) === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
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

                <div className="mt-24 bg-white p-4 sm:p-8 rounded-lg shadow-xl">
                    <h2 className="text-3xl font-display font-bold text-primary text-center mb-8">{t('OrgStructureTitle')}</h2>

                    <div className="space-y-12">
                        <OrgTable title="ExecutiveLeadership" members={executiveLeadership} descHeader="CoreResponsibilities" />
                        <OrgTable title="SeniorManagement" members={seniorManagement} descHeader="FocusArea" />
                        <OrgTable title="CorporateFunctions" members={corporateFunctions} descHeader="Domain" />
                        <OrgTable title="SpecializedRD" members={specializedRD} descHeader="Domain" />
                        <OrgTable title="AdvisoryBoard" members={advisoryBoard} descHeader="Domain" />
                    </div>
                </div>

                <div className="mt-24 grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('RBACLogicTitle')}</h2>
                        <table className="w-full text-left text-sm">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="font-semibold p-3 text-text-dark">{t('RBACLevel')}</th>
                                    <th className="font-semibold p-3 text-text-dark">{t('AccessScope')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rbacLogic.map(item => (
                                    <tr key={item.level} className="border-b border-gray-200 last:border-b-0">
                                        <td className="p-3 font-semibold text-text-dark">{t(item.level as TranslationKey)}</td>
                                        <td className="p-3 text-text-light">{t(item.scope as TranslationKey)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                     <div className="bg-white p-8 rounded-lg shadow-xl">
                         <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('TemplatesTitle')}</h2>
                         <div className="space-y-4">
                             <div>
                                 <h3 className="font-semibold text-text-dark">{t('LinkedDatabases')}</h3>
                                 <ul className="list-disc list-inside text-text-light text-sm space-y-1 mt-2">
                                     <li>{t('RolesDatabase')}</li>
                                     <li>{t('AccessModulesDatabase')}</li>
                                     <li>{t('GovernanceChecklistDatabase')}</li>
                                 </ul>
                             </div>
                             <div>
                                 <h3 className="font-semibold text-text-dark">{t('WorkflowTemplates')}</h3>
                                 <ul className="list-disc list-inside text-text-light text-sm space-y-1 mt-2">
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

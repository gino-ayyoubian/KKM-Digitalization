
import { Page } from './types';

export interface NavLink {
  name: Page;
  subLinks?: { name: string; id: string }[];
}

export const NAV_LINKS: NavLink[] = [
  { name: Page.Home },
  { name: Page.AboutUs },
  { name: Page.CoreTechnologies },
  { name: Page.Projects },
  { name: Page.InnovationHub },
  { name: Page.Careers },
  { name: Page.News },
  { name: Page.Contact },
];

export const GMEL_TECHNOLOGIES = [
    { name: "GMEL-CLG (Closed-loop Geothermal)", description: "Zero-emission geothermal energy generation." },
    { name: "GMEL-EHS (Smart Energy Sensors)", description: "Advanced sensors for efficient energy management." },
    { name: "GMEL-DrillX (Advanced Drilling)", description: "Next-generation drilling technology for deeper access." },
    { name: "GMEL-ThermoFluid (Heat Transfer Fluid)", description: "High-efficiency fluids for thermal energy transfer." },
    { name: "GMEL-Desal (Thermal Desalination)", description: "Sustainable desalination using thermal energy." },
    { name: "GMEL-H₂Cell (Hydrogen Production)", description: "Green hydrogen production from geothermal sources." },
    { name: "GMEL-AgriCell (Thermal Agriculture)", description: "Climate-controlled agriculture using geothermal heat." },
    { name: "GMEL-LithiumLoop (Lithium Extraction)", description: "Eco-friendly lithium extraction from geothermal brines." },
    { name: "GMEL-EcoCluster (Energy-Centric Villages)", description: "Sustainable community models powered by local energy." },
    { name: "GMEL-SmartFund (Marine-Village Fund)", description: "Funding for sustainable marine and village projects." },
    { name: "GMEL-GeoCredit (Carbon Credit Platform)", description: "A platform for managing and trading carbon credits." },
];

export const OTHER_CORE_AREAS = [
    { name: "Biomedical & Health Innovation", description: "Engineering solutions for modern health challenges." },
    { name: "Sports Management", description: "Developing infrastructure and analytics for athlete performance." },
    { name: "Rural Studies & Development", description: "Empowering rural communities through technology and policy." },
];

export const PROJECTS = [
    { name: "Qeshm Energy Village", description: "A pilot project for the GMEL-EcoCluster concept.", image: "https://picsum.photos/seed/qeshm/600/400" },
    { name: "Kurdistan Regional Projects", description: "Developing energy infrastructure in the Kurdistan region.", image: "https://picsum.photos/seed/kurdistan/600/400" },
    { name: "Water & Civil Engineering", description: "Large-scale water management and infrastructure projects.", image: "https://picsum.photos/seed/water/600/400" },
];

export const NEWS_ITEMS = [
    { title: "KKM International Launches GMEL-GeoCredit Platform", date: "Oct 26, 2023", excerpt: "A new era for transparent and verifiable carbon credit trading begins...", image: "https://picsum.photos/seed/news1/600/400" },
    { title: "Qeshm Energy Village Pilot Project Breaks Ground", date: "Sep 15, 2023", excerpt: "Construction has begun on the first sustainable energy-centric village...", image: "https://picsum.photos/seed/news2/600/400" },
    { title: "Innovation Hub Announces First Cohort of Startups", date: "Aug 01, 2023", excerpt: "Five promising startups have been selected for our accelerator program...", image: "https://picsum.photos/seed/news3/600/400" },
];

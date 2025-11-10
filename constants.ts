import { Page } from './types';
import type { Project, NavLink, NewsItem, Video } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: Page.Home },
  { name: Page.AboutUs },
  { 
    name: Page.CoreTechnologies,
    subLinks: [
      { name: "GMEL-CLG (Closed-loop Geothermal)", id: "gmel-clg" },
      { name: "GMEL-EHS (Smart Energy Sensors)", id: "gmel-ehs" },
      { name: "GMEL-DrillX (Advanced Drilling)", id: "gmel-drillx" },
      { name: "GMEL-ThermoFluid (Heat Transfer Fluid)", id: "gmel-thermofluid" },
      { name: "GMEL-Desal (Thermal Desalination)", id: "gmel-desal" },
      { name: "GMEL-H₂Cell (Hydrogen Production)", id: "gmel-h2cell" },
    ]
  },
  { name: Page.Futures },
  { name: Page.Projects },
  { name: Page.InnovationHub },
  { name: Page.Careers },
  { name: Page.News },
  { name: Page.Contact },
  { name: Page.InternalPortal },
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

export const PROJECTS: Project[] = [
    { 
        name: "Qeshm Island Oil Field Development",
        description: "A landmark EPCI project on Qeshm Island, delivering a state-of-the-art infrastructure overhaul to boost crude oil transport efficiency, expand storage capacity, and set new benchmarks in operational safety and environmental compliance.",
        image: "https://picsum.photos/seed/qeshm-oilfield/600/400",
        tags: ["Oil & Gas Infrastructure", "EPCI", "Midstream"],
        coordinates: { lat: 26.907, lng: 56.002 },
        gallery: ["https://picsum.photos/seed/qeshm-gallery1/800/600", "https://picsum.photos/seed/qeshm-gallery2/800/600", "https://picsum.photos/seed/qeshm-gallery3/800/600"],
        videoUrl: "https://www.youtube.com/embed/GLK6DErFBPA",
        detailedContent: `
            <p>KKM International spearheaded a transformative EPCI project on Qeshm Island, engineering a comprehensive modernization of its critical oil and gas infrastructure. This strategic initiative was designed to not only optimize operational efficiency but also to set new industry standards for safety, reliability, and environmental stewardship in the region.</p>
            <strong>Our integrated solution delivered significant value across multiple fronts:</strong>
            <ul>
                <li><strong>Enhanced Transport & Pumping:</strong> We engineered and constructed a state-of-the-art pump station and installed a 16-inch underwater pipeline, creating a robust and efficient corridor for crude oil transport.</li>
                <li><strong>Process Integrity:</strong> An underground MEG (monoethylene glycol) supply line was implemented to ensure pipeline integrity by preventing hydrate formation, a critical factor in uninterrupted operations.</li>
                <li><strong>Asset Longevity:</strong> We executed comprehensive repair and life-extension programs on key storage tanks, safeguarding asset value and ensuring long-term operational readiness.</li>
                <li><strong>Digital Oversight:</strong> The installation of cutting-edge instrumentation provides real-time production monitoring, enabling data-driven decisions that enhance safety and maximize output.</li>
            </ul>
            <p>This project is a testament to our expertise in executing complex, multi-disciplinary projects in challenging environments. We delivered a future-ready infrastructure solution that enhances our client's competitive edge and operational excellence.</p>
        `,
        metrics: {
            budget: {
                total: 120, currency: "M USD",
                allocation: [
                    { name: "Engineering", value: 24, fill: "#0A92EF" },
                    { name: "Procurement", value: 54, fill: "#002D56" },
                    { name: "Construction", value: 36, fill: "#89CFF0" },
                    { name: "Commissioning", value: 6, fill: "#5a646a" },
                ]
            },
            timeline: { start: "2021-03-01", end: "2023-09-30", progress: 100 }
        }
    },
    { 
        name: "Iranian Central Oil Fields (ICOFC) Enhancement",
        description: "A strategic partnership with ICOFC to unlock significant production gains and streamline operations through targeted wellhead facility management, critical pipeline construction, and enhanced gas recovery initiatives.",
        image: "https://picsum.photos/seed/icofc-sarakhs/600/400",
        tags: ["Oil & Gas Infrastructure", "Upstream Services", "Field Development"],
        coordinates: { lat: 36.544, lng: 61.157 },
        gallery: ["https://picsum.photos/seed/icofc-gallery1/800/600", "https://picsum.photos/seed/icofc-gallery2/800/600"],
        detailedContent: `
            <p>In a strategic collaboration with the Iranian Central Oil Fields Company (ICOFC), KKM International delivered a series of high-impact initiatives to optimize production and enhance operational capabilities. This project highlights our ability to act as a trusted partner to national oil companies, driving efficiency and maximizing the value of strategic energy assets.</p>
            <strong>Our key contributions included:</strong>
            <ul>
                <li><strong>Wellhead Optimization:</strong> We conducted rigorous QA/QC inspections and performance management for multiple wellhead facilities (23, 50, 52, 53, 54, 56), ensuring they operate at peak safety and efficiency.</li>
                <li><strong>Infrastructure Development:</strong> The construction of a strategic pipeline from Line #23 to Manifold 18-3 created a more streamlined and efficient pathway for resource transportation, reducing bottlenecks.</li>
                <li><strong>International Project Execution:</strong> Our leadership in managing the cross-border D1-D2 project demonstrated our robust capabilities in navigating international standards, logistics, and stakeholder relations.</li>
                <li><strong>Enhanced Gas Recovery:</strong> We implemented advanced solutions for Condensate Gas Compressors (CGC) 52 & 53, leading to a measurable increase in gas recovery rates and a significant boost to asset productivity.</li>
            </ul>
        `,
    }
];

export const NEWS_ITEMS: NewsItem[] = [
    {
        title: "KKM Unveils Groundbreaking GMEL-CLG Geothermal Technology",
        date: "2023-10-26",
        excerpt: "Our new Closed-Loop Geothermal system promises to revolutionize clean energy production with zero emissions and a minimal footprint.",
        image: "https://picsum.photos/seed/news1/600/400",
        content: "<p>In a major leap forward for renewable energy, KKM International has officially launched its proprietary GMEL-CLG (Closed-loop Geothermal) technology. This system represents a paradigm shift in how we harness geothermal energy, eliminating the need for fracking and reducing water usage to near zero. The closed-loop design ensures no greenhouse gases are released, making it one of the cleanest energy sources available today.</p><p>\"Our team has worked tirelessly to perfect this technology,\" said CEO Gino Ayyoubian. \"GMEL-CLG is not just an incremental improvement; it's a fundamental change that makes geothermal power accessible, scalable, and truly sustainable.\"</p>",
        category: 'Technology'
    },
    {
        title: "Qeshm Island Project Reaches Key Milestone Ahead of Schedule",
        date: "2023-09-15",
        excerpt: "The EPCI project on Qeshm Island has successfully completed its first phase, enhancing crude oil transport and storage capabilities.",
        image: "https://picsum.photos/seed/news2/600/400",
        content: "<p>The comprehensive infrastructure overhaul on Qeshm Island, managed by KKM International, has reached a significant milestone. The new 16-inch underwater pipeline is now fully operational, and the upgraded pump station is performing above expectations. This achievement puts the project on track for completion well ahead of the projected timeline.</p><p>Project Manager Heidar Yarveicy commented, \"This success is a testament to the dedication and expertise of our entire team. We've set a new benchmark for efficiency and safety in midstream operations.\"</p>",
        category: 'Projects'
    },
    {
        title: "KKM International Partners with Top Universities for Innovation Hub",
        date: "2023-08-01",
        excerpt: "Our Innovation & Ideation Hub is launching a new accelerator program in collaboration with leading academic institutions to foster the next generation of tech talent.",
        image: "https://picsum.photos/seed/news3/600/400",
        content: "<p>KKM International is proud to announce strategic partnerships with three leading universities to bolster its Innovation & Ideation Hub. The collaboration will focus on creating a new accelerator program aimed at startups in the clean energy, biomedical, and sustainable development sectors. The program will provide mentorship, funding, and access to KKM's extensive network of experts and resources.</p><p>\"Innovation is at the core of our DNA,\" stated Dr. Reza Asakereh, CTO. \"By bridging the gap between academia and industry, we can accelerate the development of solutions that will shape a better future for all.\"</p>",
        category: 'Corporate'
    },
    {
        title: "New Advancements in Lithium Extraction Technology Announced",
        date: "2023-07-20",
        excerpt: "Our GMEL-LithiumLoop technology demonstrates over 90% efficiency in eco-friendly lithium extraction from geothermal brines, a major step for sustainable battery production.",
        image: "https://picsum.photos/seed/news4/600/400",
        content: "<p>KKM's R&D department has published promising results from the pilot phase of its GMEL-LithiumLoop project. The technology uses a proprietary ion-exchange resin to selectively extract lithium from geothermal brines with unprecedented efficiency and minimal environmental impact. This breakthrough could significantly reduce the carbon footprint and water usage associated with traditional lithium mining, paving the way for a more sustainable supply chain for electric vehicles and battery storage.</p>",
        category: 'Technology'
    }
];

export const VIDEOS: Video[] = [
    {
        title: "The Future of Energy: Inside GMEL-CLG",
        description: "Explore our revolutionary closed-loop geothermal technology designed for zero-emission energy generation.",
        thumbnail: "https://i.ytimg.com/vi/GLK6DErFBPA/hqdefault.jpg",
        youtubeId: "GLK6DErFBPA"
    },
    {
        title: "Project Spotlight: Qeshm Island Transformation",
        description: "Witness the monumental scale and strategic impact of our landmark EPCI project on Qeshm Island.",
        thumbnail: "https://i.ytimg.com/vi/m_1119yJv-o/hqdefault.jpg",
        youtubeId: "m_1119yJv-o"
    },
    {
        title: "Innovation in Action: The KKM Hub",
        description: "Meet the brilliant minds and see the groundbreaking ideas that are shaping the future at our Innovation Hub.",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        youtubeId: "dQw4w9WgXcQ"
    }
];
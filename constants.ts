import { Page, Project, NavLink, NewsItem, Video } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: Page.Home },
  { name: Page.AboutUs },
  { name: Page.CoreTechnologies },
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
                <li><strong>Enhanced Gas Recovery:</strong> We implemented advanced solutions for Condensate Gas Compressors (CGC) 52 & 53, leading to a measurable increase in gas recovery rates and a significant boost to overall field productivity.</li>
            </ul>
            <p>Through this partnership, we not only improved immediate operational outcomes but also contributed to the long-term strategic goals of ICOFC, solidifying our reputation for excellence in upstream field development.</p>
        `,
        metrics: {
            budget: {
                total: 75, currency: "M USD",
                allocation: [
                    { name: "QA/QC", value: 15, fill: "#0A92EF" },
                    { name: "Construction", value: 30, fill: "#002D56" },
                    { name: "Management", value: 22.5, fill: "#89CFF0" },
                    { name: "Gas Recovery", value: 7.5, fill: "#FFC107" },
                ]
            },
            timeline: { start: "2020-01-15", end: "2022-06-10", progress: 100 }
        }
    },
    { 
        name: "Combined Cycle Power Plant EPCI",
        description: "Delivering turnkey EPCI solutions for high-efficiency Combined Cycle Power Plants, powering national development by managing the entire project lifecycle from global procurement to successful commissioning.",
        image: "https://picsum.photos/seed/power-plant/600/400",
        tags: ["Power Generation", "EPCI", "Energy"],
        coordinates: { lat: 35.689, lng: 51.389 },
        gallery: ["https://picsum.photos/seed/power-gallery1/800/600", "https://picsum.photos/seed/power-gallery2/800/600"],
        detailedContent: `
            <p>KKM International is at the forefront of developing critical power generation infrastructure, delivering end-to-end EPCI services for advanced Combined Cycle Power Plants. These projects are vital to meeting the growing energy demands of nations and supporting widespread industrial growth.</p>
            <p>Our turnkey approach ensures seamless execution from concept to commissioning, providing our clients with reliable, efficient, and sustainable energy sources. Our comprehensive scope includes:</p>
            <ul>
                <li><strong>Global Strategic Procurement:</strong> We manage the complex international procurement of all critical components, including turbines, generators, heat recovery steam generators (HRSGs), and balance of plant equipment, leveraging our global network of world-class manufacturers.</li>
                <li><strong>Integrated Construction Management:</strong> Our on-site teams oversee all civil, mechanical, and electrical construction, enforcing the highest standards of safety, quality, and schedule adherence to mitigate risks and ensure timely delivery.</li>
                <li><strong>Rigorous Commissioning & Handover:</strong> We lead the final installation and commissioning phases, conducting exhaustive tests to guarantee the plant meets all performance specifications and is ready for reliable, long-term operation.</li>
            </ul>
            <p>This project demonstrates our capacity to deliver on the promise of large-scale, technologically complex energy solutions that form the backbone of modern economies.</p>
        `,
        metrics: {
            budget: {
                total: 450, currency: "M USD",
                allocation: [
                    { name: "Procurement", value: 270, fill: "#002D56" },
                    { name: "Construction", value: 135, fill: "#0A92EF" },
                    { name: "Engineering", value: 45, fill: "#89CFF0" },
                ]
            },
            timeline: { start: "2022-02-01", end: "2025-08-01", progress: 65 }
        }
    },
    { 
        name: "Advanced Drilling & Coring Services Expansion",
        description: "Spearheaded a strategic business transformation for MIS International by integrating advanced coring and drilling technologies, resulting in significant cost savings for clients and enhanced market competitiveness.",
        image: "https://picsum.photos/seed/drilling-services/600/400",
        tags: ["Upstream Services", "Technology", "Drilling"],
        coordinates: { lat: 25.2048, lng: 55.2708 },
        gallery: ["https://picsum.photos/seed/drilling-gallery1/800/600", "https://picsum.photos/seed/drilling-gallery2/800/600"],
        detailedContent: `
            <p>KKM leadership drove a pivotal strategic initiative at MIS International to revolutionize its upstream service offerings. The objective was to create a distinct competitive advantage by introducing next-generation technologies that deliver superior reservoir data and drilling efficiency.</p>
            <strong>This transformation was built on three core pillars:</strong>
            <ul>
                <li><strong>Value-Added Service Expansion:</strong> We successfully launched a specialized Coring Services division, moving beyond traditional drilling to provide clients with high-quality geological data crucial for reservoir characterization and maximizing recovery. This service was engineered to deliver better data at a lower cost.</li>
                <li><strong>Technology-Driven Efficiency:</strong> We integrated a suite of innovative drilling technologies designed to optimize performance, dramatically reduce non-productive time (NPT), and increase the overall rate of penetration (ROP).</li>
                <li><strong>Operational Excellence as Standard:</strong> This initiative was underpinned by a renewed commitment to the highest standards of safety and efficiency, ensuring that technological advancements were matched by reliable, best-in-class execution in the field.</li>
            </ul>
            <p>This project showcases our ability to not only provide services but to act as a strategic partner, driving business model innovation and creating sustainable growth in a competitive global market.</p>
        `,
        metrics: {
            budget: {
                total: 30, currency: "M USD",
                allocation: [
                    { name: "R&D", value: 6, fill: "#FFC107" },
                    { name: "Technology Acquisition", value: 15, fill: "#002D56" },
                    { name: "Training", value: 4.5, fill: "#0A92EF" },
                    { name: "Marketing", value: 4.5, fill: "#89CFF0" },
                ]
            },
            timeline: { start: "2019-06-01", end: "2020-12-31", progress: 100 }
        }
    },
    {
        name: "Industrial Water Treatment Solutions",
        description: "Engineered bespoke industrial water treatment solutions for critical infrastructure, protecting high-value assets in power and petrochemical sectors while ensuring optimal performance and environmental compliance.",
        image: "https://picsum.photos/seed/water-treatment/600/400",
        tags: ["Industrial Solutions", "Water Management", "Petrochemical"],
        coordinates: { lat: 28.802, lng: -81.366 },
        gallery: ["https://picsum.photos/seed/water-gallery1/800/600", "https://picsum.photos/seed/water-gallery2/800/600"],
        detailedContent: `
            <p>Through a strategic partnership with World Chem, KKM leadership was instrumental in developing and deploying highly specialized water treatment programs for some of the most demanding industrial environments. Our focus was on creating customized, data-driven solutions to enhance the efficiency, longevity, and environmental performance of critical assets in power plants, oil refineries, and petrochemical facilities.</p>
            <strong>Our key capabilities in this domain include:</strong>
            <ul>
                <li><strong>Custom Chemical Program Design:</strong> We engineered bespoke water treatment formulations tailored to the specific water chemistry and operational parameters of each facility, effectively preventing corrosion, scaling, and biofouling in high-value systems like cooling towers and boilers.</li>
                <li><strong>Expert On-Site Support:</strong> Our teams provided hands-on, expert support and troubleshooting directly at client sites, diagnosing complex issues and implementing effective solutions to maintain operational continuity and performance.</li>
                <li><strong>Holistic System Optimization:</strong> We addressed the full water cycle within these facilities, from treating boiler feed water to managing wastewater, ensuring that our clients' operations were not only efficient but also compliant with stringent environmental regulations.</li>
            </ul>
            <p>This work demonstrates our deep domain expertise in industrial chemistry and process engineering, showcasing our ability to deliver solutions that directly impact our clients' bottom line and sustainability goals.</p>
        `,
         metrics: {
            budget: {
                total: 50, currency: "M USD (Annual Contracts)",
                allocation: [
                    { name: "Chemical Supply", value: 25, fill: "#002D56" },
                    { name: "On-site Support", value: 15, fill: "#0A92EF" },
                    { name: "R&D", value: 10, fill: "#FFC107" },
                ]
            },
            timeline: { start: "Ongoing", end: "Ongoing", progress: 100 }
        }
    }
];

export const NEWS_ITEMS: NewsItem[] = [
    { 
        title: "KKM International Launches GMEL-GeoCredit Platform", 
        date: "2023-10-26", 
        category: "Technology",
        excerpt: "A new era for transparent and verifiable carbon credit trading begins with the launch of our blockchain-based platform...", 
        image: "https://picsum.photos/seed/news1/600/400",
        content: `
<p>In a significant step towards a more sustainable and accountable future, KKM International Group has officially launched the GMEL-GeoCredit Platform. This innovative, blockchain-powered system is designed to revolutionize the carbon credit market by providing unprecedented transparency, traceability, and security for trading carbon credits generated from geothermal and other renewable energy projects.</p>
<p>The platform addresses key challenges in the current carbon market, including issues of double-counting and a lack of transparency. By leveraging distributed ledger technology, GMEL-GeoCredit ensures that each carbon credit is unique, verifiable, and permanently recorded. This fosters greater trust among investors, corporations, and governments, encouraging more significant investment in projects that actively reduce greenhouse gas emissions.</p>
<p>Our CEO stated, "The GMEL-GeoCredit Platform is not just a technology; it's a commitment to a cleaner planet. We are providing the tools necessary to build a truly global, transparent, and effective carbon market that can accelerate our transition to a zero-carbon economy." The platform is now open for pilot partners and early adopters.</p>
        `
    },
    { 
        title: "Qeshm Energy Village Pilot Project Breaks Ground", 
        date: "2023-09-15", 
        category: "Projects",
        excerpt: "Construction has begun on the first sustainable energy-centric village, a landmark project for our GMEL-EcoCluster concept...", 
        image: "https://picsum.photos/seed/news2/600/400",
        content: `
<p>KKM International Group is proud to announce that construction has officially commenced on the Qeshm Energy Village, the first pilot project of our visionary GMEL-EcoCluster concept. Located in the Qeshm Free Zone, this project will serve as a living laboratory for sustainable community development, powered entirely by integrated renewable energy sources, primarily geothermal.</p>
<p>The village is designed to be a self-sustaining ecosystem, integrating our proprietary technologies like GMEL-CLG for power, GMEL-Desal for fresh water, and GMEL-AgriCell for food production. The project aims to create a circular economy where waste is minimized, and resources are utilized with maximum efficiency.</p>
<p>This groundbreaking initiative will not only provide a high quality of life for its residents but also serve as a scalable model for sustainable development in other regions around the world. The first phase of construction is expected to be completed by Q4 2024.</p>
        ` 
    },
    { 
        title: "Innovation Hub Announces First Cohort of Startups", 
        date: "2023-08-01", 
        category: "Corporate",
        excerpt: "Five promising startups have been selected for our accelerator program, set to tackle challenges in energy efficiency, water purification, and agritech...", 
        image: "https://picsum.photos/seed/news3/600/400",
        content: `
<p>The Innovation & Ideation Hub at KKM International is thrilled to welcome the first cohort of startups into its accelerator program. After a rigorous selection process, five visionary companies have been chosen for their potential to create disruptive solutions in critical sectors.</p>
<p>The selected startups are:</p>
<ul>
    <li><strong>Aqua-Pure:</strong> Developing a novel membrane technology for low-energy water desalination.</li>
    <li><strong>Sensor-Grid:</strong> Creating AI-powered sensors for predictive maintenance in renewable energy grids.</li>
    <li><strong>Yield-Up:</strong> A precision agriculture platform that uses geothermal data to optimize crop yields.</li>
    <li><strong>Carbon-Capture Catalyst:</strong> Innovating a new catalyst for more efficient direct-air carbon capture.</li>
    <li><strong>Bio-Struct:</strong> Engineering sustainable building materials from agricultural waste.</li>
</ul>
<p>Over the next six months, these startups will receive intensive mentorship from KKM's leading experts, access to our state-of-the-art labs, and seed funding to accelerate their growth. We look forward to seeing them transform their brilliant ideas into impactful realities.</p>
        `
    },
];

export const VIDEOS: Video[] = [
    {
        title: "The Future of Geothermal Energy",
        description: "Discover how our GMEL-CLG technology is revolutionizing clean energy production.",
        thumbnail: "https://picsum.photos/seed/video1/600/400",
        youtubeId: "GLK6DErFBPA"
    },
    {
        title: "GMEL-EcoCluster: Sustainable Living",
        description: "A look inside the Qeshm Energy Village pilot project and our vision for future communities.",
        thumbnail: "https://picsum.photos/seed/video2/600/400",
        youtubeId: "m_p Kuz_MM4"
    },
    {
        title: "Innovating for Impact",
        description: "Meet the minds behind our Innovation & Ideation Hub and the startups changing the world.",
        thumbnail: "https://picsum.photos/seed/video3/600/400",
        youtubeId: "uD4izuDMUQA"
    }
];
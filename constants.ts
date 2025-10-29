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
        description: "A comprehensive infrastructure upgrade on Qeshm Island to enhance crude oil transport, storage, and operational safety.",
        image: "https://picsum.photos/seed/qeshm-oilfield/600/400",
        tags: ["Oil & Gas Infrastructure", "EPCI", "Midstream"],
        coordinates: { lat: 26.907, lng: 56.002 },
        gallery: ["https://picsum.photos/seed/qeshm-gallery1/800/600", "https://picsum.photos/seed/qeshm-gallery2/800/600", "https://picsum.photos/seed/qeshm-gallery3/800/600"],
        videoUrl: "https://www.youtube.com/embed/GLK6DErFBPA",
        detailedContent: `
            <p>KKM International executed a multi-faceted development project on Qeshm Island, focused on modernizing critical oil and gas infrastructure. This initiative was designed to optimize efficiency, ensure regulatory compliance, and enhance the overall safety and reliability of the island's energy operations.</p>
            <strong>Key achievements of this project include:</strong>
            <ul>
                <li><strong>State-of-the-Art Pump Station:</strong> We designed and constructed a modern pump station, significantly optimizing the flow and management of oil within the region.</li>
                <li><strong>Underwater Pipeline Implementation:</strong> A 16-inch underwater pipeline system was successfully installed for the efficient and secure transport of crude oil.</li>
                <li><strong>MEG Supply Line:</strong> An underground pipeline system was implemented for the reliable transportation of monoethylene glycol (MEG), crucial for hydrate inhibition in pipelines.</li>
                <li><strong>Storage Tank Integrity:</strong> Comprehensive repair and maintenance were performed on multiple storage tanks, enhancing their structural integrity and extending their operational lifespan.</li>
                <li><strong>Advanced Instrumentation:</strong> We installed cutting-edge instrumentation equipment for precise production monitoring, ensuring adherence to the highest safety and environmental standards.</li>
            </ul>
            <p>This project showcases our capability in managing complex, large-scale EPCI contracts in sensitive environments, delivering robust solutions that stand the test of time.</p>
        `
    },
    { 
        name: "Iranian Central Oil Fields (ICOFC) Enhancement",
        description: "A multi-faceted project to boost efficiency, production, and cross-border capabilities for the Iranian Central Oil Fields Company.",
        image: "https://picsum.photos/seed/icofc-sarakhs/600/400",
        tags: ["Oil & Gas Infrastructure", "Upstream Services", "Field Development"],
        coordinates: { lat: 36.544, lng: 61.157 },
        gallery: ["https://picsum.photos/seed/icofc-gallery1/800/600", "https://picsum.photos/seed/icofc-gallery2/800/600"],
        detailedContent: `
            <p>Our engagement with the Iranian Central Oil Fields Company (I.C.O.F.C) involved a series of strategic initiatives aimed at optimizing wellhead operations and enhancing gas recovery. This project demonstrates our expertise in managing complex field development and cross-border project execution.</p>
            <strong>The scope of work included:</strong>
            <ul>
                <li><strong>Wellhead Facility Management:</strong> We managed comprehensive QA/QC inspections for wellhead facilities 23, 50, 52, 53, 54, and 56, ensuring peak operational efficiency and safety compliance.</li>
                <li><strong>Pipeline Construction:</strong> A critical pipeline was constructed, connecting Pipe Line #23 to Manifold 18-3, streamlining the transportation of resources within the field.</li>
                <li><strong>International Project Leadership:</strong> KKM successfully led the international project D1-D2, showcasing our strong capabilities in cross-border project management and adherence to international standards.</li>
                <li><strong>Gas Recovery Enhancement:</strong> We implemented targeted initiatives for C.G.C (Condensate Gas Compressor) 52 & 53, which significantly enhanced gas recovery rates and improved overall operational efficiency.</li>
            </ul>
            <p>This solidified our reputation as a trusted partner for national oil companies seeking to maximize the potential of their strategic assets.</p>
        `
    },
    { 
        name: "Combined Cycle Power Plant EPCI",
        description: "End-to-end EPCI services for the construction of modern, efficient Combined Cycle Power Plants to meet growing energy demands.",
        image: "https://picsum.photos/seed/power-plant/600/400",
        tags: ["Power Generation", "EPCI", "Energy"],
        coordinates: { lat: 35.689, lng: 51.389 },
        gallery: ["https://picsum.photos/seed/power-gallery1/800/600", "https://picsum.photos/seed/power-gallery2/800/600"],
        detailedContent: `
            <p>As a leading EPCI contractor, KKM International has been instrumental in the development of critical power generation infrastructure. This project involved the procurement and construction of highly efficient Combined Cycle Power Plants.</p>
            <p>Our role encompassed the full project lifecycle, ensuring the seamless integration of all components to deliver a reliable and sustainable source of energy. The working scope included:</p>
            <ul>
                <li><strong>Global Procurement:</strong> Managing the procurement of all turbines, generators, heat recovery steam generators (HRSGs), and balance of plant equipment from world-class manufacturers.</li>
                <li><strong>Construction Management:</strong> Overseeing all civil, mechanical, and electrical construction activities on-site, with an unwavering focus on safety, quality, and schedule adherence.</li>
                <li><strong>Installation and Commissioning:</strong> Leading the installation and commissioning phases to ensure the power plant meets all performance guarantees and operational requirements.</li>
            </ul>
            <p>This project highlights our capacity to deliver complex, large-scale energy projects that are vital for national development and industrial growth.</p>
        `
    },
    { 
        name: "Advanced Drilling & Coring Services Expansion",
        description: "Strategic expansion of upstream services for MIS International, introducing modern coring techniques and optimizing drilling operations.",
        image: "https://picsum.photos/seed/drilling-services/600/400",
        tags: ["Upstream Services", "Technology", "Drilling"],
        coordinates: { lat: 25.2048, lng: 55.2708 },
        gallery: ["https://picsum.photos/seed/drilling-gallery1/800/600", "https://picsum.photos/seed/drilling-gallery2/800/600"],
        detailedContent: `
            <p>At MIS International, KKM leadership spearheaded a strategic initiative to enhance and expand the company's drilling services portfolio. The primary goal was to introduce advanced technologies and methodologies to increase efficiency, reduce costs, and deliver superior value to clients in the upstream oil and gas sector.</p>
            <strong>Key components of this strategic expansion were:</strong>
            <ul>
                <li><strong>Introduction of Coring Services:</strong> We successfully expanded the service portfolio to include specialized Coring Services, implementing modern techniques to provide high-quality reservoir data while achieving significant cost savings for clients.</li>
                <li><strong>Technology Implementation:</strong> Innovative technologies were integrated into drilling operations to optimize performance, reduce non-productive time, and enhance overall productivity.</li>
                <li><strong>Commitment to Excellence:</strong> The initiative reinforced the company's commitment to safety and efficiency, ensuring reliable results and solidifying its reputation as a forward-thinking service provider.</li>
            </ul>
            <p>This project demonstrates our strategic capability to drive innovation and business growth within a competitive international market.</p>
        `
    },
    {
        name: "Industrial Water Treatment Solutions",
        description: "Development and deployment of customized water treatment programs for heavy industries, including power plants and petrochemical refineries.",
        image: "https://picsum.photos/seed/water-treatment/600/400",
        tags: ["Industrial Solutions", "Water Management", "Petrochemical"],
        coordinates: { lat: 28.802, lng: -81.366 },
        gallery: ["https://picsum.photos/seed/water-gallery1/800/600", "https://picsum.photos/seed/water-gallery2/800/600"],
        detailedContent: `
            <p>In partnership with World Chem, KKM leadership was pivotal in developing and delivering specialized water treatment solutions for critical industrial facilities. This work focused on creating customized programs to address the unique challenges faced by power plants, oil refineries, and petrochemical industries.</p>
            <strong>Our contributions included:</strong>
            <ul>
                <li><strong>Customized Program Development:</strong> We led the design of bespoke water treatment programs tailored to protect high-value assets, optimize thermal efficiency, and ensure environmental compliance.</li>
                <li><strong>Expert Collaboration:</strong> By collaborating with industry experts, we provided effective on-site support and troubleshooting, helping clients overcome complex operational challenges.</li>
                <li><strong>Sector-Specific Solutions:</strong> Our expertise covered a wide range of applications, from cooling water and boiler feed water treatment to wastewater management in demanding industrial environments.</li>
            </ul>
            <p>This experience highlights our deep understanding of industrial processes and our ability to engineer chemical and operational solutions that enhance longevity and performance of critical infrastructure.</p>
        `
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
export enum Page {
  Home = 'Home',
  AboutUs = 'About Us',
  CoreTechnologies = 'Core Technologies',
  Futures = 'Futures',
  Biomedical = 'Biomedical & Health Innovation',
  SportsManagement = 'Sports Management',
  RuralStudies = 'Rural Studies & Development',
  InnovationHub = 'Innovation & Ideation Hub',
  IntellectualProperty = 'Intellectual Property Office',
  Projects = 'Projects & Pilots',
  Careers = 'Careers & Engagement',
  News = 'News & Insights',
  Contact = 'Contact Us',
  Legal = 'Legal & Policies',
  SearchResults = 'Search Results',
  InternalPortal = 'Internal Portal',
}

export interface Project {
    name: string;
    description: string;
    image: string;
    category: string;
    coordinates: { lat: number; lng: number };
    gallery: string[];
    videoUrl?: string;
    detailedContent: string;
}

export interface NavLink {
  name: Page;
  subLinks?: { name: string; id: string }[];
}

export interface NewsItem {
    title: string;
    date: string;
    excerpt: string;
    image: string;
    content: string;
    category: 'Technology' | 'Projects' | 'Corporate';
}

export interface Video {
    title: string;
    description: string;
    thumbnail: string;
    youtubeId: string;
}

export interface SearchResult {
  title: string;
  description: string;
  onClick: () => void;
}

export interface MapMarker {
  name: string;
  description: string;
  coordinates: { lat: number; lng: number };
}
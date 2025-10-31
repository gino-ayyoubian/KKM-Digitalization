import React, { useState, useEffect, useRef } from 'react';
import { Project, Page } from '../types';
import ProjectMetricsChart from '../components/ProjectMetricsChart';
import { GoogleGenAI, Type } from '@google/genai';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  setPage: (page: Page) => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, setPage }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [takeaways, setTakeaways] = useState<string[] | null>(null);
  const [isLoadingTakeaways, setIsLoadingTakeaways] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateTakeaways = async () => {
        if (!project.detailedContent) {
            setIsLoadingTakeaways(false);
            return;
        }

        const cacheKey = `takeaways_${project.name}`;
        try {
            const cachedTakeaways = sessionStorage.getItem(cacheKey);
            if (cachedTakeaways) {
                setTakeaways(JSON.parse(cachedTakeaways));
                setIsLoadingTakeaways(false);
                return;
            }
        } catch (e) {
            console.error("Failed to parse cached takeaways", e);
            sessionStorage.removeItem(cacheKey); // Clear corrupted cache
        }
        
        setIsLoadingTakeaways(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = project.detailedContent;
            const textContent = tempDiv.textContent || tempDiv.innerText || "";

            const prompt = `Based on the following project description, extract 3-5 key takeaways. These should be concise bullet points highlighting the main achievements, innovations, or significant outcomes. Respond with a JSON array of strings. \n\nProject Description:\n${textContent}`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING,
                        },
                    },
                },
            });

            const resultText = response.text.trim();
            const parsedTakeaways = JSON.parse(resultText);
            
            if (Array.isArray(parsedTakeaways) && parsedTakeaways.every(item => typeof item === 'string')) {
                setTakeaways(parsedTakeaways);
                sessionStorage.setItem(cacheKey, JSON.stringify(parsedTakeaways));
            } else {
                 throw new Error("Invalid format received from API");
            }

        } catch (error) {
            console.error("Error generating key takeaways:", error);
        } finally {
            setIsLoadingTakeaways(false);
        }
    };

    generateTakeaways();
  }, [project.detailedContent, project.name]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    document.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);


  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  const getYouTubeId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = project.videoUrl ? getYouTubeId(project.videoUrl) : null;
  
  return (
    <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slide-in-up outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="fixed top-4 right-4 z-20 bg-black/50 text-white rounded-full h-8 w-8 flex items-center justify-center text-2xl hover:bg-black/80 transition-colors" aria-label="Close modal">&times;</button>
        
        {/* Gallery */}
        <div className="relative bg-gray-900">
            <div className="relative h-96 flex items-center justify-center">
                <img src={project.gallery[currentImageIndex]} alt={`${project.name} gallery image ${currentImageIndex + 1}`} loading="lazy" className="max-w-full max-h-full object-contain"/>
            </div>
            
            {project.gallery.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors" aria-label="Previous image">‹</button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors" aria-label="Next image">›</button>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="flex justify-center gap-2">
                            {project.gallery.map((imgSrc, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    aria-label={`View image ${index + 1}`}
                                    className={`w-16 h-10 rounded-md overflow-hidden transition-all duration-200 ${index === currentImageIndex ? 'ring-2 ring-accent-yellow ring-offset-2 ring-offset-black/50' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={imgSrc} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>

        <div className="p-8">
            <h1 id="modal-title" className="text-3xl md:text-4xl font-display font-extrabold text-primary">{project.name}</h1>
            <p className="mt-2 text-lg text-text-light">{project.description}</p>
            
            {project.metrics && (
                <div className="mt-6 border-t pt-6">
                    <h2 className="text-2xl font-display font-bold text-primary mb-4">Project Metrics</h2>
                    <ProjectMetricsChart metrics={project.metrics} />
                </div>
            )}
            
            <div className="mt-6 border-t pt-6">
                <h2 className="text-2xl font-display font-bold text-primary mb-4">Project Details</h2>
                <div 
                    className="prose max-w-none text-text-light" 
                    dangerouslySetInnerHTML={{ __html: project.detailedContent }}
                />
                 <div className="mt-6 flex justify-center border-t pt-6">
                    <button
                        onClick={() => {
                            onClose();
                            setPage(Page.Contact);
                        }}
                        className="px-6 py-2 font-semibold text-sm text-primary bg-primary/10 rounded-full hover:bg-secondary/20 transition-colors duration-300 group"
                    >
                       Contact Us for similar projects in this region <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                    </button>
                </div>
            </div>

            {project.videoUrl && videoId && (
                <div className="mt-8 border-t pt-6">
                    <h2 className="text-2xl font-display font-bold text-primary mb-4">Project Video</h2>
                    {playVideo ? (
                        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`${project.videoUrl}?autoplay=1`}
                                title={`${project.name} Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div 
                            className="aspect-video rounded-lg overflow-hidden shadow-lg relative cursor-pointer group"
                            onClick={() => setPlayVideo(true)}
                        >
                            <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={`${project.name} Video Thumbnail`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/50">
                                <svg className="h-20 w-20 text-white/80 group-hover:text-white transition-all group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {(isLoadingTakeaways || (takeaways && takeaways.length > 0)) && (
                <div className="mt-8 border-t pt-6">
                    <h2 className="text-2xl font-display font-bold text-primary mb-4">Key Takeaways</h2>
                    {isLoadingTakeaways ? (
                        <div className="space-y-3 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ) : (
                        <ul className="list-disc list-inside space-y-2 text-text-light prose">
                            {takeaways?.map((takeaway, index) => (
                                <li key={index}>{takeaway}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
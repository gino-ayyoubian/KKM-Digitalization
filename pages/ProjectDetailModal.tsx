import React, { useState, useEffect, useRef } from 'react';
import { Project, Page } from '../types';
import ProjectMetricsChart from '../components/ProjectMetricsChart';
import ImageGallery from '../components/ImageGallery';
import Accordion from '../components/Accordion';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  setPage: (page: Page) => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, setPage }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    modalRef.current?.focus();

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
    };
  }, [onClose]);

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
        className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="sticky top-4 right-4 z-[60] float-right bg-black/50 text-white rounded-full h-8 w-8 flex items-center justify-center text-2xl hover:bg-black/80 transition-colors" aria-label="Close modal">&times;</button>
        
        <ImageGallery images={project.gallery} altText={project.name} />

        <div className="p-8">
            <h1 id="modal-title" className="text-3xl md:text-4xl font-display font-extrabold text-primary dark:text-white">{project.name}</h1>
            <p className="mt-2 text-lg text-text-light dark:text-slate-300">{project.description}</p>
            
             <div className="mt-6">
                <Accordion title="Project Details" defaultOpen>
                    <div 
                        className="prose dark:prose-invert max-w-none text-text-light dark:text-slate-300" 
                        dangerouslySetInnerHTML={{ __html: project.detailedContent }}
                    />
                     <div className="mt-6 flex justify-center border-t border-gray-200 dark:border-slate-700 pt-6">
                        <button
                            onClick={() => {
                                onClose();
                                setPage(Page.Contact);
                            }}
                            className="px-6 py-2 font-semibold text-sm text-primary dark:text-secondary bg-primary/10 dark:bg-secondary/10 rounded-full hover:bg-secondary/20 dark:hover:bg-secondary/20 transition-colors duration-300 group"
                        >
                           Contact Us for similar projects in this region <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </button>
                    </div>
                </Accordion>

                {project.metrics && (
                    <Accordion title="Project Metrics">
                        <ProjectMetricsChart metrics={project.metrics} />
                    </Accordion>
                )}

                {project.videoUrl && videoId && (
                     <Accordion title="Project Video">
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
                    </Accordion>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
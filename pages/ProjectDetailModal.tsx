import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length);
  };
  
  return (
    <div 
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-slide-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="fixed top-4 right-4 z-20 bg-black/50 text-white rounded-full h-8 w-8 flex items-center justify-center text-2xl hover:bg-black/80 transition-colors">&times;</button>
        
        {/* Gallery */}
        <div className="relative bg-gray-900">
            <div className="relative h-96 flex items-center justify-center">
                <img src={project.gallery[currentImageIndex]} alt={`${project.name} gallery image ${currentImageIndex + 1}`} className="max-w-full max-h-full object-contain"/>
            </div>
            
            {project.gallery.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors">‹</button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors">›</button>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="flex justify-center gap-2">
                            {project.gallery.map((imgSrc, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
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
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary">{project.name}</h1>
            <p className="mt-2 text-lg text-text-light">{project.description}</p>
            
            <div className="mt-6 border-t pt-6">
                <div 
                    className="prose max-w-none text-text-light" 
                    dangerouslySetInnerHTML={{ __html: project.detailedContent }}
                />
            </div>

            {project.videoUrl && (
                <div className="mt-8">
                    <h2 className="text-2xl font-display font-bold text-primary mb-4">Project Video</h2>
                    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            width="100%"
                            height="100%"
                            src={project.videoUrl}
                            title={`${project.name} Video`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
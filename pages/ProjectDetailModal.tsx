import React, { useState } from 'react';
// Fix: Import Project type from types.ts where it is defined, not from constants.ts.
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
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="sticky top-4 right-4 z-20 bg-black/50 text-white rounded-full h-8 w-8 flex items-center justify-center text-2xl">&times;</button>
        
        {/* Gallery */}
        <div className="relative h-96 bg-gray-200">
            <img src={project.gallery[currentImageIndex]} alt={`${project.name} gallery image ${currentImageIndex + 1}`} className="w-full h-full object-cover"/>
            {project.gallery.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">‹</button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">›</button>
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
                    <div className="aspect-video rounded-lg overflow-hidden">
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
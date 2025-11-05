
import React from 'react';

interface ComingSoonPageProps {
  pageTitle: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageTitle }) => {
  return (
    <div className="flex items-center justify-center py-24 bg-white">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary">
          {pageTitle}
        </h1>
        <p className="mt-4 text-xl text-text-light">
          This page is currently under construction.
        </p>
        <p className="mt-2 text-text-light">
          We are working hard to bring you new and exciting content. Please check back soon!
        </p>
        <div className="mt-8">
            <svg className="mx-auto h-24 w-24 text-primary/20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
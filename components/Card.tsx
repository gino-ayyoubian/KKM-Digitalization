import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  imageUrl?: string;
  actionText?: string;
  onActionClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, icon, imageUrl, actionText, onActionClick }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl dark:shadow-none transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col group border border-transparent hover:border-secondary dark:border-slate-700 dark:hover:border-primary">
      {imageUrl && (
        <div className="overflow-hidden rounded-t-lg">
          <img src={imageUrl} alt={title} loading="lazy" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {icon && <div className="text-accent-yellow h-12 w-12 mb-4">{icon}</div>}
        <h3 className="text-xl font-display font-bold text-primary dark:text-secondary mb-2">{title}</h3>
        <p className="text-sm text-text-light dark:text-slate-400 mb-4 flex-grow">{description}</p>
        {actionText && onActionClick && (
          <button onClick={onActionClick} className="font-bold text-accent-yellow hover:underline self-start">
            {actionText} →
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
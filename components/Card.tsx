
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  actionText?: string;
  onActionClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, icon, imageUrl, actionText, onActionClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-6 flex flex-col flex-grow">
        {icon && <div className="text-accent-yellow h-12 w-12 mb-4">{icon}</div>}
        <h3 className="text-xl font-display font-bold text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-light mb-4 flex-grow">{description}</p>
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
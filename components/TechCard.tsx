import React from 'react';
import TechButton from './TechButton';

interface TechCardProps {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  flagUrl?: string;
  flagAlt?: string;
  accentColor?: 'green' | 'cyan' | 'purple' | 'yellow' | 'red' | 'blue' | 'indigo';
  children?: React.ReactNode;
  className?: string;
}

const TechCard: React.FC<TechCardProps> = ({ 
  title, 
  subtitle, 
  description, 
  imageUrl, 
  buttonText, 
  onButtonClick,
  flagUrl,
  flagAlt,
  accentColor = 'green',
  children,
  className = ''
}) => {
  // Define color classes based on accentColor
  const colorClasses = {
    green: {
      border: 'border-green-400/30 hover:border-green-400/50',
      text: 'text-green-400 group-hover:text-cyan-400',
      bg: 'bg-gradient-to-br from-green-500/20 to-green-600/20',
      button: 'green'
    },
    cyan: {
      border: 'border-cyan-400/30 hover:border-cyan-400/50',
      text: 'text-cyan-400 group-hover:text-purple-400',
      bg: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20',
      button: 'cyan'
    },
    purple: {
      border: 'border-purple-400/30 hover:border-purple-400/50',
      text: 'text-purple-400 group-hover:text-pink-400',
      bg: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20',
      button: 'purple'
    },
    yellow: {
      border: 'border-yellow-400/30 hover:border-yellow-400/50',
      text: 'text-yellow-400 group-hover:text-orange-400',
      bg: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20',
      button: 'yellow'
    },
    red: {
      border: 'border-red-400/30 hover:border-red-400/50',
      text: 'text-red-400 group-hover:text-pink-400',
      bg: 'bg-gradient-to-br from-red-500/20 to-red-600/20',
      button: 'red'
    },
    blue: {
      border: 'border-blue-400/30 hover:border-blue-400/50',
      text: 'text-blue-400 group-hover:text-indigo-400',
      bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
      button: 'blue'
    },
    indigo: {
      border: 'border-indigo-400/30 hover:border-indigo-400/50',
      text: 'text-indigo-400 group-hover:text-purple-400',
      bg: 'bg-gradient-to-br from-indigo-500/20 to-indigo-600/20',
      button: 'indigo'
    }
  };

  const colors = colorClasses[accentColor];

  return (
    <div 
      className={`bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-7 ${colors.border} transition-all duration-300 group shadow-lg hover:shadow-xl text-center tech-card ${className}`}
      role="article"
      aria-labelledby={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {flagUrl && (
        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
          <img 
            src={flagUrl} 
            alt={flagAlt || title} 
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        </div>
      )}
      
      <h3 
        id={`card-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`font-orbitron text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 transition-colors ${colors.text}`}
      >
        {title}
      </h3>
      
      {subtitle && (
        <p className="text-gray-400 text-xs sm:text-sm mb-3 font-medium tracking-wide uppercase">
          {subtitle}
        </p>
      )}
      
      <p className="text-gray-400 text-sm sm:text-base mb-4">
        {description}
      </p>
      
      {children}
      
      {buttonText && onButtonClick && (
        <TechButton
          variant="secondary"
          size="md"
          onClick={onButtonClick}
          className="mt-2"
          aria-label={buttonText}
        >
          {buttonText}
        </TechButton>
      )}
    </div>
  );
};

export default TechCard;
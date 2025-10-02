import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  linkTo: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, description, linkTo, imageUrl }) => {
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-500 group h-full shadow-xl hover:shadow-2xl hover:-translate-y-2 border border-slate-700/40 hover:border-slate-600/60 backdrop-blur-sm overflow-hidden">
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      {/* Image container with enhanced styling */}
      <div className="h-52 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 p-5" 
          loading="lazy"
        />
      </div>
      
      {/* Content container */}
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <p className="text-sm text-green-400 font-jetbrains-mono mb-3 flex-shrink-0 font-medium tracking-wide">{subtitle}</p>
        <h3 className="font-orbitron text-xl font-bold text-gray-100 mb-4 flex-shrink-0 group-hover:text-white transition-colors duration-300">{title}</h3>
        <p className="text-gray-300 font-jetbrains-mono text-sm mb-5 leading-relaxed flex-grow">{description}</p>
        
        {/* Read more button */}
        <div className="mt-auto pt-2">
          <Link 
            to={linkTo} 
            className="font-bold text-green-400 hover:text-cyan-400 transition-colors duration-300 inline-flex items-center group font-jetbrains-mono tracking-wide"
            aria-label={`Read more about ${title}`}
          >
            Read More
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 7l-8 8-4-4-6 6" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-b from-green-400/10 to-transparent -translate-y-1/2 translate-x-1/2"></div>
    </div>
  );
};

export default Card;
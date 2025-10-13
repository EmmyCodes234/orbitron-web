import React from 'react';

interface AnnouncementPillProps {
  href: string;
  text: string;
}

const AnnouncementPill: React.FC<AnnouncementPillProps> = ({ href, text }) => {
  return (
    <a 
      href={href}
      className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6 overflow-hidden group"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 p-px animate-spin-slow"></div>
      
      {/* Inner background */}
      <div className="absolute inset-0 rounded-full bg-slate-900/80 backdrop-blur-sm"></div>
      
      {/* Inner content */}
      <div className="relative flex items-center gap-2 z-10">
        <svg 
          className="w-4 h-4 text-yellow-400" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {text}
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </a>
  );
};

export default AnnouncementPill;
import React from 'react';

interface AnnouncementPillProps {
  text: string;
  href?: string;
}

const AnnouncementPill: React.FC<AnnouncementPillProps> = ({ text, href = "https://asc.liberiascrabble.com" }) => {
  return (
    <a
      href={href}
      className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6 overflow-hidden group animate-fade-in-up"
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
    >
      {/* Glowing border effect */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 opacity-70 blur-md animate-subtle-pulse"></div>
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-30 blur-lg"></div>

      {/* Inner background */}
      <div className="absolute inset-0 rounded-full bg-slate-900/80 backdrop-blur-sm"></div>

      {/* Inner content */}
      <div className="relative flex items-center gap-2 z-10">
        {/* Arrow icon */}
        <svg
          className="w-4 h-4 text-cyan-400 animate-subtle-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        {text}
      </div>
    </a>
  );
};

export default AnnouncementPill;
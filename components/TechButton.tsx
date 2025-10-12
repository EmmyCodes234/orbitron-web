import React from 'react';

interface TechButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const TechButton: React.FC<TechButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  fullWidth = false,
  ...props 
}) => {
  // Base classes for all buttons
  let baseClasses = "font-orbitron font-bold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:from-green-400 hover:to-cyan-400 focus:ring-green-400/50",
    secondary: "bg-slate-800/60 text-gray-300 hover:bg-slate-700/60 border border-slate-600 focus:ring-cyan-400/50",
    accent: "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-purple-400 hover:to-pink-400 focus:ring-purple-400/50"
  };
  
  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button 
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default TechButton;
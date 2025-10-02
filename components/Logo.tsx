import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <img src="/panasa-logo.png" alt="PANASA Logo" className={className || "h-8 w-auto"} />
    );
};

export default Logo;
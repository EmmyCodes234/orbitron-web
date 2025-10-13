import React from 'react';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import type { ISourceOptions } from "tsparticles-engine";

interface ParticleBackgroundProps {
  isMobile?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ isMobile = false }) => {
  const particlesInit = async (engine: Engine) => {
    console.log("Particles engine initialized");
    await loadSlim(engine);
  };

  const particlesLoaded = async (container: any) => {
    console.log("Particles container loaded", container);
  };

  // Star-themed particles for mobile
  const starOptions: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
        resize: true,
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: isMobile ? 0.5 : 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: isMobile ? 400 : 800,
        },
        value: isMobile ? 40 : 80,
      },
      opacity: {
        value: isMobile ? { min: 0.1, max: 0.8 } : 0.8,
      },
      shape: {
        type: "star",
      },
      size: {
        value: { min: isMobile ? 0.5 : 1, max: isMobile ? 2 : 3 },
      },
    },
    detectRetina: true,
  };

  // Default particles for desktop
  const defaultOptions: ISourceOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: false,
        },
        resize: true,
      },
    },
    particles: {
      color: {
        value: "#00ff99",
      },
      links: {
        color: "#00ff99",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.8,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={isMobile ? starOptions : defaultOptions}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
    />
  );
};

export default ParticleBackground;
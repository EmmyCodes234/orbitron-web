import React from 'react';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground: React.FC = () => {
  const particlesInit = async (engine: Engine) => {
    console.log("Particles engine initialized");
    await loadSlim(engine);
  };

  const particlesLoaded = async (container: any) => {
    console.log("Particles container loaded", container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
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
            distance: 100,
            enable: true,
            opacity: 0.3,
            width: 0.2,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.8, max: 2 },
          },
        },
        detectRetina: true,
      }}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20"
    />
  );
};

export default ParticleBackground;
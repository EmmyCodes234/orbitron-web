import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reduce particle count for better performance
    let particles: Particle[] = [];
    const particleCount = 30; // Reduced from 70 to 30

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Slightly smaller particles
        this.speedX = Math.random() * 0.5 - 0.25; // Slower movement
        this.speedY = Math.random() * 0.5 - 0.25; // Slower movement
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset particles that go off screen
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }

      draw() {
        if (ctx) {
            ctx.fillStyle = 'rgba(0, 255, 153, 0.6)'; // Slightly more transparent
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function handleParticles() {
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // Draw connections only for nearby particles (reduced connection distance)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 80) { // Reduced from 100 to 80
                if(ctx){
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 153, ${0.2 * (1 - distance/80)})`; // More transparent lines
                    ctx.lineWidth = 0.1; // Thinner lines
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
      }
    }

    let animationFrameId: number;
    function animate() {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Added will-change property for better performance
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-10 will-change-transform" />;
};

export default ParticleBackground;
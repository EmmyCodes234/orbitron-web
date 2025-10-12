import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  bio?: string;
  countryCode?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  onCardClick?: (item: ChromaItem) => void;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  onCardClick
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: '/adekoyejo.jpg',
      title: 'Adekoyejo Adegbesan',
      subtitle: 'President',
      location: 'Nigeria',
      borderColor: '#10B981',
      gradient: 'linear-gradient(145deg, #10B981, #065F46)',
      bio: 'PANASA President with extensive experience in organizing international Scrabble tournaments.',
      countryCode: 'ng'
    },
    {
      image: '/lestermorris.jpg',
      title: 'Lester Morris',
      subtitle: 'Vice President',
      location: 'Liberia',
      borderColor: '#3B82F6',
      gradient: 'linear-gradient(145deg, #3B82F6, #1E40AF)',
      bio: 'Vice President responsible for regional development and member engagement.',
      countryCode: 'lr'
    },
    {
      image: '/fbi.jpg',
      title: 'Umar Faruq Baba-Inna',
      subtitle: 'Ratings Officer',
      location: 'Nigeria',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(145deg, #8B5CF6, #5B21B6)',
      bio: 'Ratings Officer managing player rankings and tournament results.',
      countryCode: 'ng'
    },
    {
      image: '/doko.jpg',
      title: 'Komi Saka',
      subtitle: 'Treasurer',
      location: 'Togo',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(145deg, #F59E0B, #B45309)',
      bio: 'Treasurer overseeing financial operations and budget management.',
      countryCode: 'tg'
    },
    {
      image: '/triumvirate.png',
      title: 'Triumvirate',
      subtitle: 'Directors',
      location: 'Multiple',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(145deg, #EF4444, #B91C1C)',
      bio: 'Board of Directors providing strategic guidance and oversight.',
      countryCode: 'za'
    },
    {
      image: '/kofiBingo.png',
      title: 'Kofi Asamoah',
      subtitle: 'Tournament Director',
      location: 'Ghana',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(145deg, #06B6D4, #0E7490)',
      bio: 'Tournament Director coordinating championship events across Africa.',
      countryCode: 'gh'
    }
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);

    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (item: ChromaItem) => {
    if (onCardClick) {
      onCardClick(item);
    } else if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-6 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c)}
          className="group relative flex flex-col w-[280px] rounded-[20px] overflow-hidden border-2 border-transparent transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-lg"
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              background: c.gradient,
              '--spotlight-color': 'rgba(255,255,255,0.3)'
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />
          <div className="relative z-10 flex-1 p-[10px] box-border">
            <img 
              src={c.image} 
              alt={c.title} 
              loading="lazy" 
              className="w-full h-64 object-cover rounded-[10px] border-2 border-white/20" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80';
              }}
            />
          </div>
          <footer className="relative z-10 p-4 text-white font-sans">
            <div className="flex justify-between items-start mb-1">
              <h3 className="m-0 text-[1.2rem] font-bold truncate">{c.title}</h3>
              {c.countryCode && (
                <img 
                  src={`https://flagcdn.com/24x18/${c.countryCode}.png`} 
                  alt={c.location} 
                  className="w-6 h-4 object-contain rounded-sm border border-white/30"
                />
              )}
            </div>
            <p className="m-0 text-[0.95rem] font-medium opacity-90 mb-1">{c.subtitle}</p>
            {c.location && (
              <p className="m-0 text-[0.9rem] opacity-80 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {c.location}
              </p>
            )}
            {c.handle && <p className="m-0 text-[0.85rem] opacity-70 mt-1">{c.handle}</p>}
          </footer>
        </article>
      ))}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'brightness(0.95)',
          WebkitBackdropFilter: 'brightness(0.95)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.05) 30%,rgba(0,0,0,0.11)45%,rgba(0,0,0,0.175)60%,rgba(0,0,0,0.25)75%,rgba(0,0,0,0.34)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.05) 30%,rgba(0,0,0,0.11)45%,rgba(0,0,0,0.175)60%,rgba(0,0,0,0.25)75%,rgba(0,0,0,0.34)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'brightness(0.95)',
          WebkitBackdropFilter: 'brightness(0.95)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.95)30%,rgba(255,255,255,0.89)45%,rgba(255,255,255,0.825)60%,rgba(255,255,255,0.75)75%,rgba(255,255,255,0.66)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.95)30%,rgba(255,255,255,0.89)45%,rgba(255,255,255,0.825)60%,rgba(255,255,255,0.75)75%,rgba(255,255,255,0.66)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;
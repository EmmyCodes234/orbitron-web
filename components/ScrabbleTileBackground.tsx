import React, { useRef, useEffect } from 'react';

const ScrabbleTileBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Scrabble-themed words related to Africa and the organization
  const words = [
    "AFRICA", "SCRABBLE", "PANASA", "WORDS", "TILES", "GAME", "PLAY", 
    "BOARD", "LETTERS", "POINTS", "TOURNAMENT", "CHAMPION", "SKILL",
    "STRATEGY", "VOCABULARY", "LANGUAGE", "COMPETE", "WIN", "CHALLENGE"
  ];
  
  // Official Scrabble letter point values
  const letterPoints: { [key: string]: number } = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8,
    'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1,
    'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tiles: ScrabbleTile[] = [];
    const tileCount = 20;

    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class ScrabbleTile {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      letter: string;
      points: number;
      opacity: number;
      shadowOffset: number;

      constructor() {
        this.size = Math.random() * 20 + 30; // Size between 30 and 50
        this.x = Math.random() * (canvas.width + 100) - 50;
        this.y = Math.random() * -canvas.height - this.size;
        this.speedY = Math.random() * 0.4 + 0.2; // Slow fall
        this.speedX = (Math.random() - 0.5) * 0.1; // Very slight horizontal drift
        this.rotation = Math.random() * 0.4 - 0.2; // Small rotation range
        this.rotationSpeed = (Math.random() - 0.5) * 0.003; // Very slow rotation
        
        // Pick a random letter from random word
        const randomWord = words[Math.floor(Math.random() * words.length)];
        this.letter = randomWord[Math.floor(Math.random() * randomWord.length)];
        this.points = letterPoints[this.letter] || 1;
        this.opacity = Math.random() * 0.2 + 0.1; // Subtle but visible
        this.shadowOffset = 2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Reset tile when it goes off screen
        if (this.y > canvas.height + this.size) {
          this.y = -this.size - Math.random() * canvas.height;
          this.x = Math.random() * (canvas.width + 200) - 100;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);
        
        const halfSize = this.size / 2;
        
        // Draw shadow
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity * 0.2})`;
        ctx.fillRect(-halfSize + 2, -halfSize + 2, this.size, this.size);
        
        // Draw main tile - clean square with slight rounding
        ctx.fillStyle = `rgba(240, 230, 210, ${this.opacity})`;
        ctx.fillRect(-halfSize, -halfSize, this.size, this.size);
        
        // Draw border
        ctx.strokeStyle = `rgba(180, 160, 120, ${this.opacity * 1.2})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-halfSize, -halfSize, this.size, this.size);
        
        // Draw letter - clean and bold
        ctx.fillStyle = `rgba(40, 40, 40, ${this.opacity * 4})`;
        ctx.font = `bold ${this.size * 0.5}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.letter, 0, 0);

        // Draw points in bottom right corner
        ctx.font = `${this.size * 0.2}px Arial, sans-serif`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = `rgba(40, 40, 40, ${this.opacity * 3})`;
        ctx.fillText(String(this.points), halfSize - 3, halfSize - 2);
        
        ctx.restore();
      }
    }

    function init() {
      tiles = [];
      for (let i = 0; i < tileCount; i++) {
        // Stagger the initial positions for a more natural look
        const tile = new ScrabbleTile();
        tile.y = Math.random() * -canvas.height * 2 - (i * 50);
        tiles.push(tile);
      }
    }

    let animationFrameId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      tiles.forEach(tile => {
        tile.update();
        tile.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      setCanvasDimensions();
      init();
    };
    
    setCanvasDimensions();
    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default ScrabbleTileBackground;
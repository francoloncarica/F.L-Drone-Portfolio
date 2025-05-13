
import React, { useEffect, useState, useRef } from 'react';

interface HeaderProps {
  preloadedVideo?: HTMLVideoElement | null;
}

const Header: React.FC<HeaderProps> = ({ preloadedVideo }) => {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, delay: number }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Generate random particles for background animation
    const particleCount = 15;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2
      });
    }
    
    setParticles(newParticles);

    // If we have a preloaded video, copy its state to our video element
    if (preloadedVideo && videoRef.current) {
      // Make sure the video plays immediately when component mounts
      videoRef.current.play().catch(e => {
        console.log('Video autoplay was prevented by browser', e);
        // Try again with user interaction
        document.addEventListener('click', () => {
          videoRef.current?.play();
        }, { once: true });
      });
    }
  }, [preloadedVideo]);

  return (
    <header className="relative h-screen w-full flex items-center justify-center overflow-hidden text-white">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          ref={videoRef}
          className="absolute top-0 left-0 min-h-full min-w-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="./assets/panoramicas/1.jpg"
        >
          <source src="./assets/videos/video1.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Abstract animation background */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`
            }}
          ></div>
        ))}
        {/* Line elements for minimalist animation */}
        <div className="absolute h-px w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent top-1/3 left-0 animate-particle-move" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent top-2/3 right-0 animate-particle-move" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute w-px h-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent bottom-0 left-1/3 animate-particle-move" style={{ animationDelay: '0.7s' }}></div>
      </div>
      
      <div className="z-20 text-center px-4 animate-float-in">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">F.L Portfolio</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light text-white/80">
          Capturando perspectivas únicas: Fotografía y videografía con drones
        </p>
        
        <div className="mt-12">
          <a 
            href="#introduccion" 
            className="inline-flex items-center border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-all"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('introduccion');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Descubrir
            <svg 
              className="ml-2 animate-bounce" 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 12L2.5 6.5L3.91 5.09L8 9.17L12.09 5.09L13.5 6.5L8 12Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

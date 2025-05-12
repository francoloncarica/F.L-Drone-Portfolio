
import React, { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ScrollRevealImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ScrollRevealImage: React.FC<ScrollRevealImageProps> = ({ src, alt, className }) => {
  const [ref, isRevealed] = useScrollReveal<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div ref={ref} className="overflow-hidden">
        <img 
          src={src} 
          alt={alt} 
          className={cn(
            "grayscale-to-color transform scale-95 transition duration-1000 ease-out cursor-pointer",
            isRevealed && "grayscale-0 scale-100",
            className
          )}
          onClick={handleImageClick}
        />
      </div>
      
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            onClick={closeFullscreen}
          >
            <X size={24} />
          </button>
          <img 
            src={src} 
            alt={alt} 
            className="max-h-[90vh] max-w-[90vw] object-contain" 
          />
        </div>
      )}
    </>
  );
};

export default ScrollRevealImage;

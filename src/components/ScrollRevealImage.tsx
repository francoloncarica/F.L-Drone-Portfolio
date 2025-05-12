
import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

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

  return (
    <div ref={ref} className="overflow-hidden">
      <img 
        src={src} 
        alt={alt} 
        className={cn(
          "grayscale-to-color transform scale-95 transition duration-1000 ease-out",
          isRevealed && "grayscale-0 scale-100",
          className
        )} 
      />
    </div>
  );
};

export default ScrollRevealImage;

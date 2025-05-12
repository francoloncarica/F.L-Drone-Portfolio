
import React, { useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import ScrollRevealImage from './ScrollRevealImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  title: string;
  images: Image[];
  id: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ title, images, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleRef, isTitleRevealed] = useScrollReveal<HTMLDivElement>();
  const carouselRef = useRef<HTMLDivElement>(null);

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      // Loop to the end
      setCurrentIndex(Math.floor((images.length - 1) / 3) * 3);
    }
  };

  const showNext = () => {
    if (currentIndex + 3 < images.length) {
      setCurrentIndex(currentIndex + 3);
    } else {
      // Loop to the beginning
      setCurrentIndex(0);
    }
  };

  const visibleImages = images.slice(currentIndex, currentIndex + 3);
  // Pad with empty slots if needed to maintain 3 items
  while (visibleImages.length < 3) {
    visibleImages.push({ src: "", alt: "" });
  }

  return (
    <section id={id} className="portfolio-section">
      <div 
        ref={titleRef} 
        className={cn(
          "text-center mb-12 transition-all duration-700 opacity-0 transform translate-y-6",
          isTitleRevealed && "opacity-100 translate-y-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{title}</h2>
        <div className="mt-4 w-12 h-px bg-white/50 mx-auto"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Carousel Navigation */}
        <div className="absolute inset-y-0 left-0 flex items-center z-10">
          <button 
            onClick={showPrevious}
            className="p-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all"
            aria-label="Previous images"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center z-10">
          <button 
            onClick={showNext}
            className="p-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all"
            aria-label="Next images"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Carousel Content */}
        <div 
          ref={carouselRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 px-12"
        >
          {visibleImages.map((image, index) => (
            <div key={index} className="aspect-w-16 aspect-h-10 overflow-hidden rounded-md">
              {image.src ? (
                <ScrollRevealImage 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-black/20"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(images.length / 3) }).map((_, idx) => (
            <button
              key={idx}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex / 3 === idx ? "bg-white" : "bg-white/30"
              )}
              onClick={() => setCurrentIndex(idx * 3)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;

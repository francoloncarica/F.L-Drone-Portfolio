
import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const IntroSection: React.FC = () => {
  const [textRef, isTextRevealed] = useScrollReveal<HTMLDivElement>({
    threshold: 0.2
  });
  
  const [lineRef, isLineRevealed] = useScrollReveal<HTMLDivElement>({
    threshold: 0.5
  });

  return (
    <section id="introduccion" className="portfolio-section">
      <div className="max-w-3xl mx-auto text-center">
        <div 
          ref={lineRef} 
          className={cn(
            "w-16 h-px bg-white/50 mx-auto mb-12 transition-all duration-1000 transform origin-center scale-x-0",
            isLineRevealed && "scale-x-100"
          )}
        ></div>
        
        <div 
          ref={textRef}
          className={cn(
            "space-y-6 transition-all duration-1000 opacity-0 transform translate-y-6",
            isTextRevealed && "opacity-100 translate-y-0"
          )}
        >
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Fotografía y videografía especializada en capturas aéreas con drones.
            Captando la belleza del mundo desde ángulos únicos y perspectivas que solo la tecnología de drones nos permite alcanzar.
          </p>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Con años de experiencia en el sector inmobiliario, turístico y publicitario, ofreciendo servicios profesionales 
            que destacan por su calidad técnica y visión artística.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

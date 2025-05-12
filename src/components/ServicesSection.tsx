
import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { 
  Camera, 
  Video, 
  TimerReset, 
  Orbit, 
  PanelTop, 
  SlidersHorizontal 
} from 'lucide-react';

interface Service {
  icon: JSX.Element;
  title: string;
}

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      icon: <Camera size={32} />,
      title: "Fotografía Aérea"
    },
    {
      icon: <Video size={32} />,
      title: "Videografía"
    },
    {
      icon: <TimerReset size={32} />,
      title: "Hyperlapses"
    },
    {
      icon: <Orbit size={32} />,
      title: "Tours Virtuales"
    },
    {
      icon: <PanelTop size={32} />,
      title: "Panorámicas 360°"
    },
    {
      icon: <SlidersHorizontal size={32} />,
      title: "Edición Profesional"
    }
  ];

  const [titleRef, isTitleRevealed] = useScrollReveal<HTMLDivElement>();
  
  return (
    <section id="servicios" className="portfolio-section bg-black">
      <div 
        ref={titleRef} 
        className={cn(
          "text-center mb-16 transition-all duration-700 opacity-0 transform translate-y-6",
          isTitleRevealed && "opacity-100 translate-y-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Servicios</h2>
        <div className="mt-4 w-12 h-px bg-white/50 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {services.map((service, index) => {
          const [ref, isRevealed] = useScrollReveal<HTMLDivElement>({
            threshold: 0.1, 
            rootMargin: "0px",
            triggerOnce: true
          });
          
          return (
            <div 
              key={index}
              ref={ref}
              className={cn(
                "flex flex-col items-center text-center p-6 border border-white/10 rounded-md bg-white/5 transition-all duration-700 opacity-0 transform translate-y-10",
                isRevealed && "opacity-100 translate-y-0",
                isRevealed ? `transition-delay-${index * 100}` : ""
              )}
              style={{ 
                transitionDelay: isRevealed ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="mb-4 p-3 rounded-full bg-white/10">
                {service.icon}
              </div>
              <h3 className="text-lg font-medium">{service.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;


import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Instagram, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const [contactRef, isContactRevealed] = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contacto" className="portfolio-section pt-24 pb-36">
      <div 
        ref={contactRef}
        className={cn(
          "max-w-xl mx-auto text-center transition-all duration-1000 opacity-0 transform translate-y-6",
          isContactRevealed && "opacity-100 translate-y-0"
        )}
      >
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">Contáctame</h2>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <a 
            href="https://www.instagram.com/francoloncarica" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-6 py-4 border border-white/20 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <Instagram size={24} className="mr-3" />
            <span className="text-lg">@francoloncarica</span>
          </a>
          
          <a 
            href="https://www.youtube.com/@francoloncarica240" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-6 py-4 border border-white/20 rounded-md bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <Youtube size={24} className="mr-3" />
            <span className="text-lg">YouTube</span>
          </a>
        </div>

        <div className="mt-16 text-sm text-white/50">
          <p>© {new Date().getFullYear()} F.L Portfolio. Todos los derechos reservados.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

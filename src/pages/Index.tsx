
import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import MusicPlayer from '@/components/MusicPlayer';
import Header from '@/components/Header';
import IntroSection from '@/components/IntroSection';
import Portfolio from '@/components/Portfolio';
import ServicesSection from '@/components/ServicesSection';
import Contact from '@/components/Contact';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple timeout to simulate asset loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!isLoaded && <LoadingScreen />}
      
      {isLoaded && (
        <>
          <MusicPlayer />
          
          <div className="min-h-screen bg-black text-white">
            <Header />
            <IntroSection />
            <Portfolio />
            <ServicesSection />
            <Contact />
          </div>
        </>
      )}
    </>
  );
};

export default Index;

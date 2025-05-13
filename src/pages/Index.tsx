
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
  const [preloadedVideo, setPreloadedVideo] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Preload the background video
    const video = document.createElement('video');
    video.src = './assets/music/background.mp4';
    video.preload = 'auto';
    video.muted = true;
    
    // Track when video is ready to play
    video.addEventListener('canplaythrough', () => {
      setPreloadedVideo(video);
    });
    
    // Simple timeout to simulate asset loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
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

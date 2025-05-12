
import React from 'react';
import ImageCarousel from './ImageCarousel';
import VideoCarousel from './VideoCarousel';

// Helper function to generate dummy array of image or video items
const generateItems = (
  basePath: string, 
  count: number, 
  isVideo: boolean = false,
  namePrefix: string = ''
) => {
  return Array.from({ length: count }).map((_, index) => {
    const num = index + 1;
    
    if (isVideo) {
      return {
        src: `${basePath}/${namePrefix}${num}.mp4`,
        thumbnail: `${basePath}/${namePrefix}${num}-thumb.jpg`,
        title: `Video ${num}`
      };
    }
    
    return {
      src: `${basePath}/${namePrefix}${num}.jpg`,
      alt: `Imagen ${num}`
    };
  });
};

const Portfolio: React.FC = () => {
  // Generate simulated image arrays
  const panoramicImages = generateItems('/assets/panoramicas', 9);
  const verticalImages = generateItems('/assets/verticales', 9);
  const inmobiliariasImages = generateItems('/assets/inmobiliarias', 9);
  const fotografiasImages = generateItems('/assets/fotos', 9);
  
  // Generate simulated video arrays
  const inmobiliariasVideos = generateItems('/assets/inmobiliarias/videos', 6, true, 'casa');
  const hyperlapsesVideos = generateItems('/assets/hyperlapses', 6, true, 'video');
  const regularVideos = generateItems('/assets/videos', 6, true, 'video');

  return (
    <>
      <ImageCarousel 
        title="Panorámicas" 
        images={panoramicImages}
        id="panoramicas"
      />
      
      <ImageCarousel 
        title="Verticales" 
        images={verticalImages}
        id="verticales"
      />
      
      <ImageCarousel 
        title="Inmobiliarias" 
        images={inmobiliariasImages}
        id="inmobiliarias-fotos"
      />
      
      <VideoCarousel 
        title="Inmobiliarias - Videos" 
        videos={inmobiliariasVideos}
        id="inmobiliarias-videos"
      />
      
      <ImageCarousel 
        title="Fotos" 
        images={fotografiasImages}
        id="fotos"
      />
      
      <VideoCarousel 
        title="Hyperlapses" 
        videos={hyperlapsesVideos}
        id="hyperlapses"
      />
      
      <VideoCarousel 
        title="Videos" 
        videos={regularVideos}
        id="videos"
      />
    </>
  );
};

export default Portfolio;

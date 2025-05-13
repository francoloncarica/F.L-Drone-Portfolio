import React from 'react';
import ImageCarousel from './ImageCarousel';
import VideoCarousel from './VideoCarousel';

interface Image {
  src: string;
  alt: string;
}

interface VideoItem {
  src: string;
  thumbnail: string;
  title: string;
}

// Helper function to generate array of image items
const generateImageItems = (
  basePath: string,
  count: number,
  namePrefix: string = ''
): Image[] => {
  return Array.from({ length: count }).map((_, index) => {
    const num = index + 1;
    return {
      src: `./${basePath}/${namePrefix}${num}.jpg`,
      alt: `Imagen ${num}`
    };
  });
};

// Helper function to generate array of video items
const generateVideoItems = (
  basePath: string,
  count: number,
  namePrefix: string = ''
): VideoItem[] => {
  return Array.from({ length: count }).map((_, index) => {
    const num = index + 1;
    return {
      src: `./${basePath}/${namePrefix}${num}.mp4`,
      thumbnail: `./${basePath}/${namePrefix}${num}-thumb.jpg`,
      title: `Video ${num}`
    };
  });
};

const Portfolio: React.FC = () => {
  const panoramicImages = generateImageItems('assets/panoramicas', 12);
  const verticalImages = generateImageItems('assets/verticales', 8);
  const inmobiliariasImages = generateImageItems('assets/inmobiliarias', 9);
  const fotografiasImages = generateImageItems('assets/fotos', 9);

  const inmobiliariasVideos = generateVideoItems('assets/inmobiliarias/videos', 6, 'casa');
  const hyperlapsesVideos = generateVideoItems('assets/hyperlapses', 6, 'video');
  const regularVideos = generateVideoItems('assets/videos', 6, 'video');

  return (
    <section id="portfolio" className="min-h-screen py-24">
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

      {/*
      <VideoCarousel 
        title="Inmobiliarias - Videos" 
        videos={inmobiliariasVideos}
        id="inmobiliarias-videos"
      />
      */}

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
    </section>
  );
};

export default Portfolio;

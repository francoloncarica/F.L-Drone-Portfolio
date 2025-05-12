
import React, { useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface VideoItem {
  src: string;
  thumbnail: string;
  title: string;
}

interface VideoCarouselProps {
  title: string;
  videos: VideoItem[];
  id: string;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videos, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [titleRef, isTitleRevealed] = useScrollReveal<HTMLDivElement>();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      // Loop to the end
      setCurrentIndex(Math.floor((videos.length - 1) / 3) * 3);
    }
  };

  const showNext = () => {
    if (currentIndex + 3 < videos.length) {
      setCurrentIndex(currentIndex + 3);
    } else {
      // Loop to the beginning
      setCurrentIndex(0);
    }
  };

  const handleVideoClick = (videoSrc: string) => {
    // If clicking the active video, pause it
    if (activeVideo === videoSrc) {
      const videoElement = videoRefs.current[videoSrc];
      if (videoElement) {
        if (videoElement.paused) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      }
      return;
    }
    
    // Pause all videos
    Object.values(videoRefs.current).forEach(video => {
      if (video) video.pause();
    });
    
    // Set active video
    setActiveVideo(videoSrc);
    
    // Play the selected video
    setTimeout(() => {
      const videoElement = videoRefs.current[videoSrc];
      if (videoElement) {
        videoElement.play().catch(err => console.error("Error playing video:", err));
      }
    }, 100);
  };

  const visibleVideos = videos.slice(currentIndex, currentIndex + 3);
  // Pad with empty slots if needed to maintain 3 items
  while (visibleVideos.length < 3) {
    visibleVideos.push({ src: "", thumbnail: "", title: "" });
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
            aria-label="Previous videos"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center z-10">
          <button 
            onClick={showNext}
            className="p-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all"
            aria-label="Next videos"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Carousel Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-12">
          {visibleVideos.map((video, index) => {
            if (!video.src) return (
              <div key={index} className="aspect-w-16 aspect-h-10 bg-black/20 rounded-md"></div>
            );
            
            const [videoRef, isVideoRevealed] = useScrollReveal<HTMLDivElement>();
            
            return (
              <div 
                key={index}
                ref={videoRef}
                className={cn(
                  "relative aspect-w-16 aspect-h-10 overflow-hidden rounded-md transition-all duration-1000 transform filter grayscale opacity-80",
                  isVideoRevealed && "grayscale-0 opacity-100",
                  "cursor-pointer group"
                )}
                onClick={() => handleVideoClick(video.src)}
              >
                {activeVideo === video.src ? (
                  <video
                    ref={el => videoRefs.current[video.src] = el}
                    src={video.src}
                    className="w-full h-full object-cover"
                    playsInline
                    controls
                  />
                ) : (
                  <>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all">
                        <Play size={24} fill="white" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(videos.length / 3) }).map((_, idx) => (
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

export default VideoCarousel;


import React, { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

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
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [videoThumbnails, setVideoThumbnails] = useState<{[key: string]: string}>({});
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const previewRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const isMobile = useIsMobile();

  // Generate thumbnails for videos that don't have them
  useEffect(() => {
    videos.forEach(video => {
      if (video.src && !videoThumbnails[video.src]) {
        // Create a video element to generate thumbnail
        const videoEl = document.createElement('video');
        videoEl.src = video.src;
        videoEl.crossOrigin = 'anonymous';
        videoEl.muted = true;
        videoEl.currentTime = 1.5; // Jump to 1.5 seconds for thumbnail
        
        videoEl.addEventListener('loadeddata', () => {
          // Create canvas and draw the video frame
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = videoEl.videoWidth;
            canvas.height = videoEl.videoHeight;
            context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
            
            // Convert canvas to data URL and store it
            const thumbnailUrl = canvas.toDataURL('image/jpeg');
            setVideoThumbnails(prev => ({
              ...prev,
              [video.src]: thumbnailUrl
            }));
          }
        });
      }
    });
  }, [videos]);

  // Number of videos to show per page (1 on mobile, 3 on desktop)
  const videosPerPage = isMobile ? 1 : 3;

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - videosPerPage);
    } else {
      // Loop to the end
      setCurrentIndex(Math.floor((videos.length - 1) / videosPerPage) * videosPerPage);
    }
  };

  const showNext = () => {
    if (currentIndex + videosPerPage < videos.length) {
      setCurrentIndex(currentIndex + videosPerPage);
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

  const handleVideoHover = (videoSrc: string | null) => {
    // Skip preview on mobile
    if (isMobile) return;
    
    // If hovering over a new video
    if (videoSrc !== hoveredVideo) {
      // Pause previous preview if exists
      if (hoveredVideo && previewRefs.current[hoveredVideo]) {
        previewRefs.current[hoveredVideo]?.pause();
      }
      
      // Set the new hovered video
      setHoveredVideo(videoSrc);
      
      // Play the new preview if exists
      if (videoSrc && previewRefs.current[videoSrc]) {
        const video = previewRefs.current[videoSrc];
        if (video) {
          video.currentTime = 0;
          video.play().catch(err => console.error("Error playing preview:", err));
        }
      }
    }
  };

  const visibleVideos = videos.slice(currentIndex, currentIndex + videosPerPage);
  // Pad with empty slots if needed to maintain consistent number of items
  while (visibleVideos.length < videosPerPage) {
    visibleVideos.push({ src: "", thumbnail: "", title: "" });
  }

  // Determine grid columns based on device type
  const gridColumns = isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3";

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
        <div className={`grid ${gridColumns} gap-4 px-12`}>
          {visibleVideos.map((video, index) => {
            if (!video.src) return (
              <div key={index} className="aspect-w-16 aspect-h-10 bg-black/20 rounded-md"></div>
            );
            
            const [videoRef, isVideoRevealed] = useScrollReveal<HTMLDivElement>();
            const thumbnailSrc = videoThumbnails[video.src] || video.thumbnail;
            const isActive = activeVideo === video.src;
            const isHovered = hoveredVideo === video.src && !isActive && !isMobile;
            
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
                onMouseEnter={() => handleVideoHover(video.src)}
                onMouseLeave={() => handleVideoHover(null)}
              >
                {isActive ? (
                  <video
                    ref={el => videoRefs.current[video.src] = el}
                    src={video.src}
                    className="w-full h-full object-cover"
                    playsInline
                    controls
                  />
                ) : (
                  <>
                    {isHovered ? (
                      <video
                        ref={el => previewRefs.current[video.src] = el}
                        src={video.src}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        playsInline
                        muted
                        loop
                      />
                    ) : (
                      <img 
                        src={thumbnailSrc} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
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
          {Array.from({ length: Math.ceil(videos.length / videosPerPage) }).map((_, idx) => (
            <button
              key={idx}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex / videosPerPage === idx ? "bg-white" : "bg-white/30"
              )}
              onClick={() => setCurrentIndex(idx * videosPerPage)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;

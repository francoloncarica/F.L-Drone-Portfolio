
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(true); // Changed to true for autoplay
  const [volume, setVolume] = useState(0.2);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/assets/music/background.mp4');
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Try to autoplay when component mounts
    audio.play().catch(error => {
      console.error("Audio autoplay error:", error);
      setPlaying(false); // If autoplay fails, update state
    });

    // Clean up audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
      });
    }
    
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div 
        className="flex items-center bg-black bg-opacity-70 border border-white/20 rounded-full p-2"
        onMouseEnter={() => setShowVolumeControl(true)}
        onMouseLeave={() => setShowVolumeControl(false)}
      >
        {showVolumeControl && (
          <div className="mr-2 w-20 transition-all duration-300 ease-in-out">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full cursor-pointer appearance-none bg-white/30 h-1 rounded-full"
            />
          </div>
        )}
        <button 
          onClick={togglePlay}
          className="w-8 h-8 flex items-center justify-center bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition-all"
        >
          {playing ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

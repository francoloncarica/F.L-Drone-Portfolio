
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-700">
      <div className="relative flex flex-col items-center">
        <div className="text-5xl font-bold tracking-tighter mb-2">
          <span className="animate-loading-pulse">F.L</span>
        </div>
        <div className={cn(
          "w-14 h-14 relative flex items-center justify-center"
        )}>
          <span className="absolute w-full h-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-rotate"></span>
          <span className="absolute w-full h-full border-2 border-t-transparent border-r-white border-b-transparent border-l-transparent rounded-full animate-rotate" style={{ animationDelay: '0.2s' }}></span>
          <span className="absolute w-full h-full border-2 border-t-transparent border-r-transparent border-b-white border-l-transparent rounded-full animate-rotate" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

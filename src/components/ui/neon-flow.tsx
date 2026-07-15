import React, { useEffect, useRef, useState } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper for random colors
const randomColors = (count: number) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // We use the specific build from the CDN as it contains the exact effect requested
        // Using native dynamic import which works in modern browsers
        // @ts-ignore
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
            }
          }
        });

        tubesRef.current = app;

        // Handle resize if the library doesn't automatically
        const handleResize = () => {
          // The library handles standard resize, but we can trigger it or let it handle
        };

        window.addEventListener('resize', handleResize);
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  // When hover state changes, set/unset global splash cursor bypass
  useEffect(() => {
    if (isHovered) {
      (window as any).disableSplashCursor = true;
    } else {
      (window as any).disableSplashCursor = false;
    }
    return () => {
      (window as any).disableSplashCursor = false;
    };
  }, [isHovered]);

  const handleClick = (e: React.MouseEvent) => {
    if (!enableClickInteraction || !tubesRef.current) return;
    
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("relative w-full h-full min-h-[300px] overflow-hidden bg-neutral-950/40 border border-neutral-900 select-none", className)}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef} 
        className={cn(
          "absolute inset-0 w-full h-full block transition-opacity duration-300", 
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ touchAction: 'none' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;

import React, { useState, useEffect } from "react";
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";

function Typewriter({ text, delay = 45, startDelay = 2000 }: { text: string; delay?: number; startDelay?: number }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [started, currentIndex, delay, text]);

  return (
    <span>
      {currentText}
      {(!started || currentIndex < text.length) && (
        <span className="inline-block w-[2px] h-[1.1em] ml-0.5 bg-green-400 animate-pulse align-middle" />
      )}
    </span>
  );
}

export function SplineSceneHero() {
  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 bg-black overflow-hidden border-b border-neutral-900 rounded-none mb-8 flex items-center h-screen pt-16 pb-0 lg:pt-20 lg:pb-0">
      {/* Neutral Spotlight glow */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#334155"
      />
      
      <div className="w-full max-w-[1440px] mx-auto h-full px-6 sm:px-8 lg:px-12 pt-6 pb-0 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left content: Information */}
        <div className="flex-1 text-center lg:text-left flex flex-col justify-center space-y-6 max-w-xl pb-6 lg:pb-8">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-primaryText tracking-tighter leading-none">
            ENGAGE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryAccent via-green-400 to-secondaryAccent">3D AGENT ROLE</span>
          </h1>
        </div>

        {/* Right content - Spline Scene */}
        <div className="flex-1 w-full h-[55vh] lg:h-[75vh] xl:h-[80vh] relative flex items-end justify-center">
          {/* Connected Robot Speech Caption - Positioned exactly in the highlighted area */}
          <div className="absolute top-[22%] left-4 sm:left-10 lg:left-4 xl:left-8 z-20 w-[85%] sm:w-[75%] max-w-xs p-3.5 bg-neutral-950/95 border border-neutral-900 rounded-xl backdrop-blur-md shadow-2xl flex gap-3 items-start text-left pointer-events-auto transition-all hover:border-primaryAccent/50">
            <span className="flex h-2 w-2 mt-1.5 shrink-0 rounded-full bg-green-400 animate-pulse" />
            <div className="space-y-1">
              <p className="text-xs text-primaryText font-sans font-medium leading-relaxed">
                "Hi, I'm <span className="text-primaryAccent font-bold">NinoRobot</span>! <Typewriter text="Need help? Fill out the transmission form below to deploy my systems, or click the active workspace modules." delay={45} />"
              </p>
            </div>
          </div>

          <div className="w-full h-full relative translate-y-4 sm:translate-y-6 lg:translate-y-8 flex justify-center items-end">
            <SplineScene 
               scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-100 sm:scale-105 lg:scale-110 pointer-events-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Subtle modern accent highlight line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-800/40 to-transparent pointer-events-none" />
    </div>
  );
}

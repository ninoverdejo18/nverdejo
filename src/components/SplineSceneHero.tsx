import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";

export function SplineSceneHero() {
  const handleScrollDown = () => {
    const target = document.getElementById("split-contact-grid");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 bg-black overflow-hidden border-b border-neutral-900 rounded-none select-none mb-8 flex items-center h-screen pt-16 pb-0 lg:pt-20 lg:pb-0">
      {/* Neutral Spotlight glow */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#334155"
      />
      
      <div className="w-full max-w-[1440px] mx-auto h-full px-6 sm:px-8 lg:px-12 pt-6 pb-0 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left content: Information */}
        <div className="flex-1 text-center lg:text-left flex flex-col justify-center space-y-4 max-w-xl pb-6 lg:pb-8">
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-primaryText tracking-tighter leading-none">
            ENGAGE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryAccent via-green-400 to-secondaryAccent">3D AGENT CORE</span>
          </h1>
          
        </div>

        {/* Right content - Spline Scene */}
        <div className="flex-1 w-full h-[55vh] lg:h-[75vh] xl:h-[80vh] relative flex items-end justify-center">
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

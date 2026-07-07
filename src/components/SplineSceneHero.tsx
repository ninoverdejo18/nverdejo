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
    <div className="relative left-1/2 -translate-x-1/2 w-screen min-h-screen bg-bg-dark overflow-hidden select-none mb-12 border-b border-neutral-900 tech-grid flex items-center py-16">
      {/* Purple Spotlight glow */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#8B5CF6"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full pt-16 pb-8 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left content: Information */}
        <div className="flex-1 text-center lg:text-left flex flex-col justify-center space-y-6 max-w-xl">
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-primaryText tracking-tighter leading-none">
            ENGAGE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryAccent via-purple-400 to-secondaryAccent">3D AGENT CORE</span>
          </h1>
          
        </div>

        {/* Right content - Spline Scene */}
        <div className="flex-1 w-full h-[700px] relative flex items-center justify-center">
          <div className="w-full h-full relative translate-y-16 lg:translate-y-20">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-100 lg:scale-105 pointer-events-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Subtle modern accent highlight line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primaryAccent/40 to-transparent pointer-events-none" />
    </div>
  );
}

import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";

export function SplineSceneHero() {
  // ==========================
  // Adjustable Settings
  // ==========================
  const CANVAS_WIDTH = 700;
  const CANVAS_HEIGHT = 800;
  const ROBOT_SCALE = 1.25;

  const handleScrollDown = () => {
    const target = document.getElementById("split-contact-grid");

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen min-h-screen bg-bg-dark overflow-visible border-b border-neutral-900 tech-grid flex items-center py-8 select-none">

      {/* Purple Spotlight */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#8B5CF6"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col lg:flex-row items-center justify-between gap-8 px-4 pt-8 pb-8 sm:px-6 lg:px-8">

        {/* LEFT */}
        <div className="flex-1 max-w-xl space-y-6 text-center lg:text-left">

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-primaryText">
            ENGAGE THE
            <br />
            <span className="bg-gradient-to-r from-primaryAccent via-purple-400 to-secondaryAccent bg-clip-text text-transparent">
              3D AGENT CORE
            </span>
          </h1>

        </div>

        {/* RIGHT */}
        <div className="flex flex-1 justify-center items-center">

          <div
            className="relative shrink-0 overflow-visible"
            style={{
              width: `${CANVAS_WIDTH}px`,
              height: `${CANVAS_HEIGHT}px`,
              maxWidth: "100%",
            }}
          >
            {/* Scale wrapper */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scale(${ROBOT_SCALE})`,
                transformOrigin: "center center",
              }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full pointer-events-auto"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primaryAccent/40 to-transparent" />

    </section>
  );
}
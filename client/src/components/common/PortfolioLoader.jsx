import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/Logo.png";

export function PortfolioLoader({ onLoadingComplete, isExiting }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    const heroImages = [
      "/images/Base_image_desktop.png",
      "/images/Reveal_image_desktop.png",
      "/images/Base_image_mobile.png",
      "/images/Reveal_image_mobile.png",
    ];

    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isMounted) loadedCount++;
      };
      img.onerror = () => {
        if (isMounted) loadedCount++;
      };
    });

    // Smooth progression sequence: 00 -> 07 -> 18 -> 31 -> 46 -> 63 -> 78 -> 91 -> 100%
    const progressSteps = [0, 7, 18, 31, 46, 63, 78, 91, 100];
    let stepIndex = 0;

    const timer = setInterval(() => {
      if (!isMounted) return;
      stepIndex++;
      if (stepIndex < progressSteps.length) {
        setProgress(progressSteps[stepIndex]);
      } else {
        clearInterval(timer);
        setProgress(100);
      }
    }, 180); // ~1.62 seconds total duration

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  // Trigger completion callback when progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onLoadingComplete?.();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  return (
    <div
      aria-label="System Initializing"
      className="fixed inset-0 z-[100000] w-screen h-[100dvh] select-none isolation-isolate pointer-events-none"
    >
      {/* ── STAGE 2: TOP SHUTTER CURTAIN PANEL ── */}
      <div
        className={`fixed top-0 left-0 w-full h-[50dvh] bg-[#030304] z-[100001] border-b border-[#BF4A1A]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(191,74,26,0.08)_0%,transparent_60%)] pointer-events-none" />
      </div>

      {/* ── STAGE 2: BOTTOM SHUTTER CURTAIN PANEL ── */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[50dvh] bg-[#030304] z-[100001] border-t border-[#BF4A1A]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isExiting ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(191,74,26,0.08)_0%,transparent_60%)] pointer-events-none" />
      </div>

      {/* ── LOADER CONTENT CONTAINER (CENTERED OVER SHUTTERS) ── */}
      <div
        className={`fixed inset-0 z-[100002] w-screen h-[100dvh] flex flex-col items-center justify-between p-8 md:p-14 text-white transition-all duration-400 ease-out ${
          isExiting ? "scale-95 opacity-0 pointer-events-none" : "scale-100 opacity-100 pointer-events-auto"
        }`}
      >
        {/* TOP METADATA BAR */}
        <header className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Ameer Suhail Monogram"
              className="w-10 h-auto md:w-12 object-contain shrink-0 filter drop-shadow-[0_0_10px_rgba(246,242,255,0.4)]"
            />
            <div className="flex flex-col">
              <span className="font-mono-custom text-xs uppercase tracking-[0.25em] font-semibold text-[#F6F2FF]">
                AMEER SUHAIL
              </span>
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#C9C5D0]/60">
                BUILDING THE NEXT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF4A1A] animate-ping" />
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#BF4A1A]">
              ONLINE
            </span>
          </div>
        </header>

        {/* CENTER CINEMATIC COMPOSITION WITH OPTION C LASER & HAPTIC SOUNDWAVE VISUALIZER */}
        <main className="flex flex-col items-center justify-center gap-6 text-center z-10">
          {/* OPTION C: MONOGRAM WITH HAPTIC RIPPLES & CRIMSON LASER SCANNER */}
          <div className="relative flex items-center justify-center p-4">
            {/* Concentric Haptic Expanding Ripples */}
            <div className="absolute size-36 rounded-full border border-[#BF4A1A]/30 animate-ping pointer-events-none" />
            <div className="absolute size-48 rounded-full border border-[#BF4A1A]/15 animate-pulse pointer-events-none" />

            {/* Sweeping Crimson Laser Line Scanner */}
            <div className="absolute inset-x-[-30px] h-[2px] bg-gradient-to-r from-transparent via-[#BF4A1A] to-transparent shadow-[0_0_14px_#BF4A1A] animate-laser-sweep pointer-events-none z-20" />

            {/* Monogram Logo */}
            <img
              src={Logo}
              alt="Ameer Suhail Monogram"
              className="w-20 h-auto md:w-28 object-contain shrink-0 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] relative z-10"
            />
          </div>

          {/* OPTION C: PULSING SOUNDWAVE VISUALIZER BARS */}
          <div className="flex items-center justify-center gap-1.5 h-7 my-1">
            <span className="w-1 bg-[#BF4A1A] rounded-full animate-soundwave-1" />
            <span className="w-1 bg-[#BF4A1A] rounded-full animate-soundwave-2" />
            <span className="w-1 bg-[#F6F2FF] rounded-full animate-soundwave-3" />
            <span className="w-1 bg-[#BF4A1A] rounded-full animate-soundwave-4" />
            <span className="w-1 bg-[#BF4A1A] rounded-full animate-soundwave-5" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="font-mono-custom text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-[#F6F2FF]">
              AMEER SUHAIL
            </span>
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#C9C5D0]/60">
              BUILDING THE NEXT
            </span>
          </div>

          {/* PROGRESS COUNTER */}
          <div className="relative flex items-center justify-center my-1">
            <span className="font-mono-custom text-4xl md:text-5xl font-bold tracking-tight text-[#F6F2FF]">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          <span className="font-mono-custom text-[11px] uppercase tracking-[0.25em] text-[#C9C5D0]/80 animate-pulse">
            INITIALIZING EXPERIENCE
          </span>
        </main>

        {/* FOOTER PROGRESS TRACK */}
        <footer className="w-full max-w-sm flex flex-col items-center gap-3 z-10">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#7C3AED] via-[#BF4A1A] to-[#F6F2FF] transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full flex items-center justify-between font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#C9C5D0]/50">
            <span>PORTFOLIO LOAD</span>
            <span>{progress === 100 ? "READY" : "LOADING ASSETS"}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default PortfolioLoader;

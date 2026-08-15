import React, { useState, useRef, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeIntensityController() {
  const { themeIntensity, setThemeIntensity } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderTrackRef = useRef(null);

  // Helper to calculate numeric intensity percentage from pointer Y coordinate
  const calculateIntensityFromY = (clientY) => {
    if (!sliderTrackRef.current) return;
    const rect = sliderTrackRef.current.getBoundingClientRect();
    const height = rect.height;
    const offsetY = clientY - rect.top;
    // Y runs top-to-bottom: 0 at top (100%), height at bottom (0%)
    const pct = Math.max(0, Math.min(100, ((height - offsetY) / height) * 100));
    setThemeIntensity(Math.round(pct));
  };

  // Pointer drag listeners for continuous mouse/touch dragging
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    calculateIntensityFromY(e.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      e.preventDefault();
      calculateIntensityFromY(e.clientY);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging]);

  // Keyboard Navigation accessibility (Arrow keys, Home, End)
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      setThemeIntensity((prev) => Math.min(100, prev + 2));
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      setThemeIntensity((prev) => Math.max(0, prev - 2));
    } else if (e.key === "Home") {
      e.preventDefault();
      setThemeIntensity(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setThemeIntensity(100);
    }
  };

  const roundedPct = Math.round(themeIntensity);

  return (
    <div
      tabIndex={0}
      role="slider"
      aria-label="Theme Intensity Controller"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={roundedPct}
      aria-valuetext={`${roundedPct} percent intensity`}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        if (!isDragging) setIsExpanded(false);
      }}
      className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex flex-col items-center group animate-float outline-none select-none"
    >
      {/* Expanded Slider Panel Popup */}
      <div
        className={`absolute bottom-24 left-0 flex flex-col items-center gap-3 p-3.5 rounded-2xl border border-white/20 bg-[#0f0e11]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 transform origin-bottom-left ${
          isExpanded || isDragging
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <span className="font-mono-custom text-[9px] font-bold uppercase tracking-widest text-[#BF4A1A]">
          INTENSITY
        </span>

        {/* Top Indicator: 100% Sun */}
        <button
          type="button"
          onClick={() => setThemeIntensity(100)}
          title="Set to 100% Light Theme"
          className="text-amber-400 hover:scale-115 transition-transform cursor-pointer"
        >
          <FiSun className="text-sm" />
        </button>

        {/* Vertical Drag Track */}
        <div
          ref={sliderTrackRef}
          onPointerDown={handlePointerDown}
          className="relative w-3.5 h-28 rounded-full bg-white/10 border border-white/15 cursor-ns-resize overflow-hidden"
        >
          {/* Fill Bar */}
          <div
            className="absolute bottom-0 left-0 w-full bg-[#BF4A1A] transition-all duration-75"
            style={{ height: `${themeIntensity}%` }}
          />
          {/* Slider Handle Knob */}
          <div
            className="absolute left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-[#BF4A1A] shadow-md transition-all duration-75 pointer-events-none"
            style={{ bottom: `calc(${themeIntensity}% - 8px)` }}
          />
        </div>

        {/* Bottom Indicator: 0% Moon */}
        <button
          type="button"
          onClick={() => setThemeIntensity(0)}
          title="Set to 0% Dark Theme"
          className="text-indigo-400 hover:scale-115 transition-transform cursor-pointer"
        >
          <FiMoon className="text-sm" />
        </button>

        <span className="font-mono-custom text-[11px] font-extrabold text-[#F6F2FF]">
          {roundedPct}%
        </span>
      </div>

      {/* Primary Floating Box Symmetrical to ScrollProgress */}
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="relative w-14 h-20 md:w-16 md:h-24 rounded-xl md:rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer hover:border-[#BF4A1A]/60"
      >
        {/* Fill Layer */}
        <div
          className="absolute bottom-0 left-0 w-full bg-[#BF4A1A] shadow-[0_-5px_20px_#BF4A1A]"
          style={{ height: `${themeIntensity}%` }}
        />

        {/* Icons & Percentage Text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1 md:gap-2">
          {themeIntensity > 65 ? (
            <FiSun className="w-5 h-5 md:w-6 md:h-6 text-amber-300 duration-300" />
          ) : themeIntensity < 35 ? (
            <FiMoon className="w-5 h-5 md:w-6 md:h-6 text-indigo-300 duration-300" />
          ) : (
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white/80 overflow-hidden relative">
              <div className="w-1/2 h-full bg-white absolute left-0" />
            </div>
          )}

          <span
            className={`text-[10px] md:text-xs font-black duration-300 ${
              themeIntensity > 35 ? "text-white" : "text-[#BF4A1A]"
            }`}
          >
            {roundedPct}%
          </span>
        </div>
      </div>
    </div>
  );
}

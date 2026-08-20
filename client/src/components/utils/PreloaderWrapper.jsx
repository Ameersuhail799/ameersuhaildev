import React, { useState, useEffect } from "react";
import PortfolioLoader from "../common/PortfolioLoader";
import CognitionHero from "../home/CognitionHero";
import ThemeIntensityController from "../common/ThemeIntensityController";

const PreloaderWrapper = ({ children }) => {
  // State machine: 'loading' -> 'exiting_loading' -> 'intro' -> 'entering_portfolio' -> 'portfolio'
  const [entryState, setEntryState] = useState("loading");

  // Manage body scroll and portfolio-active theme class seamlessly
  useEffect(() => {
    if (entryState === "portfolio" || entryState === "entering_portfolio") {
      document.documentElement.classList.add("portfolio-active");
      document.body.classList.add("portfolio-active");
      if (entryState === "portfolio") {
        document.body.style.overflow = "";
      }
    } else {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.remove("portfolio-active");
      document.body.classList.remove("portfolio-active");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [entryState]);

  // STAGE 1 -> STAGE 2: PortfolioLoader (100%) -> CognitionHero
  const handleLoadingComplete = () => {
    if (entryState !== "loading") return;
    setEntryState("exiting_loading");

    setTimeout(() => {
      setEntryState("intro");
    }, 400);
  };

  // STAGE 2 -> STAGE 3: CognitionHero (User Action) -> Seamless Portfolio
  const handleExitIntro = () => {
    if (entryState !== "intro") return;
    // Activate theme intensity immediately upon exit trigger to eliminate dark flash glitch
    document.documentElement.classList.add("portfolio-active");
    document.body.classList.add("portfolio-active");
    setEntryState("entering_portfolio");

    setTimeout(() => {
      setEntryState("portfolio");
      document.body.style.overflow = "";
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 500);
  };

  return (
    <>
      {/* ── STAGE 1: CINEMATIC INITIAL LOADER (Top Layer z-[100000]) ── */}
      {(entryState === "loading" || entryState === "exiting_loading") && (
        <PortfolioLoader
          onLoadingComplete={handleLoadingComplete}
          isExiting={entryState === "exiting_loading"}
        />
      )}

      {/* ── STAGE 2: COGNITIVE HERO INTRO (Pre-mounted during loading for ZERO transition lag) ── */}
      {(entryState === "loading" ||
        entryState === "exiting_loading" ||
        entryState === "intro" ||
        entryState === "entering_portfolio") && (
        <CognitionHero
          onExitIntro={handleExitIntro}
          isExiting={entryState === "entering_portfolio"}
          isActive={entryState === "intro"}
        />
      )}

      {/* ── STAGE 3: MAIN PORTFOLIO (Pre-mounted in DOM for zero transition lag) ── */}
      <div
        className={`w-full transition-opacity duration-500 ease-out ${
          entryState === "portfolio" || entryState === "entering_portfolio"
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>

      {/* ── THEME INTENSITY CONTROLLER (Appears ONLY after Loader & Cognitive Intro complete) ── */}
      {(entryState === "portfolio" || entryState === "entering_portfolio") && (
        <ThemeIntensityController />
      )}
    </>
  );
};

export default PreloaderWrapper;
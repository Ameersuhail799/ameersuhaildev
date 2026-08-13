import React, { useState, useEffect } from "react";
import PortfolioLoader from "../common/PortfolioLoader";
import CognitionHero from "../home/CognitionHero";

const PreloaderWrapper = ({ children }) => {
  // State machine: 'loading' -> 'exiting_loading' -> 'intro' -> 'entering_portfolio' -> 'portfolio'
  const [entryState, setEntryState] = useState("loading");

  // Manage body scroll and background color class based on entryState
  useEffect(() => {
    if (entryState !== "portfolio") {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.remove("portfolio-active");
      document.body.classList.remove("portfolio-active");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.add("portfolio-active");
      document.body.classList.add("portfolio-active");
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
    }, 700);
  };

  // STAGE 2 -> STAGE 3: CognitionHero (User Action) -> Original Portfolio
  const handleExitIntro = () => {
    if (entryState !== "intro") return;
    setEntryState("entering_portfolio");

    setTimeout(() => {
      setEntryState("portfolio");
      document.body.style.overflow = "";
      document.documentElement.classList.add("portfolio-active");
      document.body.classList.add("portfolio-active");
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 1000);
  };

  return (
    <>
      {/* ── STAGE 1: NEW DARK CINEMATIC LOADER ── */}
      {(entryState === "loading" || entryState === "exiting_loading") && (
        <PortfolioLoader
          onLoadingComplete={handleLoadingComplete}
          isExiting={entryState === "exiting_loading"}
        />
      )}

      {/* ── STAGE 2: FULL-VIEWPORT COGNITION HERO INTRO ── */}
      {(entryState === "intro" || entryState === "entering_portfolio") && (
        <CognitionHero
          onExitIntro={handleExitIntro}
          isExiting={entryState === "entering_portfolio"}
        />
      )}

      {/* ── STAGE 3: ORIGINAL PORTFOLIO (Navbar, Banner, etc.) ── */}
      {entryState === "portfolio" && children}
    </>
  );
};

export default PreloaderWrapper;
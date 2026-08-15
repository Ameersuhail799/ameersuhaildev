import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  themeIntensity: 50,
  setThemeIntensity: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Canonical numeric theme intensity state (0 to 100, default 50)
  const [themeIntensity, setIntensityState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedIntensity = localStorage.getItem("themeIntensity");
        if (savedIntensity !== null) {
          const num = Number(savedIntensity);
          if (!isNaN(num) && num >= 0 && num <= 100) return num;
        }
        // Legacy fallback migration
        const legacyTheme = localStorage.getItem("theme");
        if (legacyTheme === "light") return 100;
        if (legacyTheme === "dark") return 0;
      } catch (e) {}
    }
    return 50;
  });

  // Apply continuous progress variables (--dark-progress & --light-progress) to root
  const applyIntensity = (val) => {
    const clamped = Math.max(0, Math.min(100, val));
    const normalized = clamped / 100;
    const root = document.documentElement;

    root.style.setProperty("--theme-intensity", normalized.toFixed(4));
    root.setAttribute("data-theme-intensity", Math.round(clamped).toString());

    // Calculate domain progress values (0.0 to 1.0)
    const darkProgress = Math.min(1, clamped / 50);
    const lightProgress = Math.max(0, (clamped - 50) / 50);

    root.style.setProperty("--dark-progress", darkProgress.toFixed(4));
    root.style.setProperty("--light-progress", lightProgress.toFixed(4));

    const isLightDomain = clamped >= 50;
    if (isLightDomain) {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  };

  useEffect(() => {
    applyIntensity(themeIntensity);
    try {
      localStorage.setItem("themeIntensity", themeIntensity.toString());
    } catch (e) {}
  }, [themeIntensity]);

  const setThemeIntensity = (value) => {
    const nextVal = typeof value === "function" ? value(themeIntensity) : value;
    const clamped = Math.max(0, Math.min(100, nextVal));
    setIntensityState(clamped);
    applyIntensity(clamped);
  };

  return (
    <ThemeContext.Provider value={{ themeIntensity, setThemeIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;

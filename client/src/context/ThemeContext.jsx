import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  themeIntensity: 0,
  setThemeIntensity: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Canonical numeric theme intensity state (0 to 100, default 0)
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
    return 0;
  });

  // Apply --theme-intensity (0.00 to 1.00) to documentElement and sync class attributes
  const applyIntensity = (val) => {
    const clamped = Math.max(0, Math.min(100, val));
    const normalized = clamped / 100;
    const root = document.documentElement;

    root.style.setProperty("--theme-intensity", normalized.toFixed(4));
    root.setAttribute("data-theme-intensity", Math.round(clamped).toString());

    if (clamped >= 50) {
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

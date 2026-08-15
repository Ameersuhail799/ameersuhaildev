import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm ${
        isDark
          ? "border-white/20 bg-white/10 text-[#F6F2FF] hover:bg-white/20 hover:border-white/30"
          : "border-black/15 bg-black/5 text-[#121118] hover:bg-black/10 hover:border-black/25"
      } ${className}`}
    >
      {isDark ? (
        <>
          <FiSun className="text-amber-400 text-sm" />
          <span className="font-mono-custom text-[11px] font-semibold tracking-wider">LIGHT</span>
        </>
      ) : (
        <>
          <FiMoon className="text-indigo-600 text-sm" />
          <span className="font-mono-custom text-[11px] font-semibold tracking-wider">DARK</span>
        </>
      )}
    </button>
  )
}

export default ThemeToggle

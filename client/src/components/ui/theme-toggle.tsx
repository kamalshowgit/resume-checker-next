"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="relative group rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container */}
      <div className="relative flex items-center justify-center w-6 h-6">
        {theme === "dark" ? (
          <FiSun className="h-5 w-5 text-yellow-500 dark:text-yellow-400 transition-all duration-300 transform rotate-0 group-hover:rotate-12" />
        ) : (
          <FiMoon className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-all duration-300 transform rotate-0 group-hover:-rotate-12" />
        )}
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 group-active:opacity-0 transition-all duration-300 scale-0 group-hover:scale-100" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 scale-0 group-hover:scale-150" />
    </button>
  );
}

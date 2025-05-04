'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return <div className={cn("w-14 h-7", className)} />;
  }

  const isDark = theme === 'dark';

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={toggleTheme}
        className={cn(
          "relative w-14 h-7 rounded-full p-1 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isDark
            ? "bg-slate-800 border border-slate-700"
            : "bg-blue-100 border border-blue-200"
        )}
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>

        {/* Toggle handle with sun/moon icons */}
        <motion.div
          className={cn(
            "absolute w-5 h-5 rounded-full flex items-center justify-center",
            isDark ? "bg-blue-500" : "bg-yellow-400"
          )}
          initial={false}
          animate={{
            x: isDark ? 26 : 2,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {/* Sun rays or moon */}
          {isDark ? (
            <div className="w-3 h-3 rounded-full bg-slate-800"></div>
          ) : (
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              {[45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-0.5 h-1 bg-yellow-500 rounded-full origin-bottom"
                  style={{
                    top: '-4px',
                    left: '50%',
                    marginLeft: '-1px',
                    transform: `rotate(${deg}deg) translateY(-2px)`
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Stars (only visible in dark mode) */}
        {isDark && (
          <>
            <div className="absolute w-0.5 h-0.5 rounded-full bg-white top-1.5 left-3 opacity-70"></div>
            <div className="absolute w-1 h-1 rounded-full bg-white top-3 left-5 opacity-90"></div>
            <div className="absolute w-0.5 h-0.5 rounded-full bg-white top-4 left-2 opacity-70"></div>
          </>
        )}

        {/* Clouds (only visible in light mode) */}
        {!isDark && (
          <>
            <div className="absolute w-4 h-1.5 rounded-full bg-white top-1.5 right-2 opacity-80"></div>
            <div className="absolute w-3 h-1 rounded-full bg-white top-3 right-4 opacity-70"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;

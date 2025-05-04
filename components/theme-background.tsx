"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function ThemeBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely check the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLightTheme = theme === 'light';

  return (
    <>
      {isLightTheme && (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          {/* Background image for light mode */}
          <div className="absolute inset-0 bg-black/5" /> {/* Subtle overlay for contrast */}
          <Image
            src="/background-white.jpg"
            alt="Background"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
            style={{
              filter: 'brightness(1.05) saturate(0.9)',
              opacity: 0.9
            }}
          />
          {/* Additional overlay gradient for better content contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/70" />
        </div>
      )}

      {!isLightTheme && (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          {/* Dark mode background - gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90" />
        </div>
      )}
    </>
  );
}

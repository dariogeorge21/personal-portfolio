"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Dynamically import the MouseTracker component with no SSR
const MouseTracker = dynamic(() => import('./mouse-tracker'), { ssr: false });

export default function MouseTrackerWrapper() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);

    // Check if the device is mobile or touch device
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(window.innerWidth <= 768 || isTouchDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Only render on client-side and on non-mobile devices
  if (!isMounted || isMobile) return null;

  // Adjust colors based on theme
  const isDarkTheme = theme === 'dark';

  const cursorColor = isDarkTheme
    ? "rgba(79, 172, 254, 0.15)"
    : "rgba(30, 64, 175, 0.15)"; // Darker blue for light mode for better visibility

  const cursorOpacity = isDarkTheme ? 0.6 : 0.4; // Slightly less opacity in light mode

  return (
    <MouseTracker
      size={40}
      color={cursorColor}
      opacity={cursorOpacity}
      blur={5}
      showDot={true}
      delay={0.03} // Faster response time
    />
  );
}

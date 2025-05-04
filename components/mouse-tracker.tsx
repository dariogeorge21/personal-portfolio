"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MouseTrackerProps {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  delay?: number;
  showDot?: boolean;
}

export default function MouseTracker({
  size = 40,
  color = "rgba(255, 255, 255, 0.3)",
  opacity = 0.5,
  blur = 0,
  delay = 0.1,
  showDot = true,
}: MouseTrackerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorSize, setCursorSize] = useState(size);

  useEffect(() => {
    // Add a class to the body to hide the default cursor
    document.body.classList.add('custom-cursor');

    // Add CSS to hide the default cursor
    const style = document.createElement('style');
    style.textContent = `
      .custom-cursor {
        cursor: none !important;
      }
      .custom-cursor * {
        cursor: none !important;
      }
      .custom-cursor a, .custom-cursor button, .custom-cursor [role="button"],
      .custom-cursor input, .custom-cursor select, .custom-cursor textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Hide cursor initially until mouse moves
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Use requestAnimationFrame for smoother performance
    let rafId: number;

    const updateMousePosition = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Schedule the update on the next animation frame
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });

        // Check if mouse is over interactive elements
        const target = e.target as HTMLElement;
        const isInteractive =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.closest('[role="button"]') !== null;

        setIsHovering(isInteractive);
      });
    };

    // Handle mouse clicks
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Only add one mousemove listener for better performance
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Hide when mouse leaves the window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      // Clean up
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.body.classList.remove('custom-cursor');
      document.head.removeChild(style);
      clearTimeout(timeout);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  // Update cursor size based on hover and click state
  useEffect(() => {
    if (isClicking) {
      setCursorSize(size * 0.8); // Smaller when clicking
    } else if (isHovering) {
      setCursorSize(size * 1.5); // Larger when hovering
    } else {
      setCursorSize(size); // Normal size
    }
  }, [isHovering, isClicking, size]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          left: 0,
          top: 0,
          width: cursorSize,
          height: cursorSize,
          opacity: isVisible ? opacity : 0,
          transform: `translate3d(${mousePosition.x - cursorSize / 2}px, ${mousePosition.y - cursorSize / 2}px, 0) scale(${isClicking ? 0.9 : 1})`,
          backgroundColor: isClicking
            ? "rgba(255, 100, 100, 0.2)"
            : isHovering
              ? "rgba(79, 172, 254, 0.2)"
              : color,
          borderColor: isClicking
            ? "rgba(255, 100, 100, 0.4)"
            : isHovering
              ? "rgba(79, 172, 254, 0.4)"
              : "rgba(255, 255, 255, 0.2)",
          transition: `transform ${delay * 0.5}s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease`,
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          border: "1px solid",
        }}
      />

      {/* Ripple effect on click - using CSS for better performance */}
      {isClicking && (
        <div
          className="absolute rounded-full animate-ripple"
          style={{
            left: mousePosition.x - 5,
            top: mousePosition.y - 5,
            width: '10px',
            height: '10px',
            border: "1px solid rgba(255, 100, 100, 0.5)",
          }}
        />
      )}

      {showDot && (
        <div
          className="absolute rounded-full"
          style={{
            left: 0,
            top: 0,
            width: isClicking ? 8 : isHovering ? 6 : 4,
            height: isClicking ? 8 : isHovering ? 6 : 4,
            opacity: isVisible ? 1 : 0,
            transform: `translate3d(${mousePosition.x - (isClicking ? 4 : isHovering ? 3 : 2)}px, ${mousePosition.y - (isClicking ? 4 : isHovering ? 3 : 2)}px, 0)`,
            backgroundColor: isClicking
              ? "rgba(255, 100, 100, 1)"
              : isHovering
                ? "rgba(79, 172, 254, 1)"
                : "white",
            transition: `transform ${delay * 0.2}s linear, background-color 0.3s ease, width 0.2s ease, height 0.2s ease, opacity 0.3s ease`,
          }}
        />
      )}
    </div>
  );
}

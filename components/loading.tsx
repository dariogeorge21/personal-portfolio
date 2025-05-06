"use client";

import { motion } from 'framer-motion';
import BackgroundParticles from '@/components/background-particles';

export default function Loading() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <BackgroundParticles />
      
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-4"
        >
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto animate-spin" />
        </motion.div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

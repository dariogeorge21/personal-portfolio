import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            filter: "blur(1px)",
            boxShadow: "0px 0px 20px 0px rgba(79, 172, 254, 0.5), 0px 0px 30px 0px rgba(79, 172, 254, 0.3)"
          }}
        />
        <div className="absolute inset-2 rounded-full bg-background" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p className="text-gradient font-medium">Loading...</p>
      </motion.div>
    </div>
  );
}

export default Loader;

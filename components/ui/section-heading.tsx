"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-8 sm:mb-10 md:mb-12 relative",
      centered && "text-center",
      className
    )}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-2 sm:mt-3 text-muted-foreground text-sm sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: centered ? '80px' : '60px', height: '3px' }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
        className={cn(
          "h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-purple-600 mt-3 sm:mt-4",
          centered ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
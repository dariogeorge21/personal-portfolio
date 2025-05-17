import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  glowAccent?: boolean;
}

export function GlassmorphicCard({
  children,
  className,
  glowAccent = false,
}: GlassmorphicCardProps) {
  return (
    <div className={cn(
      "glassmorphism rounded-lg sm:rounded-xl p-4 sm:p-6",
      glowAccent && "animate-glow",
      className
    )}>
      {children}
    </div>
  );
}
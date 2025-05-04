"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Education', path: '/education' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const linkVariants = {
    initial: { y: -4, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-50 rounded-2xl transition-all duration-300',
        scrolled 
          ? 'bg-background/60 backdrop-blur-xl border border-border/50 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="px-6 py-4 max-w-[1200px] mx-auto">
        <nav className="flex items-center justify-between h-[40px]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2 px-4 py-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Portfolio
              </span>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Link
                  href={link.path}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                    'min-w-[44px] min-h-[44px] flex items-center justify-center',
                    pathname === link.path
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  )}
                >
                  {link.name}
                  {pathname === link.path && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-[44px] h-[44px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="md:hidden overflow-hidden px-6 pb-4"
          >
            <motion.div 
              className="flex flex-col space-y-2"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.07,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="closed"
              animate="open"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  variants={{
                    closed: { x: -20, opacity: 0 },
                    open: { x: 0, opacity: 1 }
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg transition-colors',
                      'min-w-[44px] min-h-[44px] flex items-center',
                      pathname === link.path
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'hover:bg-primary/5 text-foreground'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
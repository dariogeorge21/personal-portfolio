"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Code, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const navLinks = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  { name: 'Education', path: '/education' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Experience', path: '/experience' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  const navVariants = {
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className="fixed z-50 top-[20px] left-[16px] right-[16px] rounded-xl navbar-blur max-w-6xl mx-auto left-0 right-0"
    >
      <div className="container mx-auto px-4 py-3 relative z-10 max-w-5xl">
        <nav className="flex items-center justify-between h-[40px]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Portfolio
              </span>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-1">
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
                    'px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                    'min-w-[44px] min-h-[44px] flex items-center justify-center',
                    pathname === link.path
                      ? 'text-primary font-semibold bg-primary/10 active-link'
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

            {/* Theme toggle button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-xl w-9 h-9 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && (
                    <motion.div
                      key={theme === 'dark' ? 'dark' : 'light'}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <Moon className="h-5 w-5 text-blue-700" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            {/* Theme toggle button for mobile */}
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-xl w-9 h-9 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && (
                    <motion.div
                      key={theme === 'dark' ? 'dark' : 'light'}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <Moon className="h-5 w-5 text-blue-700" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-[44px] h-[44px] rounded-xl"
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
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="lg:hidden overflow-hidden px-4 pb-4 navbar-blur mt-2 rounded-xl mx-[16px] fixed left-0 right-0 cyberpunk-menu"
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
              {navLinks.map((link) => (
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
                      'block px-4 py-3 rounded-xl transition-colors',
                      'min-w-[44px] min-h-[44px] flex items-center',
                      pathname === link.path
                        ? 'bg-primary/10 text-primary font-semibold active-link'
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


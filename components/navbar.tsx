"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, Code, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"


const navLinks = [
  { name: "Home", path: "/" },
  // { name: 'About', path: '/about' },
  { name: "Education", path: "/education" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Experience", path: "/experience" },
  { name: "Certificates", path: "/certificates" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const menuRef = useRef<HTMLDivElement>(null)

  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    // Close menu when pressing escape key
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const linkVariants = {
    initial: { y: -4, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  // Dynamic navbar styles based on theme
  const navbarStyle = {
    background: theme === "dark"
      ? "rgba(13, 6, 32, 0.9)"
      : "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderBottom: theme === "dark"
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: theme === "dark"
      ? "0 0 20px rgba(138, 75, 255, 0.2)"
      : "0 0 20px rgba(59, 130, 246, 0.2)",
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      className="fixed z-50 top-0 left-0 right-0 rounded-none sm:rounded-xl max-w-6xl mx-auto mt-2.5"
      style={navbarStyle}
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 relative z-10 max-w-5xl">
        <nav className="flex items-center justify-between h-[40px]">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
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
                    "px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                    "min-w-[44px] min-h-[44px] flex items-center justify-center",
                    pathname === link.path
                      ? "text-primary font-semibold bg-primary/10 active-link"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5",
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-xl w-9 h-9 flex items-center justify-center",
                  theme === "dark"
                    ? "hover:bg-primary/10 text-white"
                    : "hover:bg-primary/10 text-foreground"
                )}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && (
                    <motion.div
                      key={theme === "dark" ? "dark" : "light"}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {theme === "dark" ? (
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
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-xl w-9 h-9 flex items-center justify-center",
                  theme === "dark"
                    ? "text-white hover:bg-white/10"
                    : "text-foreground hover:bg-primary/10"
                )}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && (
                    <motion.div
                      key={theme === "dark" ? "dark" : "light"}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <Moon className="h-5 w-5 text-blue-400" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle Menu"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "relative w-[44px] h-[44px] rounded-xl",
                  theme === "dark"
                    ? "text-white hover:bg-white/10"
                    : "text-foreground hover:bg-primary/10"
                )}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "menu" : "menu"}
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
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[56px] z-40 navbar-blur rounded-b-xl max-h-[calc(100vh-56px)] overflow-y-auto"
            style={{
              background: theme === "dark"
                ? "rgba(0, 0, 0, 0.85)"
                : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              borderTop: theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="flex flex-col space-y-2 py-4 px-4"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl transition-colors",
                      "min-w-[44px] min-h-[44px] flex items-center",
                      "text-base font-medium",
                      pathname === link.path
                        ? "bg-primary/20 text-primary font-semibold"
                        : theme === "dark"
                          ? "hover:bg-primary/10 text-white"
                          : "hover:bg-primary/10 text-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Social links in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className={cn(
                  "mt-4 pt-4 border-t",
                  theme === "dark" ? "border-white/10" : "border-black/10"
                )}
              >
                <div className="flex justify-center space-x-6 py-2">
                  <Link
                    href="https://github.com/dariogeorge21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "hover:text-primary transition-all duration-300",
                      theme === "dark" ? "text-white/70" : "text-foreground/70"
                    )}
                    aria-label="GitHub"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/dariogeorge21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "hover:text-primary transition-all duration-300",
                      theme === "dark" ? "text-white/70" : "text-foreground/70"
                    )}
                    aria-label="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </Link>
                  <Link
                    href="mailto:edu.dariogeorge21@gmail.com"
                    className={cn(
                      "hover:text-primary transition-all duration-300",
                      theme === "dark" ? "text-white/70" : "text-foreground/70"
                    )}
                    aria-label="Email"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

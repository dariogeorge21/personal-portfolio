"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Linkedin, Mail, Download } from 'lucide-react';
import Link from 'next/link';
import BackgroundParticles from '@/components/background-particles';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  // Animation configuration
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="relative min-h-screen">
      <BackgroundParticles />

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 px-3 sm:px-4 min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-6xl">
          <div className="hero-glassmorphic p-10 sm:p-14 md:p-20 relative overflow-hidden">
            {/* Enhanced Decorative elements */}
            <div className="absolute -top-8 -right-8 w-28 sm:w-36 h-28 sm:h-36 bg-gradient-to-br from-blue-500/25 to-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-36 sm:w-44 h-36 sm:h-44 bg-gradient-to-tr from-pink-500/25 to-blue-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-500/15 to-teal-600/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Border gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl blur-xl"></div>

            <div className="relative z-10 text-center space-y-7 sm:space-y-8">
              {/* Enhanced Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="flex justify-center pt-2"
              >
                <div className="bg-gradient-to-r from-green-500/15 to-emerald-500/15 backdrop-blur-xl px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border border-green-500/40 shadow-2xl flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform duration-300">
                  <span className="relative">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse block"></span>
                    <span className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-green-300 tracking-wide">Available for Projects</span>
                </div>
              </motion.div>

              {/* Enhanced Main heading */}
              <div className="space-y-5 sm:space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                  className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
                >
                  <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                    Dario George
                  </span>
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hero-subtitle text-xl sm:text-2xl md:text-3xl font-semibold text-foreground/90"
                >
                  Full Stack Developer | Freelancer
                </motion.h2>

                <div className="space-y-4 max-w-4xl mx-auto">
                  

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30">
                      <span className="text-blue-400">📍</span>
                      <span>New Delhi, India</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/30">
                      <span className="text-green-400">🎓</span>
                      <span>BTech Computer Science</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.75 }}
                    className="bg-gradient-to-r from-background/40 to-background/20 backdrop-blur-lg rounded-2xl p-4 border border-border/30"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-purple-400">🌐</span>
                      <span className="text-sm font-medium text-foreground/70">Languages</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                      <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30">English (Fluent)</span>
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">Hindi (Native)</span>
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">Malayalam (Intermediate)</span>
                      <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-500/30">Tamil (Basic)</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-br from-background/30 to-background/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-border/40 shadow-xl"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-blue-400">⚡</span>
                  <span className="text-sm font-medium text-foreground/70">Tech Stack</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  <span className="hero-tech-badge bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-500/40 text-blue-300 hover:scale-105">Next.js</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-green-600/20 to-emerald-700/20 border-emerald-500/40 text-emerald-300 hover:scale-105">Supabase</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-cyan-600/20 to-cyan-700/20 border-cyan-500/40 text-cyan-300 hover:scale-105">React</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-blue-600/20 to-indigo-700/20 border-indigo-500/40 text-indigo-300 hover:scale-105">TypeScript</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500/40 text-green-300 hover:scale-105">Node.js</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-teal-600/20 to-teal-700/20 border-teal-500/40 text-teal-300 hover:scale-105">Tailwind CSS</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-slate-600/20 to-gray-700/20 border-slate-500/40 text-slate-300 hover:scale-105">Shadcn UI</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/40 text-purple-300 hover:scale-105">Vite</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-yellow-600/20 to-amber-700/20 border-yellow-500/40 text-yellow-300 hover:scale-105">JavaScript</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-violet-600/20 to-purple-700/20 border-violet-500/40 text-violet-300 hover:scale-105">Bootstrap</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-6"
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hero-button-glow text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 font-medium">
                  <Link href="/contact">
                    Hire Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="border-gradient hover-glow text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 font-medium" asChild>
                  <Link href="/projects">
                    View Projects
                  </Link>
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex justify-center gap-8 pt-8"
              >
                <Link href="https://github.com/dariogeorge21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 sm:h-7 sm:w-7">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </Link>
                <Link href="https://www.linkedin.com/in/dariogeorge21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
                  <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
                </Link>
                <Link href="mailto:edu.dariogeorge21@gmail.com" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110">
                  <Mail className="h-6 w-6 sm:h-7 sm:w-7" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" ref={ref}>
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2 variants={item} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              Services I Provide
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Comprehensive digital solutions tailored to bring your vision to life
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {servicesCards.map((card, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                custom={index}
                transition={{ delay: 0.1 * index }}
              >
                <GlassmorphicCard className="h-full flex flex-col p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                  <div className="text-primary mb-3 sm:mb-4">{card.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{card.title}</h3>
                  <p className="text-muted-foreground mb-3 sm:mb-4 flex-grow text-sm sm:text-base">{card.description}</p>
                  <Button variant="link" className="p-0 justify-start text-primary hover:text-primary/80 text-sm sm:text-base" asChild>
                    <Link href={card.link}>
                      Learn more <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Services cards data
const servicesCards = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern technologies like React, Next.js, and TypeScript for optimal performance.",
    link: "/projects",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
    )
  },
  {
    title: "Full Stack Solutions",
    description: "End-to-end development from database design to responsive frontend, ensuring seamless user experiences.",
    link: "/skills",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
    )
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing interfaces that enhance user engagement and satisfaction.",
    link: "/certificates",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
    )
  },
  {
    title: "API Development",
    description: "Robust and scalable RESTful APIs with proper authentication, security, and documentation.",
    link: "/skills",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>
    )
  },
  {
    title: "Database Management",
    description: "Efficient database architecture and optimization using PostgreSQL, Supabase, and modern ORMs.",
    link: "/skills",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>
    )
  },
  {
    title: "Deployment & DevOps",
    description: "Seamless deployment pipelines with Docker, CI/CD, and cloud platforms like Vercel and AWS.",
    link: "/certificates",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
    )
  }
];
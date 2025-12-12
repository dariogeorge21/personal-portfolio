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
        <div className="container mx-auto max-w-5xl">
          <div className="hero-glassmorphic p-8 sm:p-12 md:p-16 relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-tr from-pink-500/20 to-blue-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center space-y-8">
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="bg-green-500/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-500/30 shadow-lg flex items-center gap-2 sm:gap-3">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs sm:text-sm font-medium text-green-400">Available for Freelance Projects</span>
                </div>
              </motion.div>

              {/* Main heading */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="hero-title mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  <span className="text-gradient">Dario George</span>
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hero-subtitle mb-6 sm:mb-8 text-xl sm:text-2xl md:text-3xl"
                >
                  Full Stack Developer & Freelancer
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hero-description text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-2"
                >
                  Transforming ideas into powerful digital solutions. Specializing in modern web applications with cutting-edge technologies.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto mb-4"
                >
                  BTech Computer Science Student | St Joseph's College of Engineering and Technology
                </motion.p>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
                >
                  <span className="hero-tech-badge">TypeScript</span>
                  <span className="hero-tech-badge">React</span>
                  <span className="hero-tech-badge">Next.js</span>
                  <span className="hero-tech-badge">Node.js</span>
                  <span className="hero-tech-badge">Supabase</span>
                  <span className="hero-tech-badge">Tailwind CSS</span>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-6"
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hero-button-glow text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8">
                  <Link href="/contact">
                    Hire Me <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="border-gradient hover-glow text-base sm:text-lg h-11 sm:h-12 px-6 sm:px-8" asChild>
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
                className="flex justify-center gap-6 pt-4"
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
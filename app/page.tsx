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
        <div className="container mx-auto">
          <div className="hero-glassmorphic p-5 sm:p-8 md:p-12 relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-tr from-pink-500/20 to-blue-600/20 rounded-full blur-2xl"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
              {/* Left Content Column */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="hero-content space-y-8"
              >
                {/* Tech badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-wrap gap-1.5 sm:gap-2 mb-2"
                >
                  <span className="hero-tech-badge">TypeScript</span>
                  <span className="hero-tech-badge">React</span>
                  <span className="hero-tech-badge">NextJS</span>
                  <span className="hero-tech-badge">Python</span>
                </motion.div>

                {/* Main heading */}
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-title mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                  >
                    <span className="text-gradient">Dario George</span>
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hero-subtitle mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl"
                  >
                    Student, Frontend Developer
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="hero-description text-sm sm:text-base"
                  >
                    Exploring Full Stack Development | Learning DSA in Java | Computer Science Student at St Joseph's College of Engineering and Technology
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-wrap gap-3 sm:gap-4"
                >
                  <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hero-button-glow text-sm sm:text-base h-9 sm:h-10 px-3 sm:px-4">
                    <Link href="/contact">
                      Get in Touch <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </Button>

                  <Button variant="outline" className="border-gradient hover-glow text-sm sm:text-base h-9 sm:h-10 px-3 sm:px-4" asChild>
                    <Link href="/contact">
                      About Me
                    </Link>
                  </Button>

                  {/* <Button variant="ghost" className="hover-glow">
                    <Download className="mr-2 h-4 w-4" /> View Resume
                  </Button>

                  <Button variant="ghost" className="hover-glow">
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </Button> */}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex gap-4 mt-6"
                  >
                    <Link href="https://github.com/dariogeorge21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                    </Link>
                    <Link href="https://www.linkedin.com/in/dariogeorge21" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300">
                      <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                    <Link href="mailto:edu.dariogeorge21@gmail.com" className="text-muted-foreground hover:text-primary transition-all duration-300">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Right Image Column */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-image-container flex justify-center items-center relative mt-6 md:mt-0"
              >
                {/* Decorative code blocks */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="absolute -top-8 sm:-top-10 right-4 sm:right-10 bg-background/40 backdrop-blur-md p-2 sm:p-3 rounded-lg border border-border/30 shadow-lg text-[10px] sm:text-xs font-mono text-blue-400 transform rotate-3 z-10 hidden sm:block"
                >
                  const developer = new Developer();
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="absolute -bottom-6 sm:-bottom-8 left-4 sm:left-10 bg-background/40 backdrop-blur-md p-2 sm:p-3 rounded-lg border border-border/30 shadow-lg text-[10px] sm:text-xs font-mono text-purple-400 transform -rotate-2 z-10 hidden sm:block"
                >
                  await skills.improve();
                </motion.div>

                {/* Glow effect */}
                <div className="hero-image-glow"></div>

                {/* Profile image */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
                  <div className="hero-image-frame w-full h-full">
                    <Image
                      src="/profile-image.jpg"
                      alt="Dario George"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                    />
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="absolute -bottom-4 right-0 bg-background/60 backdrop-blur-md px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-border/30 shadow-lg flex items-center gap-1 sm:gap-2"
                >
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] sm:text-xs font-medium">Available for projects</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" ref={ref}>
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2 variants={item} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              Skills Overview
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              A glimpse into my technical expertise and professional capabilities
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredCards.map((card, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                custom={index}
                transition={{ delay: 0.1 * index }}
              >
                <GlassmorphicCard className="h-full flex flex-col p-4 sm:p-6">
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

// Featured cards data
const featuredCards = [
  {
    title: "Technical Skills",
    description: "Expertise in modern web technologies, frameworks, and tools for building robust applications.",
    link: "/skills",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
    )
  },
  {
    title: "Work Experience",
    description: "Professional journey across various roles and organizations, showcasing practical expertise.",
    link: "/experience",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
    )
  },
  {
    title: "Education & Certifications",
    description: "Academic qualifications and professional certifications that form the foundation of my expertise.",
    link: "/education",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
    )
  }
];
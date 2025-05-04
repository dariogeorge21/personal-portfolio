"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
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
      <section className="pt-36 pb-24 px-4 min-h-screen flex items-center justify-center">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              >
                <span className="text-gradient animate-glow">Hi, I'm John Doe</span>
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6"
              >
                Full Stack Developer
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-muted-foreground max-w-md"
              >
                I build exceptional digital experiences with modern technologies. Specializing in creating innovative solutions that deliver real business value.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" className="border-gradient hover-glow" asChild>
                <Link href="/about">
                  About Me
                </Link>
              </Button>
              
              <Button variant="ghost" className="hover-glow">
                <Download className="mr-2 h-4 w-4" /> Resume
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-4 mt-6"
            >
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all duration-300">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-all duration-300">
                <Mail className="h-6 w-6" />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <GlassmorphicCard className="relative w-full max-w-md" glowAccent>
              <div className="rounded-xl overflow-hidden aspect-square relative">
                <Image
                  src="https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="py-24 px-4" ref={ref}>
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Skills Overview
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse into my technical expertise and professional capabilities
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCards.map((card, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                custom={index}
                transition={{ delay: 0.1 * index }}
              >
                <GlassmorphicCard className="h-full flex flex-col">
                  <div className="text-primary mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{card.description}</p>
                  <Button variant="link" className="p-0 justify-start text-primary hover:text-primary/80" asChild>
                    <Link href={card.link}>
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
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
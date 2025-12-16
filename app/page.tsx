"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Linkedin, Mail, Download, Calendar, MapPin, Briefcase, Award, Code, ExternalLink, Github, Globe, Layers, Send, Phone, Clock, CheckCircle, Star, Zap, MessageCircle, Users, Rocket, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import BackgroundParticles from '@/components/background-particles';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { useInView } from 'react-intersection-observer';
import { SectionHeading } from '@/components/ui/section-heading';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

// Form schema for contact form
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        toast.error(result.error || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
    <div className="relative min-h-screen scroll-smooth">
      <BackgroundParticles />

      {/* Floating Portfolio Button - Quick Navigation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 hidden sm:block"
      >
        <Link href="#projects">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/25 rounded-full px-6 py-6 group"
          >
            <Code className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">My Work</span>
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section - Enhanced */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-3 sm:px-4 min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto max-w-6xl">
          <div className="hero-glassmorphic p-8 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden">
            {/* Enhanced Decorative elements */}
            <div className="absolute -top-8 -right-8 w-28 sm:w-36 h-28 sm:h-36 bg-gradient-to-br from-blue-500/25 to-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-36 sm:w-44 h-36 sm:h-44 bg-gradient-to-tr from-pink-500/25 to-blue-600/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-500/15 to-teal-600/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Border gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl blur-xl"></div>

            <div className="relative z-10 text-center space-y-6 sm:space-y-8">
              {/* Enhanced Availability Badge - More Prominent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="flex justify-center pt-2"
              >
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-green-500/50 shadow-2xl shadow-green-500/20 flex items-center gap-3 sm:gap-4 hover:scale-105 hover:border-green-400/60 transition-all duration-300 cursor-pointer group">
                  <span className="relative">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse block"></span>
                    <span className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
                  </span>
                  <span className="text-sm sm:text-base font-bold text-green-300 tracking-wide">
                    🚀 Available for Opportunities
                  </span>
                  <ArrowRight className="h-4 w-4 text-green-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Enhanced Main heading */}
              <div className="space-y-4 sm:space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-muted-foreground text-sm sm:text-base tracking-widest uppercase font-medium"
                >
                  Hello, I'm
                </motion.p>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                  className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
                >
                  <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Dario George
                  </span>
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hero-subtitle text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/90"
                >
                  Full Stack Developer & Creative Problem Solver
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                  I craft modern, scalable web applications with clean code and exceptional user experiences. 
                  <span className="text-primary font-medium"> Passionate about turning ideas into digital reality.</span>
                </motion.p>

                <div className="space-y-4 max-w-4xl mx-auto pt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground"
                  >
                    <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/40 hover:border-primary/40 transition-colors">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>New Delhi, India</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/40 hover:border-primary/40 transition-colors">
                      <Award className="w-4 h-4 text-green-400" />
                      <span>BTech CS Student</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm px-4 py-2 rounded-full border border-border/40 hover:border-primary/40 transition-colors">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span>Quick Response</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-background/40 to-background/20 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-border/40 shadow-xl"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm sm:text-base font-semibold text-foreground/80">Tech Stack I Work With</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  <span className="hero-tech-badge bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-500/40 text-blue-300 hover:scale-105 hover:border-blue-400/60 transition-all">Next.js</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-green-600/20 to-emerald-700/20 border-emerald-500/40 text-emerald-300 hover:scale-105 hover:border-emerald-400/60 transition-all">Supabase</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-cyan-600/20 to-cyan-700/20 border-cyan-500/40 text-cyan-300 hover:scale-105 hover:border-cyan-400/60 transition-all">React</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-blue-600/20 to-indigo-700/20 border-indigo-500/40 text-indigo-300 hover:scale-105 hover:border-indigo-400/60 transition-all">TypeScript</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-green-600/20 to-green-700/20 border-green-500/40 text-green-300 hover:scale-105 hover:border-green-400/60 transition-all">Node.js</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-teal-600/20 to-teal-700/20 border-teal-500/40 text-teal-300 hover:scale-105 hover:border-teal-400/60 transition-all">Tailwind CSS</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/40 text-purple-300 hover:scale-105 hover:border-purple-400/60 transition-all">Python</span>
                  <span className="hero-tech-badge bg-gradient-to-r from-yellow-600/20 to-amber-700/20 border-yellow-500/40 text-yellow-300 hover:scale-105 hover:border-yellow-400/60 transition-all">JavaScript</span>
                </div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4"
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hero-button-glow text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 font-semibold shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all group">
                  <Link href="#projects">
                    <Code className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Explore My Projects
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="border-2 border-gradient hover-glow text-base sm:text-lg h-12 sm:h-14 px-8 sm:px-10 font-semibold group" asChild>
                  <Link href="#skills">
                    <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    View Skills
                  </Link>
                </Button>

                <Button variant="ghost" size="lg" className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 font-medium hover:bg-primary/10 group" asChild>
                  <Link href="/RESUME DARIO-GEORGE.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Download Resume
                  </Link>
                </Button>
              </motion.div>

              {/* Social Links - Enhanced */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex justify-center gap-4 pt-6"
              >
                <Link href="https://github.com/dariogeorge21" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="https://www.linkedin.com/in/dariogeorge21" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="mailto:edu.dariogeorge21@gmail.com" className="p-3 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group">
                  <Mail className="h-6 w-6" />
                </Link>
                <Link href="tel:+917838403506" className="p-3 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110 group">
                  <Phone className="h-6 w-6" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <Link href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About Me / Portfolio Overview Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative" id="about">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="p-8 sm:p-10 md:p-12 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-10 sm:mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-blue-500/15 px-4 py-2 rounded-full border border-blue-500/30 mb-6"
                  >
                    <Users className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 font-semibold text-sm sm:text-base">About Me</span>
                  </motion.div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
                    Turning Ideas Into Digital Reality
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                    I'm a passionate Computer Science student and developer who loves creating innovative solutions and learning new technologies.
                  </p>
                </div>

                {/* My Expertise Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/40 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Full Stack Development</h3>
                    <p className="text-sm text-muted-foreground mb-4">Building complete web applications from frontend to backend with modern technologies.</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> React & Next.js</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Node.js & APIs</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Database Design</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/40 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Code className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Programming Languages</h3>
                    <p className="text-sm text-muted-foreground mb-4">Proficient in multiple programming languages for diverse project requirements.</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> JavaScript & TypeScript</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Python & C++</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Java & MySQL</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:border-green-400/40 transition-all group md:col-span-2 lg:col-span-1"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Continuous Learning</h3>
                    <p className="text-sm text-muted-foreground mb-4">Always exploring new technologies and improving skills through hands-on projects.</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> AI Integration</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Modern Frameworks</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Best Practices</li>
                    </ul>
                  </motion.div>
                </div>

                {/* Portfolio Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="text-center p-4 rounded-lg bg-background/30">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{featuredProjects.length + otherProjects.length}+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Projects Built</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/30">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">15+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Technologies</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/30">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">2+</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Years Learning</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/30">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">∞</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Passion</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-base sm:text-lg px-8 sm:px-10 h-12 sm:h-14 font-semibold shadow-xl hover:shadow-blue-500/25 transition-all group" 
                    asChild
                  >
                    <Link href="#projects">
                      <Code className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      View My Projects
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 text-base sm:text-lg px-8 sm:px-10 h-12 sm:h-14 font-semibold group" 
                    asChild
                  >
                    <Link href="#skills">
                      <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Explore Skills
                    </Link>
                  </Button>
                </div>

                {/* Portfolio Navigation */}
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Computer Science Student • Full Stack Developer • Open to Opportunities
                  </p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
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
              What I Do
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              My expertise spans across various areas of software development and technology
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

      {/* Experience Preview Section - Enhanced */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative overflow-hidden" id="experience">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/10 to-indigo-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 mb-4">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium text-sm">Professional Journey</span>
            </motion.div>
            <motion.h2 variants={item} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
              Work Experience
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Building real-world solutions and gaining hands-on expertise
            </motion.p>
          </motion.div>

          {/* Enhanced Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Timeline connector line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block rounded-full"></div>
            
            <GlassmorphicCard className="relative p-0 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">
              {/* Card gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-6 sm:p-8 md:p-10 relative z-10">
                {/* Timeline dot */}
                <div className="absolute left-4 top-8 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-lg shadow-blue-500/30 hidden md:flex">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                
                <div className="md:ml-16">
                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
                          {experiences[0].position}
                        </h3>
                      </motion.div>
                      <div className="flex items-center gap-2 text-lg text-foreground/80 font-medium mb-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        {experiences[0].company}
                      </div>
                      
                      {/* Info badges */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 text-sm text-blue-300 group-hover:bg-blue-500/20 transition-colors">
                          <Calendar className="w-4 h-4" />
                          <span>{experiences[0].period}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-purple-500/10 px-3 py-1.5 rounded-full border border-purple-500/20 text-sm text-purple-300 group-hover:bg-purple-500/20 transition-colors">
                          <MapPin className="w-4 h-4" />
                          <span>{experiences[0].location}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="hidden sm:block">
                      <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                        <span className="text-green-400 text-sm font-semibold">Current Role</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description with quote styling */}
                  <div className="relative mb-8">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed pl-4 italic">
                      "{experiences[0].description}"
                    </p>
                  </div>

                  {/* Key Responsibilities with animation */}
                  {experiences[0].responsibilities && (
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground/80 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        Key Responsibilities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {experiences[0].responsibilities.map((responsibility, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            whileHover={{ x: 5 }}
                            className="flex items-start gap-2 text-sm text-muted-foreground p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{responsibility}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies with hover effects */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-foreground/80 mb-4 flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-400" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.slice(0, 10).map((tech, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * index, duration: 0.3 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {technologies.length > 10 && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-muted/50 text-muted-foreground border border-border/50">
                          +{technologies.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all group/btn" 
                      size="lg"
                      asChild
                    >
                      <Link href="/experience">
                        View Full Experience 
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Education Preview Section - Enhanced */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative overflow-hidden" id="education">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-teal-500/10 to-green-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20 mb-4">
              <Award className="w-4 h-4 text-green-400" />
              <span className="text-green-300 font-medium text-sm">Academic Background</span>
            </motion.div>
            <motion.h2 variants={item} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
              Education
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Building a strong foundation through continuous learning
            </motion.p>
          </motion.div>

          {/* Enhanced Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="relative p-0 overflow-hidden hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 group">
              {/* Decorative header bar */}
              <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
              
              <div className="p-6 sm:p-8 md:p-10">
                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left section - Education details */}
                  <div className="lg:col-span-2">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        <motion.h3
                          whileHover={{ scale: 1.01 }}
                          className="text-2xl sm:text-3xl font-bold text-gradient mb-2"
                        >
                          {educationData[0].degree}
                        </motion.h3>
                        <div className="flex items-center gap-2 text-lg text-foreground/80 font-medium mb-3">
                          <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                            🎓
                          </span>
                          {educationData[0].institution}
                        </div>
                        
                        {/* Info badges */}
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 text-sm text-green-300">
                            <Calendar className="w-4 h-4" />
                            <span>{educationData[0].period}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-teal-500/10 px-3 py-1.5 rounded-full border border-teal-500/20 text-sm text-teal-300">
                            <MapPin className="w-4 h-4" />
                            <span>{educationData[0].location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Current Status Badge */}
                      <div className="hidden sm:block">
                        <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 animate-pulse">
                          <span className="text-green-400 text-sm font-semibold">📚 Currently Enrolled</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="relative mb-8 p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-transparent border-l-4 border-green-500">
                      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                        {educationData[0].description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all group/btn" 
                        size="lg"
                        asChild
                      >
                        <Link href="/education">
                          View Complete Education History 
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Right section - Achievements showcase */}
                  <div className="lg:col-span-1">
                    <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
                      <h4 className="text-sm font-semibold text-foreground/80 mb-5 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        Key Achievements
                      </h4>
                      
                      <div className="space-y-4">
                        {achievements.slice(0, 4).map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * index, duration: 0.4 }}
                            whileHover={{ x: -5, scale: 1.02 }}
                            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-green-500/30 transition-all cursor-default group/ach"
                          >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center flex-shrink-0 group-hover/ach:scale-110 transition-transform">
                              <Award className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm text-foreground group-hover/ach:text-green-300 transition-colors line-clamp-2">
                                {achievement.title}
                              </h5>
                              <p className="text-xs text-muted-foreground mt-1">{achievement.year}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Skills Preview Section - Enhanced */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4 relative overflow-hidden" id="skills">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-4">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-medium text-sm">Technical Expertise</span>
            </motion.div>
            <motion.h2 variants={item} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
              My Skills
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              A comprehensive toolkit spanning frontend, backend, and beyond
            </motion.p>
          </motion.div>

          {/* Skills Overview Grid - Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
            {/* Frontend Skills Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <GlassmorphicCard className="p-6 text-center h-full relative overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center border border-blue-500/30 shadow-lg group-hover:shadow-blue-500/30 transition-all duration-500"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Code className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">Frontend</h3>
                  
                  {/* Skill count with animated ring */}
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-500/20" />
                      <motion.circle 
                        cx="32" cy="32" r="28" fill="none" stroke="url(#blueGradient)" strokeWidth="4" strokeLinecap="round"
                        initial={{ strokeDasharray: "0 176" }}
                        whileInView={{ strokeDasharray: "140 176" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                      <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-400">
                      {frontendSkills.length}+
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">Technologies</p>
                  
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {frontendSkills.slice(0, 4).map((skill, i) => (
                      <motion.span 
                        key={i} 
                        className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default"
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      +{frontendSkills.length - 4}
                    </span>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Backend Skills Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <GlassmorphicCard className="p-6 text-center h-full relative overflow-hidden hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center border border-green-500/30 shadow-lg group-hover:shadow-green-500/30 transition-all duration-500"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Layers className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-300 transition-colors">Backend</h3>
                  
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-green-500/20" />
                      <motion.circle 
                        cx="32" cy="32" r="28" fill="none" stroke="url(#greenGradient)" strokeWidth="4" strokeLinecap="round"
                        initial={{ strokeDasharray: "0 176" }}
                        whileInView={{ strokeDasharray: "130 176" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      <defs>
                        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-green-400">
                      {backendSkills.length}+
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">Technologies</p>
                  
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {backendSkills.slice(0, 4).map((skill, i) => (
                      <motion.span 
                        key={i} 
                        className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20 hover:bg-green-500/20 transition-colors cursor-default"
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      +{backendSkills.length - 4}
                    </span>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Tools & DevOps Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <GlassmorphicCard className="p-6 text-center h-full relative overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center border border-purple-500/30 shadow-lg group-hover:shadow-purple-500/30 transition-all duration-500"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Globe className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Tools & DevOps</h3>
                  
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-purple-500/20" />
                      <motion.circle 
                        cx="32" cy="32" r="28" fill="none" stroke="url(#purpleGradient)" strokeWidth="4" strokeLinecap="round"
                        initial={{ strokeDasharray: "0 176" }}
                        whileInView={{ strokeDasharray: "120 176" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                      <defs>
                        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-purple-400">
                      {toolsSkills.length}+
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">Tools</p>
                  
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {toolsSkills.slice(0, 4).map((skill, i) => (
                      <motion.span 
                        key={i} 
                        className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-default"
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      +{toolsSkills.length - 4}
                    </span>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Other Skills Card */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <GlassmorphicCard className="p-6 text-center h-full relative overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center border border-orange-500/30 shadow-lg group-hover:shadow-orange-500/30 transition-all duration-500"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Award className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-300 transition-colors">Other Skills</h3>
                  
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-orange-500/20" />
                      <motion.circle 
                        cx="32" cy="32" r="28" fill="none" stroke="url(#orangeGradient)" strokeWidth="4" strokeLinecap="round"
                        initial={{ strokeDasharray: "0 176" }}
                        whileInView={{ strokeDasharray: "110 176" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-orange-400">
                      {otherSkills.length}+
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">Abilities</p>
                  
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {otherSkills.slice(0, 4).map((skill, i) => (
                      <motion.span 
                        key={i} 
                        className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/20 hover:bg-orange-500/20 transition-colors cursor-default"
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      +{otherSkills.length - 4}
                    </span>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>

          {/* Total Skills Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <GlassmorphicCard className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-bold mb-2">Total Technical Proficiency</h4>
                  <p className="text-sm text-muted-foreground">Combined expertise across {frontendSkills.length + backendSkills.length + toolsSkills.length + otherSkills.length}+ technologies and skills</p>
                </div>
                
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-muted-foreground">Frontend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-muted-foreground">Backend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm text-muted-foreground">Tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-muted-foreground">Other</span>
                  </div>
                </div>
              </div>
              
              {/* Progress bar visualization */}
              <div className="mt-6 h-3 rounded-full bg-muted/30 overflow-hidden flex">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(frontendSkills.length / (frontendSkills.length + backendSkills.length + toolsSkills.length + otherSkills.length)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(backendSkills.length / (frontendSkills.length + backendSkills.length + toolsSkills.length + otherSkills.length)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(toolsSkills.length / (frontendSkills.length + backendSkills.length + toolsSkills.length + otherSkills.length)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(otherSkills.length / (frontendSkills.length + backendSkills.length + toolsSkills.length + otherSkills.length)) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all group/btn px-8" 
                asChild
              >
                <Link href="/skills">
                  <Zap className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                  Explore All Skills & Expertise 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section - Enhanced */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" id="projects">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Portfolio Showcase</span>
            </motion.div>
            <motion.h2 variants={item} className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-6">
              Featured Projects
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              A showcase of my best technical projects demonstrating full-stack expertise and creative problem-solving
            </motion.p>
          </motion.div>

          {/* Featured Projects Grid - Enhanced Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-12">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <GlassmorphicCard className="h-full flex flex-col overflow-hidden p-0 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  {/* Project Image with Overlay */}
                  <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                        <Star className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary text-sm">
                      {project.category}
                    </Badge>
                    
                    {/* Quick Action Buttons - Visible on Hover */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.liveUrl && project.liveUrl !== "/" && (
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-white/90 hover:bg-white text-black shadow-lg">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className="bg-black/80 hover:bg-black text-white border-0 shadow-lg">
                            <Github className="w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{project.date}</span>
                    </div>
                    
                    <p className="text-sm sm:text-base text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    {project.keyFeatures && project.keyFeatures.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {project.keyFeatures.slice(0, 3).map((feature, i) => (
                            <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {project.liveUrl && project.liveUrl !== "/" && (
                          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all" asChild>
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" className="flex-1 border-2 hover:bg-primary/5" asChild>
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              Source Code <Github className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          {/* Other Projects Preview - Enhanced Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">More Projects</h3>
                  <p className="text-muted-foreground text-sm">
                    Explore {otherProjects.length}+ additional projects across web apps, Python tools, and more
                  </p>
                </div>
                <Button 
                  variant="outline"
                  className="border-2 group whitespace-nowrap" 
                  asChild
                >
                  <Link href="/projects">
                    View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {otherProjects.slice(0, 8).map((project, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-background/60 to-background/30 border border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
                  >
                    <h4 className="font-medium text-sm mb-2 line-clamp-1 group-hover:text-primary transition-colors">{project.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{project.category}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all" 
                  asChild
                >
                  <Link href="/projects">
                    <Code className="mr-2 h-5 w-5" />
                    View Complete Portfolio ({featuredProjects.length + otherProjects.length} Projects)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" id="contact">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="p-8 sm:p-12 md:p-16 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-pink-500/20 to-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 bg-blue-500/15 px-4 py-2 rounded-full border border-blue-500/30 mb-6"
                  >
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 font-semibold text-sm sm:text-base">Get In Touch</span>
                  </motion.div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4">
                    Let's Connect
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Interested in my work or want to collaborate? I'd love to hear from you and discuss how we can create something amazing together.
                  </p>
                </div>

                {/* Contact Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/40 transition-all group text-center"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Mail className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Email Me</h3>
                    <p className="text-sm text-muted-foreground mb-4">Best for collaboration opportunities</p>
                    <a href="mailto:edu.dariogeorge21@gmail.com" className="text-sm text-primary hover:underline break-all">
                      edu.dariogeorge21@gmail.com
                    </a>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:border-green-400/40 transition-all group text-center"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Phone className="w-7 h-7 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Call Me</h3>
                    <p className="text-sm text-muted-foreground mb-4">For direct conversations</p>
                    <a href="tel:+917838403506" className="text-sm text-primary hover:underline">
                      +91 7838403506
                    </a>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/40 transition-all group text-center"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Connect on LinkedIn</h3>
                    <p className="text-sm text-muted-foreground mb-4">For professional networking</p>
                    <Link href="https://www.linkedin.com/in/dariogeorge21" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                      linkedin.com/in/dariogeorge21
                    </Link>
                  </motion.div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-base sm:text-lg px-10 sm:px-12 h-14 sm:h-16 font-semibold shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all group" 
                    asChild
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Get In Touch
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>

                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 text-base sm:text-lg px-8 sm:px-10 h-14 sm:h-16 font-semibold group" 
                    asChild
                  >
                    <Link href="/RESUME DARIO-GEORGE.pdf" target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Download Resume
                    </Link>
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mb-8">
                  <Link
                    href="https://github.com/dariogeorge21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/dariogeorge21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link
                    href="mailto:edu.dariogeorge21@gmail.com"
                    className="p-4 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    aria-label="Email"
                  >
                    <Mail className="h-6 w-6" />
                  </Link>
                  <Link
                    href="tel:+917838403506"
                    className="p-4 rounded-full bg-background/30 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    aria-label="Phone"
                  >
                    <Phone className="h-6 w-6" />
                  </Link>
                </div>

                {/* Portfolio Quick Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-muted-foreground">Available for opportunities</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-muted-foreground">Quick to respond</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-muted-foreground">Remote ready</span>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Helper Components

// Experience Timeline Component
interface Experience {
  position: string;
  company: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  achievements?: string[];
}

function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-px bg-gradient-to-b from-blue-400 to-purple-600 z-0 hidden md:block" />

      {experiences.map((experience, index) => {
        const { ref, inView } = useInView({
          triggerOnce: true,
          threshold: 0.1
        });

        const isEven = index % 2 === 0;

        return (
          <div key={index} ref={ref} className="mb-8 sm:mb-10 md:mb-12 relative z-10">
            <div className="md:hidden absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-purple-600" />

            <div className="flex items-start">
              {/* Timeline dot */}
              <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-1.5 md:mt-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 shadow-glow z-20"
                />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`ml-6 sm:ml-8 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-6 lg:pr-12' : 'md:pl-6 lg:pl-12 md:ml-auto'}`}
              >
                <GlassmorphicCard className="p-4 sm:p-6">
                  <div className="md:flex justify-between mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gradient">{experience.position}</h3>
                      <p className="text-base sm:text-lg">{experience.company}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <div className="flex items-center md:justify-end text-muted-foreground text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center md:justify-end text-muted-foreground mt-1 text-xs sm:text-sm">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">{experience.description}</p>

                  <div className="mb-3 sm:mb-4">
                    <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Key Responsibilities:</h4>
                    <ul className="list-disc pl-4 sm:pl-5 text-muted-foreground space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>

                  {experience.achievements && (
                    <div>
                      <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Achievements:</h4>
                      <ul className="list-disc pl-4 sm:pl-5 text-muted-foreground space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
                        {experience.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </GlassmorphicCard>
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Education Card Component
interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
}

function EducationCard({ education, index }: { education: Education; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <GlassmorphicCard className="p-4 sm:p-6">
        <div className="md:flex justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gradient">{education.degree}</h3>
            <p className="text-lg">{education.institution}</p>
          </div>
          <div className="mt-2 md:mt-0 md:text-right">
            <div className="flex items-center md:justify-end text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{education.period}</span>
            </div>
            <div className="flex items-center md:justify-end text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{education.location}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 text-sm">{education.description}</p>

        {education.achievements && (
          <div>
            <h4 className="font-medium mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-sm">
              {education.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </GlassmorphicCard>
    </motion.div>
  );
}

// Skill Card Component
interface Skill {
  name: string;
  level: number;
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <GlassmorphicCard className="p-3 sm:p-4 md:p-5">
        <div className="flex justify-between items-center mb-2 sm:mb-3 md:mb-4">
          <h3 className="font-medium text-sm sm:text-base">{skill.name}</h3>
          <span className="text-muted-foreground text-xs sm:text-sm">{skill.level}%</span>
        </div>
        <Progress value={skill.level} className="h-1.5 sm:h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-600" />
      </GlassmorphicCard>
    </motion.div>
  );
}

// Project Card Components
interface Project {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: string;
  keyFeatures?: string[];
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <GlassmorphicCard className="h-full flex flex-col overflow-hidden p-4 sm:p-6">
        <div className="relative w-full h-48 sm:h-56 md:h-64 mb-4 sm:mb-6 overflow-hidden rounded-md">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary/80 hover:bg-primary text-[10px] sm:text-xs">{project.category}</Badge>
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">{project.title}</h3>
              <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>{project.date}</span>
              </div>
            </div>
            <div className="flex space-x-1 sm:space-x-2">
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Button variant="outline" size="icon" className="rounded-full h-7 w-7 sm:h-8 sm:w-8">
                    <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              )}
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <Button variant="outline" size="icon" className="rounded-full h-7 w-7 sm:h-8 sm:w-8">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{project.description}</p>

          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-4 sm:mb-6">
              <h4 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Key Features</h4>
              <ul className="list-disc pl-4 sm:pl-5 text-xs sm:text-sm text-muted-foreground space-y-0.5 sm:space-y-1">
                {project.keyFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4">
          {project.liveUrl && (
            <Button className="flex-1 text-xs sm:text-sm h-8 sm:h-10" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" className="flex-1 border-gradient text-xs sm:text-sm h-8 sm:h-10" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                View Code <Code className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          )}
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
    >
      <GlassmorphicCard className="h-full flex flex-col overflow-hidden p-4 sm:p-6">
        <div className="relative w-full h-40 sm:h-44 md:h-48 mb-3 sm:mb-4 overflow-hidden rounded-md">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-primary/80 hover:bg-primary text-[10px] sm:text-xs">{project.category}</Badge>
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
            <div className="flex space-x-1">
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7">
                    <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              )}
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
            <span>{project.date}</span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-3">{project.description}</p>

          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 sm:gap-2">
          {project.liveUrl && (
            <Button size="sm" variant="outline" className="flex-1 text-[10px] sm:text-xs h-7 sm:h-8" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button size="sm" variant="outline" className="flex-1 text-[10px] sm:text-xs h-7 sm:h-8" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                View Code
              </Link>
            </Button>
          )}
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
}

// Data Arrays

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

// Experience Data
const experiences: Experience[] = [
  {
    position: "Freelance Developer",
    company: "FreeLance",
    location: "Online",
    period: "July 2025 - Present",
    description: "I started freelancing as a frontend developer to gain hands-on experience in building web applications. ",
    responsibilities: [
      "Complete a project for a client within the given deadline",
      "Collaborate with product managers and designers to refine product requirements and user experience"
    ],
    achievements: [
      "Learned to complete tasks within a given deadline",
      "Learned about new technologies and frameworks like React, Next.js, and TypeScript",
      "Gained experience in working with clients and managing their expectations"
    ]
  },
];

const technologies = [
  "JavaScript", "TypeScript", "React", "Next.js", "Vite",
  "Node.js", "API", "MongoDB", "MySQL", "Supabase", "MySQL",
  "Arch Linux", "Augment Code", "VS Code", "Git", "Github", "HTML",
  "CSS/SCSS", "Tailwind CSS", "Material UI", "Figma", "Webpack"
];

// Education Data
const educationData: Education[] = [
  {
    degree: "BTech in Computer Science and Engineering",
    institution: "St Joseph's College of Engineering and Technology",
    location: "Palai, Kottayam, Kerala",
    period: "2024 - Present",
    description: "Currently in the second semester (S4) of Computer Science and Engineering program, focusing on building a strong foundation in programming, data structures, and algorithms.",
    achievements: [
      "Current GPA: 8.5",
      "Actively learning web development technologies",
      "Exploring Data Structures and Algorithms in C++"
    ]
  },
  {
    degree: "12th (Pre-degree)",
    institution: "St Mary's Central School",
    location: "Idukki, Kerala",
    period: "July 2022 - April 2024",
    description: "Completed higher secondary education with a focus on Mathematics and Computer Science, developing a strong foundation in logical thinking and problem-solving skills.",
    achievements: [
      "Achieved 87.8% in final examinations",
      "Specialized in Mathematics and Computer Science",
      "Participated in school-level programming competitions"
    ]
  },
  {
    degree: "10th (SSLC)",
    institution: "St Columba's School",
    location: "New Delhi",
    period: "April 2011 - May 2022",
    description: "Completed secondary education with a well-rounded curriculum covering all major subjects, developing a strong academic foundation.",
    achievements: [
      "Achieved 72.8% in final examinations",
      "Participated in various extracurricular activities",
      "Developed initial interest in computers and technology"
    ]
  }
];

const achievements = [
  {
    title: "Strong Academic Performance",
    description: "Maintaining a GPA of 8.5 in BTech Computer Science and Engineering program.",
    year: "2025"
  },
  {
    title: "Higher Secondary Achievement",
    description: "Scored 87.8% in 12th grade with specialization in Mathematics and Computer Science.",
    year: "2024"
  },
  {
    title: "Multilingual Proficiency",
    description: "Proficient in four languages: English, Malayalam, Hindi, and Tamil, enabling effective communication across diverse environments.",
    year: "2021-Present"
  },
  {
    title: "Self-Taught Programming",
    description: "Independently learned multiple programming languages and web development technologies.",
    year: "2022-Present"
  },
  {
    title: "Frontend Development Projects",
    description: "Created personal projects to practice and demonstrate skills in HTML, CSS, JavaScript, and TypeScript.",
    year: "2024-Present"
  },
  {
    title: "Computer Hardware Knowledge",
    description: "Developed comprehensive understanding of computer hardware components and troubleshooting techniques.",
    year: "2020-2022"
  }
];

// Skills Data
const frontendSkills: Skill[] = [
  { name: "HTML", level: 98 },
  { name: "CSS", level: 98 },
  { name: "JavaScript", level: 85 },
  { name: "TypeScript", level: 90 },
  { name: "NextJS", level: 95 },
  { name: "Responsive Design", level: 85 },
  { name: "UI Fundamentals", level: 90 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Frontend Basics", level: 99 },
  { name: "React", level: 90 },
  { name: "Swing", level: 90 },
  { name: "JavaFX", level: 90 },
  { name: "Rust", level: 70 },
];

const backendSkills: Skill[] = [
  { name: "Python", level: 95 },
  { name: "C Programming", level: 90 },
  { name: "C++", level: 95 },
  { name: "MySQL", level: 95 },
  { name: "Java", level: 90 },
  { name: "DSA Fundamentals", level: 70 },
  { name: "Backend Basics", level: 75 },
  { name: "Database Concepts", level: 80 },
  { name: "API Fundamentals", level: 90 },
  { name: "NodeJS", level: 90 },
  { name: "Supabase", level: 90 },
];

const toolsSkills: Skill[] = [
  { name: "Git", level: 100 },
  { name: "VS Code", level: 100 },
  { name: "Computer Hardware", level: 98 },
  { name: "Linux OS", level: 95 },
  { name: "Windows OS", level: 98 },
  { name: "Basic Networking", level: 80 },
  { name: "Development Tools", level: 85 },
  { name: "GitHub", level: 98 },
  { name: "Command Line", level: 95 },
];

const otherSkills: Skill[] = [
  { name: "Prompt Engineering", level: 98 },
  { name: "English", level: 95 },
  { name: "Malayalam", level: 90 },
  { name: "Hindi", level: 100 },
  { name: "Tamil", level: 80 },
  { name: "Self-Learning", level: 85 },
  { name: "Time Management", level: 85 },
  { name: "Adaptability", level: 97 }
];

const professionalSkills: Skill[] = [
  { name: "Communication", level: 85 },
  { name: "Teamwork", level: 95 },
  { name: "Problem Solving", level: 85 },
  { name: "Critical Thinking", level: 80 },
  { name: "Learning Agility", level: 90 },
  { name: "Attention to Detail", level: 85 },
  { name: "Time Management", level: 80 },
  { name: "Adaptability", level: 95 }
];

// Projects Data
const featuredProjects: Project[] = [
  {
    title: "AI CENTRAL Station",
    description: "An advanced, all-in-one platform designed to help users explore, compare, and utilize a wide range of AI tools and technologies. Acts as a toolkit hub, streamlining access to the latest and best AI tools across categories — from generative models to productivity boosters.",
    date: "May 2025",
    imageUrl: "/projects/ai-central.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "NewsAPI"],
    liveUrl: "https://ai-central.vercel.app",
    githubUrl: "https://github.com/dariogeorge21/ai-central-station",
    featured: true,
    category: "AI Platform",
    keyFeatures: [
      "Dynamic AI Toolkit Hub with categorized access to AI tools",
      "Live API Integration for up-to-date tool data",
      "Automated Documentation Generator using AI summarizers",
      "Benchmarking Page ranking tools based on performance",
      "AI News Feed integrated with NewsAPI",
      "Fully Responsive UI built with Next.js and Tailwind CSS",
      "Future-Proofed Database Handling for scalability"
    ]
  },
  {
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features a dark/light theme toggle, smooth animations, and a clean, professional design.",
    date: "April 2025",
    imageUrl: "/projects/portfolio.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "https://dariogeorge.vercel.app",
    githubUrl: "https://github.com/dariogeorge21/personal-portfolio",
    featured: true,
    category: "Web Development",
    keyFeatures: [
      "Dark/Light theme toggle for user preference",
      "Smooth animations using Framer Motion",
      "Responsive design for all devices",
      "Dynamic routing for easy navigation",
      "SEO optimized for better visibility",
      "Integrated with Vercel for fast deployment"
    ]
  },
];

const otherProjects: Project[] = [
  {
    title: "AI Toolkit Hub",
    description: "A page where multiple AI tools are listed with multiple categories.",
    date: "January 2025",
    imageUrl: "/projects/ai-toolkit.png",
    technologies: ["JavaScript", "Tailwind CSS", "Vercel", "HTML"],
    liveUrl: "https://ai-hub-psi.vercel.app",
    githubUrl: "https://github.com/dariogeorge21/AI-HUB-PAGE",
    category: "Web Development"
  },
  {
    title: "GoAero",
    description: "A flight booking platform built using Java Swing and MySQL as part of a course project. It was built by a team of 4 members. It consists of roles as Passenger, Admin, and Airline Company. ",
    date: "October 2025",
    imageUrl: "/projects/goaero.png",
       technologies: ["Java", "MySQL", "Java Swing"],
    liveUrl:"/",
    githubUrl: "https://github.com/dariogeorge21/GoAero",
    category:"Java"
  },
  {
    title: "Gnosis - The Bible App",
    description: "A web app that helps in your faith by reading bible, reciting rosaries, and other prayers. Also with an AI chatbot that can help clarify your doubts.",
    date: "May 2025",
    imageUrl: "/projects/gnosis.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://gnosis-liard.vercel.app",
    githubUrl: "https://github.com/dariogeorge21/Gnosis",
    category: "Web Development",
  },
  {
    title: "Finance Tracker",
    description: "A simple finance tracker app built using NextJS and Supabase. It allows users to track their income and expenses and view their balance.",
    date: "January 2025",
    imageUrl: "/projects/finance-dev.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    liveUrl: "https://finance-tracker-dev.vercel.app",
    githubUrl: "https://github.com/dariogeorge21/finance-tracker",
    category: "Web Development"
  },
  {
    title: "Typing Speed Test",
    description: "A simple web page that allows users to test their typing speed and accuracy.",
    date: "January 2025",
    imageUrl: "/projects/typing-test.png",
    technologies: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://dariogeorge21.github.io/typing-test/",
    githubUrl: "https://github.com/dariogeorge21/typing-test",
    category: "Web Development"
  },
  {
    title: "Chrome Dinosaur using Voice Detection",
    description: "A simple chrome dinosaur game that can be played using voice detection in python. It uses python and sounddevice library to detect voice. On sound detection it jumps the dinosaur.",
    date: "February 2025",
    imageUrl: "/projects/dino.png",
    technologies: ["Python", "Sounddevice"],
    liveUrl: "/",
    githubUrl: "https://github.com/dariogeorge21/dino-py",
    category: "Python"
  },
  {
    title: "Finger based eye tracking",
    description: "Consist of two eyes which follows the index finger through the camera.",
    date: "February 2025",
    imageUrl: "/projects/eye.png",
    technologies: ["Vanilla JS","HTML", "CSS", "Mediapipe"],
    liveUrl: "https://dariogeorge21.github.io/finger-eye-tracking/",
    githubUrl: "https://github.com/dariogeorge21/finger-eye-tracking",
    category: "Web Development"
  },
  {
    title: "Tic Tac Toe Game",
    description: "A simple python based game that allows users to play tic tac toe.",
    date: "January 2025",
    imageUrl: "/projects/ttt.png",
    technologies: ["Python"],
    liveUrl: "/",
    githubUrl: "https://github.com/dariogeorge21/TTT-python",
    category: "Python"
  },
  {
    title: "Snake Game",
    description: "A simple python based game that allows users to play snake game.",
    date: "January 2025",
    imageUrl: "/projects/snake-game.png",
    technologies: ["Python"],
    liveUrl: "/",
    githubUrl: "https://github.com/dariogeorge21/python-snake",
    category: "Python"
  }
];
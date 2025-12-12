"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Linkedin, Mail, Download, Calendar, MapPin, Briefcase, Award, Code, ExternalLink, Github, Globe, Layers, Send, Phone } from 'lucide-react';
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
import { useState } from 'react';

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

      {/* Experience Preview Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" id="experience">
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2 variants={item} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              Work Experience
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              My professional journey and career milestones
            </motion.p>
          </motion.div>

          {/* Show only the most recent experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gradient mb-1">
                    {experiences[0].position}
                  </h3>
                  <p className="text-lg text-muted-foreground">{experiences[0].company}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{experiences[0].period}</span>
                  </div>
                  <div className="flex items-center justify-end text-muted-foreground text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{experiences[0].location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                {experiences[0].description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {technologies.slice(0, 8).map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
                <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                  +{technologies.length - 8} more
                </span>
              </div>

              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" 
                asChild
              >
                <Link href="/experience">
                  View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Education Preview Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" id="education">
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2 variants={item} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              Education
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              My academic journey and qualifications
            </motion.p>
          </motion.div>

          {/* Show only current education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gradient mb-1">
                    {educationData[0].degree}
                  </h3>
                  <p className="text-lg text-muted-foreground">{educationData[0].institution}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{educationData[0].period}</span>
                  </div>
                  <div className="flex items-center justify-end text-muted-foreground text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{educationData[0].location}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                {educationData[0].description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" 
                asChild
              >
                <Link href="/education">
                  View Complete Education History <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" id="skills">
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2 variants={item} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              My Skills
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              A comprehensive overview of my technical expertise and professional capabilities
            </motion.p>
          </motion.div>

          {/* Skills Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassmorphicCard className="p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {frontendSkills.length}+ Technologies
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {frontendSkills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {skill.name}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{frontendSkills.length - 4}
                  </span>
                </div>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassmorphicCard className="p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Backend</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {backendSkills.length}+ Technologies
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {backendSkills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {skill.name}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{backendSkills.length - 4}
                  </span>
                </div>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassmorphicCard className="p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tools & DevOps</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {toolsSkills.length}+ Tools
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {toolsSkills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {skill.name}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{toolsSkills.length - 4}
                  </span>
                </div>
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassmorphicCard className="p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Other Skills</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {otherSkills.length}+ Abilities
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {otherSkills.slice(0, 4).map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {skill.name}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    +{otherSkills.length - 4}
                  </span>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" 
              asChild
            >
              <Link href="/skills">
                Explore All Skills & Expertise <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" id="projects">
        <div className="container mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2 variants={item} className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-3 sm:mb-4">
              Featured Projects
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              A showcase of my best technical projects and development work
            </motion.p>
          </motion.div>

          {/* Show only 2 featured projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <GlassmorphicCard className="h-full flex flex-col overflow-hidden p-4 sm:p-6 hover:scale-[1.02] transition-transform duration-300">
                  <div className="relative w-full h-48 sm:h-56 mb-4 overflow-hidden rounded-md">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary/80 hover:bg-primary text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{project.title}</h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {project.liveUrl && project.liveUrl !== "/" && (
                      <Button className="flex-1 text-xs sm:text-sm h-9" asChild>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" className="flex-1 border-gradient text-xs sm:text-sm h-9" asChild>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          View Code <Github className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          {/* Other Projects Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">More Projects</h3>
                <p className="text-muted-foreground text-sm">
                  I've worked on {otherProjects.length}+ additional projects including web apps, Python tools, and more
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {otherProjects.slice(0, 8).map((project, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <h4 className="font-medium text-sm mb-1 line-clamp-1">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">{project.category}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" 
                  asChild
                >
                  <Link href="/projects">
                    View All {featuredProjects.length + otherProjects.length} Projects <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-3 sm:px-4" id="contact">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="p-8 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-pink-500/20 to-blue-600/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4">
                  Let's Work Together
                </h2>
                <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                  Have a project in mind or want to discuss opportunities? I'm always open to new challenges and collaborations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/30">
                    <Mail className="w-6 h-6 text-primary" />
                    <div className="text-sm font-medium">Email</div>
                    <a href="mailto:edu.dariogeorge21@gmail.com" className="text-xs text-muted-foreground hover:text-primary transition-colors break-all">
                      edu.dariogeorge21@gmail.com
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/30">
                    <Phone className="w-6 h-6 text-primary" />
                    <div className="text-sm font-medium">Phone</div>
                    <a href="tel:+917838403506" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      +91 7838403506
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/30">
                    <MapPin className="w-6 h-6 text-primary" />
                    <div className="text-sm font-medium">Location</div>
                    <div className="text-xs text-muted-foreground">
                      Thodupuzha, India
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-base px-8" 
                    asChild
                  >
                    <Link href="/contact">
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="flex gap-4">
                    <Link
                      href="https://github.com/dariogeorge21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/dariogeorge21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href="mailto:edu.dariogeorge21@gmail.com"
                      className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10 inline-block">
                  <p className="text-sm text-muted-foreground">
                    💼 Currently open to <span className="text-primary font-medium">internships</span> and <span className="text-primary font-medium">learning opportunities</span>
                  </p>
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
    description: "Currently in the second semester (S3) of Computer Science and Engineering program, focusing on building a strong foundation in programming, data structures, and algorithms.",
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
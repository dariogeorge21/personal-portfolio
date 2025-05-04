"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Calendar, ExternalLink, Github, Globe, Code, Layers, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-16">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Projects"
          subtitle="A showcase of my technical projects and development work"
          centered
        />
        
        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-gradient">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
        
        {/* Other Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gradient">Other Projects</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <GlassmorphicCard className="h-full flex flex-col overflow-hidden">
        <div className="relative w-full h-64 mb-6 overflow-hidden rounded-md">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-4 right-4 bg-primary/80 hover:bg-primary">{project.category}</Badge>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{project.date}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <Globe className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">{project.description}</p>
          
          <div className="mb-6">
            <h4 className="text-sm text-muted-foreground mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          {project.liveUrl && (
            <Button className="flex-1" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" className="flex-1 border-gradient" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                View Code <Code className="ml-2 h-4 w-4" />
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
      <GlassmorphicCard className="h-full flex flex-col overflow-hidden">
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className="absolute top-3 right-3 bg-primary/80 hover:bg-primary">{project.category}</Badge>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="flex space-x-1">
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Globe className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{project.date}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {project.liveUrl && (
            <Button size="sm" variant="outline" className="flex-1 text-xs" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live Demo
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button size="sm" variant="outline" className="flex-1 text-xs" asChild>
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

const featuredProjects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features a dark/light theme toggle, smooth animations, and a clean, professional design.",
    date: "April 2025",
    imageUrl: "https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "#",
    githubUrl: "https://github.com/dariogeorge21/personal-portfolio",
    featured: true,
    category: "Web Development"
  },
  {
    title: "E-Commerce Dashboard",
    description: "A comprehensive admin dashboard for e-commerce platforms with real-time analytics, inventory management, and order processing capabilities.",
    date: "March 2025",
    imageUrl: "https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
    category: "Full Stack"
  }
];

const otherProjects: Project[] = [
  {
    title: "Weather App",
    description: "A weather application that provides real-time weather information and forecasts for locations worldwide.",
    date: "February 2025",
    imageUrl: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["JavaScript", "React", "OpenWeather API", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web Development"
  },
  {
    title: "Task Management System",
    description: "A collaborative task management application with features like task assignment, progress tracking, and deadline notifications.",
    date: "January 2025",
    imageUrl: "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Vue.js", "Firebase", "Vuetify", "PWA"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web Application"
  },
  {
    title: "Recipe Finder",
    description: "An application that helps users find recipes based on available ingredients, dietary restrictions, and cuisine preferences.",
    date: "December 2024",
    imageUrl: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React Native", "Expo", "Spoonacular API", "Async Storage"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Mobile App"
  },
  {
    title: "Budget Tracker",
    description: "A personal finance application that helps users track income, expenses, and savings goals with visual reports.",
    date: "November 2024",
    imageUrl: "https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Angular", "TypeScript", "D3.js", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Web Application"
  },
  {
    title: "Fitness Tracker",
    description: "A fitness application that tracks workouts, provides exercise recommendations, and monitors progress over time.",
    date: "October 2024",
    imageUrl: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Flutter", "Dart", "Firebase", "Health API"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Mobile App"
  },
  {
    title: "Movie Recommendation System",
    description: "A machine learning-based movie recommendation system that suggests films based on user preferences and viewing history.",
    date: "September 2024",
    imageUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Python", "TensorFlow", "Flask", "TMDB API"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Machine Learning"
  }
];

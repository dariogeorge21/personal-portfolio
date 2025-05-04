"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Coffee, Code, Music, Book, Camera } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';

export default function AboutPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-24 pb-16">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="About Me"
          subtitle="Get to know more about my journey, passions, and what drives me"
          centered
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="h-full">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-6">
                <Image
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="About Me"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-6">
                <div>
                  <h4 className="text-muted-foreground text-sm">Name</h4>
                  <p className="font-medium">John Doe</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm">Email</h4>
                  <p className="font-medium">hello@example.com</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm">Location</h4>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-sm">Availability</h4>
                  <p className="font-medium">Open to Opportunities</p>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700" asChild>
                <Link href="/contact">
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </GlassmorphicCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <h3 className="text-2xl font-bold">
              I'm a <span className="text-gradient">Full Stack Developer</span> with a passion for building exceptional digital experiences
            </h3>
            
            <p className="text-muted-foreground">
              Hello! I'm John, a dedicated Full Stack Developer with over 5 years of experience creating innovative 
              web applications. My journey in technology began with a childhood fascination with computers, which 
              eventually led me to pursue a degree in Computer Science.
            </p>
            
            <p className="text-muted-foreground">
              Throughout my career, I've worked with diverse teams across various industries, from startups to 
              enterprise organizations. My approach combines technical expertise with a deep understanding of user 
              needs, allowing me to build solutions that are both functionally robust and intuitive to use.
            </p>
            
            <p className="text-muted-foreground">
              When I'm not coding, you'll find me hiking in nature, experimenting with photography, or contributing 
              to open-source projects. I believe in continuous learning and regularly attend tech conferences and 
              workshops to stay at the forefront of industry developments.
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" className="border-gradient">Resume</Button>
              <Button variant="outline" className="border-gradient">Portfolio</Button>
              <Button variant="outline" className="border-gradient">Blog</Button>
            </div>
          </motion.div>
        </div>
        
        {/* What I Do Section */}
        <div className="mb-20">
          <SectionHeading
            title="What I Do"
            subtitle="Explore the services I offer and the value I bring to every project"
          />
          
          <div className="grid md:grid-cols-3 gap-6" ref={ref}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                custom={index}
                transition={{ delay: 0.1 * index }}
              >
                <GlassmorphicCard className="h-full flex flex-col">
                  <div className="mb-4 text-primary">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{service.description}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Personal Interests */}
        <div>
          <SectionHeading
            title="Personal Interests"
            subtitle="Beyond coding, here are a few things I'm passionate about"
          />
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {interests.map((interest, index) => (
              <motion.div key={index} variants={item}>
                <GlassmorphicCard className="text-center h-full flex flex-col items-center justify-center py-8">
                  <div className="text-primary mb-3">{interest.icon}</div>
                  <h4 className="font-medium">{interest.name}</h4>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    title: "Web Development",
    description: "Building responsive and performant web applications using modern frameworks and best practices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
    )
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing interfaces that enhance user experience and engagement.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>
    )
  },
  {
    title: "Mobile App Development",
    description: "Developing cross-platform mobile applications that provide seamless experiences across devices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><line x1="12" x2="12.01" y1="18" y2="18"></line></svg>
    )
  }
];

const interests = [
  { name: "Photography", icon: <Camera className="h-6 w-6" /> },
  { name: "Reading", icon: <Book className="h-6 w-6" /> },
  { name: "Music", icon: <Music className="h-6 w-6" /> },
  { name: "Coding", icon: <Code className="h-6 w-6" /> },
  { name: "Coffee", icon: <Coffee className="h-6 w-6" /> }
];
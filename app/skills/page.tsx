"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { useState } from 'react';

export default function SkillsPage() {
  const [value, setValue] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="pt-28 sm:pt-32 md:pt-24 pb-12 sm:pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeading
          title="My Skills"
          subtitle="A comprehensive overview of my technical expertise and professional capabilities"
          centered
        />

        {/* Technical Skills */}
        <div className="mb-12 sm:mb-16 md:mb-20" ref={ref}>
          <Tabs defaultValue="frontend" className="w-full">
            <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-2">
              <TabsList className="glassmorphism flex-nowrap">
                <TabsTrigger value="frontend" className="text-xs sm:text-sm whitespace-nowrap">Frontend</TabsTrigger>
                <TabsTrigger value="backend" className="text-xs sm:text-sm whitespace-nowrap">Backend</TabsTrigger>
                <TabsTrigger value="tools" className="text-xs sm:text-sm whitespace-nowrap">Tools & DevOps</TabsTrigger>
                <TabsTrigger value="other" className="text-xs sm:text-sm whitespace-nowrap">Other Skills</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="frontend">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {frontendSkills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} inView={inView} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {backendSkills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} inView={inView} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {toolsSkills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} inView={inView} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="other">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {otherSkills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} inView={inView} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Professional Skills */}
        <div>
          <SectionHeading
            title="Professional Skills"
            subtitle="Soft skills and professional abilities that complement my technical expertise"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Communication & Collaboration</h3>

                {professionalSkills.slice(0, 4).map((skill, index) => (
                  <div key={index} className="mb-4 sm:mb-6">
                    <div className="flex justify-between mb-1 sm:mb-2">
                      <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-muted-foreground text-xs sm:text-sm">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1.5 sm:h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-600" />
                  </div>
                ))}
              </GlassmorphicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Leadership & Management</h3>

                {professionalSkills.slice(4, 8).map((skill, index) => (
                  <div key={index} className="mb-4 sm:mb-6">
                    <div className="flex justify-between mb-1 sm:mb-2">
                      <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                      <span className="text-muted-foreground text-xs sm:text-sm">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1.5 sm:h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-600" />
                  </div>
                ))}
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Skill {
  name: string;
  level: number;
  logo?: string;
  color?: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  inView: boolean;
}

function SkillCard({ skill, index, inView }: SkillCardProps) {
  return (
    <motion.div
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
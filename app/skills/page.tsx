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
    <div className="pt-24 pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-4">
        <SectionHeading
          title="My Skills"
          subtitle="A comprehensive overview of my technical expertise and professional capabilities"
          centered
        />

        {/* Technical Skills */}
        <div className="mb-20" ref={ref}>
          <Tabs defaultValue="frontend" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="glassmorphism">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="tools">Tools & DevOps</TabsTrigger>
                <TabsTrigger value="other">Other Skills</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="frontend">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {frontendSkills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} inView={inView} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backend">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {backendSkills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} inView={inView} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {toolsSkills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} inView={inView} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="other">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard>
                <h3 className="text-xl font-bold mb-6">Communication & Collaboration</h3>

                {professionalSkills.slice(0, 4).map((skill, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-600" />
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
              <GlassmorphicCard>
                <h3 className="text-xl font-bold mb-6">Leadership & Management</h3>

                {professionalSkills.slice(4, 8).map((skill, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-600" />
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
      <GlassmorphicCard className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">{skill.name}</h3>
          <span className="text-muted-foreground text-sm">{skill.level}%</span>
        </div>
        <Progress value={skill.level} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-purple-600" />
      </GlassmorphicCard>
    </motion.div>
  );
}

const frontendSkills: Skill[] = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 75 },
  { name: "TypeScript", level: 70 },
  { name: "NextJS", level: 65 },
  { name: "Responsive Design", level: 75 },
  { name: "UI Fundamentals", level: 70 },
  { name: "Tailwind CSS", level: 65 },
  { name: "Frontend Basics", level: 80 }
];

const backendSkills: Skill[] = [
  { name: "Python", level: 85 },
  { name: "C Programming", level: 85 },
  { name: "C++", level: 75 },
  { name: "MySQL", level: 75 },
  { name: "Java (Learning)", level: 30 },
  { name: "DSA Fundamentals", level: 40 },
  { name: "Backend Basics", level: 60 },
  { name: "Database Concepts", level: 70 },
  { name: "API Fundamentals", level: 65 }
];

const toolsSkills: Skill[] = [
  { name: "Git", level: 90 },
  { name: "VS Code", level: 95 },
  { name: "Computer Hardware", level: 80 },
  { name: "Linux OS", level: 85 },
  { name: "Windows OS", level: 95 },
  { name: "Basic Networking", level: 70 },
  { name: "Development Tools", level: 75 },
  { name: "GitHub", level: 90 },
  { name: "Command Line", level: 85 }
];

const otherSkills: Skill[] = [
  { name: "Prompt Engineering", level: 75 },
  { name: "English", level: 95 },
  { name: "Malayalam", level: 85 },
  { name: "Hindi", level: 95 },
  { name: "Tamil", level: 85 },
  { name: "Problem Solving", level: 70 },
  { name: "Self-Learning", level: 85 },
  { name: "Time Management", level: 85 },
  { name: "Adaptability", level: 90 }
];

const professionalSkills: Skill[] = [
  { name: "Communication", level: 85 },
  { name: "Teamwork", level: 90 },
  { name: "Problem Solving", level: 85 },
  { name: "Critical Thinking", level: 80 },
  { name: "Learning Agility", level: 90 },
  { name: "Attention to Detail", level: 85 },
  { name: "Time Management", level: 80 },
  { name: "Adaptability", level: 95 }
];
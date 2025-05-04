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
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "HTML/CSS", level: 95 },
  { name: "JavaScript", level: 95 },
  { name: "Next.js", level: 85 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Redux", level: 85 },
  { name: "Angular", level: 75 },
  { name: "Vue.js", level: 70 }
];

const backendSkills: Skill[] = [
  { name: "Node.js", level: 90 },
  { name: "Express", level: 90 },
  { name: "Python", level: 85 },
  { name: "Django", level: 80 },
  { name: "PHP", level: 75 },
  { name: "GraphQL", level: 85 },
  { name: "REST API", level: 90 },
  { name: "PostgreSQL", level: 85 },
  { name: "MongoDB", level: 80 }
];

const toolsSkills: Skill[] = [
  { name: "Git", level: 95 },
  { name: "Docker", level: 85 },
  { name: "AWS", level: 80 },
  { name: "CI/CD", level: 85 },
  { name: "Jenkins", level: 75 },
  { name: "Kubernetes", level: 70 },
  { name: "Linux", level: 90 },
  { name: "Webpack", level: 85 },
  { name: "Jira", level: 90 }
];

const otherSkills: Skill[] = [
  { name: "UI/UX Design", level: 80 },
  { name: "Figma", level: 85 },
  { name: "SEO", level: 75 },
  { name: "Performance Optimization", level: 90 },
  { name: "Technical Writing", level: 85 },
  { name: "Responsive Design", level: 95 },
  { name: "Agile Methodologies", level: 90 },
  { name: "Mobile-First Design", level: 85 },
  { name: "Accessibility", level: 80 }
];

const professionalSkills: Skill[] = [
  { name: "Team Collaboration", level: 95 },
  { name: "Communication", level: 90 },
  { name: "Problem Solving", level: 95 },
  { name: "Client Relations", level: 85 },
  { name: "Project Management", level: 90 },
  { name: "Team Leadership", level: 85 },
  { name: "Strategic Planning", level: 80 },
  { name: "Mentoring", level: 90 }
];
"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Separator } from '@/components/ui/separator';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export default function ExperiencePage() {
  return (
    <div className="pt-28 sm:pt-32 md:pt-24 pb-12 sm:pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and career milestones"
          centered
        />

        {/* Timeline Experience */}
        <ExperienceTimeline experiences={experiences} />

        {/* Skills Used */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <SectionHeading
            title="Technologies & Tools"
            subtitle="Technologies and tools I've worked with throughout my career"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="p-2 sm:p-3 md:p-4 text-center h-full flex flex-col items-center justify-center">
                  <span className="font-medium text-xs sm:text-sm">{tech}</span>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

const experiences: Experience[] = [
  {
    position: "Freelance Developer",
    company: "FreeLance",
    location: "Online",
    period: "March 2025 - Present",
    description: "I started freelancing as a developer to gain hands-on experience in building web applications. ",
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
  "JavaScript", "TypeScript", "React", "Next.js", "Angular", "C",
  "Node.js", "C++", "API", "MongoDB", "MySQL",
  "Arch Linux", "Augment Code", "VS Code", "Git", "Github", "Python", "HTML",
  "CSS/SCSS", "Tailwind CSS", "Material UI", "Figma", "Webpack"
];
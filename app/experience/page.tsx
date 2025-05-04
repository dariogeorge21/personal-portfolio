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
    <div className="pt-24 pb-16">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and career milestones"
          centered
        />
        
        {/* Timeline Experience */}
        <ExperienceTimeline experiences={experiences} />
        
        {/* Skills Used */}
        <div className="mt-20">
          <SectionHeading
            title="Technologies & Tools"
            subtitle="Technologies and tools I've worked with throughout my career"
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="p-4 text-center h-full flex flex-col items-center justify-center">
                  <span className="font-medium">{tech}</span>
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
          <div key={index} ref={ref} className="mb-12 relative z-10">
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400 to-purple-600" />
            
            <div className="flex items-start">
              {/* Timeline dot */}
              <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-1.5 md:mt-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 shadow-glow z-20"
                />
              </div>
              
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`ml-8 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}`}
              >
                <GlassmorphicCard>
                  <div className="md:flex justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gradient">{experience.position}</h3>
                      <p className="text-lg">{experience.company}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <div className="flex items-center md:justify-end text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center md:justify-end text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{experience.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {experience.achievements && (
                    <div>
                      <h4 className="font-medium mb-2">Achievements:</h4>
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
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
    position: "Senior Full Stack Developer",
    company: "TechInnovate Inc.",
    location: "San Francisco, CA",
    period: "Jan 2022 - Present",
    description: "Lead developer for the company's flagship product, a SaaS platform serving enterprise clients in the healthcare sector.",
    responsibilities: [
      "Architect and implement scalable web applications using React, TypeScript, and Node.js",
      "Design and develop RESTful APIs and microservices for backend functionality",
      "Lead a team of 5 developers, conduct code reviews, and mentor junior developers",
      "Collaborate with product managers and designers to refine product requirements and user experience"
    ],
    achievements: [
      "Improved application performance by 40% through code optimization and implementation of lazy loading",
      "Led the migration from a monolithic architecture to microservices, reducing deployment times by 60%",
      "Implemented CI/CD pipeline that reduced integration issues by 30% and deployment time by 50%",
      "Spearheaded the adoption of TypeScript across the organization, improving code quality and developer productivity"
    ]
  },
  {
    position: "Full Stack Developer",
    company: "WebSolutions Corp",
    location: "Seattle, WA",
    period: "Mar 2019 - Dec 2021",
    description: "Worked on developing and maintaining various client projects, primarily focusing on e-commerce and fintech applications.",
    responsibilities: [
      "Developed responsive web applications using React, Redux, and GraphQL",
      "Built backend services using Node.js, Express, and MongoDB",
      "Implemented authentication and authorization systems using JWT and OAuth",
      "Collaborated with cross-functional teams to meet project deadlines and deliverables"
    ],
    achievements: [
      "Delivered 12 successful client projects with an average client satisfaction score of 4.8/5",
      "Reduced API response times by 35% through query optimization and caching strategies",
      "Created a reusable component library that increased development speed by 25%",
      "Recognized as 'Developer of the Year' for exceptional contribution to project success"
    ]
  },
  {
    position: "Frontend Developer",
    company: "CreativeTech Studios",
    location: "Austin, TX",
    period: "Jun 2017 - Feb 2019",
    description: "Responsible for implementing user interfaces and interactions for web and mobile applications.",
    responsibilities: [
      "Developed responsive and interactive user interfaces using JavaScript, HTML5, and CSS3",
      "Implemented single-page applications (SPAs) using Angular and Vue.js",
      "Collaborated with designers to translate wireframes and mockups into functional interfaces",
      "Optimized applications for maximum speed and scalability"
    ],
    achievements: [
      "Reduced load time of main application by 45% through code splitting and asset optimization",
      "Implemented accessibility features that increased WCAG compliance score from 65% to 95%",
      "Created an interactive dashboard that increased user engagement by 30%",
      "Mentored 3 junior developers who all advanced to mid-level positions"
    ]
  },
  {
    position: "Junior Web Developer",
    company: "Digital Innovators",
    location: "Boston, MA",
    period: "Aug 2015 - May 2017",
    description: "Entry-level position focused on front-end development and learning full-stack technologies.",
    responsibilities: [
      "Developed and maintained websites using HTML, CSS, JavaScript, and jQuery",
      "Assisted in building PHP-based web applications using Laravel framework",
      "Performed bug fixes and implemented feature requests for existing projects",
      "Participated in code reviews and team meetings to improve development processes"
    ],
    achievements: [
      "Redesigned company website that improved conversion rates by 25%",
      "Built a custom CMS system that reduced content update time by 40%",
      "Completed 3 certification courses in advanced web technologies",
      "Promoted from intern to junior developer within 6 months"
    ]
  }
];

const technologies = [
  "JavaScript", "TypeScript", "React", "Next.js", "Angular", "Vue.js", 
  "Node.js", "Express", "GraphQL", "REST API", "MongoDB", "PostgreSQL", 
  "AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Jest", "Redux", 
  "CSS/SCSS", "Tailwind CSS", "Material UI", "Figma", "Webpack"
];
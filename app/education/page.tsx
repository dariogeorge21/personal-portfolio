"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Award, BookOpen, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function EducationPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="pt-24 pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Education & Certifications"
          subtitle="My academic journey and professional qualifications"
          centered
        />

        <Tabs defaultValue="education" className="w-full mb-20">
          <div className="flex justify-center mb-8">
            <TabsList className="glassmorphism">
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>
          </div>

          {/* Education Tab */}
          <TabsContent value="education">
            <div className="grid gap-8" ref={ref}>
              {educationData.map((edu, index) => (
                <EducationCard key={index} education={edu} index={index} inView={inView} />
              ))}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard key={index} certification={cert} index={index} inView={inView} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Skills & Achievements */}
        <div>
          <SectionHeading
            title="Academic Achievements"
            subtitle="Recognition and awards received during my academic journey"
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <GlassmorphicCard className="h-full">
                  <div className="text-primary mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground mb-4">{achievement.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{achievement.year}</span>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
}

interface EducationCardProps {
  education: Education;
  index: number;
  inView: boolean;
}

function EducationCard({ education, index, inView }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <GlassmorphicCard>
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

        <p className="text-muted-foreground mb-4">{education.description}</p>

        {education.achievements && (
          <div>
            <h4 className="font-medium mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
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

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialLink: string;
  logo?: string;
}

interface CertificationCardProps {
  certification: Certification;
  index: number;
  inView: boolean;
}

function CertificationCard({ certification, index, inView }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <GlassmorphicCard className="h-full flex flex-col">
        <div className="flex-grow">
          <div className="text-primary mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-1">{certification.name}</h3>
          <p className="text-muted-foreground mb-4">{certification.issuer}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{certification.date}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <Link
            href={certification.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 text-sm flex items-center"
          >
            View Credential
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </Link>
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
}

const educationData: Education[] = [
  {
    degree: "BTech in Computer Science and Engineering",
    institution: "St Joseph's College of Engineering and Technology",
    location: "Palai, Kottayam, Kerala",
    period: "2024 - Present",
    description: "Currently in the second semester (S2) of Computer Science and Engineering program, focusing on building a strong foundation in programming, data structures, and algorithms.",
    achievements: [
      "Current GPA: 8.9",
      "Actively learning web development technologies",
      "Exploring Data Structures and Algorithms in Java"
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

const certifications: Certification[] = [
  {
    name: "Python Programming",
    issuer: "Self-Learning",
    date: "2023",
    credentialLink: "#",
  },
  {
    name: "HTML & CSS Fundamentals",
    issuer: "Self-Learning",
    date: "2023",
    credentialLink: "#",
  },
  {
    name: "JavaScript Basics",
    issuer: "Self-Learning",
    date: "2023",
    credentialLink: "#",
  },
  {
    name: "TypeScript Introduction",
    issuer: "Self-Learning",
    date: "2024",
    credentialLink: "#",
  },
  {
    name: "NextJS Framework",
    issuer: "Self-Learning",
    date: "2024",
    credentialLink: "#",
  },
  {
    name: "Computer Hardware Basics",
    issuer: "Self-Learning",
    date: "2023",
    credentialLink: "#",
  }
];

const achievements = [
  {
    title: "Strong Academic Performance",
    description: "Maintaining a GPA of 8.9 in BTech Computer Science and Engineering program.",
    year: "2024"
  },
  {
    title: "Higher Secondary Achievement",
    description: "Scored 87.8% in 12th grade with specialization in Mathematics and Computer Science.",
    year: "2024"
  },
  {
    title: "Multilingual Proficiency",
    description: "Proficient in four languages: English, Malayalam, Hindi, and Tamil, enabling effective communication across diverse environments.",
    year: "Present"
  },
  {
    title: "Self-Taught Programming",
    description: "Independently learned multiple programming languages and web development technologies.",
    year: "2023-2024"
  },
  {
    title: "Frontend Development Projects",
    description: "Created personal projects to practice and demonstrate skills in HTML, CSS, JavaScript, and TypeScript.",
    year: "2023-2024"
  },
  {
    title: "Computer Hardware Knowledge",
    description: "Developed comprehensive understanding of computer hardware components and troubleshooting techniques.",
    year: "2023"
  }
];
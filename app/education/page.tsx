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
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "Stanford, CA",
    period: "2018 - 2020",
    description: "Specialized in Artificial Intelligence and Machine Learning, with a focus on natural language processing and computer vision applications. Completed thesis on 'Deep Learning Approaches for Text Classification in Low-Resource Scenarios'.",
    achievements: [
      "Graduated with distinction (GPA: 3.92/4.0)",
      "Selected for Research Assistantship in the AI Lab",
      "Presented research at two international conferences",
      "Recipient of the Technology Innovation Scholarship"
    ]
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    period: "2014 - 2018",
    description: "Comprehensive curriculum covering software development methodologies, data structures, algorithms, database systems, and web development. Participated in multiple hackathons and coding competitions.",
    achievements: [
      "Dean's List all semesters (GPA: 3.85/4.0)",
      "Led a team of 5 in developing a campus resource application",
      "Completed internship at Google during junior year",
      "Published paper on efficient algorithm implementation"
    ]
  },
  {
    degree: "High School Diploma",
    institution: "Tech Preparatory Academy",
    location: "San Francisco, CA",
    period: "2010 - 2014",
    description: "Advanced curriculum with focus on mathematics, computer science, and physics. Participated in numerous extracurricular activities including Robotics Club, Math Olympiad, and Science Fair.",
    achievements: [
      "Valedictorian of graduating class",
      "First place in State Programming Competition",
      "Founded and led the school's first Artificial Intelligence Club",
      "Perfect score on AP Computer Science exam"
    ]
  }
];

const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "May 2023",
    credentialLink: "#",
  },
  {
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "November 2022",
    credentialLink: "#",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "July 2022",
    credentialLink: "#",
  },
  {
    name: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "March 2022",
    credentialLink: "#",
  },
  {
    name: "React Certification",
    issuer: "Meta",
    date: "October 2021",
    credentialLink: "#",
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "May 2021",
    credentialLink: "#",
  }
];

const achievements = [
  {
    title: "Outstanding Graduate Research Award",
    description: "Awarded for exceptional research contributions in the field of machine learning applications for natural language processing.",
    year: "2020"
  },
  {
    title: "Academic Excellence Scholarship",
    description: "Full-ride scholarship awarded to top 1% of applicants based on academic merit and leadership potential.",
    year: "2018-2020"
  },
  {
    title: "Best Undergraduate Thesis",
    description: "Recognized for developing an innovative approach to optimizing distributed computing systems.",
    year: "2018"
  },
  {
    title: "Dean's Leadership Award",
    description: "Awarded for exemplary leadership in academic and extracurricular activities at the university.",
    year: "2017"
  },
  {
    title: "Hackathon Champion",
    description: "First place at the University Tech Innovation Hackathon for developing a real-time translation application.",
    year: "2016"
  },
  {
    title: "Programming Competition Winner",
    description: "Won the regional collegiate programming competition, solving complex algorithmic challenges in record time.",
    year: "2015"
  }
];
"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Award, Calendar, MapPin } from 'lucide-react';

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
          title="Education"
          subtitle="My academic journey and qualifications"
          centered
        />

        <div className="grid gap-8 mb-20" ref={ref}>
          {educationData.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} inView={inView} />
          ))}
        </div>

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
"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CertificatesPage() {
  return (
    <div className="pt-24 pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications and qualifications I've earned throughout my career"
          centered
        />

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {certificates.map((certificate, index) => (
            <CertificateCard key={index} certificate={certificate} index={index} />
          ))}
        </div>

        {/* Professional Memberships */}
        {/* <div>
          <SectionHeading
            title="Professional Memberships"
            subtitle="Organizations and professional bodies I'm affiliated with"
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {memberships.map((membership, index) => (
              <MembershipCard key={index} membership={membership} index={index} />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialLink: string;
  imageUrl: string;
  skills: string[];
}

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
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
        <div className="relative w-full h-48 mb-6 overflow-hidden rounded-md">
          <Image
            src={certificate.imageUrl}
            alt={certificate.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{certificate.name}</h3>
              <p className="text-muted-foreground">{certificate.issuer}</p>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{certificate.date}</span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm text-muted-foreground mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-4">
            <span className="font-medium">Credential ID:</span> {certificate.credentialId}
          </div>
        </div>

        <Button variant="outline" className="border-gradient" asChild>
          <Link href={certificate.credentialLink} target="_blank" rel="noopener noreferrer">
            View Credential <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </GlassmorphicCard>
    </motion.div>
  );
}

interface Membership {
  organization: string;
  type: string;
  since: string;
  description: string;
  website: string;
}

function MembershipCard({ membership, index }: { membership: Membership; index: number }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <GlassmorphicCard className="h-full flex flex-col">
        <div className="flex-grow">
          <div className="text-primary mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-1">{membership.organization}</h3>
          <p className="text-primary text-sm mb-4">{membership.type}</p>
          <p className="text-muted-foreground mb-4">{membership.description}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Member since {membership.since}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <Link
            href={membership.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 text-sm flex items-center"
          >
            Visit Website
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
}

const certificates: Certificate[] = [
  {
    name: "Docker Advanced Assessment",
    issuer: "LearnTube.ai",
    date: "March 2025",
    credentialId: "DJA-B-1-1107045-0",
    credentialLink: "https://www.learntube.ai/verify/certificate/DJA-B-1-1107045-0",
    imageUrl: "/certificates/docker.jpg",
    skills: ["Docker", "Containerization", "DevOps", "CI/CD"]
  },
  {
    name: "UI/UX Fundamentals",
    issuer: "LearnTube.ai",
    date: "March 2025",
    credentialId: "DJA-B-1-1099295-0",
    credentialLink: "https://www.learntube.ai/verify/certificate/DJA-B-1-1099295-0",
    imageUrl: "/certificates/ui-ux.jpg",
    skills: ["UI Design", "UX Design", "User Research", "Prototyping"]
  },
  {
    name: "Lumino Hackathon",
    issuer: "Saintgits College of Engineering",
    date: "February 2025",
    credentialId: "NA",
    credentialLink: "https://www.linkedin.com/posts/dariogeorge21_hackathon-tech-innovation-activity-7310586085753896960-na8B?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEQhGFkBn-34os-QwKjCm-gqp1cN7ywoRmE",
    imageUrl: "/certificates/lumino.jpg",
    skills: ["Next.js", "Firebase", "Tailwind CSS", "Vercel"]
  },
  {
    name: "Asthra 9.0 Volunteer",
    issuer: "St. Joseph's College of Engineering and Technology",
    date: "March 2025",
    credentialId: "NA",
    credentialLink: "https://www.linkedin.com/in/dariogeorge21/overlay/1743763298898/single-media-viewer?type=IMAGE&profileId=ACoAAEQhGFkBn-34os-QwKjCm-gqp1cN7ywoRmE&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BDllvPRURSaSQxWXqFdaY6g%3D%3D",
    imageUrl: "/certificates/asthra9.png",
    skills: ["Linux", "Virtualization", "Mediapipe", "Python"]
  },
];

const memberships: Membership[] = [
  {
    organization: "NA",
    type: "NA",
    since: "NA",
    description: "NA",
    website: "#"
  }
];
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
        <div>
          <SectionHeading
            title="Professional Memberships"
            subtitle="Organizations and professional bodies I'm affiliated with"
          />
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {memberships.map((membership, index) => (
              <MembershipCard key={index} membership={membership} index={index} />
            ))}
          </div>
        </div>
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
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "May 2023",
    credentialId: "AWS-ASA-12345",
    credentialLink: "#",
    imageUrl: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    skills: ["AWS", "Cloud Architecture", "DevOps", "Security"]
  },
  {
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "November 2022",
    credentialId: "GCP-PCD-67890",
    credentialLink: "#",
    imageUrl: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    skills: ["Google Cloud", "App Engine", "Kubernetes", "Cloud Functions"]
  },
  {
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "August 2022",
    credentialId: "MCADA-54321",
    credentialLink: "#",
    imageUrl: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    skills: ["Azure", "Cloud Services", ".NET", "Azure Functions"]
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "March 2022",
    credentialId: "CKA-09876",
    credentialLink: "#",
    imageUrl: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    skills: ["Kubernetes", "Container Orchestration", "DevOps", "Docker"]
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "January 2022",
    credentialId: "TF-DEV-24680",
    credentialLink: "#",
    imageUrl: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    skills: ["TensorFlow", "Machine Learning", "Deep Learning", "AI"]
  },
  {
    name: "React Certification",
    issuer: "Meta",
    date: "October 2021",
    credentialId: "META-REACT-13579",
    credentialLink: "#",
    imageUrl: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    skills: ["React", "JavaScript", "Frontend Development", "Redux"]
  }
];

const memberships: Membership[] = [
  {
    organization: "IEEE Computer Society",
    type: "Professional Member",
    since: "2019",
    description: "The IEEE Computer Society is the world's leading organization of computer professionals, offering resources and networking opportunities.",
    website: "#"
  },
  {
    organization: "Association for Computing Machinery (ACM)",
    type: "Professional Member",
    since: "2018",
    description: "ACM brings together computing educators, researchers, and professionals to inspire dialogue and share resources to address the field's challenges.",
    website: "#"
  },
  {
    organization: "Cloud Native Computing Foundation",
    type: "Silver Member",
    since: "2020",
    description: "CNCF hosts critical components of the global technology infrastructure, serving as the vendor-neutral home for projects like Kubernetes.",
    website: "#"
  }
];
"use client";

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="pt-24 pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Blog"
          subtitle="Thoughts, insights, and updates from my journey in tech"
          centered
        />

        <div className="grid md:grid-cols-2 gap-8" ref={ref}>
          {
            blogPosts.map((post, index) => (
              <BlogPostCard key={index} post={post} index={index} inView={inView} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  slug: string; // For future use with actual blog post pages
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  inView: boolean;
}

function BlogPostCard({ post, index, inView }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 * index }}
    >
      <GlassmorphicCard className="h-full flex flex-col">
        <div>
          <h3 className="text-xl font-bold text-gradient mb-2">{post.title}</h3>
          <div className="flex items-center text-muted-foreground mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>

        <Button variant="link" className="p-0 justify-start text-primary hover:text-primary/80" asChild>
          <Link href={`/blog/${post.slug}`}>
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </GlassmorphicCard>
    </motion.div>
  );
}

// Sample blog posts data
// Replace with your actual blog posts
const blogPosts: BlogPost[] = [
  {
    title: "Getting Started with Next.js and TypeScript",
    date: "May 15, 2025",
    excerpt: "Next.js is a powerful React framework that enables server-side rendering and static site generation. In this post, I'll share my experience setting up a new project with Next.js and TypeScript.",
    slug: "getting-started-with-nextjs"
  },
  {
    title: "The Power of Tailwind CSS",
    date: "April 28, 2025",
    excerpt: "Tailwind CSS has revolutionized the way I approach styling in web development. Learn how this utility-first CSS framework can speed up your development workflow.",
    slug: "power-of-tailwind-css"
  },
  {
    title: "Building Accessible Web Applications",
    date: "April 10, 2025",
    excerpt: "Accessibility is a crucial aspect of web development that is often overlooked. In this post, I discuss practical strategies for making your web applications more accessible to all users.",
    slug: "building-accessible-web-applications"
  },
  {
    title: "Data Structures in Java: A Comprehensive Guide",
    date: "March 22, 2025",
    excerpt: "Understanding data structures is fundamental to becoming a proficient programmer. This guide covers essential data structures in Java and their practical applications.",
    slug: "data-structures-in-java"
  }
];
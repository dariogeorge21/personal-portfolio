"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import BackgroundParticles from '@/components/background-particles';
import { PostEditor } from '@/components/post-editor';
import { isAuthenticated } from '@/lib/auth';

export default function NewPostPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Create New Post"
          subtitle="Write a new blog post"
          centered
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <PostEditor />
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import BackgroundParticles from '@/components/background-particles';
import { PostEditor } from '@/components/post-editor';
import { isAuthenticated } from '@/lib/auth';
import { getAllPosts, BlogPost } from '@/lib/blog-service';
import { toast } from 'sonner';
import Loading from '@/components/loading';

interface EditPostPageProps {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Fetch post data
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const posts = await getAllPosts();
        const postId = parseInt(params.id);
        const foundPost = posts.find(p => p.id === postId);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          toast.error('Post not found');
          router.push('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to load post data');
        router.push('/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Edit Post"
          subtitle="Update your blog post"
          centered
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {post && <PostEditor post={post} isEditing={true} />}
        </motion.div>
      </div>
    </div>
  );
}

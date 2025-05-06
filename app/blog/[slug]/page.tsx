"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import BackgroundParticles from '@/components/background-particles';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPostBySlug, BlogPost } from '@/lib/blog-service';
import { toast } from 'sonner';
import Loading from '@/components/loading';
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const fetchedPost = await getPostBySlug(params.slug);
        
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          toast.error('Post not found');
          router.push('/blog');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to load post');
        router.push('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.slug, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!post) {
    return null;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <GlassmorphicCard className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gradient mb-4">{post.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getAllPosts, BlogPost } from '@/lib/blog-service';
import { toast } from 'sonner';
import Loading from '@/components/loading';

export default function BlogPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-24 pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-4">
        <SectionHeading
          title="Blog"
          subtitle="Thoughts, insights, and updates from my journey in tech"
          centered
        />

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8" ref={ref}>
            {posts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} inView={inView} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
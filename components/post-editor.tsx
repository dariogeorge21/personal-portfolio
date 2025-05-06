"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Calendar, Save, ArrowLeft } from 'lucide-react';
import { BlogPost, createPost, updatePost } from '@/lib/blog-service';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: "Slug must contain only lowercase letters, numbers, and hyphens" 
    }),
  date: z.string().min(1, { message: "Date is required" }),
  excerpt: z.string().min(1, { message: "Excerpt is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostEditorProps {
  post?: BlogPost;
  isEditing?: boolean;
}

export function PostEditor({ post, isEditing = false }: PostEditorProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      date: post?.date || new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      excerpt: post?.excerpt || "",
      content: post?.content || "",
    },
  });

  const generateSlug = () => {
    const title = form.getValues('title');
    if (!title) return;
    
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    form.setValue('slug', slug);
  };

  const onSubmit = async (data: PostFormValues) => {
    setIsSubmitting(true);
    
    try {
      let success;
      
      if (isEditing && post?.id) {
        // Update existing post
        const updatedPost = await updatePost(post.id, data as BlogPost);
        success = !!updatedPost;
      } else {
        // Create new post
        const newPost = await createPost(data as BlogPost);
        success = !!newPost;
      }
      
      if (success) {
        toast.success(isEditing ? 'Post updated successfully' : 'Post created successfully');
        router.push('/admin/dashboard');
      } else {
        toast.error(isEditing ? 'Failed to update post' : 'Failed to create post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('An error occurred while saving the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassmorphicCard className="p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter post title" 
                    {...field} 
                    disabled={isSubmitting}
                    onChange={(e) => {
                      field.onChange(e);
                      // Only auto-generate slug if it's a new post or slug is empty
                      if (!isEditing || !form.getValues('slug')) {
                        generateSlug();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="post-slug" 
                        {...field} 
                        disabled={isSubmitting}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={generateSlug}
                        disabled={isSubmitting || !form.getValues('title')}
                      >
                        Generate
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="May 15, 2025" 
                        className="pl-10" 
                        {...field} 
                        disabled={isSubmitting}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief summary of the post" 
                    className="min-h-[100px]" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (Markdown)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your post content in Markdown format" 
                    className="min-h-[300px] font-mono" 
                    {...field} 
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </Button>
        </form>
      </Form>
    </GlassmorphicCard>
  );
}

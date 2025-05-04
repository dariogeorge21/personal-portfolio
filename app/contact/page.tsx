"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassmorphicCard } from '@/components/glassmorphic-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useInView } from 'react-intersection-observer';
import BackgroundParticles from '@/components/background-particles';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(data);
      toast.success("Message sent successfully! I'll get back to you soon.");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }
  
  return (
    <div className="pt-24 pb-16">
      <BackgroundParticles />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to work together? Feel free to contact me!"
          centered
        />
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                      hello@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">
                      San Francisco, California, USA
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="mailto:hello@example.com"
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              
              <div className="mt-10 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="font-medium mb-2">Availability</h4>
                <p className="text-muted-foreground text-sm">
                  I'm currently open to freelance opportunities, full-time positions, and interesting project collaborations.
                </p>
              </div>
            </GlassmorphicCard>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Send me a message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Subject of your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Write your message here..." 
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending message...</>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
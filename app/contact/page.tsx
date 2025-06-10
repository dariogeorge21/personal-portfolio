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
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Send, Heart, Coffee, Code, Music, Book, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
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

const services = [
  {
    title: "Web Development",
    description: "Building responsive and performant web applications using modern frameworks and best practices.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
    )
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing interfaces that enhance user experience and engagement.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>
    )
  },
  // {
  //   title: "Mobile App Development",
  //   description: "Developing cross-platform mobile applications that provide seamless experiences across devices.",
  //   icon: (
  //     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><line x1="12" x2="12.01" y1="18" y2="18"></line></svg>
  //   )
  // }
];

const interests = [
  { name: "Photography", icon: <Camera className="h-6 w-6" /> },
  { name: "Reading", icon: <Book className="h-6 w-6" /> },
  { name: "Music", icon: <Music className="h-6 w-6" /> },
  { name: "Coding", icon: <Code className="h-6 w-6" /> },
  { name: "Coffee", icon: <Coffee className="h-6 w-6" /> }
];

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

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        toast.error(result.error || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-28 sm:pt-32 md:pt-24 pb-12 sm:pb-16">
      <BackgroundParticles />

      <div className="container mx-auto px-3 sm:px-4">
        <SectionHeading
          title="About Me"
          subtitle="Get to know more about my journey, passions, and what drives me"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="h-full p-4 sm:p-6">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div>
                  <h4 className="text-muted-foreground text-xs sm:text-sm">Name</h4>
                  <p className="font-medium text-sm sm:text-base">Dario George</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-xs sm:text-sm">Email</h4>
                  <p className="font-medium text-sm sm:text-base break-words">edu.dariogeorge21@gmail.com</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-xs sm:text-sm">Location</h4>
                  <p className="font-medium text-sm sm:text-base">New Delhi, India</p>
                </div>
                <div>
                  <h4 className="text-muted-foreground text-xs sm:text-sm">Availability</h4>
                  <p className="font-medium text-sm sm:text-base">Student, Open to Opportunities</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                <div className="flex items-start">
                  <div className="mt-0.5 sm:mt-1 mr-3 sm:mr-4 p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Phone</h4>
                    <a href="tel:+917838403506" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                      +91 7838403506
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Connect with me</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <Link
                    href="https://github.com/dariogeorge21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/dariogeorge21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                  <Link
                    href="mailto:edu.dariogeorge21@gmail.com"
                    className="p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-4 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold">
              I'm a <span className="text-gradient">Computer Science Student</span> with a passion for frontend development and exploring new technologies
            </h3>

            <GlassmorphicCard className="rounded-[10px] p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Engineering student at St Joseph's College of Engineering and Technology in Palai, Kerala.
                  I'm currently in my second semester with a GPA of 8.9. My journey in technology began with a fascination for how websites work,
                  which led me to explore frontend development.
                </p>

                <p className="text-muted-foreground text-xs sm:text-sm">
                  I'm currently focused on expanding my skills in web development using technologies like HTML, CSS, JavaScript, and TypeScript.
                  I'm also learning Data Structures and Algorithms in C++ to build a strong foundation in computer science fundamentals.
                </p>

                <p className="text-muted-foreground text-xs sm:text-sm">
                  When I'm not coding, I enjoy exploring new technologies, learning about computer hardware. I'm always eager to learn and grow in the field of technology.
                </p>
              </div>
            </GlassmorphicCard>

            <div className="flex flex-wrap gap-2 pt-2">
              {/* <Button variant="outline" className="border-gradient">Resume</Button>
              <Button variant="outline" className="border-gradient">Blog</Button> */}
            </div>
          </motion.div>
        </div>

        {/* What I Do Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <SectionHeading
            title="What I Do"
            subtitle="Explore the services I offer and the value I bring to every project"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6" ref={ref}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                custom={index}
                transition={{ delay: 0.1 * index }}
              >
                <GlassmorphicCard className="h-full flex flex-col p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4 text-primary">
                    <div className="w-6 h-6 sm:w-8 sm:h-8">{service.icon}</div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-3 sm:mb-4 flex-grow text-xs sm:text-sm">{service.description}</p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Personal Interests */}
        {/* <div className="mb-20">
          <SectionHeading
            title="Personal Interests"
            subtitle="Beyond coding, here are a few things I'm passionate about"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {interests.map((interest, index) => (
              <motion.div key={index} variants={item}>
                <GlassmorphicCard className="text-center h-full flex flex-col items-center justify-center py-8">
                  <div className="text-primary mb-3">{interest.icon}</div>
                  <h4 className="font-medium">{interest.name}</h4>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </motion.div>
        </div> */}

        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to work together? Feel free to contact me!"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphicCard className="h-full p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="mt-0.5 sm:mt-1 mr-3 sm:mr-4 p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Email</h4>
                    <a href="mailto:edu.dariogeorge21@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm break-words">
                      edu.dariogeorge21@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-0.5 sm:mt-1 mr-3 sm:mr-4 p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Phone</h4>
                    <a href="tel:+917838403506" className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                      +91 7838403506
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-0.5 sm:mt-1 mr-3 sm:mr-4 p-1.5 sm:p-2 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Location</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      New Delhi, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-10 p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/10">
                <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Availability</h4>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  I'm currently a student at St Joseph's College of Engineering and Technology, open to internships, learning opportunities, and collaborative projects.
                </p>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassmorphicCard className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send me a message</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-9 sm:h-10 text-sm sm:text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending message...</>
                    ) : (
                      <>
                        Send Message <Send className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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

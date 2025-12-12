import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { LoadingProvider } from '@/components/loading-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import MouseTrackerWrapper from '@/components/mouse-tracker-wrapper';
import ThemeBackground from '@/components/theme-background';
import { Toaster } from '@/components/ui/sonner';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dario George - Full Stack Developer & Freelancer | Web Development Services',
  description: 'Hire Dario George, a Full Stack Developer and BTech Computer Science student. Specializing in modern web applications with React, Next.js, TypeScript, and Node.js. Available for freelance projects.',
  keywords: ['Full Stack Developer', 'Web Developer', 'Freelancer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Web Development', 'API Development', 'UI/UX Design'],
  authors: [{ name: 'Dario George' }],
  creator: 'Dario George',
  publisher: 'Dario George',
  openGraph: {
    title: 'Dario George - Full Stack Developer & Freelancer',
    description: 'Transform your ideas into powerful digital solutions. Available for freelance web development projects.',
    url: 'https://dariogeorge.in',
    siteName: 'Dario George Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dario George - Full Stack Developer & Freelancer',
    description: 'Available for freelance web development projects. Specializing in modern web technologies.',
    creator: '@dariogeorge21',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LoadingProvider>
            <MouseTrackerWrapper />
            <ThemeBackground />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 backdrop-blur-md bg-background/30">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Portfolio</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">
              A showcase of my professional journey, skills, and achievements.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm grid grid-cols-2 sm:block">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors block py-1">Home</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors block py-1">Projects</Link></li>
              <li><Link href="/skills" className="text-muted-foreground hover:text-primary transition-colors block py-1">Skills</Link></li>
              <li><Link href="/experience" className="text-muted-foreground hover:text-primary transition-colors block py-1">Experience</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors block py-1">About & Contact</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/dariogeorge21" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/in/dariogeorge21" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="mailto:edu.dariogeorge21@gmail.com" aria-label="Email" className="p-2 rounded-full hover:bg-primary/10 transition-colors">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-border/40 text-center text-xs sm:text-sm text-muted-foreground">
            <p>
            © {currentYear} Dario George. All rights reserved. &nbsp;|&nbsp;
            <a
              href="https://buymeacoffee.com/dariogeorge21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Support me
            </a>
            </p>
        </div>  
      </div>
    </footer>
  );
}

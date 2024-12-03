'use client';
import React from 'react';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';
import { SocialLinks } from '../../components/social-links';
import Link from 'next/link';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(
        'border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Scroll to Top Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="md"
              onClick={scrollToTop}
              className="rounded-full bg-primary-50 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/40"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </Button>
          </motion.div>

          {/* Footer Grid */}
          <div className="grid w-full gap-8 md:grid-cols-3">
            {/* About Section */}
            <div className="text-center md:text-left">
              <h3 className="mb-4 text-lg font-bold">About</h3>
              <div className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <p>
                  Revenue Operations Professional with 8+ years of experience.
                </p>
                <p>Helping teams achieve scalability and efficiency.</p>
                <p>Based in Dallas/Fort Worth Area</p>
              </div>
            </div>

            {/* Newsletter Signup Section */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
              <form
                className="flex flex-col items-center gap-2"
                aria-label="Newsletter Signup Form"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full max-w-sm rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  aria-describedby="email-help"
                  required
                />
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-primary-600 text-white"
                >
                  Subscribe
                </Button>
              </form>
              <p id="email-help" className="mt-2 text-xs text-neutral-500">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="text-center md:text-right">
              <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/about"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/resume"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Resume
                </Link>
                <Link
                  href="/projects"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center">
            <SocialLinks className="justify-center" />
          </div>

          {/* Copyright */}
          <div className="mt-8 w-full border-t border-neutral-200 pt-8 text-center dark:border-neutral-800">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {new Date().getFullYear()} Richard Hudson. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

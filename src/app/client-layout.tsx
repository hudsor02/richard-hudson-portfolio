'use client';

import { NavigationButton } from '@/components/ui/Buttons/NavigationDownloadButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollProgress, setShowScrollProgress] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setShowScrollProgress(winScroll > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/resume/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
        body: JSON.stringify({ format: 'pdf' }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Richard_Hudson_Resume.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to download resume'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/resume', label: 'Resume' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/consult', label: 'Consulting Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <nav
        className={`fixed top-0 w-full bg-white border-b border-neutral-200 shadow-sm z-40 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-md bg-white/80' : ''
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl p-4 mx-auto">
          <Link href="/">
            <motion.span
              className="text-lg font-bold text-blue-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Richard Hudson
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <motion.li
                key={item.href}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link
                  href={item.href}
                  className={`border-b-2 ${
                    pathname === item.href
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent hover:text-blue-600'
                  } transition-colors pb-1`}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Desktop Download Button */}
          <div className="hidden md:block">
            <NavigationButton
              onClick={handleDownload}
              disabled={isLoading}
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="hover:scale-105 transition-transform"
              aria-label="Download Resume (PDF)"
            >
              Download Resume (PDF)
            </NavigationButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-neutral-200 bg-white"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-2 ${
                        pathname === item.href
                          ? 'text-blue-600 font-bold'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <NavigationButton
                  onClick={handleDownload}
                  disabled={isLoading}
                  variant="primary"
                  size="md"
                  isLoading={isLoading}
                  className="w-full"
                  aria-label="Download Resume (PDF)"
                >
                  Download Resume (PDF)
                </NavigationButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollProgress && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

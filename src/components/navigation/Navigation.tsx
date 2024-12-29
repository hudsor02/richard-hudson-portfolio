'use client';

import { NavigationButton } from '@/components/ui/Buttons/NavigationDownloadButton';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav
      className={`fixed top-0 w-full bg-white border-b border-neutral-200 shadow-sm z-10 ${
        isScrolled ? 'backdrop-blur-md' : ''
      }`}
    >
      <div className="flex items-center justify-between max-w-5xl p-4 mx-auto">
        <Link href="/" className="text-lg font-bold text-blue-primary">
          Richard Hudson
        </Link>
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
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
            </li>
          ))}
        </ul>

        {/* Desktop Navigation Button */}
        <div className="hidden md:block">
          <NavigationButton
            onClick={handleDownload}
            disabled={isLoading}
            variant="primary"
            size="md"
            isLoading={isLoading}
            aria-label="Download Resume (PDF)"
          >
            Download Resume (PDF)
          </NavigationButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-200">
          <div className="p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 ${
                  pathname === item.href
                    ? 'text-blue-600 font-bold'
                    : 'text-neutral-600 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
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
        </div>
      )}
    </nav>
  );
};

export default Navigation;

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Resume', path: '/resume' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
  { name: 'Consulting/Services', path: '/consulting-services' },
];

export default function TopNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-900/80 dark:border-neutral-800"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-primary-600 dark:text-primary-400"
        >
          Richard Hudson
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.path
                    ? 'bg-primary-500 text-white dark:bg-primary-600'
                    : 'text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

// src/components/navigation/Footer.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const pathname = usePathname();

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/resume', label: 'Resume' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/consult', label: 'Consulting Services' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    {
      href: 'https://github.com/hudsor02',
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/richard-hudson-jr/',
      label: 'LinkedIn',
    },
    {
      href: 'mailto:richard@richardwhudsonjr.com',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Email',
    },
  ];

  return (
    <footer className="w-full bg-white border-t border-neutral-200">
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-lg font-bold text-blue-primary">
              Richard Hudson
            </Link>
            <p className="text-sm text-neutral-600">
              Revenue Operations Professional specializing in data-driven solutions and strategic optimizations.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-neutral-900">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm ${
                      pathname === link.href
                        ? 'text-blue-600 font-semibold'
                        : 'text-neutral-600 hover:text-blue-600'
                    } transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-neutral-900">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors text-neutral-600 hover:text-blue-600"
                  aria-label={link.label}
                >
                  {link.icon || <ExternalLink className="w-5 h-5" />}
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-neutral-200">
          <p className="text-sm text-center text-neutral-600">
            © {new Date().getFullYear()} Richard Hudson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
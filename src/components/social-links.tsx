// src/components/social-links.tsx
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Mail, Globe } from 'lucide-react';
import { SiGithub, SiLinkedin } from 'react-icons/si';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/richardwhudsonjr',
    icon: SiLinkedin,
    color: 'hover:text-[#0077b5]',
    label: 'Connect on LinkedIn',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/richardwhudsonjr',
    icon: SiGithub,
    color: 'hover:text-[#333] dark:hover:text-white',
    label: 'View GitHub Profile',
  },
  {
    name: 'Email',
    href: 'mailto:hudsor01@icloud.com',
    icon: Mail,
    color: 'hover:text-[#EA4335]',
    label: 'Send an email',
  },
  {
    name: 'Website',
    href: 'https://richardwhudsonjr.com',
    icon: Globe,
    color: 'hover:text-primary-600',
    label: 'Visit Website',
  },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export function SocialLinks({ className, iconSize = 24 }: SocialLinksProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('flex items-center gap-4', className)}
    >
      {socialLinks.map(({ name, href, icon: Icon, color, label }) => (
        <motion.a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'transition-colors duration-200',
            'text-neutral-600 dark:text-neutral-400',
            color
          )}
          aria-label={label}
        >
          <Icon size={iconSize} />
          <span className="sr-only">{label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}

export default SocialLinks;

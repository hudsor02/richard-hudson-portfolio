// src/components/ui/section-header.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  title: string;
  toggleable?: boolean;
  section?: string;
  onToggleAction?: (section: string) => void;
  expandedSections?: Record<string, boolean>;
  className?: string;
}

export function SectionHeader({
  title,
  toggleable = false,
  section = '',
  onToggleAction = () => {},
  expandedSections = {},
  className,
}: SectionHeaderProps) {
  const isExpanded = toggleable && expandedSections[section];

  return (
    <div
      className={cn(
        'relative mb-4 border-b border-neutral-200 dark:border-neutral-700',
        className
      )}
    >
      <h2
        className="pb-2 text-center text-lg font-bold text-neutral-900 dark:text-neutral-100"
        id={`section-${section}`}
      >
        {title}
      </h2>

      {toggleable && (
        <motion.button
          onClick={() => onToggleAction(section)}
          className="absolute right-0 top-0 p-2 text-neutral-700 dark:text-neutral-400 hover:text-primary-500 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={isExpanded}
          aria-controls={`section-content-${section}`}
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          {isExpanded ? '-' : '+'}
        </motion.button>
      )}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleGradient?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'left',
  titleGradient = false,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      className={`mb-12 max-w-2xl ${alignmentClasses[align]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className={`text-3xl font-bold mb-4 ${
          titleGradient
            ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'
            : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;

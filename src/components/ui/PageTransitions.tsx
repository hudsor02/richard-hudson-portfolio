'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

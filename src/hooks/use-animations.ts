import { Variants } from 'framer-motion';

export const useAnimations = () => {
  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleOnHover: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const slideInFromRight: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const pulseAnimation: Variants = {
    initial: { scale: 1 },
    pulse: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
      },
    },
  };

  return {
    fadeInUp,
    staggerContainer,
    scaleOnHover,
    slideInFromRight,
    pulseAnimation,
  };
};

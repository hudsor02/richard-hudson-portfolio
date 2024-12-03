// src/components/ui/ScrollProgress.tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  height?: number; // Option to customize the height of the progress bar
  color?: string; // Option to customize the color of the progress bar
}

export function ScrollProgress({
  height = 4, // Default height of 4px
  color = 'bg-primary-500', // Default color class for the progress bar
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Responsive hook to hide scroll progress on smaller screens (optional)
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 768); // Hide progress bar if viewport width < 768px
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    isVisible && (
      <motion.div
        className={`fixed left-0 right-0 top-0 z-50 origin-left ${color}`}
        style={{ scaleX, height }}
        aria-hidden="true" // Hides the progress bar from screen readers since it’s visual-only
      />
    )
  );
}

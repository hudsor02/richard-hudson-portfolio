// src/components/lazy-loading.tsx
'use client';

import { useEffect, useState } from 'react';
import { SkeletonLoader } from './loading';

interface DelayedLoadingProps {
  children: React.ReactNode;
  delay?: number;
}

export function DelayedLoading({ children, delay = 400 }: DelayedLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (isLoading) {
    return <SkeletonLoader className="h-8 w-full" />;
  }

  return <>{children}</>;
}

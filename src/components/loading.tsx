// src/components/loading.tsx
'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
} as const;

export function FullPageLoader({ size = 'md', className }: LoaderProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2
        className={cn(
          'animate-spin text-primary-600 dark:text-primary-400',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

export function ContentLoader() {
  return (
    <div className="w-24 h-6 rounded-md bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
  );
}

export function SkeletonLoader({
  className,
  width = 'w-24',
  height = 'h-6',
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-md animate-pulse',
        'bg-neutral-200 dark:bg-neutral-700',
        width,
        height,
        className
      )}
    />
  );
}

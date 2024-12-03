'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-900/80">
      <Loader2
        className={cn(
          'animate-spin text-blue-600 dark:text-blue-400',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

export function ContentLoader() {
  return (
    <div className="w-24 h-6 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
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
        'bg-gray-200 dark:bg-gray-700',
        width,
        height,
        className
      )}
    />
  );
}

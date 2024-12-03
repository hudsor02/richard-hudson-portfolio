'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default:
      'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100',
    outline:
      'border border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100',
    success:
      'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100',
    warning:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100',
    error: 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

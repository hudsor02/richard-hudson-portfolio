'use client';

import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

interface NavigationButtonProps
  extends Omit<
    HTMLMotionProps<'button'>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  > {
  variant?: 'default' | 'outline' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
}

export const NavigationButton = forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(
  (
    {
      variant = 'default',
      size = 'md',
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    );

    const variants = {
      default: 'bg-neutral-900 text-white hover:bg-neutral-800',
      outline:
        'border-2 border-neutral-300 bg-transparent hover:bg-neutral-100',
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow',
      ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const motionProps: HTMLMotionProps<'button'> = {
      whileTap: { scale: 0.98 },
      whileHover: { scale: 1.02 },
      transition: { duration: 0.2 },
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || disabled}
        {...motionProps}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

NavigationButton.displayName = 'NavigationButton';

export type { NavigationButtonProps };

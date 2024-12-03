'use client';

import { Loader2 } from 'lucide-react';
import React, { ReactNode } from 'react';

interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  variant: 'default' | 'outline' | 'primary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  isLoading: boolean;
  'aria-label': string;
  children: ReactNode;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  disabled,
  variant,
  size,
  isLoading,
  'aria-label': ariaLabel,
  children,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default:
      'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200',
    outline:
      'border border-neutral-300 bg-transparent hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800',
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600',
    ghost:
      'bg-transparent text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800',
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
      aria-label={ariaLabel}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
};

export default NavigationButton;

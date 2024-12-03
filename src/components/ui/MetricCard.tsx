'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  metric: string;
  label: string;
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  metric,
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-6 text-center',
        'rounded-lg shadow-md bg-white dark:bg-neutral-800',
        'transition-transform transform hover:scale-105 duration-200 ease-in-out',
        className
      )}
    >
      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
        {metric}
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
};

export { MetricsCard };

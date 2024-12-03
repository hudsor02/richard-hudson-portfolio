// src/components/ui/card.tsx
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const Card = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm',
      'dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('border-b border-neutral-200 px-4 py-2 dark:border-neutral-800', className)}
    {...props}
  >
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-lg font-semibold text-neutral-900 dark:text-neutral-100', className)}
    {...props}
  >
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-4', className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export { Card, CardHeader, CardTitle, CardContent };

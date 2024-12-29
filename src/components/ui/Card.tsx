'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  interactive?: boolean;
}

const Card = ({
  className,
  children,
  hover = true,
  interactive = true,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-neutral-200 bg-white shadow-sm',
        hover && 'hover:shadow-lg',
        interactive && 'transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('border-b border-neutral-200 p-6', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-xl font-semibold text-neutral-900', className)}
    {...props}
  >
    {children}
  </h3>
);

const CardContent = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('border-t border-neutral-200 p-6', className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card, CardHeader, CardTitle, CardContent, CardFooter };

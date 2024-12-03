// src/components/ui/TextArea.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; // Optional label for accessibility
  errorMessage?: string; // Optional error message for validation
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm',
            'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
            'focus-visible:ring-primary-500 focus-visible:outline-none focus-visible:ring-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950',
            'resize-none',
            className
          )}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${props.id}-error` : undefined}
          {...props}
        />
        {errorMessage && (
          <p
            id={`${props.id}-error`}
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };

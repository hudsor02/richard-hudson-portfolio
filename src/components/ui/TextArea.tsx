import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none bg-white text-gray-900 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-red-500 focus:ring-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  errorMessage?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, variant, label, errorMessage, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-900"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            textareaVariants({
              variant: errorMessage ? 'error' : variant,
              className,
            })
          )}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? `${id}-error` : undefined}
          {...props}
        />
        {errorMessage && (
          <p id={`${id}-error`} className="text-sm text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };

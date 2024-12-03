'use client';

import { cn } from '@/lib/utils';
import { Root as LabelPrimitiveRoot } from '@radix-ui/react-label';
import * as React from 'react';

// Forward ref for the Label component using Radix UI's Root
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitiveRoot>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitiveRoot>
>(({ className, ...props }, ref) => (
  <LabelPrimitiveRoot
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
Label.displayName = 'Label';

export { Label };

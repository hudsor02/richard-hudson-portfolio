'use client';

import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  delayDuration?: number; // Delay in ms before tooltip appears
  side?: 'top' | 'bottom' | 'left' | 'right'; // Tooltip position
  align?: 'start' | 'center' | 'end'; // Alignment relative to the trigger
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delayDuration = 200,
  side = 'top',
  align = 'center',
}) => {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          className={cn(
            'z-50 rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md dark:bg-neutral-100 dark:text-black',
            'animate-in fade-in-50 slide-in-from-bottom-2'
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-neutral-900 dark:fill-neutral-100" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

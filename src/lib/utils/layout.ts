import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sectionSpacing = 'py-12 md:py-16 lg:py-24';
export const containerPadding = 'px-4 sm:px-6 lg:px-8';
export const maxWidthContainer = 'max-w-7xl mx-auto';

export const gridLayout = {
  base: 'grid gap-6',
  cols: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },
};

export const flexLayout = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  start: 'flex items-start justify-start',
  column: 'flex flex-col',
};

export const textStyles = {
  h1: 'text-4xl md:text-5xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl font-semibold tracking-tight',
  h3: 'text-2xl md:text-3xl font-semibold tracking-tight',
  h4: 'text-xl md:text-2xl font-semibold',
  p: 'text-base md:text-lg leading-relaxed',
  small: 'text-sm leading-normal',
};

export const cardStyles = {
  base: 'rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200',
  interactive: 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200',
  padding: 'p-4 sm:p-6',
};
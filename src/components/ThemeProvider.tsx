'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

type Attribute = 'class' | 'data-theme' | 'data-mode';

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  themes?: string[];
  forcedTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// src/providers/theme-provider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system';
  storageKey: string;
}

const defaultConfig: ThemeConfig = {
  defaultTheme: 'system',
  storageKey: 'theme-preference',
};

export function ThemeProvider({
  children,
  config = defaultConfig,
  ...props
}: ThemeProviderProps & { config?: ThemeConfig }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={config.defaultTheme}
      enableSystem
      disableTransitionOnChange
      storageKey={config.storageKey}
      {...props}
    >
      <ThemeScript />
      {children}
    </NextThemesProvider>
  );
}

// Prevents theme flash on load
function ThemeScript() {
  const blockingScript = `
    (function() {
      try {
        const storageKey = 'theme-preference';
        const theme = localStorage.getItem(storageKey) || 'system';

        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', systemTheme === 'dark');
        } else {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
      } catch (e) {
        console.warn('Failed to set theme', e);
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: blockingScript }}
      suppressHydrationWarning
    />
  );
}

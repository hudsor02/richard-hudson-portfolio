'use client';

import { useTheme } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: theme === 'dark' ? '#1f2937' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#111827',
          borderRadius: '0.5rem',
          boxShadow:
            theme === 'dark'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
      }}
    />
  );
}

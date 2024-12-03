// src/components/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4">
      <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
        Something went wrong!
      </h2>
      <p className="mb-4 text-neutral-600 dark:text-neutral-400">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

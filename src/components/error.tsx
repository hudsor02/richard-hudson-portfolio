'use client';

import { useEffect } from 'react';

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

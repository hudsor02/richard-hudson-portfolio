'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      theme="light"
      className="toaster-wrapper"
      position="bottom-right"
      closeButton
      richColors
      expand
    />
  );
}

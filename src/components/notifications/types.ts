// src/components/notifications/types.ts
export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export interface CustomToastProps {
  title?: string;
  description?: string;
  type?: ToastType;
  toastId?: string;
}

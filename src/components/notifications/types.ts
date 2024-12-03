export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
}

export interface CustomToastProps extends ToastOptions {
  type?: ToastType;
  toastId?: string;
  onDismiss?: () => void;
}

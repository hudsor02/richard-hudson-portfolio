// src/components/notifications/ToastManager.tsx
'use client';

import { toast } from 'react-hot-toast';
import { CustomToast } from './CustomToast';

type ToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
};

export const ToastManager = {
  success: (options: ToastOptions) => {
    return toast.custom(
      t => (
        <CustomToast
          type="success"
          title={options.title}
          description={options.description}
          toastId={t.id}
        />
      ),
      {
        duration: options.duration ?? 5000,
      }
    );
  },

  error: (options: ToastOptions) => {
    return toast.custom(
      t => (
        <CustomToast
          type="error"
          title={options.title}
          description={options.description}
          toastId={t.id}
        />
      ),
      {
        duration: options.duration ?? 7000,
      }
    );
  },

  info: (options: ToastOptions) => {
    return toast.custom(
      t => (
        <CustomToast
          type="info"
          title={options.title}
          description={options.description}
          toastId={t.id}
        />
      ),
      {
        duration: options.duration ?? 5000,
      }
    );
  },
};

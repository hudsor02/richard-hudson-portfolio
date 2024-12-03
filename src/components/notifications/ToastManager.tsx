'use client';

import { toast } from 'sonner';

import type { ToastOptions } from './types';

export const ToastManager = {
  success: (options: ToastOptions) => {
    return toast.success(options.title, {
      description: options.description,
      duration: options.duration ?? 5000,
      action: options.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
      cancel: options.cancel && {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      },
    });
  },

  error: (options: ToastOptions) => {
    return toast.error(options.title, {
      description: options.description,
      duration: options.duration ?? 7000,
      action: options.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
      cancel: options.cancel && {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      },
    });
  },

  info: (options: ToastOptions) => {
    return toast.info(options.title, {
      description: options.description,
      duration: options.duration ?? 5000,
      action: options.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
      cancel: options.cancel && {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      },
    });
  },

  warning: (options: ToastOptions) => {
    return toast.warning(options.title, {
      description: options.description,
      duration: options.duration ?? 6000,
      action: options.action && {
        label: options.action.label,
        onClick: options.action.onClick,
      },
      cancel: options.cancel && {
        label: options.cancel.label,
        onClick: options.cancel.onClick,
      },
    });
  },

  promise: async <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, options);
  },
};

// src/components/ui/Toast.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const toastVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
};

type ToastProps = {
  title: string;
  description?: string;
  onDismiss: () => void;
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, onDismiss }, ref) => (
    <motion.div
      ref={ref}
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-start gap-3 rounded-lg p-4 shadow-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
      role="alert"
      aria-live="assertive"
    >
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={onDismiss}
        className="ml-auto p-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-all"
        aria-label="Dismiss notification"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  )
);

Toast.displayName = 'Toast';

export default Toast;

'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"
    />
  </div>
);

// Dynamically import InvoiceContent with loading state
const InvoiceContent = dynamic(
  () =>
    import('@/components/invoice/InvoiceContent').then(
      (mod) => mod.InvoiceContent
    ),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function InvoiceGeneratorPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <InvoiceContent />
      </Suspense>
    </main>
  );
}

'use client';

import { motion } from 'framer-motion';

interface MetricCardProps {
  metric: string;
  description: string;
  icon?: React.ReactNode; // Optional icon prop
}

export function MetricCard({ metric, description, icon }: MetricCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 text-center shadow-md"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <div className="text-2xl font-bold text-blue-600 mb-2">{metric}</div>
      <div className="text-sm text-neutral-600">{description}</div>
    </motion.div>
  );
}

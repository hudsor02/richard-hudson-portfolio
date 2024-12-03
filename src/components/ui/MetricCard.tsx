// src/components/ui/MetricCard.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface MetricCardProps {
  metric: string;
  description: string;
  icon: React.ReactElement;
}

const MetricCard: React.FC<MetricCardProps> = ({
  metric,
  description,
  icon,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 text-center shadow-md flex flex-col items-center justify-center"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-2xl font-bold text-blue-600 mb-2">{metric}</div>
      <div className="text-sm text-neutral-600">{description}</div>
    </motion.div>
  );
};

export default MetricCard;

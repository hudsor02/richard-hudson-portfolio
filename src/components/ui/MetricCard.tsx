'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface MetricCardProps {
  metric: string;
  description: string;
  icon: React.ReactElement;
  formatOptions?: {
    prefix?: string;
    suffix?: string;
    addCommas?: boolean;
  };
}

const MetricCard = ({
  metric,
  description,
  icon,
  formatOptions = {},
}: MetricCardProps) => {
  const formatNumber = (value: string) => {
    // Keep any alphabetic suffixes (like 'M' or 'K')
    const suffix = value.match(/[A-Za-z]+$/)?.[0] || '';
    const numericValue = value.replace(/[^0-9.]/g, '');

    let formattedNumber = numericValue;
    if (formatOptions.addCommas) {
      formattedNumber = Number(numericValue).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      });
    }

    return `${formattedNumber}${suffix}`;
  };

  const formattedMetric = `${formatOptions.prefix || ''}${formatNumber(metric)}${formatOptions.suffix || ''}`;

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          className="mb-4"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
        >
          {React.cloneElement(icon, {
            className: `w-12 h-12 ${icon.props.className || 'text-blue-600'}`,
          })}
        </motion.div>

        <div className="text-3xl font-bold">
          <motion.span
            className="text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {formattedMetric}
          </motion.span>
        </div>

        <motion.p
          className="mt-2 text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default MetricCard;

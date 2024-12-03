// src/components/ui/MetricsSection.tsx
import React from 'react';
import { FaChartLine, FaUsers, FaCheckCircle } from 'react-icons/fa';

import MetricCard from './MetricCard';

const metrics = [
  {
    metric: '$1.1M+',
    description: 'Annual Revenue Growth',
    icon: <FaChartLine className="text-blue-600 text-4xl" />,
  },
  {
    metric: '2,200%',
    description: 'Network Growth',
    icon: <FaUsers className="text-blue-600 text-4xl" />,
  },
  {
    metric: '100%',
    description: 'Commission Accuracy',
    icon: <FaCheckCircle className="text-blue-600 text-4xl" />,
  },
];

const MetricsSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center text-center">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric.metric}
              description={metric.description}
              icon={metric.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

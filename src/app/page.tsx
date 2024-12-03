// page.tsx
'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';

interface Metric {
  metric: string;
  label: string;
}

const metrics: Metric[] = [
  { metric: '$1.1M+', label: 'Annual Revenue' },
  { metric: '2,200%', label: 'Partner Growth' },
  { metric: '432%', label: 'Transaction Volume' },
  { metric: '100%', label: 'Commission Accuracy' },
];

export default function HomePage() {
  const metrics = [
    { label: 'Annual Revenue', value: '$1.1M+' },
    { label: 'Partner Growth', value: '2,200%' },
    { label: 'Transaction Volume', value: '432%' },
    { label: 'Commission Accuracy', value: '100%' },
  ];
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-4">
      <Hero
        name="Richard Hudson"
        title="Revenue Operations Consultant"
        description="Driving revenue growth through data-driven insights, process optimization, and strategic operational improvements."
        metrics={metrics}
        ctaPrimary={{
          label: 'View Resume',
          href: '/resume',
          icon: ArrowRight,
        }}
        ctaSecondary={{
          label: 'Contact Me',
          href: '/contact',
        }}
      />
      <section className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {metrics.map((metric) => (
          <motion.div
            key={`${metric.metric}-${metric.label}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2 text-center"
          >
            <p className="font-outfit text-2xl font-bold text-blue-600 md:text-3xl">
              {metric.metric}
            </p>
            <p className="font-jakarta text-sm text-neutral-600">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </section>
      <section className="space-y-6">
        <h2 className="font-outfit text-xl font-bold uppercase tracking-wide text-neutral-900">
          Professional Summary
        </h2>
        <p className="font-jakarta text-lg leading-relaxed text-neutral-600">
          Revenue Operations Professional with expertise in data-driven
          forecasting, process optimization, and cross-functional collaboration.
          Proven track record of driving revenue growth through analytical
          insights, partnership development, and strategic operational
          improvements.
        </p>
      </section>
    </div>
  );
}

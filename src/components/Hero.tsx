'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
}

export function Hero({
  name = 'Richard Hudson Jr.',
  title = 'Revenue Operations Consultant',
  description = 'Driving revenue growth through data-driven insights, process optimization, and strategic operational improvements.',
  metrics = [],
}: HeroProps) {
  return (
    <div className="container px-4 mx-auto">
      <motion.div
        className="flex flex-col items-center justify-center py-20 space-y-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold md:text-5xl text-neutral-900">
          {name}
        </h1>
        <h2 className="text-2xl font-semibold md:text-3xl text-blue-primary">
          {title}
        </h2>
        <p className="max-w-2xl text-lg text-neutral-600">{description}</p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/contact"
            className="px-8 py-2 text-white transition-colors rounded-md bg-blue-primary hover:bg-blue-hover"
          >
            Contact Me
          </Link>
          <Link
            href="/projects"
            className="px-8 py-2 transition-colors border-2 rounded-md border-neutral-200 hover:bg-neutral-50"
          >
            View Projects
          </Link>
        </div>

        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-6 mt-12 md:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-primary">
                  {metric.value}
                </div>
                <div className="text-sm text-neutral-600">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Hero;

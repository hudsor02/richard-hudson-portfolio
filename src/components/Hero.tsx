'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { LucideIcon } from 'lucide-react';

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
  name = 'Richard Hudson',
  title = 'Revenue Operations Consultant',
  description = 'Driving revenue growth through data-driven insights, process optimization, and strategic operational improvements.',
  metrics = [],
}: HeroProps) {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="flex flex-col items-center justify-center text-center py-20 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">{name}</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-primary">{title}</h2>
        <p className="max-w-2xl text-lg text-neutral-600">{description}</p>

        <div className="flex gap-4 mt-8">
          <Link href="/contact">
            <Button
              className="px-8 py-2 bg-blue-primary hover:bg-blue-hover text-white rounded-md transition-colors"
            >
              Contact Me
            </Button>
          </Link>
          <Link href="/projects">
            <Button
              variant="outline"
              className="px-8 py-2 border-2 border-neutral-200 hover:bg-neutral-50 rounded-md transition-colors"
            >
              View Projects
            </Button>
          </Link>
        </div>

        {metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-primary">{metric.value}</div>
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
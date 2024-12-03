'use client';

import { motion } from 'framer-motion';
import { ChartBar, Users, Zap } from 'lucide-react';
import SectionHeader from '@/components/section-header';

const services = [
  {
    icon: ChartBar,
    title: 'Revenue Optimization',
    description:
      'Data-driven strategies to maximize revenue growth and operational efficiency.',
    link: '/services#revenue-optimization',
  },
  {
    icon: Users,
    title: 'Partnership Development',
    description:
      'Strategic partnership programs that drive sustainable business growth.',
    link: '/services#partnerships',
  },
  {
    icon: Zap,
    title: 'Process Automation',
    description:
      'Streamlined workflows and automated systems for improved productivity.',
    link: '/services#automation',
  },
] as const;

export default function Services() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader title="How I Can Help" />
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="h-full rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-neutral-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                aria-label={`Service: ${service.title}`}
              >
                <div className="mb-4 flex items-center justify-center">
                  <Icon
                    className="text-primary-500 h-12 w-12"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-neutral-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-center text-neutral-600 dark:text-neutral-300">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

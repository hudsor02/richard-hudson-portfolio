'use client';

import { motion } from 'framer-motion';
import { BarChart2, Users, Zap, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Metric {
  label: string;
  value: string;
}

interface Project {
  title: string;
  description: string;
  icon: React.ElementType;
  path?: string;
  category: string;
  metrics: Metric[];
  tags: string[];
  isInteractive?: boolean;
}

const projects: Project[] = [
  {
    title: 'Invoice Generator',
    description:
      'Create professional invoices instantly with our dynamic generator. Features include PDF export, email integration, and customizable templates.',
    icon: FileText,
    path: '/projects/invoice-generator',
    category: 'Web Application',
    isInteractive: true,
    metrics: [
      { label: 'Features', value: '10+' },
      { label: 'Templates', value: '3' },
      { label: 'Export Options', value: '2' },
    ],
    tags: ['React', 'TypeScript', 'PDF Generation'],
  },
  {
    title: 'Revenue Operations Strategy',
    description:
      'Strategic implementation of revenue operations framework resulting in significant growth and improved efficiency across multiple channels.',
    icon: BarChart2,
    category: 'Business Strategy',
    metrics: [
      { label: 'Revenue Growth', value: '$1.1M+' },
      { label: 'Partner Growth', value: '2,200%' },
      { label: 'Process Efficiency', value: '85%' },
    ],
    tags: ['Strategy', 'Revenue Ops', 'Analytics'],
  },
  {
    title: 'Partner Network Expansion',
    description:
      'Comprehensive partner acquisition program design and implementation, driving exponential network growth and improved market presence.',
    icon: Users,
    category: 'Business Development',
    metrics: [
      { label: 'New Partners', value: '500+' },
      { label: 'Transaction Volume', value: '300%↑' },
      { label: 'Partner Satisfaction', value: '95%' },
    ],
    tags: ['Partnerships', 'Growth', 'Strategy'],
  },
  {
    title: 'Process Automation Initiative',
    description:
      'End-to-end implementation of automation solutions, streamlining operations and significantly reducing manual intervention in key processes.',
    icon: Zap,
    category: 'Operations',
    metrics: [
      { label: 'Time Saved', value: '2,000 hrs' },
      { label: 'Error Reduction', value: '95%' },
      { label: 'ROI', value: '250%' },
    ],
    tags: ['Automation', 'Integration', 'Efficiency'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsContent() {
  return (
    <main className="container mx-auto px-4 py-16 mt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          variants={itemVariants}
        >
          Featured Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="relative group"
            >
              <Link href={project.path || '#'}>
                <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
                  <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <project.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {project.title}
                        </h2>
                        <span className="text-sm text-gray-500">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {project.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6 mt-auto">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="bg-gray-50 rounded-lg p-3 text-center"
                        >
                          <p className="text-lg font-bold text-gray-900">
                            {metric.value}
                          </p>
                          <p className="text-xs text-gray-600">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Call to action */}
                    <div className="flex items-center justify-end mt-auto pt-4 border-t border-gray-100">
                      <span className="text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        {project.isInteractive ? 'Try it out' : 'Learn more'}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}

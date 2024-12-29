'use client';

// src/components/about/AboutContent.tsx
import { Button } from '@/components/ui/Buttons/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { LineChart, Users, Database, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const expertiseAreas = [
  {
    title: 'Revenue Optimization',
    description:
      'Data-driven strategies to maximize revenue growth and operational efficiency.',
    icon: LineChart,
  },
  {
    title: 'Partnership Development',
    description:
      'Strategic partnership programs that drive sustainable business growth.',
    icon: Users,
  },
  {
    title: 'Process Automation',
    description:
      'Streamlined workflows and automated systems for improved productivity.',
    icon: Zap,
  },
  {
    title: 'Data Analytics',
    description:
      'Leveraging data to provide actionable insights and drive decision-making.',
    icon: Database,
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

export function AboutContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl px-4 py-16 mx-auto space-y-16">
        {/* Hero Section */}
        <motion.section
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            variants={itemVariants}
          >
            About Me
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            I am Richard Hudson, a Revenue Operations Professional specializing
            in data-driven solutions and strategic optimizations that drive
            growth. I bridge the gap between sales, marketing, and customer
            success teams to create unified strategies that maximize results.
          </motion.p>
        </motion.section>

        {/* Expertise Areas */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            Areas of Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, _index) => (
              <motion.div key={area.title} variants={itemVariants}>
                <Card className="h-full">
                  <Card.Content>
                    <div className="flex items-center gap-4 mb-4">
                      <area.icon className="w-8 h-8 text-blue-600" />
                      <h3 className="text-xl font-semibold">{area.title}</h3>
                    </div>
                    <p className="text-gray-600">{area.description}</p>
                  </Card.Content>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center bg-blue-50 rounded-2xl p-8 md:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            Let&apos;s Work Together
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Looking to optimize your revenue operations or explore partnership
            opportunities? Let&apos;s discuss how I can help drive your business
            growth.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/contact">
              <Button size="lg">Get in Touch</Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

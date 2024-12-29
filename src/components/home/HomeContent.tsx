'use client';

import { Button } from '@/components/ui/Buttons/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import MetricCard from '@/components/ui/MetricCard';
import { resumeData } from '@/lib/resume/resume-data';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  LineChart as LineChartIcon,
  Users,
  BarChart2,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';

const metrics = [
  {
    metric: '1.1M',
    description: 'Revenue Growth',
    icon: <LineChartIcon className="text-blue-600" />,
    formatOptions: {
      prefix: '$',
      addCommas: true,
    },
  },
  {
    metric: '2200',
    description: 'Partner Network Growth',
    icon: <Users className="text-blue-600" />,
    formatOptions: {
      addCommas: true,
      suffix: '%',
    },
  },
  {
    metric: '85',
    description: 'Process Efficiency',
    icon: <BarChart2 className="text-blue-600" />,
    formatOptions: {
      suffix: '%',
    },
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

export function HomeContent() {
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [experienceRef, experienceInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {resumeData.header.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mb-8"
          >
            {resumeData.summary}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link href="/contact">
              <Button>
                Let&apos;s Connect <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Metrics Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Latest Experience */}
      <motion.section
        ref={experienceRef}
        initial={{ opacity: 0, y: 20 }}
        animate={experienceInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <Card>
          <CardHeader>
            <CardTitle>Latest Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {resumeData.experience[0].position}
              </h3>
              <p className="text-gray-600">
                {resumeData.experience[0].company} •{' '}
                {resumeData.experience[0].location.city},{' '}
                {resumeData.experience[0].location.state}
              </p>
              <ul className="space-y-3">
                {resumeData.experience[0].achievements
                  .slice(0, 3)
                  .map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{achievement}</span>
                    </motion.li>
                  ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/resume">
              <Button>
                View Full Resume <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.section>

      {/* Areas of Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Areas of Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resumeData.technicalExpertise.categories
                .slice(0, 6)
                .map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {category.title}
                    </h3>
                    <ul className="space-y-1">
                      {category.skills.slice(0, 3).map((skill, skillIndex) => (
                        <li key={skillIndex} className="text-gray-600 text-sm">
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/about">
              <Button>
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

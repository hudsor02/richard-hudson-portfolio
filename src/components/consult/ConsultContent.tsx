'use client';

// src/components/consult/ConsultContent.tsx
import { ContactForm } from '@/components/forms/ContactForm';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { CheckCircle2, BarChart, Users, Zap, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Revenue Operations Strategy',
    description:
      'Develop comprehensive revenue operations strategies to drive growth and efficiency.',
    icon: BarChart,
    features: [
      'Process Optimization',
      'Revenue Forecasting',
      'Growth Strategy',
      'KPI Development',
    ],
    benefits: [
      'Increased Revenue',
      'Improved Efficiency',
      'Better Forecasting',
      'Data-Driven Decisions',
    ],
  },
  {
    title: 'Partnership Development',
    description:
      'Build and scale partner networks to expand market reach and drive transaction volume.',
    icon: Users,
    features: [
      'Network Expansion',
      'Partner Management',
      'Growth Planning',
      'Relationship Building',
    ],
    benefits: [
      'Market Expansion',
      'Revenue Growth',
      'Strategic Alliances',
      'Competitive Advantage',
    ],
  },
  {
    title: 'Systems Integration',
    description:
      'Streamline operations through effective systems integration and automation.',
    icon: Zap,
    features: [
      'Workflow Automation',
      'Data Integration',
      'Process Efficiency',
      'System Optimization',
    ],
    benefits: [
      'Reduced Costs',
      'Improved Accuracy',
      'Faster Processing',
      'Better Scalability',
    ],
  },
];

const areas = [
  'Revenue Operations',
  'Process Optimization',
  'Data Analytics',
  'Strategic Planning',
  'Partner Management',
  'Automation',
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

export function ConsultContent() {
  return (
    <main className="px-4 py-16 mx-auto mt-16 max-w-7xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="mb-4 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Consulting Services
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Expert guidance to optimize your revenue operations and drive
            sustainable growth
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {services.map((service, _index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <service.icon className="w-8 h-8 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mb-6 text-gray-600">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    className="mt-4 text-blue-600 flex items-center gap-1"
                    whileHover={{ x: 5 }}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Consultation Form Section */}
        <motion.div
          className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <h2 className="mb-6 text-2xl font-bold text-center">
            Schedule a Consultation
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {areas.map((area) => (
              <Badge
                key={area}
                variant="outline"
                className="text-blue-600 border-blue-200 bg-blue-50"
              >
                {area}
              </Badge>
            ))}
          </div>
          <ContactForm />
        </motion.div>
      </motion.div>
    </main>
  );
}

// src/app/about/page.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { SocialLinks } from '@/components/social-links';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-neutral-900">
            About Me
          </h1>
          <p className="text-xl text-neutral-600">
            I am Richard Hudson, a Revenue Operations Professional specializing
            in data-driven solutions and strategic optimizations that drive
            growth.
          </p>
        </motion.section>

        {/* Approach Section */}
        <Card className="p-8 bg-neutral-100">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 text-lg text-neutral-800"
          >
            As a Revenue Operations Consultant, I help businesses optimize their
            revenue processes through data-driven insights and strategic
            operational improvements. I bridge the gap between sales, marketing,
            and customer success teams to create a unified approach to revenue
            growth.
          </motion.p>

          <h2 className="mb-4 text-2xl font-bold text-neutral-900">
            My Approach
          </h2>
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="mb-6 space-y-2 text-neutral-800"
          >
            {[
              '✅ Data-driven decision making',
              '✅ Process optimization and automation',
              '✅ Cross-functional collaboration',
              '✅ Strategic planning and implementation',
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Card>

        {/* Connect Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-6 text-2xl font-bold text-neutral-900">
            Connect With Me
          </h2>
          <SocialLinks />
        </motion.section>
      </div>
    </main>
  );
}

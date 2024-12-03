'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import DownloadButtons from '@/components/download-buttons';
import { resumeData } from '@/lib/resume-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-4xl mx-auto space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-8">Resume</h1>
            <DownloadButtons />
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Key Highlights
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {resumeData.highlights.map((highlight) => (
                <MetricCard
                  key={highlight.description}
                  metric={highlight.metric}
                  description={highlight.description}
                />
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Professional Experience
            </h2>
            {resumeData.experience.map((job, index) => (
              <Card key={index} className="mb-6 p-6 bg-white text-neutral-900">
                <div className="mb-4 flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{job.position}</h3>
                    <p className="text-neutral-600">
                      {job.company} - {job.location}
                    </p>
                  </div>
                  <p className="text-blue-600">{job.dates}</p>
                </div>
                <ul className="space-y-3 list-disc pl-6">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="text-neutral-700">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <Card key={index} className="mb-6 p-6 bg-white text-neutral-900">
                <div className="mb-4 flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <p className="text-neutral-600">
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                  <p className="text-blue-600">{edu.graduationDate}</p>
                </div>
                {edu.description && (
                  <p className="text-neutral-700">{edu.description}</p>
                )}
              </Card>
            ))}
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resumeData.certifications.map((cert, index) => (
                <Card key={index} className="p-6 bg-white text-neutral-900">
                  <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                  <p className="text-neutral-600">
                    {cert.organization} | {cert.issueDate}
                  </p>
                </Card>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}

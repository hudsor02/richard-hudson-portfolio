'use client';

import ResumeDownloadButton from '@/components/ui/Buttons/ResumeDownloadButton';
import { resumeData } from '@/lib/resume/resume-data';
import { motion } from 'framer-motion';

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

export function ResumeContent() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-5xl px-4 py-8 mx-auto md:py-12">
        {/* Header Section */}
        <motion.section
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            {resumeData.header.name}
          </motion.h1>
          <motion.h2
            className="text-2xl text-gray-700 mb-6"
            variants={itemVariants}
          >
            {resumeData.header.title}
          </motion.h2>
          <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
            {resumeData.summary}
          </motion.p>
          <motion.div variants={itemVariants}>
            <ResumeDownloadButton className="w-full md:w-auto" />
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          className="bg-white rounded-lg shadow p-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Experience
          </motion.h2>
          {resumeData.experience.map((job, index) => (
            <motion.div
              key={index}
              className="mb-8 last:mb-0"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {job.position}
              </h3>
              <p className="text-gray-600 mb-4">
                {job.company} • {job.location.city}, {job.location.state}
              </p>
              <ul className="space-y-2">
                {job.achievements.map((achievement, idx) => (
                  <motion.li key={idx} className="flex" variants={itemVariants}>
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.section>

        {/* Technical Expertise Section */}
        <motion.section
          className="bg-white rounded-lg shadow p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-bold text-gray-900 mb-6"
            variants={itemVariants}
          >
            Technical Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.technicalExpertise.categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-gray-700">
                      {skill.name}
                      {skill.yearsOfExperience && (
                        <span className="text-gray-500 ml-2">
                          ({skill.yearsOfExperience}+ years)
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Fixed Download Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
        <ResumeDownloadButton className="w-full" />
      </div>
    </main>
  );
}

'use client';

import { resumeData } from '@/lib/resume/resume-data';

export default function Page() {
  const latestExperience = resumeData.experience[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {resumeData.header.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl">
            {resumeData.summary}
          </p>
        </div>
      </section>

      {/* Latest Experience */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Latest Experience
          </h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {latestExperience.position}
            </h3>
            <p className="text-gray-600">
              {latestExperience.company} • {latestExperience.location.city},{' '}
              {latestExperience.location.state}
            </p>
            <ul className="space-y-3">
              {latestExperience.achievements
                .slice(0, 3)
                .map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Technical Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {resumeData.technicalExpertise.categories.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex justify-between">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">
                        {skill.yearsOfExperience}+ years
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

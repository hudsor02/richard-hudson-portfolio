'use client';

import ResumeDownloadButton from '@/components/ui/Buttons/ResumeDownloadButton';
import { resumeData } from '@/lib/resume/resume-data';

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-5xl px-4 py-8 mx-auto md:py-12">
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {resumeData.header.name}
          </h1>
          <h2 className="text-2xl text-gray-700 mb-6">
            {resumeData.header.title}
          </h2>
          <p className="text-gray-600 mb-8">{resumeData.summary}</p>
          <ResumeDownloadButton className="w-full md:w-auto" />
        </section>

        {/* Experience Section */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
          {resumeData.experience.map((job, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h3 className="text-xl font-semibold text-gray-900">
                {job.position}
              </h3>
              <p className="text-gray-600 mb-4">
                {job.company} • {job.location.city}, {job.location.state}
              </p>
              <ul className="space-y-2">
                {job.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>

      {/* Fixed Download Button for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
        <ResumeDownloadButton className="w-full" />
      </div>
    </main>
  );
}

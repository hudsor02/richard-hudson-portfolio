// src/app/resume/page.tsx
import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { resumeData } from '@/lib/resume-data';
import DownloadButtons from '@/components/download-buttons';

export const metadata: Metadata = {
  title: 'Resume - Richard Hudson',
  description:
    'Professional resume of Richard Hudson - Revenue Operations Consultant',
};

export default function ResumePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-6">Resume</h1>
          <DownloadButtons />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Key Highlights</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {resumeData.highlights.map((highlight) => (
              <Card key={highlight.description} className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {highlight.metric}
                </div>
                <div className="text-sm text-gray-600">
                  {highlight.description}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Professional Summary</h2>
          <Card className="p-6">
            <p className="text-gray-700">{resumeData.summary}</p>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
          {resumeData.experience.map((job, index) => (
            <Card key={index} className="mb-6 p-6">
              <div className="mb-4 flex flex-col justify-between md:flex-row">
                <div>
                  <h3 className="text-xl font-bold">{job.position}</h3>
                  <p className="text-gray-600">
                    {job.company} - {job.location}
                  </p>
                </div>
                <p className="text-blue-600">{job.dates}</p>
              </div>
              <ul className="space-y-2 pl-6 list-disc">
                {job.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-700">
                    {achievement}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Technical Expertise</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {resumeData.technicalExpertise.columns.map((column, index) => (
              <Card key={index} className="p-6">
                <h3 className="mb-4 text-lg font-bold">{column.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {column.items.map((item, i) => (
                    <Badge key={i} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {resumeData.certifications.map((cert, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-bold">{cert.title}</h3>
                <p className="text-sm text-gray-600">
                  {cert.organization} - {cert.issueDate}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          {resumeData.education.map((edu, index) => (
            <Card key={index} className="mb-6 p-6">
              <div className="mb-4 flex flex-col justify-between md:flex-row">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-gray-600">
                    {edu.institution} - {edu.location}
                  </p>
                </div>
                <p className="text-blue-600">{edu.graduationDate}</p>
              </div>
              {edu.description && (
                <p className="text-gray-700">{edu.description}</p>
              )}
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}

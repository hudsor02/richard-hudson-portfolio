import { ResumeContent } from '@/components/resume/ResumeContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Richard Hudson',
  description:
    'Professional resume and career achievements of Richard Hudson in Revenue Operations and Process Optimization.',
  keywords: [
    'Resume',
    'Professional Experience',
    'Career Achievements',
    'Skills',
  ],
};

export default async function ResumePage() {
  return <ResumeContent />;
}

import { ProjectsContent } from '@/components/projects/ProjectsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Richard Hudson',
  description:
    'Explore innovative projects showcasing expertise in web development, revenue operations, and process automation.',
  keywords: [
    'Web Development Projects',
    'Revenue Operations',
    'Process Automation',
    'Invoice Generator',
    'Business Solutions',
    'React Applications',
    'TypeScript Projects',
  ],
  openGraph: {
    title: 'Projects | Richard Hudson',
    description:
      'Explore innovative projects showcasing expertise in web development, revenue operations, and process automation.',
    url: 'https://richardwhudsonjr.com/projects',
    siteName: 'Richard Hudson Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Richard Hudson',
    description:
      'Explore innovative projects showcasing expertise in web development, revenue operations, and process automation.',
  },
  alternates: {
    canonical: 'https://richardwhudsonjr.com/projects',
  },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsContent />
    </>
  );
}

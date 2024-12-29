import { AboutContent } from '@/components/about/AboutContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Richard Hudson',
  description:
    'Learn more about Richard Hudson, a Revenue Operations Professional specializing in data-driven solutions and strategic growth.',
  keywords: [
    'About Richard Hudson',
    'Revenue Operations Experience',
    'Professional Background',
  ],
};

export default async function AboutPage() {
  return (
    <>
      <AboutContent />
    </>
  );
}

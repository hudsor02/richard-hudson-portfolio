import { HomeContent } from '@/components/home/HomeContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Richard Hudson | Revenue Operations Professional',
  description:
    'Revenue Operations Professional specializing in data-driven solutions, process optimization, and strategic growth.',
  keywords: [
    'Revenue Operations',
    'Process Optimization',
    'Data Analytics',
    'Strategic Planning',
  ],
};

export default async function HomePage() {
  return (
    <>
      <HomeContent />
    </>
  );
}

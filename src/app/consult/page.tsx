import { ConsultContent } from '@/components/consult/ConsultContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulting Services | Richard Hudson',
  description:
    'Professional consulting services in Revenue Operations, Process Optimization, and Strategic Growth.',
  keywords: [
    'Consulting Services',
    'Revenue Operations Consulting',
    'Process Optimization',
    'Strategic Planning',
  ],
};

export default async function ConsultPage() {
  return (
    <>
      <ConsultContent />
    </>
  );
}

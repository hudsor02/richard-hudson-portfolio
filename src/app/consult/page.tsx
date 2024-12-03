'use client';

import { ConsultingCard, ContactForm, Badge } from '@/components/ui';
import { ContactFormType } from '@/types/contact';

const services = [
  {
    title: 'Revenue Operations Strategy',
    description:
      'Develop comprehensive revenue operations strategies to drive growth and efficiency.',
    features: [
      'Process Optimization',
      'Revenue Forecasting',
      'Growth Strategy',
    ],
  },
  {
    title: 'Partnership Development',
    description:
      'Build and scale partner networks to expand market reach and drive transaction volume.',
    features: ['Network Expansion', 'Partner Management', 'Growth Planning'],
  },
  {
    title: 'Systems Integration',
    description:
      'Streamline operations through effective systems integration and automation.',
    features: ['Workflow Automation', 'Data Integration', 'Process Efficiency'],
  },
];

const areas = [
  'Revenue Operations',
  'Process Optimization',
  'Data Analytics',
  'Strategic Planning',
];

export function ConsultationScheduleForm() {
  const handleSubmit = async (_data: ContactFormType) => {
    // Handle form submission
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center">
        Schedule a Consultation
      </h2>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {areas.map((area) => (
          <Badge
            key={area}
            variant="outline"
            className="text-blue-600 border-blue-200 bg-blue-50"
          >
            {area}
          </Badge>
        ))}
      </div>
      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
}
export default function ConsultPage() {
  return (
    <main className="px-4 py-16 mx-auto mt-16 max-w-7xl">
      <h1 className="mb-12 text-4xl font-bold text-center">
        Consulting Services
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ConsultingCard key={service.title} {...service} />
        ))}
      </div>
      <ConsultationScheduleForm />
    </main>
  );
}

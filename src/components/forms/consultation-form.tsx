'use client';

import { ContactForm } from '@/components/forms/ContactForm';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ContactFormType } from '@/types/contact';

interface ConsultationFormProps {
  onSubmit?: (data: ContactFormType) => Promise<void>;
}

const consultingAreas = [
  'Revenue Operations',
  'Process Optimization',
  'Data Analytics',
  'Strategic Planning',
];

export function ConsultationForm({ onSubmit }: ConsultationFormProps) {
  return (
    <Card className="max-w-2xl p-8 mx-auto bg-white shadow-lg">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Schedule a Consultation
          </h2>
          <p className="text-gray-600">
            Let us discuss how I can help optimize your revenue operations
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {consultingAreas.map((area) => (
            <Badge
              key={area}
              variant="outline"
              className="text-blue-600 border-blue-200 bg-blue-50"
            >
              {area}
            </Badge>
          ))}
        </div>

        <ContactForm onSubmit={onSubmit} />
      </div>
    </Card>
  );
}

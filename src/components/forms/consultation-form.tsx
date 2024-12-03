// src/components/forms/consultation-form.tsx
'use client';

import { ContactForm } from './ContactForm';
import { Badge } from '@/components/ui/Badge';

export function ConsultationForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-center text-2xl font-bold">
          Schedule a Consultation
        </h2>
        <p className="text-center text-neutral-600 dark:text-neutral-400">
          Let's discuss how I can help optimize your revenue operations
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Badge>Revenue Operations</Badge>
        <Badge>Process Optimization</Badge>
        <Badge>Data Analytics</Badge>
        <Badge>Strategic Planning</Badge>
      </div>

      <ContactForm
        type="consult"
        onSuccess={() => {
          // Additional success handling for consultations
          console.log('Consultation request submitted');
        }}
      />
    </div>
  );
}

// src/lib/validation/contact.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
  source: z.string().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

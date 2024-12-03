// src/lib/validation/contact.ts
import { z } from 'zod';
import { CONTACT_CONFIG } from '@/config/contact';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  source: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        size: z.number().max(CONTACT_CONFIG.MAX_FILE_SIZE, 'File is too large'),
        type: z
          .string()
          .refine(
            (type) => CONTACT_CONFIG.ALLOWED_FILE_TYPES.has(type),
            'Invalid file type'
          ),
      })
    )
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

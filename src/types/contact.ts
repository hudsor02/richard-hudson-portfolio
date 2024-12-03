// src/types/contact.ts
export type ContactFormType = 'contact' | 'consulting' | 'other';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

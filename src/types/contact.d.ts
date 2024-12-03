// contact.d.ts

export type ContactFormType = 'contact' | 'support' | 'feedback';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

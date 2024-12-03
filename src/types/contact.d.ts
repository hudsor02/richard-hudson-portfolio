// types/contact.d.ts
export type FormType = 'contact' | 'consultation' | 'support' | 'feedback';

export interface BaseFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  type: FormType;
}

export interface ConsultationFormData extends BaseFormData {
  preferredSchedule?: string;
  budget?: string;
  projectScope?: string;
  timezone?: string;
  industry?: string;
}

export interface SupportFormData extends BaseFormData {
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export type ContactFormData =
  | BaseFormData
  | ConsultationFormData
  | SupportFormData;

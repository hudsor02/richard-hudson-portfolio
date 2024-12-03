// types/contact.ts
export type FormType = 'contact' | 'consultation';

export type ContactFormType = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  type: FormType;
};

export type ConsultationType = ContactFormType & {
  preferredSchedule?: string;
  budget?: string;
  projectScope?: string;
};

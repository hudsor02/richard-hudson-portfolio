import { ContactContent } from '@/components/contact/ContactContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Richard Hudson',
  description:
    'Get in touch with Richard Hudson for consulting opportunities and professional inquiries.',
  keywords: [
    'Contact',
    'Professional Inquiries',
    'Consulting Opportunities',
    'Business Contact',
  ],
};

export default async function ContactPage() {
  return (
    <>
      <ContactContent />
    </>
  );
}

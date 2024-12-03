'use server';

import { ContactFormType } from '@/types/contact';

export async function submitContactAction(data: ContactFormType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: 'Failed to send message' };
  }
}

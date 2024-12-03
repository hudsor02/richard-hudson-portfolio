// src/app/api/consultation/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validations';

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    await limiter.check(3, 'CONSULTATION_FORM'); // Stricter rate limit for consultations

    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    await sendEmail(validatedData, 'consultation');

    return NextResponse.json(
      { message: 'Consultation request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing consultation form:', error);
    return NextResponse.json(
      { message: 'Failed to send consultation request' },
      { status: 500 }
    );
  }
}

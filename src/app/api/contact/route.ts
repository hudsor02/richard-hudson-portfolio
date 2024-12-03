// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import type { ContactFormType } from '@/types/contact';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    try {
      await limiter.check(5, 'CONTACT_FORM'); // 5 requests per minute
    } catch {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = (searchParams.get('type') as ContactFormType) || 'contact';

    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    await sendEmail(validatedData, type);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}

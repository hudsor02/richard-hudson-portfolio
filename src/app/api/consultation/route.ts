import { sendEmail } from '@/lib/email';
import { contactFormSchema } from '@/lib/validation/contact';
import { ContactFormType } from '@/types/contact';
import { NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { z } from 'zod';

// Initialize rate limiter with valid configuration
const limiter = new RateLimiterMemory({
  points: 3, // Allow 3 requests
  duration: 60, // Per 60 seconds (1 minute)
});

export async function POST(request: Request) {
  try {
    // Rate limiting: Identify user by IP or a default key
    const clientIP =
      request.headers.get('x-forwarded-for') || 'CONSULTATION_FORM';
    await limiter.consume(clientIP); // Consume 1 point for the request

    // Parse and validate the request body using the schema
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Add the missing type property
    const contactFormData: ContactFormType = {
      ...validatedData,
      type: 'consultation',
      subject: 'Consultation Request', // Add the subject property
    };

    // Send email for consultation request
    await sendEmail(contactFormData, 'consultation');

    return NextResponse.json(
      { message: 'Consultation request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing consultation form:', error);

    // Handle rate limiting errors
    if (error instanceof Error && error.message.includes('RateLimiter')) {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: (error as z.ZodError).errors },
        { status: 400 }
      );
    }

    // Handle generic errors
    return NextResponse.json(
      { message: 'Failed to send consultation request' },
      { status: 500 }
    );
  }
}

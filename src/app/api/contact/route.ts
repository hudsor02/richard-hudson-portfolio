import { sendEmail } from '@/lib/email';
import { contactFormSchema } from '@/lib/validation/contact';
import { FormType, ContactFormType } from '@/types/contact';
import { NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { z } from 'zod';

// Initialize rate limiter with valid configuration
const limiter = new RateLimiterMemory({
  points: 3, // Allow 3 requests
  duration: 60, // Per 60 seconds (1 minute)
});

// Define EmailTemplateKind types with valid values
type EmailTemplateKind = 'contact' | 'consultation' | 'support' | 'feedback';

export async function POST(request: Request) {
  try {
    // Rate limiting: Identify user by IP or a default key
    const clientIP = request.headers.get('x-forwarded-for') || 'CONTACT_FORM';
    await limiter.consume(clientIP); // Consume 1 point for the request

    // Extract the 'type' query parameter
    const { searchParams } = new URL(request.url);
    const queryType = searchParams.get('type') || 'contact';

    // Validate queryType as EmailTemplateKind or fallback to 'contact'
    const allowedTypes: EmailTemplateKind[] = [
      'contact',
      'consultation',
      'support',
      'feedback',
    ];
    const type: EmailTemplateKind = allowedTypes.includes(
      queryType as EmailTemplateKind
    )
      ? (queryType as EmailTemplateKind)
      : 'contact';

    // Parse and validate the request body using zod schema
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Include the 'type' property in the validated data
    const contactFormData: ContactFormType = {
      ...validatedData,
      type: type as FormType,
      subject: validatedData.subject || 'No Subject', // Default subject if not provided
    };

    // Send email using validated data and email type
    await sendEmail(contactFormData, type as EmailTemplateKind);

    // Respond with success message
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);

    // Handle rate limiting errors
    if (error instanceof Error && error.message.includes('RateLimiter')) {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Handle validation errors from zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }

    // Handle generic errors
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    );
  }
}

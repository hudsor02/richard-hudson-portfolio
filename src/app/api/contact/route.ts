import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { ContactFormType } from '@/types/contact';

// Define EmailTemplate type with valid values
type EmailTemplate = 'contact' | 'consultation' | 'support' | 'feedback';

// Initialize rate limiter with valid configuration
const limiter = new RateLimiterMemory({
  points: 5, // Allow 5 requests
  duration: 60, // Per 60 seconds (1 minute)
});

// Define contact form validation schema using zod
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limiting: Identify user by IP or a default key
    const clientIP = request.headers.get('x-forwarded-for') || 'CONTACT_FORM';
    await limiter.consume(clientIP); // Consume 1 point for the request

    // Extract the 'type' query parameter
    const { searchParams } = new URL(request.url);
    const queryType = searchParams.get('type') || 'contact';

    // Validate queryType as EmailTemplate or fallback to undefined
    const allowedTypes: EmailTemplate[] = [
      'contact',
      'consultation',
      'support',
      'feedback',
    ];
    const type: EmailTemplate | undefined = allowedTypes.includes(
      queryType as EmailTemplate
    )
      ? (queryType as EmailTemplate)
      : undefined;

    // Parse and validate the request body using zod schema
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Send email using validated data and email type
    await sendEmail(validatedData, type);

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

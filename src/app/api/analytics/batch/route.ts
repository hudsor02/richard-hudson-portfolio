// src/app/api/analytics/batch/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

const eventSchema = z.object({
  eventName: z.string(),
  eventData: z.record(z.unknown()),
  timestamp: z.number(),
});

const batchSchema = z.array(eventSchema);

export async function POST(request: Request) {
  try {
    const events = batchSchema.parse(await request.json());

    // Process events (implement your analytics logic here)
    // Example: Send to Google Analytics, PostHog, or your own analytics service
    await Promise.all(
      events.map(async (event) => {
        // Add your analytics processing logic here
        console.log('Processing event:', event);
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process analytics batch:', error);
    return NextResponse.json(
      { error: 'Failed to process events' },
      { status: 500 }
    );
  }
}

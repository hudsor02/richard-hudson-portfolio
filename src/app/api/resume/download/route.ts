import { generatePDF } from '@/lib/resume/generate-resume';
import { NextRequest } from 'next/server';

export async function POST(_req: NextRequest) {
  // Renamed 'req' to '_req' to indicate it's unused
  console.log('Starting PDF generation request...');

  try {
    const pdfBytes = await generatePDF();

    if (!pdfBytes || !(pdfBytes instanceof Uint8Array)) {
      console.error('Invalid PDF generation output:', pdfBytes);
      throw new Error('PDF generation failed');
    }

    console.log('PDF generated successfully, size:', pdfBytes.length);

    // Create response with proper headers
    const response = new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBytes.length.toString(),
        'Content-Disposition':
          'attachment; filename="Richard_Hudson_Resume.pdf"',
        'Cache-Control': 'no-cache',
      },
    });

    return response;
  } catch (error) {
    console.error('PDF generation error details:', error);

    // Return detailed error for debugging
    return new Response(
      JSON.stringify({
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

import { NextResponse } from 'next/server';
import { generatePDF, generateDOCX } from '@/lib/generate-resume';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const { format } = (await req.json()) as { format: 'pdf' | 'docx' };
    let buffer: Buffer;
    let contentType: string;
    let filename: string;

    switch (format) {
      case 'pdf':
        buffer = await generatePDF();
        contentType = 'application/pdf';
        filename = 'Richard_Hudson_Resume.pdf';
        break;
      case 'docx':
        buffer = await generateDOCX();
        contentType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        filename = 'Richard_Hudson_Resume.docx';
        break;
      default:
        return new NextResponse('Invalid format specified', { status: 400 });
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error generating resume:', error);
    return new NextResponse('An error occurred while generating the resume', {
      status: 500,
    });
  }
}

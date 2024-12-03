import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Document, Paragraph, TextRun, HeadingLevel, Packer } from 'docx';
import { resumeData } from '@/lib/resume-data';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const { format }: { format: 'pdf' | 'docx' } = await req.json();

    let buffer: Buffer;
    let contentType: string;
    let filename: string;

    if (format === 'pdf') {
      buffer = Buffer.from(await generatePDF());
      contentType = 'application/pdf';
      filename = 'Richard_Hudson_Resume.pdf';
    } else if (format === 'docx') {
      buffer = await generateDOCX();
      contentType =
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      filename = 'Richard_Hudson_Resume.docx';
    } else {
      return new NextResponse('Invalid format', { status: 400 });
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating resume:', error);
    return new NextResponse('Error generating resume', { status: 500 });
  }
}

// Helper to generate a PDF
async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter size
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = 750;

  // Header
  page.drawText(resumeData.header.name, {
    x: 50,
    y,
    size: 24,
    font: helveticaBold,
  });

  // Contact Information
  y -= 30;
  page.drawText(
    `${resumeData.header.email} | ${resumeData.header.phone} | ${resumeData.header.website}`,
    { x: 50, y, size: 10, font: helvetica }
  );

  // Professional Summary
  y -= 40;
  page.drawText('PROFESSIONAL SUMMARY', {
    x: 50,
    y,
    size: 14,
    font: helveticaBold,
  });
  y -= 20;
  const summaryLines = splitText(resumeData.summary, 70);
  summaryLines.forEach((line) => {
    page.drawText(line, { x: 50, y, size: 10, font: helvetica });
    y -= 15;
  });

  return pdfDoc.save();
}

// Helper to generate a DOCX
async function generateDOCX() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: resumeData.header.name,
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
              new TextRun(`${resumeData.header.email} | `),
              new TextRun(`${resumeData.header.phone} | `),
              new TextRun(resumeData.header.website),
            ],
          }),
          new Paragraph({
            text: 'Professional Summary',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: resumeData.summary,
          }),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}

// Helper: Wrap text for long strings
function splitText(text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = '';
    }
    currentLine += word + ' ';
  }
  if (currentLine.trim()) lines.push(currentLine.trim());

  return lines;
}

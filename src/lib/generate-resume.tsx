// src/lib/generate-resume.tsx
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Document, Paragraph, TextRun, HeadingLevel, Packer } from 'docx';
import { resumeData } from './resume-data';
import type { Experience, Certification } from './resume-data';

export async function generatePDF(): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter size
  const { height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let cursorY = height - 50;

  // Header
  page.drawText(resumeData.header.name, {
    x: 50,
    y: cursorY,
    size: 24,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 30;

  // Contact Info
  const contactInfo = `${resumeData.header.email} | ${resumeData.header.phone} | ${resumeData.header.website} | ${resumeData.header.linkedin}`;
  page.drawText(contactInfo, {
    x: 50,
    y: cursorY,
    size: 10,
    font: fontRegular,
    color: rgb(0, 0, 0),
  });
  cursorY -= 40;

  // Professional Summary
  page.drawText('Professional Summary', {
    x: 50,
    y: cursorY,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 20;
  page.drawText(resumeData.summary, {
    x: 50,
    y: cursorY,
    size: 10,
    font: fontRegular,
    color: rgb(0, 0, 0),
    maxWidth: 500,
    lineHeight: 12,
  });
  cursorY -= 40;

  // Experience
  page.drawText('Professional Experience', {
    x: 50,
    y: cursorY,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 20;

  resumeData.experience.forEach((exp: Experience) => {
    page.drawText(`${exp.company}, ${exp.location}`, {
      x: 50,
      y: cursorY,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    cursorY -= 15;

    page.drawText(`${exp.position} (${exp.dates})`, {
      x: 50,
      y: cursorY,
      size: 10,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
    cursorY -= 15;

    exp.achievements.forEach((achievement: string) => {
      page.drawText(`• ${achievement}`, {
        x: 60,
        y: cursorY,
        size: 10,
        font: fontRegular,
        color: rgb(0, 0, 0),
        maxWidth: 480,
        lineHeight: 12,
      });
      cursorY -= 15;
    });
    cursorY -= 10;
  });

  // Technical Expertise
  page.drawText('Technical Expertise', {
    x: 50,
    y: cursorY,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 20;

  resumeData.technicalExpertise.columns.forEach((column) => {
    page.drawText(column.title, {
      x: 50,
      y: cursorY,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    cursorY -= 15;

    column.items.forEach((item: string) => {
      page.drawText(`• ${item}`, {
        x: 60,
        y: cursorY,
        size: 10,
        font: fontRegular,
        color: rgb(0, 0, 0),
        maxWidth: 480,
        lineHeight: 12,
      });
      cursorY -= 15;
    });
    cursorY -= 10;
  });

  // Certifications
  page.drawText('Certifications', {
    x: 50,
    y: cursorY,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 20;

  resumeData.certifications.forEach((cert: Certification) => {
    page.drawText(
      `• ${cert.title} - ${cert.organization} (${cert.issueDate})`,
      {
        x: 60,
        y: cursorY,
        size: 10,
        font: fontRegular,
        color: rgb(0, 0, 0),
        maxWidth: 480,
      }
    );
    cursorY -= 15;
  });

  // Education
  page.drawText('Education', {
    x: 50,
    y: cursorY,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  cursorY -= 20;

  resumeData.education.forEach((edu) => {
    page.drawText(`${edu.degree}`, {
      x: 50,
      y: cursorY,
      size: 12,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    cursorY -= 15;

    page.drawText(`${edu.institution}, ${edu.location}`, {
      x: 50,
      y: cursorY,
      size: 10,
      font: fontRegular,
      color: rgb(0, 0, 0),
    });
    cursorY -= 15;
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

export async function generateDOCX(): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: resumeData.header.name,
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun(resumeData.header.email),
              new TextRun(' | '),
              new TextRun(resumeData.header.phone),
              new TextRun(' | '),
              new TextRun(resumeData.header.website),
              new TextRun(' | '),
              new TextRun(resumeData.header.linkedin),
            ],
          }),

          // Summary
          new Paragraph({
            text: 'Professional Summary',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({ text: resumeData.summary }),

          // Experience
          new Paragraph({
            text: 'Professional Experience',
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.experience.flatMap((exp) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.company}, ${exp.location}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: `${exp.position} (${exp.dates})`,
            }),
            ...exp.achievements.map(
              (achievement) =>
                new Paragraph({
                  text: `• ${achievement}`,
                  spacing: { before: 100 },
                })
            ),
          ]),

          // Technical Expertise
          new Paragraph({
            text: 'Technical Expertise',
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.technicalExpertise.columns.flatMap((column) => [
            new Paragraph({
              text: column.title,
              heading: HeadingLevel.HEADING_2,
            }),
            ...column.items.map(
              (item) =>
                new Paragraph({
                  text: `• ${item}`,
                  spacing: { before: 100 },
                })
            ),
          ]),

          // Certifications
          new Paragraph({
            text: 'Certifications',
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.certifications.map(
            (cert) =>
              new Paragraph({
                text: `• ${cert.title} - ${cert.organization} (${cert.issueDate})`,
              })
          ),

          // Education
          new Paragraph({
            text: 'Education',
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.education
            .map((edu) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: edu.degree,
                    bold: true,
                  }),
                ],
              }),
              new Paragraph({
                text: `${edu.institution}, ${edu.location}`,
              }),
            ])
            .flat(),
        ],
      },
    ],
  });

  return Packer.toBuffer(doc);
}

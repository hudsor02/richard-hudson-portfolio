import { RESUME_CONFIG } from '@/lib/constants/resume-constants';
import { format, parseISO } from 'date-fns';
import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib';

import { resumeData } from './resume-data';

export async function generatePDF(): Promise<Uint8Array> {
  // Declare variables at the top level
  let pdfDoc: PDFDocument;
  let font: PDFFont;
  let boldFont: PDFFont;
  let yPosition: number;
  let page: PDFPage;

  // Function to check if a new page is needed
  function checkAndAddPage(): void {
    if (
      yPosition <
      RESUME_CONFIG.pdf.margins.bottom + RESUME_CONFIG.layout.buffer
    ) {
      page = pdfDoc.addPage([
        RESUME_CONFIG.pdf.page.width,
        RESUME_CONFIG.pdf.page.height,
      ]);
      yPosition = RESUME_CONFIG.pdf.page.height - RESUME_CONFIG.pdf.margins.top;
    }
  }

  // Function to draw section headers
  function drawSectionHeader(text: string): void {
    checkAndAddPage();

    page.drawText(text.toUpperCase(), {
      x: RESUME_CONFIG.pdf.margins.left,
      y: yPosition,
      size: RESUME_CONFIG.pdf.fonts.sizes.section,
      font: boldFont,
      color: rgb(
        RESUME_CONFIG.pdf.colors.navy.r,
        RESUME_CONFIG.pdf.colors.navy.g,
        RESUME_CONFIG.pdf.colors.navy.b
      ),
    });

    yPosition -= 3;

    page.drawLine({
      start: { x: RESUME_CONFIG.pdf.margins.left, y: yPosition },
      end: {
        x: RESUME_CONFIG.pdf.page.width - RESUME_CONFIG.pdf.margins.right,
        y: yPosition,
      },
      thickness: 1,
      color: rgb(
        RESUME_CONFIG.pdf.colors.navy.r,
        RESUME_CONFIG.pdf.colors.navy.g,
        RESUME_CONFIG.pdf.colors.navy.b
      ),
    });

    page.drawLine({
      start: { x: RESUME_CONFIG.pdf.margins.left, y: yPosition - 1.5 },
      end: {
        x: RESUME_CONFIG.pdf.page.width - RESUME_CONFIG.pdf.margins.right,
        y: yPosition - 1.5,
      },
      thickness: 0.5,
      color: rgb(
        RESUME_CONFIG.pdf.colors.navy.r,
        RESUME_CONFIG.pdf.colors.navy.g,
        RESUME_CONFIG.pdf.colors.navy.b
      ),
    });

    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.afterHeading;
  }

  // Function to wrap text within the given width
  function wrapText(
    text: string,
    maxWidth: number,
    fontSize: number,
    indentation = 0
  ): void {
    const words: string[] = text.split(' ');
    let line = '';

    for (const word of words) {
      const testLine: string = line + word + ' ';
      const textWidth: number = font.widthOfTextAtSize(testLine, fontSize);
      if (textWidth > maxWidth && line) {
        checkAndAddPage();

        page.drawText(line.trim(), {
          x: RESUME_CONFIG.pdf.margins.left + indentation,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(
            RESUME_CONFIG.pdf.colors.text.r,
            RESUME_CONFIG.pdf.colors.text.g,
            RESUME_CONFIG.pdf.colors.text.b
          ),
        });
        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;
        line = word + ' ';
      } else {
        line = testLine;
      }
    }

    if (line) {
      checkAndAddPage();

      page.drawText(line.trim(), {
        x: RESUME_CONFIG.pdf.margins.left + indentation,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(
          RESUME_CONFIG.pdf.colors.text.r,
          RESUME_CONFIG.pdf.colors.text.g,
          RESUME_CONFIG.pdf.colors.text.b
        ),
      });
      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;
    }
  }

  // Now, inside the try-catch block, we can use these functions
  try {
    pdfDoc = await PDFDocument.create();

    // Embed fonts
    font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Initialize variables
    yPosition = RESUME_CONFIG.pdf.page.height - RESUME_CONFIG.pdf.margins.top;
    page = pdfDoc.addPage([
      RESUME_CONFIG.pdf.page.width,
      RESUME_CONFIG.pdf.page.height,
    ]);

    // Header Section
    page.drawText(resumeData.header.name.toUpperCase(), {
      x: RESUME_CONFIG.pdf.margins.left,
      y: yPosition,
      size: RESUME_CONFIG.pdf.fonts.sizes.name,
      font: boldFont,
      color: rgb(
        RESUME_CONFIG.pdf.colors.text.r,
        RESUME_CONFIG.pdf.colors.text.g,
        RESUME_CONFIG.pdf.colors.text.b
      ),
    });
    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph;

    page.drawText(resumeData.header.title, {
      x: RESUME_CONFIG.pdf.margins.left,
      y: yPosition,
      size: RESUME_CONFIG.pdf.fonts.sizes.title,
      font: font,
      color: rgb(
        RESUME_CONFIG.pdf.colors.text.r,
        RESUME_CONFIG.pdf.colors.text.g,
        RESUME_CONFIG.pdf.colors.text.b
      ),
    });
    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

    const contactInfo = `${resumeData.header.email} | ${resumeData.header.phone} | ${resumeData.header.location.city}, ${resumeData.header.location.state}`;
    page.drawText(contactInfo, {
      x: RESUME_CONFIG.pdf.margins.left,
      y: yPosition,
      size: RESUME_CONFIG.pdf.fonts.sizes.body,
      font: font,
      color: rgb(
        RESUME_CONFIG.pdf.colors.text.r,
        RESUME_CONFIG.pdf.colors.text.g,
        RESUME_CONFIG.pdf.colors.text.b
      ),
    });
    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

    page.drawText(`LinkedIn: ${resumeData.header.linkedin}`, {
      x: RESUME_CONFIG.pdf.margins.left,
      y: yPosition,
      size: RESUME_CONFIG.pdf.fonts.sizes.body,
      font: font,
      color: rgb(
        RESUME_CONFIG.pdf.colors.text.r,
        RESUME_CONFIG.pdf.colors.text.g,
        RESUME_CONFIG.pdf.colors.text.b
      ),
    });
    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.section;

    // Professional Summary Section
    if (resumeData.summary) {
      drawSectionHeader('Professional Summary');

      const maxWidth: number =
        RESUME_CONFIG.pdf.page.width -
        RESUME_CONFIG.pdf.margins.left -
        RESUME_CONFIG.pdf.margins.right;

      wrapText(
        resumeData.summary,
        maxWidth,
        RESUME_CONFIG.pdf.fonts.sizes.body
      );
      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.section;
    }

    // Experience Section
    drawSectionHeader('Professional Experience');

    for (const job of resumeData.experience) {
      checkAndAddPage();

      const dateText: string =
        format(
          parseISO(job.dates.start),
          RESUME_CONFIG.ats.formatting.dateFormat
        ) +
        ' - ' +
        (job.dates.end
          ? format(
              parseISO(job.dates.end),
              RESUME_CONFIG.ats.formatting.dateFormat
            )
          : 'Present');

      // Position title
      page.drawText(job.position, {
        x: RESUME_CONFIG.pdf.margins.left,
        y: yPosition,
        size: RESUME_CONFIG.pdf.fonts.sizes.subsection,
        font: boldFont,
        color: rgb(
          RESUME_CONFIG.pdf.colors.text.r,
          RESUME_CONFIG.pdf.colors.text.g,
          RESUME_CONFIG.pdf.colors.text.b
        ),
      });

      // Date range (right-aligned)
      const dateWidth: number = font.widthOfTextAtSize(
        dateText,
        RESUME_CONFIG.pdf.fonts.sizes.detail
      );
      page.drawText(dateText, {
        x:
          RESUME_CONFIG.pdf.page.width -
          RESUME_CONFIG.pdf.margins.right -
          dateWidth,
        y: yPosition,
        size: RESUME_CONFIG.pdf.fonts.sizes.detail,
        font: font,
        color: rgb(
          RESUME_CONFIG.pdf.colors.text.r,
          RESUME_CONFIG.pdf.colors.text.g,
          RESUME_CONFIG.pdf.colors.text.b
        ),
      });
      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

      // Company and location
      page.drawText(
        `${job.company} | ${job.location.city}, ${job.location.state}`,
        {
          x: RESUME_CONFIG.pdf.margins.left,
          y: yPosition,
          size: RESUME_CONFIG.pdf.fonts.sizes.body,
          font: font,
          color: rgb(
            RESUME_CONFIG.pdf.colors.text.r,
            RESUME_CONFIG.pdf.colors.text.g,
            RESUME_CONFIG.pdf.colors.text.b
          ),
        }
      );
      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph;

      // Achievements
      for (const achievement of job.achievements) {
        const achievementText = `• ${achievement}`;
        const maxWidth: number =
          RESUME_CONFIG.pdf.page.width -
          RESUME_CONFIG.pdf.margins.left -
          RESUME_CONFIG.pdf.margins.right -
          RESUME_CONFIG.pdf.fonts.indentation.bullet;

        wrapText(
          achievementText,
          maxWidth,
          RESUME_CONFIG.pdf.fonts.sizes.body,
          RESUME_CONFIG.pdf.fonts.indentation.bullet
        );
      }
      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph;
    }

    // Technical Expertise Section
    if (
      resumeData.technicalExpertise &&
      resumeData.technicalExpertise.categories.length > 0
    ) {
      drawSectionHeader('Technical Expertise & Core Competencies');

      for (const category of resumeData.technicalExpertise.categories) {
        checkAndAddPage();

        page.drawText(category.title, {
          x: RESUME_CONFIG.pdf.margins.left,
          y: yPosition,
          size: RESUME_CONFIG.pdf.fonts.sizes.subsection,
          font: boldFont,
          color: rgb(
            RESUME_CONFIG.pdf.colors.text.r,
            RESUME_CONFIG.pdf.colors.text.g,
            RESUME_CONFIG.pdf.colors.text.b
          ),
        });
        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

        for (const skill of category.skills) {
          const skillText = `• ${skill.name} (${skill.proficiency}, ${skill.yearsOfExperience}+ years)`;
          const maxWidth: number =
            RESUME_CONFIG.pdf.page.width -
            RESUME_CONFIG.pdf.margins.left -
            RESUME_CONFIG.pdf.margins.right -
            RESUME_CONFIG.pdf.fonts.indentation.bullet;

          wrapText(
            skillText,
            maxWidth,
            RESUME_CONFIG.pdf.fonts.sizes.body,
            RESUME_CONFIG.pdf.fonts.indentation.bullet
          );
        }
        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph;
      }
    }

    // Education & Certifications Section
    if (
      (resumeData.education && resumeData.education.length > 0) ||
      (resumeData.certifications && resumeData.certifications.length > 0)
    ) {
      drawSectionHeader('Education & Certifications');

      // Education entries
      for (const edu of resumeData.education) {
        checkAndAddPage();

        // Degree
        page.drawText(`${edu.degree.type} in ${edu.degree.major}`, {
          x: RESUME_CONFIG.pdf.margins.left,
          y: yPosition,
          size: RESUME_CONFIG.pdf.fonts.sizes.subsection,
          font: boldFont,
          color: rgb(
            RESUME_CONFIG.pdf.colors.text.r,
            RESUME_CONFIG.pdf.colors.text.g,
            RESUME_CONFIG.pdf.colors.text.b
          ),
        });
        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

        // Institution and Location
        page.drawText(
          `${edu.institution}, ${edu.location.city}, ${edu.location.state}`,
          {
            x: RESUME_CONFIG.pdf.margins.left,
            y: yPosition,
            size: RESUME_CONFIG.pdf.fonts.sizes.body,
            font: font,
            color: rgb(
              RESUME_CONFIG.pdf.colors.text.r,
              RESUME_CONFIG.pdf.colors.text.g,
              RESUME_CONFIG.pdf.colors.text.b
            ),
          }
        );
        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

        // Graduation Date
        const graduationDate: string = format(
          parseISO(edu.graduationDate),
          RESUME_CONFIG.ats.formatting.dateFormatLong
        );
        page.drawText(`Graduated: ${graduationDate}`, {
          x: RESUME_CONFIG.pdf.margins.left,
          y: yPosition,
          size: RESUME_CONFIG.pdf.fonts.sizes.detail,
          font: font,
          color: rgb(
            RESUME_CONFIG.pdf.colors.text.r,
            RESUME_CONFIG.pdf.colors.text.g,
            RESUME_CONFIG.pdf.colors.text.b
          ),
        });
        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph;
      }

      // Certifications
      if (resumeData.certifications?.length) {
        for (const cert of resumeData.certifications) {
          checkAndAddPage();

          // Certification Title and Organization
          page.drawText(`• ${cert.title} - ${cert.organization}`, {
            x:
              RESUME_CONFIG.pdf.margins.left +
              RESUME_CONFIG.pdf.fonts.indentation.bullet,
            y: yPosition,
            size: RESUME_CONFIG.pdf.fonts.sizes.body,
            font: font,
            color: rgb(
              RESUME_CONFIG.pdf.colors.text.r,
              RESUME_CONFIG.pdf.colors.text.g,
              RESUME_CONFIG.pdf.colors.text.b
            ),
          });
          yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

          // Issue Date
          const issueDate: string = format(
            parseISO(cert.issueDate),
            RESUME_CONFIG.ats.formatting.dateFormat
          );
          page.drawText(`Issued: ${issueDate}`, {
            x:
              RESUME_CONFIG.pdf.margins.left +
              RESUME_CONFIG.pdf.fonts.indentation.text,
            y: yPosition,
            size: RESUME_CONFIG.pdf.fonts.sizes.detail,
            font: font,
            color: rgb(
              RESUME_CONFIG.pdf.colors.text.r,
              RESUME_CONFIG.pdf.colors.text.g,
              RESUME_CONFIG.pdf.colors.text.b
            ),
          });
          yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

          // Credential ID if available
          if (cert.credentialId) {
            page.drawText(`Credential ID: ${cert.credentialId}`, {
              x:
                RESUME_CONFIG.pdf.margins.left +
                RESUME_CONFIG.pdf.fonts.indentation.text,
              y: yPosition,
              size: RESUME_CONFIG.pdf.fonts.sizes.detail,
              font: font,
              color: rgb(
                RESUME_CONFIG.pdf.colors.text.r,
                RESUME_CONFIG.pdf.colors.text.g,
                RESUME_CONFIG.pdf.colors.text.b
              ),
            });
            yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;
          }

          yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph;
        }
      }
    }

    return await pdfDoc.save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

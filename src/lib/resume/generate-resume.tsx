import { RESUME_CONFIG } from '@/lib/constants/resume-constants';
import { format, parseISO } from 'date-fns';
import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib';

import { resumeData } from './resume-data';

interface PageState {
  page: PDFPage;
  yPosition: number;
}

export async function generatePDF(): Promise<Uint8Array> {
  // Document setup
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Initial page setup
  let currentPage = pdfDoc.addPage([
    RESUME_CONFIG.pdf.page.width,
    RESUME_CONFIG.pdf.page.height,
  ]);
  let yPosition = RESUME_CONFIG.pdf.page.height - RESUME_CONFIG.pdf.margins.top;

  // Core utility function for page management
  function checkAndAddPage(
    requiredSpace: number,
    beforePageBreak?: () => void
  ): PageState {
    const minimumSpace =
      RESUME_CONFIG.pdf.margins.bottom + RESUME_CONFIG.pdf.fonts.spacing.line;

    if (yPosition - requiredSpace < minimumSpace) {
      if (beforePageBreak) {
        beforePageBreak();
      }
      currentPage = pdfDoc.addPage([
        RESUME_CONFIG.pdf.page.width,
        RESUME_CONFIG.pdf.page.height,
      ]);
      yPosition = RESUME_CONFIG.pdf.page.height - RESUME_CONFIG.pdf.margins.top;
    }
    return { page: currentPage, yPosition };
  }

  // Core text drawing function with page break handling
  function drawText(
    text: string,
    x: number,
    fontSize: number,
    options: {
      font?: PDFFont;
      rightAlign?: boolean;
      color?: { r: number; g: number; b: number };
      requiredSpace?: number;
    } = {}
  ): void {
    const {
      font: textFont = font,
      rightAlign = false,
      color = RESUME_CONFIG.pdf.colors.text,
      requiredSpace = fontSize + RESUME_CONFIG.pdf.fonts.spacing.line,
    } = options;

    const { page, yPosition: newY } = checkAndAddPage(requiredSpace);
    const textWidth = textFont.widthOfTextAtSize(text, fontSize);
    const xPos = rightAlign
      ? RESUME_CONFIG.pdf.page.width -
        RESUME_CONFIG.pdf.margins.right -
        textWidth
      : x;

    page.drawText(text, {
      x: xPos,
      y: newY,
      size: fontSize,
      font: textFont,
      color: rgb(color.r, color.g, color.b),
    });

    yPosition = newY - RESUME_CONFIG.pdf.fonts.spacing.line;
  }
  // Text wrapping function with page break handling
  function wrapText(
    text: string,
    maxWidth: number,
    fontSize: number,
    options: {
      indentation?: number;
      lineSpacing?: number;
      font?: PDFFont;
      color?: { r: number; g: number; b: number };
    } = {}
  ): void {
    const {
      indentation = 0,
      lineSpacing = RESUME_CONFIG.pdf.fonts.spacing.line,
      font: textFont = font,
      color = RESUME_CONFIG.pdf.colors.text,
    } = options;

    const words = text.split(' ');
    let line = '';

    for (const word of words) {
      const testLine = line + (line ? ' ' : '') + word;
      const textWidth = textFont.widthOfTextAtSize(testLine, fontSize);

      if (textWidth > maxWidth && line) {
        const { page } = checkAndAddPage(fontSize + lineSpacing);
        page.drawText(line, {
          x: RESUME_CONFIG.pdf.margins.left + indentation,
          y: yPosition,
          size: fontSize,
          font: textFont,
          color: rgb(color.r, color.g, color.b),
        });
        yPosition -= lineSpacing;
        line = word;
      } else {
        line = testLine;
      }
    }

    if (line) {
      const { page } = checkAndAddPage(fontSize + lineSpacing);
      page.drawText(line, {
        x: RESUME_CONFIG.pdf.margins.left + indentation,
        y: yPosition,
        size: fontSize,
        font: textFont,
        color: rgb(color.r, color.g, color.b),
      });
      yPosition -= lineSpacing;
    }
  }

  // Section header drawing function
  function drawSectionHeader(text: string): void {
    const headerHeight =
      RESUME_CONFIG.pdf.fonts.sizes.section +
      RESUME_CONFIG.pdf.fonts.spacing.afterHeading +
      5; // 5 pixels for the lines

    const { page } = checkAndAddPage(
      headerHeight + RESUME_CONFIG.pdf.fonts.spacing.section
    );

    // Add spacing before section header
    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.section * 0.5;

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

    // Draw the double lines
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

  // Header section drawing function
  function drawHeader(): void {
    // Name
    drawText(
      resumeData.header.name.toUpperCase(),
      RESUME_CONFIG.pdf.margins.left,
      RESUME_CONFIG.pdf.fonts.sizes.name,
      {
        font: boldFont,
        requiredSpace: RESUME_CONFIG.pdf.fonts.sizes.name * 1.5,
      }
    );

    // Title
    drawText(
      resumeData.header.title,
      RESUME_CONFIG.pdf.margins.left,
      RESUME_CONFIG.pdf.fonts.sizes.title,
      {
        requiredSpace: RESUME_CONFIG.pdf.fonts.sizes.title * 1.2,
      }
    );

    // Contact Info
    const contactInfo = `${resumeData.header.email} | ${resumeData.header.phone} | ${resumeData.header.location.city}, ${resumeData.header.location.state}`;
    drawText(
      contactInfo,
      RESUME_CONFIG.pdf.margins.left,
      RESUME_CONFIG.pdf.fonts.sizes.body
    );

    // LinkedIn
    drawText(
      `LinkedIn: ${resumeData.header.linkedin}`,
      RESUME_CONFIG.pdf.margins.left,
      RESUME_CONFIG.pdf.fonts.sizes.body
    );

    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.section;
  }
  // Professional Summary section
  function drawProfessionalSummary(): void {
    if (resumeData.summary) {
      drawSectionHeader('Professional Summary');

      const maxWidth =
        RESUME_CONFIG.pdf.page.width -
        RESUME_CONFIG.pdf.margins.left -
        RESUME_CONFIG.pdf.margins.right;

      wrapText(
        resumeData.summary,
        maxWidth,
        RESUME_CONFIG.pdf.fonts.sizes.body,
        {
          lineSpacing: RESUME_CONFIG.pdf.fonts.spacing.line,
        }
      );

      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph;
    }
  }

  // Experience section
  function drawExperience(): void {
    drawSectionHeader('Professional Experience');

    for (const job of resumeData.experience) {
      const dateText = `${format(
        parseISO(job.dates.start),
        RESUME_CONFIG.ats.formatting.dateFormat
      )} - ${
        job.dates.end
          ? format(
              parseISO(job.dates.end),
              RESUME_CONFIG.ats.formatting.dateFormat
            )
          : 'Present'
      }`;

      // Position title
      currentPage.drawText(job.position, {
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

      // Date
      currentPage.drawText(dateText, {
        x:
          RESUME_CONFIG.pdf.page.width -
          RESUME_CONFIG.pdf.margins.right -
          font.widthOfTextAtSize(
            dateText,
            RESUME_CONFIG.pdf.fonts.sizes.detail
          ),
        y: yPosition,
        size: RESUME_CONFIG.pdf.fonts.sizes.detail,
        font,
        color: rgb(
          RESUME_CONFIG.pdf.colors.text.r,
          RESUME_CONFIG.pdf.colors.text.g,
          RESUME_CONFIG.pdf.colors.text.b
        ),
      });

      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

      // Company and location
      currentPage.drawText(
        `${job.company} | ${job.location.city}, ${job.location.state}`,
        {
          x: RESUME_CONFIG.pdf.margins.left,
          y: yPosition,
          size: RESUME_CONFIG.pdf.fonts.sizes.body,
          font,
          color: rgb(
            RESUME_CONFIG.pdf.colors.text.r,
            RESUME_CONFIG.pdf.colors.text.g,
            RESUME_CONFIG.pdf.colors.text.b
          ),
        }
      );

      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;

      // Achievements
      for (const achievement of job.achievements) {
        currentPage.drawText('•', {
          x: RESUME_CONFIG.pdf.margins.left,
          y: yPosition,
          size: RESUME_CONFIG.pdf.fonts.sizes.body,
          font,
          color: rgb(
            RESUME_CONFIG.pdf.colors.text.r,
            RESUME_CONFIG.pdf.colors.text.g,
            RESUME_CONFIG.pdf.colors.text.b
          ),
        });

        const maxWidth =
          RESUME_CONFIG.pdf.page.width -
          RESUME_CONFIG.pdf.margins.left -
          RESUME_CONFIG.pdf.margins.right -
          RESUME_CONFIG.pdf.fonts.indentation.bullet;

        const words = achievement.split(' ');
        let line = '';
        const xPos =
          RESUME_CONFIG.pdf.margins.left +
          RESUME_CONFIG.pdf.fonts.indentation.bullet;

        for (const word of words) {
          const testLine = line + (line ? ' ' : '') + word;
          const textWidth = font.widthOfTextAtSize(
            testLine,
            RESUME_CONFIG.pdf.fonts.sizes.body
          );

          if (textWidth > maxWidth && line) {
            currentPage.drawText(line.trim(), {
              x: xPos,
              y: yPosition,
              size: RESUME_CONFIG.pdf.fonts.sizes.body,
              font,
              color: rgb(
                RESUME_CONFIG.pdf.colors.text.r,
                RESUME_CONFIG.pdf.colors.text.g,
                RESUME_CONFIG.pdf.colors.text.b
              ),
            });
            yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;
            line = word;
          } else {
            line = testLine;
          }
        }

        if (line) {
          currentPage.drawText(line.trim(), {
            x: xPos,
            y: yPosition,
            size: RESUME_CONFIG.pdf.fonts.sizes.body,
            font,
            color: rgb(
              RESUME_CONFIG.pdf.colors.text.r,
              RESUME_CONFIG.pdf.colors.text.g,
              RESUME_CONFIG.pdf.colors.text.b
            ),
          });
          yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;
        }

        // Force page break after the specific bullet point
        if (
          achievement ===
          'Fostered strong collaboration with cross-functional teams, ensuring seamless communication and operational success in high-pressure environments.'
        ) {
          currentPage = pdfDoc.addPage([
            RESUME_CONFIG.pdf.page.width,
            RESUME_CONFIG.pdf.page.height,
          ]);
          yPosition =
            RESUME_CONFIG.pdf.page.height - RESUME_CONFIG.pdf.margins.top;
        }
      }

      // Add minimal spacing between jobs
      if (
        resumeData.experience.indexOf(job) <
        resumeData.experience.length - 1
      ) {
        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line * 0.5;
      }
    }
  }

  // Technical Expertise section
  function drawTechnicalExpertise(): void {
    if (resumeData.technicalExpertise?.categories.length > 0) {
      drawSectionHeader('Technical Expertise & Core Competencies');

      for (const category of resumeData.technicalExpertise.categories) {
        // Calculate space needed for this category
        const estimatedHeight =
          RESUME_CONFIG.pdf.fonts.sizes.subsection +
          RESUME_CONFIG.pdf.fonts.spacing.line +
          category.skills.length * RESUME_CONFIG.pdf.fonts.spacing.line +
          RESUME_CONFIG.pdf.fonts.spacing.paragraph;

        // Check for page break before starting category
        checkAndAddPage(estimatedHeight);

        // Draw category title
        drawText(
          category.title,
          RESUME_CONFIG.pdf.margins.left,
          RESUME_CONFIG.pdf.fonts.sizes.subsection,
          {
            font: boldFont,
            requiredSpace:
              RESUME_CONFIG.pdf.fonts.sizes.subsection +
              RESUME_CONFIG.pdf.fonts.spacing.line,
          }
        );

        // Prepare skills for compact layout
        const skills = category.skills.map(
          (skill) =>
            `• ${skill.name} (${skill.proficiency}, ${skill.yearsOfExperience}+ years)`
        );

        const maxWidth =
          RESUME_CONFIG.pdf.page.width -
          RESUME_CONFIG.pdf.margins.left -
          RESUME_CONFIG.pdf.margins.right;

        // Group skills into lines
        let currentLine = '';
        const lines: string[] = [];

        for (const skill of skills) {
          const testLine = currentLine ? `${currentLine} | ${skill}` : skill;
          const lineWidth = font.widthOfTextAtSize(
            testLine,
            RESUME_CONFIG.pdf.fonts.sizes.body
          );

          if (lineWidth > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = skill;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          lines.push(currentLine);
        }

        // Draw skill lines with proper wrapping
        for (const line of lines) {
          checkAndAddPage(
            RESUME_CONFIG.pdf.fonts.sizes.body +
              RESUME_CONFIG.pdf.fonts.spacing.line
          );

          wrapText(line, maxWidth, RESUME_CONFIG.pdf.fonts.sizes.body, {
            lineSpacing: RESUME_CONFIG.pdf.fonts.spacing.line * 0.9,
          });
        }

        yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph * 0.5;
      }

      // Add extra space after the entire technical expertise section
      yPosition -= RESUME_CONFIG.pdf.fonts.spacing.section * 0.5;
    }
  }
  // Education and Certifications section
  function drawEducationAndCertifications(): void {
    if (
      (resumeData.education && resumeData.education.length > 0) ||
      (resumeData.certifications && resumeData.certifications.length > 0)
    ) {
      drawSectionHeader('Education & Certifications');

      // Education entries
      if (resumeData.education) {
        for (const edu of resumeData.education) {
          const estimatedHeight =
            RESUME_CONFIG.pdf.fonts.sizes.subsection * 2 +
            RESUME_CONFIG.pdf.fonts.spacing.line * 3 +
            RESUME_CONFIG.pdf.fonts.spacing.paragraph;

          checkAndAddPage(estimatedHeight);

          // Degree
          drawText(
            `${edu.degree.type} in ${edu.degree.major}`,
            RESUME_CONFIG.pdf.margins.left,
            RESUME_CONFIG.pdf.fonts.sizes.subsection,
            { font: boldFont }
          );

          // Institution and Location
          drawText(
            `${edu.institution}, ${edu.location.city}, ${edu.location.state}`,
            RESUME_CONFIG.pdf.margins.left,
            RESUME_CONFIG.pdf.fonts.sizes.body
          );

          // Graduation Date
          const graduationDate = format(
            parseISO(edu.graduationDate),
            RESUME_CONFIG.ats.formatting.dateFormatLong
          );

          drawText(
            `Graduated: ${graduationDate}`,
            RESUME_CONFIG.pdf.margins.left,
            RESUME_CONFIG.pdf.fonts.sizes.detail
          );

          yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph * 0.7;
        }
      }

      // Certifications
      if (resumeData.certifications?.length) {
        for (const cert of resumeData.certifications) {
          const estimatedHeight =
            RESUME_CONFIG.pdf.fonts.sizes.body +
            RESUME_CONFIG.pdf.fonts.spacing.line * 2 +
            (cert.credentialId ? RESUME_CONFIG.pdf.fonts.spacing.line : 0) +
            RESUME_CONFIG.pdf.fonts.spacing.paragraph;

          checkAndAddPage(estimatedHeight);

          // Certification Title and Organization
          wrapText(
            `• ${cert.title} - ${cert.organization}`,
            RESUME_CONFIG.pdf.page.width -
              RESUME_CONFIG.pdf.margins.left -
              RESUME_CONFIG.pdf.margins.right -
              RESUME_CONFIG.pdf.fonts.indentation.bullet,
            RESUME_CONFIG.pdf.fonts.sizes.body,
            {
              indentation: RESUME_CONFIG.pdf.fonts.indentation.bullet,
              lineSpacing: RESUME_CONFIG.pdf.fonts.spacing.line * 0.9,
            }
          );

          // Issue Date and Credential ID
          const issueDate = format(
            parseISO(cert.issueDate),
            RESUME_CONFIG.ats.formatting.dateFormat
          );

          const credentialText = cert.credentialId
            ? `Issued: ${issueDate} | ID: ${cert.credentialId}`
            : `Issued: ${issueDate}`;

          drawText(
            credentialText,
            RESUME_CONFIG.pdf.margins.left +
              RESUME_CONFIG.pdf.fonts.indentation.text,
            RESUME_CONFIG.pdf.fonts.sizes.detail
          );

          yPosition -= RESUME_CONFIG.pdf.fonts.spacing.paragraph * 0.6;
        }
      }
    }
  }
  try {
    // Draw all sections in order
    drawHeader();
    drawProfessionalSummary();
    drawExperience();
    drawTechnicalExpertise();
    drawEducationAndCertifications();

    // Return the generated PDF
    return await pdfDoc.save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

// Export types if needed for external use
export type { PageState };

import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Packer,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  convertInchesToTwip,
  LevelFormat,
  PageNumber
} from 'docx';
import { resumeData } from './resume-data';

// ATS and SEO optimized keywords
const KEYWORDS = {
  role: ['Revenue Operations', 'RevOps', 'Business Operations', 'Operations Strategy'],
  skills: ['Salesforce', 'Power BI', 'Data Analytics', 'Process Optimization'],
  achievements: ['revenue growth', 'efficiency improvement', 'cost reduction', 'automation'],
  tools: ['PartnerStack', 'Workato', 'SharePoint', 'API Integration']
};

// Document styling configuration
const STYLING = {
  fonts: {
    primary: StandardFonts.Helvetica,
    bold: StandardFonts.HelveticaBold,
  },
  colors: {
    primary: { r: 0, g: 47, b: 255 },    // Brand blue
    text: { r: 26, g: 26, b: 26 },       // Near black for better readability
    accent: { r: 71, g: 85, b: 105 }     // Subtle accent color
  },
  sizes: {
    name: 24,
    role: 18,
    section: 16,
    subsection: 14,
    body: 11,
    detail: 10
  },
  spacing: {
    after: {
      heading: 20,
      paragraph: 15,
      list: 10,
      section: 30
    },
    before: {
      heading: 20,
      list: 5
    }
  },
  margins: {
    page: {
      top: 1,
      bottom: 1,
      left: 1,
      right: 1
    }
  }
};

export async function generatePDF(): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter
  const { height } = page.getSize();

  const regularFont = await pdfDoc.embedFont(STYLING.fonts.primary);
  const boldFont = await pdfDoc.embedFont(STYLING.fonts.bold);

  let y = height - 50;

  // Header Section
  y = await addHeader(page, y, regularFont, boldFont);

  // Core Competencies
  y = await addSkills(page, y, regularFont, boldFont);

  // Professional Experience
  y = await addExperience(page, y, regularFont, boldFont);

  // Education and Certifications
  y = await addEducation(page, y, regularFont, boldFont);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

async function addHeader(page: PDFPage, startY: number, regularFont: PDFFont, boldFont: PDFFont): Promise<number> {
  let y = startY;

  // Name
  page.drawText(resumeData.header.name.toUpperCase(), {
    x: 50,
    y,
    size: STYLING.sizes.name,
    font: boldFont,
    color: rgb(STYLING.colors.primary.r/255, STYLING.colors.primary.g/255, STYLING.colors.primary.b/255)
  });

  y -= 30;

  // Title
  page.drawText('Revenue Operations Consultant', {
    x: 50,
    y,
    size: STYLING.sizes.role,
    font: boldFont,
    color: rgb(STYLING.colors.text.r/255, STYLING.colors.text.g/255, STYLING.colors.text.b/255)
  });

  y -= 25;

  // Contact Info - ATS friendly format
  const contactInfo = `${resumeData.header.email} | ${resumeData.header.phone} | ${resumeData.header.location}`;
  page.drawText(contactInfo, {
    x: 50,
    y,
    size: STYLING.sizes.body,
    font: regularFont
  });

  y -= 20;

  // LinkedIn and Additional Links
  const professionalLinks = `LinkedIn: ${resumeData.header.linkedin} | Portfolio: ${resumeData.header.website}`;
  page.drawText(professionalLinks, {
    x: 50,
    y,
    size: STYLING.sizes.body,
    font: regularFont
  });

  return y - STYLING.spacing.after.section;
}

async function addSkills(page: PDFPage, startY: number, regularFont: PDFFont, boldFont: PDFFont): Promise<number> {
  let y = startY;

  // Section Title
  page.drawText('TECHNICAL EXPERTISE & CORE COMPETENCIES', {
    x: 50,
    y,
    size: STYLING.sizes.section,
    font: boldFont,
    color: rgb(STYLING.colors.primary.r/255, STYLING.colors.primary.g/255, STYLING.colors.primary.b/255)
  });

  y -= 25;

  // Skills Categories
  const skillCategories = resumeData.technicalExpertise.columns;

  skillCategories.forEach((category, index) => {
    if (index > 0) y -= 20;

    page.drawText(`${category.title}:`, {
      x: 50,
      y,
      size: STYLING.sizes.subsection,
      font: boldFont
    });

    y -= 15;
    const skillsText = category.items.join(' • ');
    const lines = wrapText(skillsText, 80);

    lines.forEach(line => {
      page.drawText(line, {
        x: 60,
        y,
        size: STYLING.sizes.body,
        font: regularFont
      });
      y -= 15;
    });
  });

  return y - STYLING.spacing.after.section;
}

async function addExperience(page: PDFPage, startY: number, regularFont: PDFFont, boldFont: PDFFont): Promise<number> {
  let y = startY;

  page.drawText('PROFESSIONAL EXPERIENCE', {
    x: 50,
    y,
    size: STYLING.sizes.section,
    font: boldFont,
    color: rgb(STYLING.colors.primary.r/255, STYLING.colors.primary.g/255, STYLING.colors.primary.b/255)
  });

  y -= STYLING.spacing.after.heading;

  for (const position of resumeData.experience) {
    // Company and Position
    page.drawText(position.position, {
      x: 50,
      y,
      size: STYLING.sizes.subsection,
      font: boldFont
    });

    y -= 20;

    page.drawText(`${position.company} - ${position.location}`, {
      x: 50,
      y,
      size: STYLING.sizes.body,
      font: regularFont
    });

    y -= 15;

    page.drawText(position.dates, {
      x: 50,
      y,
      size: STYLING.sizes.body,
      font: regularFont,
      color: rgb(STYLING.colors.accent.r/255, STYLING.colors.accent.g/255, STYLING.colors.accent.b/255)
    });

    y -= 20;

    // Achievements with metrics
    for (const achievement of position.achievements) {
      const lines = wrapText(`• ${achievement}`, 75);
      lines.forEach(line => {
        page.drawText(line, {
          x: 60,
          y,
          size: STYLING.sizes.body,
          font: regularFont
        });
        y -= 15;
      });
    }

    y -= STYLING.spacing.after.section;
  }

  return y;
}

async function addEducation(page: PDFPage, startY: number, regularFont: PDFFont, boldFont: PDFFont): Promise<number> {
  let y = startY;

  page.drawText('EDUCATION & CERTIFICATIONS', {
    x: 50,
    y,
    size: STYLING.sizes.section,
    font: boldFont,
    color: rgb(STYLING.colors.primary.r/255, STYLING.colors.primary.g/255, STYLING.colors.primary.b/255)
  });

  y -= STYLING.spacing.after.heading;

  // Education
  for (const edu of resumeData.education) {
    page.drawText(edu.degree, {
      x: 50,
      y,
      size: STYLING.sizes.subsection,
      font: boldFont
    });

    y -= 15;

    page.drawText(`${edu.institution}, ${edu.location}`, {
      x: 50,
      y,
      size: STYLING.sizes.body,
      font: regularFont
    });

    y -= 15;

    page.drawText(edu.graduationDate, {
      x: 50,
      y,
      size: STYLING.sizes.body,
      font: regularFont,
      color: rgb(STYLING.colors.accent.r/255, STYLING.colors.accent.g/255, STYLING.colors.accent.b/255)
    });

    y -= 20;
  }

  // Certifications
  y -= 10;
  for (const cert of resumeData.certifications) {
    page.drawText(`${cert.title} - ${cert.organization}`, {
      x: 50,
      y,
      size: STYLING.sizes.body,
      font: boldFont
    });

    y -= 15;

    page.drawText(cert.issueDate, {
      x: 50,
      y,
      size: STYLING.sizes.detail,
      font: regularFont,
      color: rgb(STYLING.colors.accent.r/255, STYLING.colors.accent.g/255, STYLING.colors.accent.b/255)
    });

    y -= 20;
  }

  return y;
}

export async function generateDOCX(): Promise<Buffer> {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(STYLING.margins.page.top),
            bottom: convertInchesToTwip(STYLING.margins.page.bottom),
            left: convertInchesToTwip(STYLING.margins.page.left),
            right: convertInchesToTwip(STYLING.margins.page.right)
          }
        }
      },
      children: [
        ...generateDocxHeader(),
        ...generateDocxSkills(),
        ...generateDocxExperience(),
        ...generateDocxEducation()
      ]
    }]
  });

  return Packer.toBuffer(doc);
}

function generateDocxHeader(): Paragraph[] {
  return [
    new Paragraph({
      text: resumeData.header.name.toUpperCase(),
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.LEFT,
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Revenue Operations Consultant',
          bold: true,
          size: 28,
          color: '002FFF'
        })
      ],
      spacing: { after: 200 }
    }),
    new Paragraph({
      children: [
        new TextRun(resumeData.header.email),
        new TextRun(' | '),
        new TextRun(resumeData.header.phone),
        new TextRun(' | '),
        new TextRun(resumeData.header.location)
      ],
      spacing: { after: 200 }
    })
  ];
}

function generateDocxSkills(): Paragraph[] {
  // Implementation for skills section in DOCX format
  return [];
}

function generateDocxExperience(): Paragraph[] {
  // Implementation for experience section in DOCX format
  return [];
}

function generateDocxEducation(): Paragraph[] {
  // Implementation for education section in DOCX format
  return [];
}

function wrapText(text: string, maxWidth: number): string[] {
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

  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  return lines;
}

export function getKeywordDensity(text: string): Record<string, number> {
  const words = text.toLowerCase().split(/\s+/);
  const keywordCount: Record<string, number> = {};

  Object.values(KEYWORDS).flat().forEach(keyword => {
    const keywordLower = keyword.toLowerCase();
    const count = words.filter(word => word.includes(keywordLower)).length;
    if (count > 0) {
      keywordCount[keyword] = count;
    }
  });

  return keywordCount;
}
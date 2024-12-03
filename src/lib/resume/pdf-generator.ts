import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { ResumeData } from '@/types/resume';
import { RESUME_CONFIG } from '@/lib/constants/resume-constants';
import {
  TextStyle,
  wrapText,
  calculateSectionHeight,
  formatDate,
  validatePageBreak,
  ResourceManager,
} from './utils';

export class PDFGenerator {
  private pdfDoc: PDFDocument;
  private currentPage: PDFPage;
  private regularFont: PDFFont;
  private boldFont: PDFFont;
  private currentY: number;
  private resourceManager: ResourceManager;

  private readonly pageWidth = RESUME_CONFIG.pdf.page.width;
  private readonly pageHeight = RESUME_CONFIG.pdf.page.height;
  private readonly margins = RESUME_CONFIG.pdf.page.margins;

  constructor() {
    this.resourceManager = new ResourceManager();
  }

  async initialize(): Promise<void> {
    this.pdfDoc = await PDFDocument.create();
    this.regularFont = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
    this.boldFont = await this.pdfDoc.embedFont(StandardFonts.HelveticaBold);
    this.addNewPage();
  }

  private addNewPage(): void {
    this.currentPage = this.pdfDoc.addPage([this.pageWidth, this.pageHeight]);
    this.currentY = this.pageHeight - this.margins.top;
  }

  private getStyle(
    type: keyof typeof RESUME_CONFIG.pdf.fonts.sizes,
    isBold = false
  ): TextStyle {
    return {
      font: isBold ? this.boldFont : this.regularFont,
      size: RESUME_CONFIG.pdf.fonts.sizes[type],
      lineHeight: RESUME_CONFIG.pdf.fonts.lineHeight.normal,
      color: RESUME_CONFIG.pdf.colors.text,
    };
  }

  private addText(
    text: string,
    style: TextStyle,
    options: {
      x?: number;
      maxWidth?: number;
      color?: { r: number; g: number; b: number };
    } = {}
  ): void {
    const x = options.x ?? this.margins.left;
    const maxWidth =
      options.maxWidth ??
      this.pageWidth - this.margins.left - this.margins.right;
    const color = options.color ?? style.color;

    const { lines, height } = wrapText({ text, style, x, maxWidth });

    if (
      validatePageBreak(this.currentY, height, this.pageHeight, this.margins)
    ) {
      this.addNewPage();
    }

    lines.forEach((line) => {
      this.currentPage.drawText(line, {
        x,
        y: this.currentY,
        font: style.font,
        size: style.size,
        color: rgb(color.r / 255, color.g / 255, color.b / 255),
      });
      this.currentY -= style.size * (style.lineHeight || 1.2);
    });
  }

  private addHeader(data: ResumeData['header']): void {
    // Name
    this.addText(data.name.toUpperCase(), this.getStyle('name', true), {
      color: RESUME_CONFIG.pdf.colors.primary,
    });
    this.currentY -= RESUME_CONFIG.pdf.spacing.paragraph;

    // Title
    this.addText(data.title, this.getStyle('title', true));
    this.currentY -= RESUME_CONFIG.pdf.spacing.paragraph;

    // Contact Information
    const contactInfo = [
      data.email,
      data.phone,
      data.location,
      data.linkedin ? `LinkedIn: ${data.linkedin}` : null,
      data.website ? `Portfolio: ${data.website}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    this.addText(contactInfo, this.getStyle('body'));
    this.currentY -= RESUME_CONFIG.pdf.spacing.section;
  }

  private addHighlights(highlights: ResumeData['highlights']): void {
    this.addText('KEY HIGHLIGHTS', this.getStyle('sectionHeader', true), {
      color: RESUME_CONFIG.pdf.colors.primary,
    });
    this.currentY -= RESUME_CONFIG.pdf.spacing.subsection;

    const highlightGrid = this.currentPage.drawTable({
      x: this.margins.left,
      y: this.currentY,
      width: this.pageWidth - this.margins.left - this.margins.right,
      rowHeight: 60,
      rows: [
        highlights.map((highlight) => ({
          cells: [
            { content: highlight.metric, style: this.getStyle('title', true) },
            { content: highlight.description, style: this.getStyle('body') },
          ],
        })),
      ],
    });

    this.currentY = highlightGrid.bottom - RESUME_CONFIG.pdf.spacing.section;
  }

  // Additional section methods...

  async generate(data: ResumeData): Promise<Buffer> {
    try {
      await this.initialize();

      this.addHeader(data.header);
      this.addHighlights(data.highlights);
      // Add other sections...

      return Buffer.from(await this.pdfDoc.save());
    } finally {
      this.resourceManager.dispose();
    }
  }
}

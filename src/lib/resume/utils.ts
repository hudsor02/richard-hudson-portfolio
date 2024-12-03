/**
 * utils.ts
 * Core utilities for resume generation
 */

import { RESUME_CONFIG } from '@/lib/constants/resume-constants';
import { format as dateFormat, parseISO } from 'date-fns';
import { PDFFont, PDFPage, rgb } from 'pdf-lib';

export interface TextStyle {
  font: PDFFont;
  fontSize: number;
  color?: ReturnType<typeof rgb>;
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
  x?: number;
  y?: number;
}

export function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, fontSize);

    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

export function drawTextBlock(
  page: PDFPage,
  text: string,
  options: TextStyle
): number {
  const {
    font,
    fontSize,
    color = rgb(0, 0, 0),
    maxWidth = page.getWidth() -
      RESUME_CONFIG.pdf.margins.left -
      RESUME_CONFIG.pdf.margins.right,
    align = 'left',
  } = options;

  const lines = wrapText(text, font, fontSize, maxWidth);
  let yPosition = options.y || page.getHeight() - RESUME_CONFIG.pdf.margins.top;

  for (const line of lines) {
    let xPosition = options.x || RESUME_CONFIG.pdf.margins.left;

    if (align !== 'left') {
      const lineWidth = font.widthOfTextAtSize(line, fontSize);
      if (align === 'center') {
        xPosition = (page.getWidth() - lineWidth) / 2;
      } else if (align === 'right') {
        xPosition =
          page.getWidth() - RESUME_CONFIG.pdf.margins.right - lineWidth;
      }
    }

    page.drawText(line, {
      x: xPosition,
      y: yPosition,
      size: fontSize,
      font,
      color,
    });

    yPosition -= RESUME_CONFIG.pdf.fonts.spacing.line;
  }

  return yPosition;
}

export function validatePageBreak(
  currentY: number,
  contentHeight: number,
  margin: number = RESUME_CONFIG.pdf.margins.bottom
): boolean {
  return currentY - contentHeight < margin;
}

export function calculateSectionHeight(
  lines: number,
  spacing: number = RESUME_CONFIG.pdf.fonts.spacing.line
): number {
  return lines * spacing;
}

export function formatDate(
  dateString: string,
  formatString = 'MMMM yyyy'
): string {
  try {
    return dateFormat(parseISO(dateString), formatString);
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
}

export function formatDateRange(start: string, end?: string): string {
  try {
    const startDate = formatDate(start, 'MMM yyyy');
    const endDate = end ? formatDate(end, 'MMM yyyy') : 'Present';
    return `${startDate} - ${endDate}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'Invalid date range';
  }
}

export function sanitizeText(text: string): string {
  return text.replace(/[^\x20-\x7E]/g, '').trim();
}

export function calculateContentWidth(page: PDFPage): number {
  return (
    page.getWidth() -
    RESUME_CONFIG.pdf.margins.left -
    RESUME_CONFIG.pdf.margins.right
  );
}

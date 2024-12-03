import { type PDFFont } from 'pdf-lib';
import { ResumeData } from '@/types/resume';
import { RESUME_CONFIG } from '@/lib/constants/resume-constants';

export interface TextStyle {
  font: PDFFont;
  size: number;
  lineHeight?: number;
  color?: { r: number; g: number; b: number };
}

export interface TextBlock {
  text: string;
  style: TextStyle;
  x: number;
  maxWidth: number;
}

export function wrapText(block: TextBlock): { lines: string[]; height: number } {
  const words = block.text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = block.style.font.widthOfTextAtSize(testLine, block.style.size);

    if (width <= block.maxWidth) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  const lineHeight = block.style.lineHeight || 1.2;
  const totalHeight = lines.length * (block.style.size * lineHeight);

  return { lines, height: totalHeight };
}

export function calculateSectionHeight(
  content: string[],
  style: TextStyle,
  maxWidth: number,
  spacing: number
): number {
  let totalHeight = 0;

  for (const text of content) {
    const { height } = wrapText({
      text,
      style,
      x: 0,  // x position doesn't affect height calculation
      maxWidth,
    });
    totalHeight += height + spacing;
  }

  return totalHeight;
}

export function formatDate(date: string): string {
  return date.replace(/(\w+) (\d{4})/, '$1, $2');
}

export function extractKeywords(text: string): string[] {
  const allKeywords = [
    ...RESUME_CONFIG.ats.keywords.technical,
    ...RESUME_CONFIG.ats.keywords.soft,
    ...RESUME_CONFIG.ats.keywords.tools,
  ];

  return allKeywords.filter(keyword =>
    text.toLowerCase().includes(keyword.toLowerCase())
  );
}

export function validatePageBreak(
  currentY: number,
  contentHeight: number,
  pageHeight: number,
  margins: { top: number; bottom: number }
): boolean {
  const availableSpace = currentY - margins.bottom;
  return contentHeight > availableSpace;
}

export function generateSectionTitle(
  title: string,
  prefix: string = ''
): string {
  return prefix ? `${prefix} | ${title}` : title;
}

export function formatAchievement(achievement: string): string {
  // Ensure achievement starts with a strong action verb
  if (!/^[A-Z][a-z]+ed|^[A-Z][a-z]+d|^[A-Z][a-z]+t/.test(achievement)) {
    return achievement;
  }

  // Extract and highlight metrics
  return achievement.replace(
    /(\d+\.?\d*%|\$\d+\.?\d*[KMB]?\+?|\d+\.?\d*x)/g,
    match => `**${match}**`
  );
}

interface Section {
  title: string;
  content: string[];
  order: number;
}

export function sortSections(sections: Section[]): Section[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

export function validateResumeLength(
  content: string[],
  style: TextStyle,
  maxWidth: number,
  pageHeight: number,
  margins: { top: number; bottom: number }
): boolean {
  const totalHeight = calculateSectionHeight(
    content,
    style,
    maxWidth,
    RESUME_CONFIG.pdf.spacing.paragraph
  );

  const availableHeight = pageHeight - margins.top - margins.bottom;
  return totalHeight <= availableHeight;
}

export class ResourceManager {
  private resources: Set<{ dispose: () => void }> = new Set();

  register(resource: { dispose: () => void }): void {
    this.resources.add(resource);
  }

  dispose(): void {
    for (const resource of this.resources) {
      try {
        resource.dispose();
      } catch (error) {
        console.error('Error disposing resource:', error);
      }
    }
    this.resources.clear();
  }
}
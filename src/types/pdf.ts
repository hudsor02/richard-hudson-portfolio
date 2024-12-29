// src/types/pdf.ts
import { jsPDF } from 'jspdf';

interface AutoTableOptions {
  startY: number;
  head: string[][];
  body: string[][];
  theme: string;
  headStyles: {
    fillColor: number[];
    textColor: number[];
    fontStyle: string;
  };
  styles: {
    font: string;
    fontSize: number;
    cellPadding: number;
  };
}

interface AutoTableResult {
  finalY: number;
}

export interface PDFDocument extends jsPDF {
  autoTable: (options: AutoTableOptions) => void;
  lastAutoTable: AutoTableResult;
}

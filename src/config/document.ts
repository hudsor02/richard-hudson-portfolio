// src/config/document.ts
export const DOCUMENT_CONFIG = {
  FORMATS: {
    PDF: 'pdf',
    DOCX: 'docx',
  },
  MARGINS: {
    TOP: 36,
    BOTTOM: 36,
    LEFT: 36,
    RIGHT: 36,
  },
  FONT_SIZES: {
    HEADER: 22,
    SUBHEADER: 14,
    TEXT: 11,
    SMALL_TEXT: 9,
  },
  COLORS: {
    PRIMARY: '#1E40AF',
    SECONDARY: '#6B7280',
    TEXT: '#111827',
  },
} as const;

export type DocumentFormat =
  (typeof DOCUMENT_CONFIG.FORMATS)[keyof typeof DOCUMENT_CONFIG.FORMATS];

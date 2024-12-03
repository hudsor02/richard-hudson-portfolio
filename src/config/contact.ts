// src/config/contact.ts
export const CONTACT_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: new Map<string, string>([
    ['application/pdf', 'PDF'],
    ['application/msword', 'DOC'],
    [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'DOCX',
    ],
    ['image/jpeg', 'JPEG/JPG'],
    ['image/png', 'PNG'],
  ]),
} as const;

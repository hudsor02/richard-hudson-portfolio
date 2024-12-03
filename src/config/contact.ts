interface ContactConfig {
  MAX_FILE_SIZE: number;
  ALLOWED_FILE_TYPES: Map<string, string>;
}

export const CONTACT_CONFIG: ContactConfig = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: new Map<string, string>([
    ['application/pdf', 'PDF'],
    ['image/jpeg', 'JPEG/JPG'],
    ['image/png', 'PNG'],
  ]),
};

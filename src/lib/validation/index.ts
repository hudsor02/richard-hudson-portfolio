// src/lib/validations/index.ts
export const validateInput = (input: string): boolean => {
  return input.trim() !== '';
};

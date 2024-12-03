import { z } from 'zod';

// Base validation schemas
export const dateSchema = z.date();
export const urlSchema = z.string().url();

// Validation schemas for common fields
export const BaseEntrySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  lastUpdated: dateSchema.optional(),
  validThrough: dateSchema.optional(),
});

// Base types for common fields with enhanced validation
interface BaseEntry {
  title: string;
  description?: string;
  lastUpdated?: string; // Changed from Date
  validThrough?: Date;
}

// Contact information with enhanced validation
interface ContactInfo extends BaseEntry {
  name: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  linkedin?: string;
  website?: string;
  profileImage?: string;
}

// More specific highlight metrics
export interface Highlight extends BaseEntry {
  metric: {
    value: number;
    unit: 'percent' | 'currency' | 'count' | 'multiple';
    prefix?: string;
    suffix?: string;
  };
  impact: string;
  category?: 'revenue' | 'efficiency' | 'growth' | 'cost-savings';
}

// Enhanced work experience
export interface Experience extends BaseEntry {
  position: string;
  company: string;
  location: {
    city: string;
    state: string;
    remote?: boolean;
  };
  dates: {
    start: string;
    end?: string;
    isCurrent?: boolean;
  };
  achievements: string[];
  technologies: string[];
  highlights?: Highlight[];
  teamSize?: number;
  responsibilities?: string[];
}

// Enhanced education with more structured data
export interface Education extends BaseEntry {
  degree: {
    type: 'BS' | 'BA' | 'MS' | 'MBA' | 'PhD' | string;
    major: string;
    minor?: string;
  };
  institution: string;
  location: {
    city: string;
    state: string;
  };
  graduationDate: string; // Changed from Date
  gpa?: number;
  honors: string[];
  relevantCourses: string[];
}

// Enhanced certification with verification
export interface Certification extends BaseEntry {
  organization: string;
  issueDate: string; // Changed from Date
  expiryDate?: string; // Changed from Date
  credentialId: string;
  credentialUrl?: string;
  status: 'active' | 'expired' | 'in-progress';
  skills: string[];
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// Technical expertise with proficiency levels
export interface TechnicalExpertise {
  categories: Array<{
    title: string;
    skills: Array<{
      name: string;
      proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
      yearsOfExperience?: number;
    }>;
  }>;
}

// Main resume interface with metadata
export interface ResumeData {
  header: ContactInfo;
  highlights: Highlight[];
  summary?: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  technicalExpertise: TechnicalExpertise;
  metadata: {
    lastUpdated: string;
    version: string;
    template: string;
    keywords: string[];
    locale: string;
  };
}

// Type guards with enhanced validation
export const isExperience = (item: unknown): item is Experience => {
  if (!item || typeof item !== 'object') return false;
  const exp = item as Experience;
  return (
    typeof exp.position === 'string' &&
    typeof exp.company === 'string' &&
    exp.location?.city != null &&
    exp.location?.state != null &&
    exp.dates?.start != null && // Changed from instanceof Date
    Array.isArray(exp.achievements) &&
    Array.isArray(exp.technologies)
  );
};

// Enhanced validation utilities
export const ValidationRules = {
  name: /^[\p{L}\s.\-']{2,50}$/u,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[1-9]\d{1,14}$/,
  url: /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/,
} as const;

// Type-safe validators with error handling
export const Validators = {
  isValidDateInstance(date: unknown): date is Date {
    return date instanceof Date && !isNaN(date.getTime());
  },

  isValidUrlString(url: string): boolean {
    return urlSchema.safeParse(url).success;
  },

  isValidHighlightMetric(metric: Highlight['metric']): boolean {
    return Boolean(
      metric &&
        typeof metric.value === 'number' &&
        ['percent', 'currency', 'count', 'multiple'].includes(metric.unit)
    );
  },
};

// Add type utilities
/**
 * Utility type to make all properties in a type optional, including nested properties.
 * This is useful for creating partial versions of complex types.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Represents the keys of the ResumeData interface, used to identify different sections of the resume.
export type ResumeSection = keyof ResumeData;

/**
 * Represents a validation error with a specific field and an error message.
 * This type is used to provide detailed validation feedback for form fields.
 */
export type ValidationError = { field: string; message: string };

/**
 * Represents a range of dates with a start date and an optional end date.
 * This type is useful for defining periods such as employment duration, project timelines, etc.
 */
export type DateRange = { start: Date; end?: Date };

/**
 * Represents the result of validating a resume.
 * It contains a boolean indicating if the resume is valid and an array of error messages if any.
 */
export interface ResumeValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Represents a function that takes the previous resume data and returns the updated resume data.
 * This type is useful for defining functions that perform updates on the resume data.
 */
export type ResumeUpdateFunction = (prevData: ResumeData) => ResumeData;

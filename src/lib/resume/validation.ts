import { RESUME_CONFIG } from '@/lib/constants/resume-constants';
import type { ResumeData } from '@/types/resume';
import { parseISO } from 'date-fns';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
}

export function validateResumeData(data: ResumeData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];

  try {
    validateHeader(data.header, errors);

    if (
      typeof data.summary === 'string' &&
      data.summary.length > RESUME_CONFIG.validation.maxLength.summary
    ) {
      warnings.push('Professional summary exceeds recommended length');
    }

    validateExperience(data.experience, errors, warnings);
    validateTechnicalExpertise(data.technicalExpertise, errors, warnings);
    validateEducation(data.education, errors);

    if (data.certifications?.length) {
      validateCertifications(data.certifications, errors, warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  } catch (error) {
    console.error('Validation error:', error);
    return {
      isValid: false,
      errors: [
        {
          field: 'general',
          message:
            error instanceof Error ? error.message : 'Unknown validation error',
        },
      ],
      warnings,
    };
  }
}

function validateHeader(
  header: ResumeData['header'],
  errors: ValidationError[]
): void {
  if (!header) {
    errors.push({ field: 'header', message: 'Header information is required' });
    return;
  }

  const requiredFields = [
    'name',
    'title',
    'email',
    'phone',
    'location',
  ] as const;
  requiredFields.forEach((field) => {
    if (!header[field]) {
      errors.push({
        field: `header.${field}`,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
      });
    }
  });

  if (header.location && (!header.location.city || !header.location.state)) {
    errors.push({
      field: 'header.location',
      message: 'Both city and state are required',
    });
  }
}

function validateExperience(
  experience: ResumeData['experience'],
  errors: ValidationError[],
  warnings: string[]
): void {
  if (!experience?.length) {
    errors.push({
      field: 'experience',
      message: 'At least one experience entry is required',
    });
    return;
  }

  experience.forEach((exp, index) => {
    if (!exp.position) {
      errors.push({
        field: `experience[${index}].position`,
        message: 'Position title is required',
      });
    }

    if (!exp.company) {
      errors.push({
        field: `experience[${index}].company`,
        message: 'Company name is required',
      });
    }

    if (exp.dates) {
      try {
        const startDate = parseISO(exp.dates.start);
        if (exp.dates.end) {
          const endDate = parseISO(exp.dates.end);
          if (endDate < startDate) {
            errors.push({
              field: `experience[${index}].dates`,
              message: 'End date must be after start date',
            });
          }
        }
      } catch {
        errors.push({
          field: `experience[${index}].dates`,
          message: 'Invalid date format',
        });
      }
    }

    if (!exp.achievements?.length) {
      errors.push({
        field: `experience[${index}].achievements`,
        message: 'At least one achievement is required',
      });
    } else if (
      exp.achievements.length >
      RESUME_CONFIG.validation.maxItems.achievementsPerJob
    ) {
      warnings.push(
        `Experience "${exp.position}" has more achievements than recommended`
      );
    }
  });
}

function validateTechnicalExpertise(
  expertise: ResumeData['technicalExpertise'],
  errors: ValidationError[],
  warnings: string[]
): void {
  if (!expertise?.categories?.length) {
    errors.push({
      field: 'technicalExpertise',
      message: 'At least one skill category is required',
    });
    return;
  }

  expertise.categories.forEach((category, index) => {
    if (!category.title) {
      errors.push({
        field: `technicalExpertise.categories[${index}].title`,
        message: 'Category title is required',
      });
    }

    if (!category.skills?.length) {
      errors.push({
        field: `technicalExpertise.categories[${index}].skills`,
        message: 'At least one skill is required per category',
      });
    } else if (
      category.skills.length > RESUME_CONFIG.validation.maxItems.skills
    ) {
      warnings.push(
        `Category "${category.title}" has more skills than recommended`
      );
    }
  });
}

function validateEducation(
  education: ResumeData['education'],
  errors: ValidationError[]
): void {
  if (!education?.length) {
    errors.push({
      field: 'education',
      message: 'At least one education entry is required',
    });
    return;
  }

  education.forEach((edu, index) => {
    if (!edu.degree?.type || !edu.degree?.major) {
      errors.push({
        field: `education[${index}].degree`,
        message: 'Degree type and major are required',
      });
    }

    if (!edu.institution) {
      errors.push({
        field: `education[${index}].institution`,
        message: 'Institution is required',
      });
    }

    if (!edu.graduationDate) {
      errors.push({
        field: `education[${index}].graduationDate`,
        message: 'Graduation date is required',
      });
    } else {
      try {
        parseISO(edu.graduationDate);
      } catch {
        errors.push({
          field: `education[${index}].graduationDate`,
          message: 'Invalid graduation date format',
        });
      }
    }
  });
}

function validateCertifications(
  certifications: ResumeData['certifications'],
  errors: ValidationError[],
  warnings: string[]
): void {
  if (certifications.length > RESUME_CONFIG.validation.maxItems.certificates) {
    warnings.push(
      `Number of certifications (${certifications.length}) exceeds recommended maximum`
    );
  }

  certifications.forEach((cert, index) => {
    if (!cert.title || !cert.organization) {
      errors.push({
        field: `certifications[${index}]`,
        message: 'Certification title and organization are required',
      });
    }

    if (cert.issueDate) {
      try {
        parseISO(cert.issueDate);
      } catch {
        errors.push({
          field: `certifications[${index}].issueDate`,
          message: 'Invalid issue date format',
        });
      }
    }
  });
}

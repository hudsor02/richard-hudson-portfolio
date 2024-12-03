// src/types/resume.ts
export interface Highlight {
  metric: string;
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  dates: string;
  achievements: string[];
}

export interface TechnicalExpertise {
  columns: Array<{
    title: string;
    items: string[];
  }>;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  description?: string;
}

export interface Certification {
  title: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
}

export interface ResumeData {
  highlights: Highlight[];
  experience: Experience[];
  technicalExpertise: TechnicalExpertise;
  education: Education[];
  certifications: Certification[];
}

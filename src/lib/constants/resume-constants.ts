export const RESUME_CONFIG = {
  pdf: {
    page: {
      width: 612, // 8.5 inches in points
      height: 792, // 11 inches in points
    },
    margins: {
      top: 54, // 0.75 inch
      bottom: 54,
      left: 54,
      right: 54,
    },
    fonts: {
      sizes: {
        name: 18,
        title: 14,
        section: 14,
        subsection: 12,
        body: 11,
        detail: 10,
        footer: 8,
      },
      spacing: {
        line: 18,
        paragraph: 22,
        section: 30,
        afterHeading: 16,
        beforeBullet: 12,
        afterBullet: 8,
      },
      indentation: {
        bullet: 14,
        text: 28,
      },
    },
    colors: {
      primary: { r: 0, g: 0, b: 0 },
      text: { r: 0, g: 0, b: 0 },
      accent: { r: 0.2, g: 0.2, b: 0.2 },
      navy: { r: 0, g: 0, b: 0.55 },
      lines: { r: 0.8, g: 0.8, b: 0.8 },
    },
  },
  layout: {
    maxContentWidth: 612 - 108,
    maxTitleWidth: 450,
    buffer: 72,
  },
  validation: {
    maxLength: {
      name: 50,
      title: 100,
      summary: 1200,
      achievement: 300,
      skillDescription: 100,
    },
    minLength: {
      name: 2,
      title: 5,
      company: 2,
      position: 3,
      achievement: 20,
    },
    maxItems: {
      experience: 15,
      skills: 25,
      certificates: 6,
      achievementsPerJob: 8,
    },
    required: ['name', 'email', 'phone', 'experience'],
  },
  ats: {
    keywords: {
      technical: [
        'Revenue Operations',
        'Data Analytics',
        'Process Optimization',
        'Salesforce',
        'Power BI',
        'API Integration',
        'Automation',
      ],
      soft: [
        'Leadership',
        'Strategy',
        'Cross-functional',
        'Communication',
        'Problem Solving',
      ],
      tools: [
        'Salesforce',
        'Power BI',
        'Workato',
        'PartnerStack',
        'SharePoint',
      ],
    },
    formatting: {
      dateFormat: 'MMM yyyy', // Sep 2023
      dateFormatLong: 'MMMM yyyy', // September 2023
    },
  },
  errorMessages: {
    invalidDate: 'Invalid date format',
    sectionTooLong: (section: string) =>
      `The ${section} section exceeds maximum length`,
    missingRequired: (field: string) => `${field} is required`,
    invalidLength: (field: string, min: number, max: number) =>
      `${field} must be between ${min} and ${max} characters`,
  },
} as const;

export const FILE_TYPES = {
  pdf: 'application/pdf',
} as const;

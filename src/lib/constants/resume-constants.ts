export const RESUME_CONFIG = {
    pdf: {
      page: {
        width: 612, // 8.5 inches in points
        height: 792, // 11 inches in points
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      },
      fonts: {
        sizes: {
          name: 24,
          title: 18,
          sectionHeader: 16,
          subsectionHeader: 14,
          body: 11,
          detail: 10,
        },
        lineHeight: {
          normal: 1.2,
          relaxed: 1.4,
          loose: 1.6,
        },
      },
      colors: {
        primary: { r: 0, g: 47, b: 255 },     // Brand blue
        text: { r: 26, g: 26, b: 26 },        // Near black
        accent: { r: 71, g: 85, b: 105 }      // Slate gray
      },
      spacing: {
        section: 30,
        subsection: 20,
        paragraph: 15,
        list: 10,
      },
    },
    docx: {
      page: {
        margins: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
      fonts: {
        name: 'Helvetica',
        sizes: {
          name: 28,
          title: 24,
          sectionHeader: 20,
          subsectionHeader: 16,
          body: 12,
          detail: 11,
        },
        lineSpacing: {
          single: 240,
          relaxed: 360,
        },
      },
      colors: {
        primary: '002FFF',    // Brand blue in hex
        text: '1A1A1A',       // Near black in hex
        accent: '475569',     // Slate gray in hex
      },
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
      sectionOrder: [
        'header',
        'highlights',
        'experience',
        'technicalExpertise',
        'education',
        'certifications',
      ],
    },
  } as const;

  export const FILE_TYPES = {
    pdf: {
      contentType: 'application/pdf',
      extension: 'pdf',
    },
    docx: {
      contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: 'docx',
    },
  } as const;

  export type ResumeFormat = keyof typeof FILE_TYPES;
  export type SectionName = keyof typeof RESUME_CONFIG.ats.keywords;
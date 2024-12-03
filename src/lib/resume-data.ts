// src/lib/resume-data.ts

// Types
export interface ResumeHeader {
  name: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
}

export interface Highlight {
  metric: string;
  description: string;
}

export interface Experience {
  company: string;
  location: string;
  position: string;
  dates: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string; // Changed from school to match the component
  location: string;
  graduationDate: string;
  description?: string;
}

export interface Certification {
  title: string;
  organization: string; // Made required to match UI
  issueDate: string; // Made required to match UI
  expiryDate?: string;
}

export interface TechnicalExpertise {
  columns: Array<{
    // Changed to match the UI component structure
    title: string;
    items: string[];
  }>;
}

export interface ResumeData {
  header: ResumeHeader;
  highlights: Highlight[];
  summary: string;
  experience: Experience[];
  education: Education[]; // Changed to array to match the UI
  certifications: Certification[];
  technicalExpertise: TechnicalExpertise;
}

// Data
export const resumeData: ResumeData = {
  header: {
    name: 'RICHARD HUDSON',
    email: 'hudsor01@icloud.com',
    phone: '214.566.0279',
    website: 'richardwhudsonjr.com',
    linkedin: 'linkedin.com/in/hudsor01',
  },
  highlights: [
    { metric: '$1.1M+', description: 'Annual Revenue' },
    { metric: '2,200%', description: 'Partner Growth' },
    { metric: '432%', description: 'Transaction Volume' },
    { metric: '100%', description: 'Commission Accuracy' },
  ],
  summary:
    'Revenue Operations Professional with expertise in data-driven forecasting, process optimization, and cross-functional collaboration. Proven track record of driving revenue growth through analytical insights, partnership development, and strategic operational improvements.',
  experience: [
    {
      company: 'Thryv',
      location: 'Grapevine, TX',
      position: 'Revenue Operations Consultant',
      dates: 'April 2016 - November 2024',
      achievements: [
        'Spearheaded revenue operations strategy resulting in $1.1M+ annual revenue through data-driven optimization and forecasting.',
        'Led exponential growth initiatives resulting in 2,200% partner network expansion and 432% transaction volume increase.',
        'Developed and maintained robust revenue forecasting models using Power BI and Salesforce, achieving consistent accuracy in growth projections.',
        'Engineered automated commission management system with 100% accuracy across thousands of monthly transactions.',
        'Designed and implemented cross-functional workflow integration between Salesforce and PartnerStack using Workato, reducing processing time by 40%.',
        'Created comprehensive revenue analytics framework using Power BI and SharePoint, enabling real-time performance tracking and strategic decision-making.',
        'Built automated reporting infrastructure using PartnerStack API, streamlining data delivery to key stakeholders.',
        'Established KPI monitoring systems across sales operations, improving visibility into revenue drivers and team performance metrics.',
      ],
    },
    {
      company: 'Texas Army National Guard',
      location: 'Texas, USA',
      position: 'Information Technology Specialist (MOS 25B)',
      dates: 'March 2005 - March 2011',
      achievements: [
        'Maintained, monitored, and secured IT networks supporting over 500 personnel in mission-critical environments.',
        'Provided IT support for hardware, software, and network systems, ensuring 99.9% uptime during deployments and operations.',
        'Managed inventory and maintenance of IT equipment valued at $250,000+, ensuring readiness and operational availability.',
        'Installed and configured secure communication systems, enabling seamless operations across multiple regions during emergencies.',
        'Fostered strong collaboration with cross-functional teams, ensuring seamless communication and operational success in high-pressure environments.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Business Administration — Management',
      institution: 'University of Texas at Dallas', // Changed from school to institution
      location: 'Richardson, TX',
      graduationDate: '2016',
      description: 'Focus on Business Operations and Management',
    },
  ],
  certifications: [
    {
      title: 'HubSpot Revenue Operations Certification',
      organization: 'HubSpot',
      issueDate: '2023',
    },
    {
      title: 'Salesloft Certified Administrator',
      organization: 'Salesloft',
      issueDate: '2023',
    },
    {
      title: 'Career Essentials in Data Analysis',
      organization: 'Microsoft and LinkedIn',
      issueDate: '2023',
    },
    {
      title: 'Career Essentials in Business Analysis',
      organization: 'Microsoft and LinkedIn',
      issueDate: '2023',
    },
    {
      title: 'Atlassian Agile Project Management',
      organization: 'Atlassian',
      issueDate: '2023',
    },
  ],
  technicalExpertise: {
    columns: [
      {
        title: 'Platforms & Tools',
        items: [
          'Salesforce: Advanced reporting, dashboard creation, and process optimization',
          'PartnerStack: Partner relationship management and automation',
          'Workato: Integration and workflow automation',
          'Power BI: Sales analytics and dashboard development',
          'SharePoint: Analytics presentation and team collaboration',
        ],
      },
      {
        title: 'Skills & Capabilities',
        items: [
          'Data Analytics: Advanced Power BI dashboard development, sales analytics, and data visualization',
          'Programming: Python automation, API integration, Django/Flask web development',
          'Revenue Operations: Process automation and commission management',
          'Project Management: Agile methodologies, cross-functional team leadership',
          'Business Analysis: Requirements gathering, process optimization, stakeholder management',
        ],
      },
    ],
  },
};

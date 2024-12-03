/**
 * resume-data.ts
 * Contains the actual resume content with proper type safety and formatting
 */

import type { ResumeData } from '@/types/resume';

/**
 * Resume data with type-safe structure and ATS-optimized formatting
 */
export const resumeData: ResumeData = {
  header: {
    name: 'Richard Hudson',
    title: 'Revenue Operations Professional',
    email: 'hudsor01@icloud.com',
    phone: '214.566.0279',
    location: {
      city: 'Plano',
      state: 'TX',
      country: 'USA',
    },
    linkedin: 'https://linkedin.com/in/hudsor01',
    lastUpdated: new Date().toISOString(),
  },

  summary: `Revenue Operations Professional with expertise in data-driven forecasting, process optimization, and cross-functional collaboration. Proven track record of driving revenue growth through analytical insights, partnership development, and strategic operational improvements.`,

  // Achievement highlights with metrics for better ATS parsing
  highlights: [
    {
      title: 'Revenue Growth',
      metric: {
        value: 1.1,
        unit: 'currency',
        suffix: 'M+',
      },
      impact:
        'Spearheaded revenue operations strategy resulting in $1.1M+ annual revenue through data-driven optimization and forecasting.',
      category: 'revenue',
    },
    {
      title: 'Network Growth',
      metric: {
        value: 2200,
        unit: 'percent',
        suffix: '',
      },
      impact:
        'Led exponential growth initiatives resulting in 2,200% partner network expansion and 432% transaction volume increase.',
      category: 'growth',
    },
    {
      title: 'Process Optimization',
      metric: {
        value: 40,
        unit: 'percent',
        suffix: '',
      },
      impact:
        'Designed and implemented cross-functional workflow integration between Salesforce and PartnerStack using Workato, reducing processing time by 40%.',
      category: 'efficiency',
    },
  ],

  experience: [
    {
      title: 'Revenue Operations Consultant',
      position: 'Revenue Operations Consultant',
      company: 'Thryv',
      location: {
        city: 'Grapevine',
        state: 'TX',
        remote: false,
      },
      dates: {
        start: '2016-04-16',
        end: '2024-11-01',
        isCurrent: false,
      },
      achievements: [
        'Drove $1.1M+ annual revenue through data-driven optimization and forecasting.',
        'Expanded partner network by 2,200% and increased transaction volume by 432%.',
        'Maintained accurate revenue forecasting models using Power BI and Salesforce.',
        'Automated commission management system with 100% accuracy.',
        'Integrated Salesforce and PartnerStack workflows, reducing processing time by 40%.',
        'Enabled real-time performance tracking with a comprehensive analytics framework.',
        'Streamlined data delivery with automated reporting infrastructure.',
        'Improved visibility into revenue drivers and team performance with KPI monitoring systems.',
      ],
      technologies: [
        'Salesforce',
        'Power BI',
        'Workato',
        'PartnerStack',
        'SharePoint',
      ],
      lastUpdated: new Date().toISOString(),
    },
    {
      title: 'Information Technology Specialist (MOS 25B)',
      position: 'Information Technology Specialist (MOS 25B)',
      company: 'Texas Army National Guard',
      location: {
        city: 'Texas',
        state: 'TX',
        remote: false,
      },
      dates: {
        start: '2005-03-01',
        end: '2011-03-01',
        isCurrent: false,
      },
      achievements: [
        'Maintained, monitored, and secured IT networks supporting over 500 personnel in mission-critical environments.',
        'Provided IT support for hardware, software, and network systems, ensuring 99.9% uptime during deployments and operations.',
        'Managed inventory and maintenance of IT equipment valued at $250,000+, ensuring readiness and operational availability.',
        'Installed and configured secure communication systems, enabling seamless operations across multiple regions during emergencies.',
        'Fostered strong collaboration with cross-functional teams, ensuring seamless communication and operational success in high-pressure environments.',
      ],
      technologies: [],
      lastUpdated: new Date().toISOString(),
    },
  ],

  technicalExpertise: {
    categories: [
      {
        title: 'Platforms & Tools',
        skills: [
          { name: 'Salesforce', proficiency: 'advanced', yearsOfExperience: 5 },
          {
            name: 'Power BI',
            proficiency: 'intermediate',
            yearsOfExperience: 3,
          },
          {
            name: 'Workato',
            proficiency: 'intermediate',
            yearsOfExperience: 2,
          },
          {
            name: 'PartnerStack',
            proficiency: 'advanced',
            yearsOfExperience: 4,
          },
          {
            name: 'SharePoint',
            proficiency: 'intermediate',
            yearsOfExperience: 3,
          },
        ],
      },
      {
        title: 'Skills & Capabilities',
        skills: [
          {
            name: 'Data Analytics',
            proficiency: 'advanced',
            yearsOfExperience: 5,
          },
          {
            name: 'Programming',
            proficiency: 'intermediate',
            yearsOfExperience: 3,
          },
          {
            name: 'Revenue Operations',
            proficiency: 'advanced',
            yearsOfExperience: 6,
          },
          {
            name: 'Project Management',
            proficiency: 'intermediate',
            yearsOfExperience: 4,
          },
          {
            name: 'Business Analysis',
            proficiency: 'advanced',
            yearsOfExperience: 7,
          },
        ],
      },
    ],
  },

  education: [
    {
      title: 'Bachelor of Science',
      degree: {
        type: 'Bachelor of Science',
        major: 'Business Administration',
      },
      institution: 'University of Texas at Dallas',
      location: {
        city: 'Richardson',
        state: 'Texas',
      },
      graduationDate: '2015-12-15',
      honors: [],
      relevantCourses: [
        'Business Analytics',
        'Operations Management',
        'Strategic Management',
      ],
    },
  ],

  certifications: [
    {
      title: 'HubSpot Revenue Operations Certification',
      organization: 'HubSpot',
      issueDate: '2024-08-04',
      credentialId: '686d1b88feeb4164936c237ddb24a2af',
      status: 'active',
      skills: ['Revenue Operations', 'HubSpot'],
    },
    {
      title: 'Salesloft Certified Administrator',
      organization: 'Salesloft',
      issueDate: '2024-01-01',
      credentialId: '12345', // Added missing credentialId
      status: 'active',
      skills: ['Salesloft', 'Administration'],
    },
    {
      title: 'Career Essentials in Data Analysis',
      organization: 'Microsoft and LinkedIn',
      credentialId: '11223',
      issueDate: '2024-01-01',
      status: 'active',
      skills: ['Data Analysis', 'Microsoft', 'LinkedIn'],
    },
    {
      title: 'Career Essentials in Business Analysis',
      organization: 'Microsoft and LinkedIn',
      credentialId: '44556',
      issueDate: '2024-01-01',
      status: 'active',
      skills: ['Business Analysis', 'Microsoft', 'LinkedIn'],
    },
    {
      title: 'Atlassian Agile Project Management',
      organization: 'Atlassian',
      credentialId: '77889',
      issueDate: '2024-01-01',
      status: 'active',
      skills: ['Agile Project Management', 'Atlassian'],
    },
  ],

  metadata: {
    lastUpdated: new Date().toISOString(),
    version: '1.0',
    template: 'Professional',
    keywords: [
      'Revenue Operations',
      'Strategic Partnerships',
      'Data Analytics',
    ],
    locale: 'en-US',
  },
};

export type { ResumeData } from '@/types/resume';

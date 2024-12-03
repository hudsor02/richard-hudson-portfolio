// src/components/seo/metadata.tsx
import { Metadata } from 'next';

interface GenerateMetadataProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export function generateMetadata({
  title,
  description,
  path,
  type = 'website',
  image = '/og-image.jpg',
  publishedTime,
  modifiedTime,
  author,
  section,
}: GenerateMetadataProps): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://richardwhudsonjr.com';
  const url = `${baseUrl}${path}`;
  const ogImage = `${baseUrl}${image}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Richard Hudson',
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@dickswayze',
      site: '@dickswayze',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    applicationName: 'Richard Hudson Portfolio',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: [
      'Revenue Operations',
      'Sales Operations',
      'Process Optimization',
      'Data Analytics',
      'Partner Management',
      'Automation',
      'Richard Hudson',
      'Business Operations',
      'Digital Solutions',
      'Strategic Planning',
    ],
    authors: [{ name: 'Richard Hudson' }],
    creator: 'Richard Hudson',
    publisher: 'Richard Hudson',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    category: 'technology',
  };
}

'use client';

import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  url?: string;
  openGraph?: {
    type: string;
    locale: string;
    url: string;
    site_name: string;
  };
}

export default function SEO({
  title,
  description,
  keywords = 'Richard Hudson, Revenue Operations, Consulting, Partner Management, Automation',
  url = 'https://richard-hudson-portfolio.com',
  image = '/default-og-image.jpg',
}: SEOProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Richard Hudson" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={url + image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={url + image} />
      <meta name="twitter:creator" content="@richard_hudson" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export type { SEOProps };

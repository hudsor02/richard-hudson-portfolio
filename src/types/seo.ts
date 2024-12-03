// src/types/seo.ts
export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    type: string;
    locale: string;
    url: string;
    siteName: string;
    title: string;
    name: string;
    description: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    handle: string;
    site: string;
    cardType: string;
  };
  additionalMetaTags: Array<{
    property: string;
    content: string;
  }>;
  additionalLinkTags: Array<{
    rel: string;
    href: string;
  }>;
}

// src/components/seo/default-seo.tsx
import { NextSeo } from 'next-seo';
import { seoConfig } from '@/config/seo';

export default function DefaultSeo() {
  return <NextSeo {...seoConfig} />;
}

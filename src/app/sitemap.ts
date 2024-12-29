// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.richardwhudsonjr.com'

  // Define route priorities and change frequencies
  const routes = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      path: '/about',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/projects',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/services',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/resume',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/contact',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/consult',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
  ]

  // Map routes to sitemap entries
  const sitemapEntries = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority,
  }))

  return sitemapEntries
}
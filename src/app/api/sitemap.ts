import { NextApiRequest, NextApiResponse } from 'next';

const baseUrl = 'https://richard-hudson-portfolio.com';

const staticPaths = ['', 'about', 'resume', 'projects', 'contact'];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPaths
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}/${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
  </url>
  `
    )
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}

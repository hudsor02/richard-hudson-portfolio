// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
    {
        userAgent: '*',
        allow: [
            '/',
            '/about',
            '/contact',
            '/projects',
            '/services',
            '/resume',
            '/consult'
        ],
        disallow: [
            '/api/*',         // Protect API routes
            '/_next/*',       // Next.js internals
            '/_vercel/*',     // Vercel internals
            '/private/*',     // Any private routes
            '/*.json',        // JSON files
            '/*_files/*',     // Build files
            '/*.js',          // JavaScript files
            '/*.css',         // CSS files
            '/public/*.js',   // Public JavaScript files
            '/public/*.css',  // Public CSS files
            '/public/*.json', // Public JSON files
            '/error',         // Error pages
            '/404',           // 404 page
            '/500'           // 500 page
        ],
    },
    ],
    sitemap: 'https://www.richardwhudsonjr.com/sitemap.xml',
    host: 'https://www.richardwhudsonjr.com',
    }
}
// src/app/projects/page.tsx
import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Projects - Richard Hudson',
  description: 'Portfolio of projects and achievements by Richard Hudson',
};

const projects = [
  {
    title: 'Revenue Operations Strategy',
    description:
      'Implemented comprehensive revenue operations strategy resulting in significant growth.',
    tags: ['Strategy', 'Revenue Ops', 'Analytics'],
    metrics: ['$1.1M+ Revenue Growth', '2,200% Partner Growth'],
  },
  // Add more projects as needed
];

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center text-4xl font-bold">Projects</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 transition-shadow hover:shadow-lg">
              <h3 className="mb-3 text-xl font-bold">{project.title}</h3>
              <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="space-y-1">
                {project.metrics.map((metric) => (
                  <p
                    key={metric}
                    className="text-primary-600 dark:text-primary-400 text-sm"
                  >
                    {metric}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

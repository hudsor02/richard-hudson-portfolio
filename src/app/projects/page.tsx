// src/app/projects/page.tsx
import { Metadata } from 'next';
import React from 'react';

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
    <main className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Featured Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

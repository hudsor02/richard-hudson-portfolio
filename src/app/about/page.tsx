// src/app/about/page.tsx
'use client';

import React from 'react';

const expertiseAreas = [
  {
    title: 'Revenue Optimization',
    description:
      'Data-driven strategies to maximize revenue growth and operational efficiency.',
  },
  {
    title: 'Partnership Development',
    description:
      'Strategic partnership programs that drive sustainable business growth.',
  },
  {
    title: 'Process Automation',
    description:
      'Streamlined workflows and automated systems for improved productivity.',
  },
  {
    title: 'Data Analytics',
    description:
      'Leveraging data to provide actionable insights and drive decision-making.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-neutral-900">
      <div className="max-w-5xl px-4 py-16 mx-auto space-y-16">
        <section className="space-y-6 text-center">
          <h1 className="heading-1">About Me</h1>
          <p className="body-regular">
            I am Richard Hudson, a Revenue Operations Professional specializing
            in data-driven solutions and strategic optimizations that drive
            growth. I bridge the gap between sales, marketing, and customer
            success teams to create unified strategies that maximize results.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="heading-2">Areas of Expertise</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {expertiseAreas.map((area) => (
              <div
                key={area.title}
                className="p-4 border rounded-lg border-neutral-200"
              >
                <h3 className="text-lg font-semibold">{area.title}</h3>
                <p className="body-regular">{area.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="heading-2">Consulting Services</h2>
          <p className="body-regular">
            I offer consulting services to help businesses optimize their
            revenue operations and drive growth.
          </p>
        </section>
      </div>
    </div>
  );
}

'use client';
import { Badge } from '@/components/ui/Badge';
import { buttonStyles } from '@/components/ui/Buttons/ButtonStyles';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ConsultingCardProps {
  title: string;
  description: string;
  features: string[];
  badges?: string[];
  ctaLink?: string;
}

export function ConsultingCard({
  title,
  description,
  features,
  badges = [
    'Revenue Operations',
    'Process Optimization',
    'Data Analytics',
    'Strategic Planning',
  ],
  ctaLink = '/contact',
}: ConsultingCardProps) {
  return (
    <motion.div whileHover={{ translateY: -5 }} transition={{ duration: 0.2 }}>
      <Card className="flex flex-col justify-between h-full p-6 bg-white shadow-lg">
        <div>
          <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
          <p className="mb-6 text-gray-600">{description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {badges.map((badge) => (
              <Badge
                key={badge}
                variant="outline"
                className="text-blue-600 border-blue-200 bg-blue-50"
              >
                {badge}
              </Badge>
            ))}
          </div>

          <ul className="pl-5 mb-6 space-y-3 list-disc">
            {features.map((feature) => (
              <li key={feature} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={ctaLink}
          className={`${buttonStyles} w-full inline-flex items-center justify-center gap-2`}
        >
          Schedule Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </Card>
    </motion.div>
  );
}

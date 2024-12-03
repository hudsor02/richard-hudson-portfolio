import { ContactFormWrapper } from '@/components/ContactFormWrapper';
import { Mail, MapPin, Clock } from 'lucide-react';
import React from 'react';

interface ContactInfo {
  icon: React.ElementType;
  title: string;
  details: string;
  link?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: 'Email',
    details: 'hudsor01@icloud.com',
    link: 'mailto:hudsor01@icloud.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    details: 'Dallas/Fort Worth Area, TX',
  },
  {
    icon: Clock,
    title: 'Response Time',
    details: 'Within 24-48 hours',
  },
];

export default function ContactPage() {
  return (
    <main className="container px-4 py-16 mx-auto mt-16">
      <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-6 text-4xl font-bold">Let us Connect</h1>
          <p className="mb-8 text-gray-600">
            Looking to optimize your revenue operations or discuss partnership
            opportunities? I am here to help you achieve your business
            objectives.
          </p>

          <div className="p-6 space-y-4 bg-white bg-opacity-50 rounded-lg">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-blue-600" />
                {item.link ? (
                  <a href={item.link} className="hover:text-blue-600">
                    {item.details}
                  </a>
                ) : (
                  <span>{item.details}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <ContactFormWrapper />
        </div>
      </div>
    </main>
  );
}

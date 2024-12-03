import React from 'react';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { ContactFormWrapper } from '@/components/ContactFormWrapper';

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
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left Column - Contact Information */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <h1 className="font-outfit text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl">
              Let's Connect
            </h1>
            <p className="max-w-xl font-jakarta text-base text-neutral-600 dark:text-neutral-400 sm:text-lg">
              Looking to optimize your revenue operations or discuss partnership
              opportunities? I'm here to help you achieve your business
              objectives.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="mt-6 grid gap-4 sm:gap-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="flex items-start space-x-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition-all dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
              >
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30 sm:p-3">
                  <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h3 className="font-outfit text-base font-semibold text-neutral-900 dark:text-white sm:text-lg">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="font-jakarta text-sm text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 sm:text-base"
                    >
                      {item.details}
                    </a>
                  ) : (
                    <p className="font-jakarta text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
                      {item.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10 sm:mt-8 sm:p-6">
            <h3 className="font-outfit text-base font-semibold text-neutral-900 dark:text-white sm:text-lg">
              Quick Response Guaranteed
            </h3>
            <p className="mt-2 font-jakarta text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
              I prioritize clear communication and aim to respond to all
              inquiries within 24-48 hours. For urgent matters, please indicate
              in your message.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-6 sm:mt-8">
            <a
              href="/resume"
              className="inline-flex items-center space-x-2 font-jakarta text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span>View my resume</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="relative w-full lg:sticky lg:top-24">
          <ContactFormWrapper />
        </div>
      </div>
    </div>
  );
}

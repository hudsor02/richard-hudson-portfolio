'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { ContactFormType } from '@/types/contact';

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

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ContactPage() {
  const handleFormSuccess = () => {
    toast.success("Message sent successfully! I'll get back to you soon.");
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <motion.div
        className="grid gap-8 lg:grid-cols-2 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column - Contact Information */}
        <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="font-outfit text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl">
              Let's Connect
            </h1>
            <p className="max-w-xl font-jakarta text-base text-neutral-600 dark:text-neutral-400 sm:text-lg">
              Looking to optimize your revenue operations or discuss partnership
              opportunities? I'm here to help you achieve your business
              objectives.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="mt-6 grid gap-4 sm:gap-6">
            {contactInfo.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
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
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10 sm:mt-8 sm:p-6"
          >
            <h3 className="font-outfit text-base font-semibold text-neutral-900 dark:text-white sm:text-lg">
              Quick Response Guaranteed
            </h3>
            <p className="mt-2 font-jakarta text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
              I prioritize clear communication and aim to respond to all
              inquiries within 24-48 hours. For urgent matters, please indicate
              in your message.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8">
            <a
              href="/resume"
              className="inline-flex items-center space-x-2 font-jakarta text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span>View my resume</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          variants={itemVariants}
          className="relative w-full lg:sticky lg:top-24"
        >
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
            <h2 className="mb-4 font-outfit text-xl font-bold text-neutral-900 dark:text-white sm:mb-6 sm:text-2xl">
              Send a Message
            </h2>
            <ContactForm type="contact" onSuccess={handleFormSuccess} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

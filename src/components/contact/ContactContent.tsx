'use client';

// src/components/contact/ContactContent.tsx
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Linkedin, Github, Twitter } from 'lucide-react';

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

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/richard-hudson-jr/',
    label: 'LinkedIn',
    color: 'bg-[#0077B5]',
  },
  {
    icon: Github,
    href: 'https://github.com/hudsor02',
    label: 'GitHub',
    color: 'bg-[#333333]',
  },
  {
    icon: Twitter,
    href: 'https://twitter.com/',
    label: 'Twitter',
    color: 'bg-[#1DA1F2]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContactContent() {
  return (
    <main className="container px-4 py-16 mx-auto mt-16">
      <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-2">
        {/* Left Column */}
        <motion.div
          className="flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            variants={itemVariants}
          >
            Let&apos;s Connect
          </motion.h1>
          <motion.p className="mb-8 text-gray-600" variants={itemVariants}>
            Looking to optimize your revenue operations or discuss partnership
            opportunities? I&apos;m here to help you achieve your business
            objectives.
          </motion.p>

          <motion.div
            className="p-8 space-y-6 bg-white rounded-lg shadow-lg"
            variants={itemVariants}
          >
            {contactInfo.map((item) => (
              <motion.div
                key={item.title}
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="p-3 rounded-full bg-gray-50">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {item.details}
                    </a>
                  ) : (
                    <span className="text-gray-600">{item.details}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div className="mt-8 flex gap-4" variants={itemVariants}>
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className={`p-3 rounded-full text-white ${social.color} hover:opacity-90 transition-opacity`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          className="p-8 bg-white rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <ContactForm />
        </motion.div>
      </div>
    </main>
  );
}

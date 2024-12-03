'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import type { ContactFormType } from '@/types/contact';
import { submitContactAction } from '@/app/actions';

interface ContactFormProps {
  type: 'contact' | 'consultation';
}

export function ContactForm({ type }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    const form = event.currentTarget;

    try {
      const formData = new FormData(form);
      const data: ContactFormType = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
        company: (formData.get('company') as string) || undefined,
      };

      const result = await submitContactAction(data);

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-neutral-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-neutral-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            required
            className="mt-1 block w-full rounded-md border-neutral-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-neutral-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Company (Optional)
          </label>
          <input
            type="text"
            name="company"
            id="company"
            className="mt-1 block w-full rounded-md border-neutral-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {isLoading ? (
            <span>Sending...</span>
          ) : (
            <span className="flex items-center">Send Message</span>
          )}
        </button>
      </form>
    </div>
  );
}

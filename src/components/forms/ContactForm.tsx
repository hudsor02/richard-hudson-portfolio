'use client';

import type { ContactFormType } from '@/types/contact';
import { useState } from 'react';
import { toast } from 'sonner';

interface ContactFormProps {
  onSubmit?: (data: ContactFormType) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ContactFormType): Promise<void> => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8 bg-neutral-50 rounded-lg border border-gray-200 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        Send a Message
      </h2>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(
            new FormData(e.currentTarget).entries()
          ) as ContactFormType;
          handleSubmit(data);
        }}
      >
        {[
          { id: 'name', label: 'Name', type: 'text', required: true },
          { id: 'email', label: 'Email', type: 'email', required: true },
          { id: 'subject', label: 'Subject', type: 'text', required: true },
        ].map(({ id, label, type, required }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              {label}
            </label>
            <input
              id={id}
              name={id}
              type={type}
              required={required}
              placeholder={`Enter your ${label.toLowerCase()}`}
              className="w-full p-2 rounded-md border border-gray-200 text-gray-900 text-base bg-neutral-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Enter your message"
            className="w-full p-2 rounded-md border border-gray-200 text-gray-900 text-base bg-neutral-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md bg-blue-600 text-white font-bold text-base shadow-sm transition-all duration-200 ease-in-out ${
            isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

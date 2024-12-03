'use client';

import { ContactForm } from './forms/ContactForm';

export function ContactFormWrapper() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
      <h2 className="mb-4 font-outfit text-xl font-bold text-neutral-900 dark:text-white sm:mb-6 sm:text-2xl">
        Send a Message
      </h2>
      <ContactForm />
    </div>
  );
}

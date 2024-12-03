// src/lib/email.ts
import { ContactFormType } from '@/types/contact'; // Ensure correct type is imported
import nodemailer from 'nodemailer';

export type EmailTemplate = 'contact' | 'consultation' | 'support' | 'feedback';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const templates = {
  contact: (data: ContactFormType) => ({
    subject: `Contact Form: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  }),
  consultation: (data: ContactFormType) => ({
    subject: `Consultation Request: ${data.subject}`,
    html: `
      <h2>New Consultation Request</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  }),
  support: (data: ContactFormType) => ({
    subject: `Support Request: ${data.subject}`,
    html: `
      <h2>New Support Request</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  }),
  feedback: (data: ContactFormType) => ({
    subject: `Feedback: ${data.subject}`,
    html: `
      <h2>New Feedback</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Company:</strong> ${data.company || 'Not specified'}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  }),
};

export async function sendEmail(
  data: ContactFormType,
  template: EmailTemplate = 'contact'
) {
  const { subject, html } = templates[template](data);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: data.email,
      subject,
      html,
    });

    // Send confirmation email to the sender
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: `Thank you for your ${
        template === 'contact'
          ? 'message'
          : template === 'consultation'
            ? 'consultation request'
            : template === 'support'
              ? 'support request'
              : 'feedback'
      }`,
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>I've received your ${
          template === 'contact'
            ? 'message'
            : template === 'consultation'
              ? 'consultation request'
              : template === 'support'
                ? 'support request'
                : 'feedback'
        } and will get back to you as soon as possible.</p>
        <br>
        <p>Best regards,</p>
        <p>Richard Hudson</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}

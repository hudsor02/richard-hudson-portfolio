// src/app/api/invoice/send/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { invoiceData, pdfBuffer, recipientEmail } = await req.json();

    if (!invoiceData || !pdfBuffer || !recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${invoiceData.companyName}" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `Invoice #${invoiceData.invoiceNumber} from ${invoiceData.companyName}`,
      text: `Please find attached your invoice #${invoiceData.invoiceNumber}.\n\nAmount due: $${invoiceData.total}\nDue date: ${invoiceData.dueDate}\n\nThank you for your business!`,
      html: `
        <h2>Invoice #${invoiceData.invoiceNumber}</h2>
        <p>Please find attached your invoice.</p>
        <p><strong>Amount due:</strong> $${invoiceData.total}<br>
        <strong>Due date:</strong> ${invoiceData.dueDate}</p>
        <p>Thank you for your business!</p>
      `,
      attachments: [
        {
          filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
          content: Buffer.from(pdfBuffer, 'base64'),
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send invoice email' },
      { status: 500 }
    );
  }
}

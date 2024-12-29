import type { PDFDocument } from '@/types/pdf'; // Ensure PDFDocument is defined or remove if unnecessary
import autoTable from 'jspdf-autotable'; // Ensure this import is present so autoTable is available

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: Address;
  items: InvoiceItem[];
  notes: string;
  companyName: string;
  companyAddress: Address;
  companyEmail: string;
  companyPhone: string;
  total: number;
  subtotal: number;
  tax: number;
  taxRate: number;
}

interface GeneratePDFProps {
  invoiceData: InvoiceData;
}

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

const formatAddress = (address: Address): string => {
  const parts = [
    address.street1,
    address.street2,
    `${address.city}, ${address.state} ${address.postalCode}`,
  ].filter(Boolean);
  return parts.join('\n');
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const generateInvoicePDF = async ({
  invoiceData,
}: GeneratePDFProps): Promise<Blob> => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF() as PDFDocument;

  doc.setFont('helvetica');
  doc.setFontSize(24);
  doc.text('INVOICE', 20, 30);

  doc.setFontSize(10);
  doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 40);
  doc.text(`Date: ${formatDate(invoiceData.date)}`, 20, 45);
  doc.text(`Due Date: ${formatDate(invoiceData.dueDate)}`, 20, 50);

  doc.setFontSize(12);
  doc.text('From:', 20, 70);
  doc.setFontSize(10);
  const companyInfo = [
    invoiceData.companyName,
    invoiceData.companyEmail,
    invoiceData.companyPhone,
    formatAddress(invoiceData.companyAddress),
  ].join('\n');
  doc.text(companyInfo, 20, 80);

  doc.setFontSize(12);
  doc.text('Bill To:', 120, 70);
  doc.setFontSize(10);
  const customerInfo = [
    invoiceData.customerName,
    invoiceData.customerEmail,
    formatAddress(invoiceData.customerAddress),
  ].join('\n');
  doc.text(customerInfo, 120, 80);

  const tableColumn = ['Description', 'Quantity', 'Rate', 'Amount'];
  const tableRows = invoiceData.items.map((item) => [
    item.description,
    item.quantity.toString(),
    formatCurrency(item.rate),
    formatCurrency(item.quantity * item.rate),
  ]);
  autoTable(doc, {
    startY: 120,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [66, 139, 202],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      font: 'helvetica',
      fontSize: 10,
      cellPadding: 5,
    },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } })
    .lastAutoTable.finalY;
  const totalsX = 145;
  const totalsValueX = 190;
  let currentY = finalY + 20;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', totalsX, currentY);
  doc.text(formatCurrency(invoiceData.subtotal), totalsValueX, currentY, {
    align: 'right',
  });

  currentY += 10;
  doc.text(
    `Tax (${(invoiceData.taxRate * 100).toFixed(2)}%):`,
    totalsX,
    currentY
  );
  doc.text(formatCurrency(invoiceData.tax), totalsValueX, currentY, {
    align: 'right',
  });

  currentY += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', totalsX, currentY);
  doc.text(formatCurrency(invoiceData.total), totalsValueX, currentY, {
    align: 'right',
  });

  if (invoiceData.notes) {
    currentY += 30;
    doc.setFont('helvetica', 'bold');
    doc.text('Notes:', 20, currentY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const splitNotes = doc.splitTextToSize(invoiceData.notes, 170);
    currentY += 10;
    doc.text(splitNotes, 20, currentY);
  }

  currentY += 40;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Instructions:', 20, currentY);
  doc.setFont('helvetica', 'normal');
  currentY += 10;
  doc.text(
    `Please include invoice number ${invoiceData.invoiceNumber} with your payment.`,
    20,
    currentY
  );

  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    20,
    pageHeight - 10
  );

  return doc.output('blob');
};

'use client';

import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Buttons/Button';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import {
  generateInvoicePDF,
  type InvoiceData,
} from '@/lib/services/invoice-service';
import { motion } from 'framer-motion';
import {
  Download,
  Eye,
  Plus,
  Trash2,
  Save,
  Mail,
  AlertCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

// Interfaces unchanged from your original code
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

// Keep FormData as it was originally, no changes
interface FormData {
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
}

// No changes to the logic except where indicated
export function InvoiceContent() {
  const TAX_RATE = 0.0625;

  const generateInvoiceNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `INV-${year}${month}${day}-${random}`;
  };

  const [formData, setFormData] = useState<FormData>({
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    customerName: '',
    customerEmail: '',
    customerAddress: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
    },
    items: [{ id: '1', description: '', quantity: 1, rate: 0 }],
    notes: '',
    companyName: '',
    companyAddress: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
    },
    companyEmail: '',
    companyPhone: '',
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Calculation functions
  const calculateSubtotal = () => {
    return formData.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
  };
  const calculateTax = () => {
    return calculateSubtotal() * TAX_RATE;
  };
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  // Form handlers (unchanged)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData | keyof Address,
    addressType?: 'customerAddress' | 'companyAddress'
  ) => {
    if (addressType) {
      setFormData({
        ...formData,
        [addressType]: {
          ...formData[addressType],
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
    setError('');
  };

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) => {
        if (item.id === id) {
          if (field === 'quantity' || field === 'rate') {
            const numValue = parseFloat(value as string) || 0;
            return { ...item, [field]: numValue };
          }
          return { ...item, [field]: value };
        }
        return item;
      }),
    });
  };

  const addItem = () => {
    const newId = (formData.items.length + 1).toString();
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: newId, description: '', quantity: 1, rate: 0 },
      ],
    });
  };

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((item) => item.id !== id),
      });
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!formData.customerName || !formData.customerEmail) {
      setError('Please fill in all required customer information');
      return false;
    }

    if (!validateEmail(formData.customerEmail)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.items.length) {
      setError('Please add at least one item to the invoice');
      return false;
    }

    if (
      formData.items.some((item) => !item.description || item.quantity <= 0)
    ) {
      setError('Please fill in all item details correctly');
      return false;
    }

    const requiredAddressFields = ['street1', 'city', 'state', 'postalCode'];
    const isAddressComplete = (address: Address) =>
      requiredAddressFields.every((field) => address[field as keyof Address]);

    if (!isAddressComplete(formData.customerAddress)) {
      setError('Please complete the customer address');
      return false;
    }

    if (!isAddressComplete(formData.companyAddress)) {
      setError('Please complete the company address');
      return false;
    }

    return true;
  };

  // Form submission handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Invoice generated successfully!');
      setPreviewMode(true);
    } catch {
      toast.error('Failed to generate invoice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Create invoice data for PDF and email, computed just-in-time
  const invoicePdfData: InvoiceData = {
    ...formData,
    subtotal: calculateSubtotal(),
    tax: calculateTax(),
    taxRate: TAX_RATE,
    total: calculateTotal(),
  };

  // Email functionality
  const sendEmail = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const pdfBlob = await generateInvoicePDF({ invoiceData: invoicePdfData });
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);

      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];
        if (!base64data) {
          toast.error('Failed to convert PDF to base64');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/invoice/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            invoiceData: invoicePdfData,
            pdfBuffer: base64data,
            recipientEmail: formData.customerEmail,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to send email');
        } else {
          toast.success('Invoice sent successfully!');
        }
        setLoading(false);
      };

      reader.onerror = () => {
        toast.error('Failed to read PDF file');
        setLoading(false);
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || 'Failed to send invoice');
      } else {
        toast.error('Failed to send invoice');
      }
      setLoading(false);
    }
  };

  // Print functionality
  const handlePrint = () => {
    if (!validateForm()) return;
    window.print();
  };

  // PDF Download functionality
  const handleDownloadPDF = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const pdfBlob = await generateInvoicePDF({ invoiceData: invoicePdfData });
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${formData.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Failed to download PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <motion.div
        className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Invoice Generator
            </h1>
            <div className="flex gap-2">
              <Button
                onClick={() => setPreviewMode(!previewMode)}
                variant="outline"
                size="sm"
                className="inline-flex items-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              {previewMode && (
                <>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button
                    onClick={handleDownloadPDF}
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={sendEmail}
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {!previewMode ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Invoice Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                id="invoiceNumber"
                label="Invoice Number"
                value={formData.invoiceNumber}
                onChange={(e) => handleInputChange(e, 'invoiceNumber')}
                placeholder="INV-001"
                disabled
              />
              <Input
                id="date"
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange(e, 'date')}
              />
              <Input
                id="dueDate"
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange(e, 'dueDate')}
              />
            </div>

            {/* Company Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Company Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="companyName"
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange(e, 'companyName')}
                  placeholder="Your Company Name"
                  required
                />
                <Input
                  id="companyEmail"
                  label="Company Email"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => handleInputChange(e, 'companyEmail')}
                  placeholder="company@example.com"
                  required
                />
                <Input
                  id="companyPhone"
                  label="Phone"
                  value={formData.companyPhone}
                  onChange={(e) => handleInputChange(e, 'companyPhone')}
                  placeholder="+1 (555) 000-0000"
                  required
                />
                <Input
                  id="companyStreet1"
                  label="Street Address"
                  value={formData.companyAddress.street1}
                  onChange={(e) =>
                    handleInputChange(e, 'street1', 'companyAddress')
                  }
                  placeholder="123 Business St"
                  required
                />
                <Input
                  id="companyStreet2"
                  label="Street Address 2"
                  value={formData.companyAddress.street2}
                  onChange={(e) =>
                    handleInputChange(e, 'street2', 'companyAddress')
                  }
                  placeholder="Suite 100"
                />
                <Input
                  id="companyCity"
                  label="City"
                  value={formData.companyAddress.city}
                  onChange={(e) =>
                    handleInputChange(e, 'city', 'companyAddress')
                  }
                  placeholder="City"
                  required
                />
                <Input
                  id="companyState"
                  label="State"
                  value={formData.companyAddress.state}
                  onChange={(e) =>
                    handleInputChange(e, 'state', 'companyAddress')
                  }
                  placeholder="State"
                  required
                />
                <Input
                  id="companyPostalCode"
                  label="Postal Code"
                  value={formData.companyAddress.postalCode}
                  onChange={(e) =>
                    handleInputChange(e, 'postalCode', 'companyAddress')
                  }
                  placeholder="12345"
                  required
                />
              </div>
            </div>

            {/* Customer Information Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="customerName"
                  label="Customer Name"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange(e, 'customerName')}
                  placeholder="Customer Name"
                  required
                />
                <Input
                  id="customerEmail"
                  label="Customer Email"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange(e, 'customerEmail')}
                  placeholder="customer@example.com"
                  required
                />
                <Input
                  id="customerStreet1"
                  label="Street Address"
                  value={formData.customerAddress.street1}
                  onChange={(e) =>
                    handleInputChange(e, 'street1', 'customerAddress')
                  }
                  placeholder="123 Main St"
                  required
                />
                <Input
                  id="customerStreet2"
                  label="Street Address 2"
                  value={formData.customerAddress.street2}
                  onChange={(e) =>
                    handleInputChange(e, 'street2', 'customerAddress')
                  }
                  placeholder="Apt 4B"
                />
                <Input
                  id="customerCity"
                  label="City"
                  value={formData.customerAddress.city}
                  onChange={(e) =>
                    handleInputChange(e, 'city', 'customerAddress')
                  }
                  placeholder="City"
                  required
                />
                <Input
                  id="customerState"
                  label="State"
                  value={formData.customerAddress.state}
                  onChange={(e) =>
                    handleInputChange(e, 'state', 'customerAddress')
                  }
                  placeholder="State"
                  required
                />
                <Input
                  id="customerPostalCode"
                  label="Postal Code"
                  value={formData.customerAddress.postalCode}
                  onChange={(e) =>
                    handleInputChange(e, 'postalCode', 'customerAddress')
                  }
                  placeholder="12345"
                  required
                />
              </div>
            </div>

            {/* Invoice Items Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Invoice Items
                </h2>
                <Button
                  type="button"
                  onClick={addItem}
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 px-4">
                  <div className="col-span-6">Description</div>
                  <div className="col-span-2 text-right">Quantity</div>
                  <div className="col-span-2 text-right">Rate</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>

                {formData.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-12 gap-4 items-center bg-gray-50 rounded-lg p-4"
                  >
                    <div className="col-span-12 md:col-span-6 space-y-2">
                      <Input
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            item.id,
                            'description',
                            e.target.value
                          )
                        }
                        placeholder="Item description"
                        required
                      />
                    </div>
                    <div className="col-span-6 md:col-span-2 space-y-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(item.id, 'quantity', e.target.value)
                        }
                        min="1"
                        step="1"
                        required
                      />
                    </div>
                    <div className="col-span-6 md:col-span-2 space-y-2">
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(item.id, 'rate', e.target.value)
                        }
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="col-span-10 md:col-span-2 flex items-center justify-end">
                      <span className="text-gray-900 font-medium">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </span>
                    </div>
                    {formData.items.length > 1 && (
                      <div className="col-span-2 md:col-span-12 flex justify-end md:absolute md:top-4 md:right-4">
                        <Button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          variant="outline"
                          size="sm"
                          className="inline-flex items-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 mt-8">
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex justify-between w-64">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between w-64">
                    <span className="text-gray-600">
                      Tax ({(TAX_RATE * 100).toFixed(2)}%):
                    </span>
                    <span className="font-medium text-gray-900">
                      ${calculateTax().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between w-64 text-lg font-bold">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Notes Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Additional Notes
              </h2>
              <TextArea
                value={formData.notes}
                onChange={(e) => handleInputChange(e, 'notes')}
                placeholder="Add any additional notes or payment instructions"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="inline-flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Generating...' : 'Generate Invoice'}
              </Button>
            </div>
          </form>
        ) : (
          // Preview Mode
          <div className="p-8 print:p-4">
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
                  <p className="text-gray-600">#{formData.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">
                    Date: {new Date(formData.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Due Date: {new Date(formData.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Company and Customer Info */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">From:</h3>
                  <div className="text-gray-600 space-y-1">
                    <p className="font-medium">{formData.companyName}</p>
                    <p>{formData.companyEmail}</p>
                    <p>{formData.companyPhone}</p>
                    <div>
                      <p>{formData.companyAddress.street1}</p>
                      {formData.companyAddress.street2 && (
                        <p>{formData.companyAddress.street2}</p>
                      )}
                      <p>
                        {formData.companyAddress.city},{' '}
                        {formData.companyAddress.state}{' '}
                        {formData.companyAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">To:</h3>
                  <div className="text-gray-600 space-y-1">
                    <p className="font-medium">{formData.customerName}</p>
                    <p>{formData.customerEmail}</p>
                    <div>
                      <p>{formData.customerAddress.street1}</p>
                      {formData.customerAddress.street2 && (
                        <p>{formData.customerAddress.street2}</p>
                      )}
                      <p>
                        {formData.customerAddress.city},{' '}
                        {formData.customerAddress.state}{' '}
                        {formData.customerAddress.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Items Table */}
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Quantity</th>
                    <th className="text-right py-2">Rate</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="text-right py-2">{item.quantity}</td>
                      <td className="text-right py-2">
                        ${item.rate.toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t">
                  <tr>
                    <td colSpan={3} className="text-right py-2">
                      Subtotal:
                    </td>
                    <td className="text-right py-2">
                      ${calculateSubtotal().toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-right py-2">
                      Tax ({(TAX_RATE * 100).toFixed(2)}%):
                    </td>
                    <td className="text-right py-2">
                      ${calculateTax().toFixed(2)}
                    </td>
                  </tr>
                  <tr className="font-bold">
                    <td colSpan={3} className="text-right py-2">
                      Total:
                    </td>
                    <td className="text-right py-2">
                      ${calculateTotal().toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Notes */}
              {formData.notes && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes:</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {formData.notes}
                  </p>
                </div>
              )}

              {/* Print-only payment details */}
              <div className="hidden print:block mt-8 border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Payment Details:
                </h3>
                <p className="text-gray-600">
                  Please include the invoice number {formData.invoiceNumber}{' '}
                  with your payment.
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
            size: letter;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

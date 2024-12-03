'use client';

import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { colors, transitions } from '@/lib/design-system';

export default function DownloadButtons() {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    pdf: false,
    docx: false,
  });

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setIsLoading(prev => ({ ...prev, [format]: true }));

    try {
      const response = await fetch('/api/resume/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format }),
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Richard_Hudson_Resume.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download resume. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [format]: false }));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 my-8">
      <button
        onClick={() => handleDownload('pdf')}
        disabled={isLoading.pdf}
        className="button-primary flex items-center justify-center"
        aria-label="Download PDF version"
      >
        {isLoading.pdf ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            <span>Download PDF</span>
          </>
        )}
      </button>

      <button
        onClick={() => handleDownload('docx')}
        disabled={isLoading.docx}
        className="button-secondary flex items-center justify-center"
        aria-label="Download Word version"
      >
        {isLoading.docx ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Generating Word...</span>
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            <span>Download Word</span>
          </>
        )}
      </button>
    </div>
  );
}
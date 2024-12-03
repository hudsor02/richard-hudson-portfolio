'use client';

import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { buttonStyles } from './ButtonStyles';

type ResumeDownloadButtonProps = {
  className?: string;
  isLoading?: boolean;
};

export default function ResumeDownloadButton({
  className = '',
  isLoading: externalLoading = false,
}: ResumeDownloadButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleDownload = async () => {
    console.log('Download initiated');
    setInternalLoading(true);

    try {
      const response = await fetch('/api/resume/download', {
        method: 'POST',
        headers: {
          Accept: 'application/pdf, application/json',
        },
      });

      console.log('Response received:', response.status);

      // Check if the response is JSON (error) or PDF
      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        if (contentType?.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(
            errorData.details || errorData.error || 'Download failed'
          );
        } else {
          throw new Error('Failed to download resume');
        }
      }

      if (!contentType?.includes('application/pdf')) {
        throw new Error('Invalid response format');
      }

      // Handle PDF download
      const blob = await response.blob();
      console.log('PDF blob received:', blob.size, 'bytes');

      // Create and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Richard_Hudson_Resume.pdf';

      // Append to body and click
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to download resume'
      );
    } finally {
      setInternalLoading(false);
    }
  };

  const isLoading = externalLoading || internalLoading;

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`${buttonStyles.primary} ${className}`}
      aria-label="Download Resume (PDF)"
    >
      {isLoading ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        'Download Resume'
      )}
    </button>
  );
}

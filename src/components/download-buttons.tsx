'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/Button';
import { Tooltip } from './ui/Tooltip';

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const DOWNLOAD_TIMEOUT = 30000; // 30 seconds

export default function DownloadButtons() {
  const [isLoading, setIsLoading] = useState<Record<'pdf' | 'docx', boolean>>({
    pdf: false,
    docx: false,
  });
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleDownload = async (format: 'pdf' | 'docx') => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading((prev) => ({ ...prev, [format]: true }));
    let timeoutId: NodeJS.Timeout | undefined;

    try {
      timeoutId = setTimeout(() => {
        abortController.abort();
        throw new Error('Download timed out');
      }, DOWNLOAD_TIMEOUT);

      const response = await fetch('/api/download-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Richard_Hudson_Resume.${format}`;
      link.setAttribute(
        'aria-label',
        `Download resume as ${format.toUpperCase()}`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Resume downloaded successfully!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.name === 'AbortError'
            ? 'Download cancelled'
            : 'Failed to download resume. Please try again.'
        );
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading((prev) => ({ ...prev, [format]: false }));
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Tooltip content="Download resume in PDF format">
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={() => handleDownload('pdf')}
            disabled={isLoading.pdf}
            className="w-full min-w-[200px] bg-blue-600 text-white hover:bg-blue-700 sm:w-auto"
            aria-busy={isLoading.pdf}
          >
            {isLoading.pdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileText className="mr-2 h-4 w-4" />
            )}
            {isLoading.pdf ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </motion.div>
      </Tooltip>

      <Tooltip content="Download resume in Word format">
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={() => handleDownload('docx')}
            disabled={isLoading.docx}
            variant="outline"
            className="w-full min-w-[200px] border-2 sm:w-auto"
            aria-busy={isLoading.docx}
          >
            {isLoading.docx ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isLoading.docx ? 'Generating Word...' : 'Download Word'}
          </Button>
        </motion.div>
      </Tooltip>
    </div>
  );
}
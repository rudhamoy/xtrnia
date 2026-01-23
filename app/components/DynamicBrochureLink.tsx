'use client';

import { useEffect, useState } from 'react';

interface DynamicBrochureLinkProps {
  className?: string;
  showIcon?: boolean;
}

export function DynamicBrochureLink({ 
  className = "text-yellow-300 hover:text-yellow-400 font-medium text-base transition-colors duration-300 inline-flex items-center gap-2 underline underline-offset-4",
  showIcon = true 
}: DynamicBrochureLinkProps) {
  const [brochureUrl, setBrochureUrl] = useState('');
  const [brochureName, setBrochureName] = useState('Download Brochure');

  useEffect(() => {
    fetch('/api/brochures/active')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setBrochureUrl(data.data.fileUrl);
          setBrochureName(data.data.name || 'Download Brochure');
        }
      })
      .catch(err => console.error('Failed to fetch active brochure:', err));
  }, []);

  // Fallback to static brochure if no active brochure
  const downloadUrl = brochureUrl || '/xtrnia_brochure.pdf';
  
  // Generate a user-friendly filename
  const fileName = brochureName ? `${brochureName}.pdf` : 'Xtrnia_Brochure.pdf';

  return (
    <a
      href={downloadUrl}
      download={fileName}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {showIcon && (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )}
      Download Brochure
    </a>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import { isCurrentDomainAllowed, getAllAppUrls } from '../../lib/config';

interface DomainValidatorProps {
  children: React.ReactNode;
  showDomainInfo?: boolean;
}

export function DomainValidator({ children, showDomainInfo = false }: DomainValidatorProps) {
  const [isValidDomain, setIsValidDomain] = useState<boolean>(true);
  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);

  useEffect(() => {
    const valid = isCurrentDomainAllowed();
    setIsValidDomain(valid);
    setAllowedDomains(getAllAppUrls());
  }, []);

  if (!isValidDomain) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Domain Not Supported</h1>
          <p className="text-gray-600 mb-4">
            This application is not configured to run on the current domain.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Supported Domains:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {allowedDomains.map((domain, index) => (
                <li key={index} className="font-mono bg-white px-2 py-1 rounded">
                  {domain}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-500">
            Please contact support if you need access from a different domain.
          </p>
        </div>
      </div>
    );
  }

  if (showDomainInfo) {
    return (
      <div>
        {children}
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          <div className="font-medium">Current Domain: {typeof window !== 'undefined' ? window.location.hostname : 'Unknown'}</div>
          <div className="text-blue-200 text-xs">
            {allowedDomains.length > 1 ? `${allowedDomains.length} domains supported` : 'Single domain mode'}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook to check domain validity
export function useDomainValidation() {
  const [isValidDomain, setIsValidDomain] = useState<boolean>(true);
  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);

  useEffect(() => {
    const valid = isCurrentDomainAllowed();
    setIsValidDomain(valid);
    setAllowedDomains(getAllAppUrls());
  }, []);

  return {
    isValidDomain,
    allowedDomains,
    currentDomain: typeof window !== 'undefined' ? window.location.hostname : 'Unknown'
  };
}

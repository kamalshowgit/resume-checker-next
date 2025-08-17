"use client";

import React, { useState, useEffect } from 'react';
import { getApiUrl, getAllAppUrls, isProductionConfigured } from '../../lib/config';

interface ProductionDebuggerProps {
  showDebugInfo?: boolean;
}

export function ProductionDebugger({ showDebugInfo = false }: ProductionDebuggerProps) {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isVisible, setIsVisible] = useState(showDebugInfo);
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDebugInfo({
        currentUrl: window.location.href,
        currentOrigin: window.location.origin,
        currentHostname: window.location.hostname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        apiUrl: getApiUrl(),
        appUrls: getAllAppUrls(),
        isProductionConfigured: isProductionConfigured(),
        envVars: {
          NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
          NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
          NODE_ENV: process.env.NODE_ENV,
        }
      });
    }
  }, []);

  const testBackendConnection = async () => {
    const apiUrl = getApiUrl();
    const results: any = {};

    try {
      // Test health endpoint
      const healthResponse = await fetch(`${apiUrl}/health`);
      results.health = {
        status: healthResponse.status,
        ok: healthResponse.ok,
        url: `${apiUrl}/health`
      };
    } catch (error) {
      results.health = {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: `${apiUrl}/health`
      };
    }

    try {
      // Test CORS preflight
      const corsResponse = await fetch(`${apiUrl}/api/resume`, {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });
      results.cors = {
        status: corsResponse.status,
        ok: corsResponse.ok,
        headers: Object.fromEntries(corsResponse.headers.entries())
      };
    } catch (error) {
      results.cors = {
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    setTestResults(results);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm hover:bg-red-700"
      >
        🐛 Debug Backend
      </button>
    );
  }

  return (
    <div className="fixed inset-4 bg-white border-2 border-red-500 rounded-lg shadow-2xl overflow-auto z-50">
      <div className="sticky top-0 bg-red-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">🐛 Production Backend Debugger</h2>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded"
        >
          ✕ Close
        </button>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Environment Information */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🌍 Environment Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Current URL:</strong> {debugInfo.currentUrl}
            </div>
            <div>
              <strong>Current Origin:</strong> {debugInfo.currentOrigin}
            </div>
            <div>
              <strong>Current Hostname:</strong> {debugInfo.currentHostname}
            </div>
            <div>
              <strong>Environment:</strong> {debugInfo.environment}
            </div>
            <div>
              <strong>API URL:</strong> {debugInfo.apiUrl}
            </div>
            <div>
              <strong>Production Configured:</strong> {debugInfo.isProductionConfigured ? '✅ Yes' : '❌ No'}
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🔧 Environment Variables</h3>
          <div className="space-y-2 text-sm">
            <div><strong>NEXT_PUBLIC_API_URL:</strong> {debugInfo.envVars?.NEXT_PUBLIC_API_URL || '❌ Not Set'}</div>
            <div><strong>NEXT_PUBLIC_APP_URL:</strong> {debugInfo.envVars?.NEXT_PUBLIC_APP_URL || '❌ Not Set'}</div>
            <div><strong>NODE_ENV:</strong> {debugInfo.envVars?.NODE_ENV || '❌ Not Set'}</div>
          </div>
        </div>

        {/* App URLs */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🌐 Configured App URLs</h3>
          <div className="space-y-1 text-sm">
            {debugInfo.appUrls?.map((url: string, index: number) => (
              <div key={index} className="font-mono bg-white px-2 py-1 rounded">
                {url}
              </div>
            ))}
          </div>
        </div>

        {/* Connection Test */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🔌 Backend Connection Test</h3>
          <button
            onClick={testBackendConnection}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-3"
          >
            Test Connection
          </button>
          
          {Object.keys(testResults).length > 0 && (
            <div className="space-y-3">
              {Object.entries(testResults).map(([key, result]: [string, any]) => (
                <div key={key} className="bg-white p-3 rounded border">
                  <strong className="capitalize">{key}:</strong>
                  {result.error ? (
                    <div className="text-red-600 mt-1">❌ {result.error}</div>
                  ) : (
                    <div className="text-green-600 mt-1">
                      ✅ Status: {result.status} | OK: {result.ok ? 'Yes' : 'No'}
                    </div>
                  )}
                  {result.url && (
                    <div className="text-xs text-gray-600 mt-1">URL: {result.url}</div>
                  )}
                  {result.headers && (
                    <div className="text-xs text-gray-600 mt-1">
                      Headers: {JSON.stringify(result.headers, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Troubleshooting Steps */}
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
          <h3 className="text-lg font-semibold mb-3 text-yellow-800">🔧 Troubleshooting Steps</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
            <li>Check if <code>NEXT_PUBLIC_API_URL</code> is set correctly in Vercel</li>
            <li>Verify backend is running and accessible at the API URL</li>
            <li>Check CORS configuration on backend</li>
            <li>Ensure environment variables are set for production</li>
            <li>Check browser console for CORS errors</li>
            <li>Verify backend logs for connection issues</li>
          </ol>
        </div>

        {/* Copy Debug Info */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">📋 Copy Debug Info</h3>
          <button
            onClick={() => {
              const debugText = JSON.stringify(debugInfo, null, 2);
              navigator.clipboard.writeText(debugText);
              alert('Debug info copied to clipboard!');
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { apiService } from '@/lib/services/api-service';
import { isProductionConfigured, getApiUrl } from '@/lib/config';

export function ConnectionTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');

  const testConnection = async () => {
    setStatus('testing');
    setResult('');
    
    try {
      // Get the current API URL being used
      const currentApiUrl = getApiUrl();
      setApiUrl(currentApiUrl);
      
      // Test the connection
      const isHealthy = await apiService.healthCheck();
      
      if (isHealthy) {
        setStatus('success');
        setResult(`✅ Connection successful! Backend is responding at: ${currentApiUrl}`);
      } else {
        setStatus('error');
        setResult(`❌ Connection failed! Backend is not responding at: ${currentApiUrl}`);
      }
    } catch (error) {
      setStatus('error');
      setResult(`❌ Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-4">🔗 Backend Connection Test</h3>
      
      <div className="space-y-4">
        {/* Configuration Status */}
        <div className={`p-3 rounded border ${isProductionConfigured() ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <p className={`text-sm font-medium ${isProductionConfigured() ? 'text-green-800' : 'text-yellow-800'}`}>
            {isProductionConfigured() ? '✅ Production Configuration' : '⚠️  Development Configuration'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {isProductionConfigured() 
              ? 'Your app is configured with production URLs.'
              : 'Please configure production URLs in your environment variables.'
            }
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Current API URL: <code className="bg-gray-100 px-2 py-1 rounded">{apiUrl || 'Loading...'}</code>
          </p>
          <p className="text-sm text-gray-600">
            Environment Variable: <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_API_URL</code>
          </p>
        </div>
        
        <button
          onClick={testConnection}
          disabled={status === 'testing'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'testing' ? 'Testing...' : 'Test Connection'}
        </button>
        
        {status === 'success' && (
          <div className="p-3 bg-green-100 border border-green-300 rounded text-green-800">
            {result}
          </div>
        )}
        
        {status === 'error' && (
          <div className="p-3 bg-red-100 border border-red-300 rounded text-red-800">
            {result}
          </div>
        )}
        
        {/* Configuration Instructions */}
        {!isProductionConfigured() && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-medium text-blue-800 mb-2">🔧 Setup Instructions</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <p><strong>1. Get your Render backend URL:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Go to your Render dashboard</li>
                <li>Find your backend service</li>
                <li>Copy the URL (e.g., https://resume-checker-backend.onrender.com)</li>
              </ul>
              
              <p className="mt-3"><strong>2. Set environment variables in Vercel:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Go to your Vercel project dashboard</li>
                <li>Navigate to Settings → Environment Variables</li>
                <li>Add: <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_API_URL</code> = your Render URL</li>
                <li>Add: <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_APP_URL</code> = your Vercel URL</li>
              </ul>
              
              <p className="mt-3"><strong>3. Redeploy:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Push changes to GitHub</li>
                <li>Vercel will automatically redeploy</li>
                <li>Test the connection again</li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <p><strong>Expected:</strong> Your backend URL should look like: <code>https://your-app-name.onrender.com</code></p>
          <p><strong>If you see localhost:</strong> Environment variables are not set correctly in Vercel</p>
        </div>
      </div>
    </div>
  );
}

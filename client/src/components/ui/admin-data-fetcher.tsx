'use client';

import { useState } from 'react';
import { apiService } from '@/lib/services/api-service';

interface AdminDataFetcherProps {
  className?: string;
}

export function AdminDataFetcher({ className = '' }: AdminDataFetcherProps) {
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'all-data' | 'csv'>('stats');

  const handleFetchData = async () => {
    if (!adminId || !adminPassword) {
      setError('Please enter both Admin ID and Password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let result;
      switch (activeTab) {
        case 'stats':
          result = await apiService.getSecureStats(adminId, adminPassword);
          break;
        case 'all-data':
          result = await apiService.getAllDataSecure(adminId, adminPassword);
          break;
        case 'csv':
          const csvBlob = await apiService.exportCSVSecure(adminId, adminPassword);
          // Download CSV file
          const url = window.URL.createObjectURL(csvBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `resume_data_export_${new Date().toISOString().split('T')[0]}.csv`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          setData({ message: 'CSV file downloaded successfully!' });
          break;
        default:
          throw new Error('Invalid tab selected');
      }
      
      setData(result);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!data) return;
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_data_${activeTab}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔐 Admin Data Access</h2>
        <p className="text-gray-600">Access all stored CV data with secure authentication</p>
      </div>

      {/* Authentication Form */}
      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="adminId" className="block text-sm font-medium text-gray-700 mb-1">
            Admin ID
          </label>
          <input
            type="text"
            id="adminId"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Enter Admin ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Admin Password
          </label>
          <input
            type="password"
            id="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Data Type Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'stats'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Statistics
          </button>
          <button
            onClick={() => setActiveTab('all-data')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'all-data'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 All Data
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'csv'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📄 CSV Export
          </button>
        </div>
      </div>

      {/* Fetch Button */}
      <button
        onClick={handleFetchData}
        disabled={isLoading || !adminId || !adminPassword}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? '🔄 Fetching...' : `📥 Fetch ${activeTab === 'stats' ? 'Statistics' : activeTab === 'all-data' ? 'All Data' : 'CSV'}`}
      </button>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">❌ {error}</p>
        </div>
      )}

      {/* Data Display */}
      {data && !error && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === 'stats' ? '📊 Statistics' : activeTab === 'all-data' ? '📋 All Data' : '📄 Export Complete'}
            </h3>
            {activeTab !== 'csv' && (
              <button
                onClick={downloadJSON}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
              >
                💾 Download JSON
              </button>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Quick Access Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h4 className="text-sm font-medium text-blue-900 mb-2">🔑 Quick Access</h4>
        <p className="text-sm text-blue-800">
          <strong>Admin ID:</strong> Kamal3839<br/>
          <strong>Password:</strong> Kamal@3839
        </p>
      </div>
    </div>
  );
}

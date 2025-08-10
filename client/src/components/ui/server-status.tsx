'use client';

import React, { useState, useEffect } from 'react';
import { apiService } from '../../lib/services/api-service';

interface ServerStatus {
  status: 'online' | 'offline' | 'checking';
  timestamp: string;
  error?: string;
}

export function ServerStatus() {
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    status: 'checking',
    timestamp: new Date().toISOString(),
  });

  const [mounted, setMounted] = useState(false);

  const checkServerStatus = async () => {
    try {
      setServerStatus(prev => ({ ...prev, status: 'checking' }));
      const status = await apiService.getServerStatus();
      setServerStatus(status);
    } catch (error) {
      setServerStatus({
        status: 'offline',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    checkServerStatus();
    
    // Check server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (serverStatus.status) {
      case 'online':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'offline':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'checking':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (serverStatus.status) {
      case 'online':
        return '🟢';
      case 'offline':
        return '🔴';
      case 'checking':
        return '🟡';
      default:
        return '⚪';
    }
  };

  // Format time consistently without locale dependencies
  const formatTime = (timestamp: string) => {
    if (!mounted) return '--:--:--';
    
    try {
      const date = new Date(timestamp);
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const seconds = date.getUTCSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } catch {
      return '--:--:--';
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Server Status:</span>
      <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor()}`}>
        <span>{getStatusIcon()}</span>
        <span className="capitalize">{serverStatus.status}</span>
      </div>
      {serverStatus.status === 'offline' && (
        <button
          onClick={checkServerStatus}
          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          Retry
        </button>
      )}
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {formatTime(serverStatus.timestamp)}
      </span>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

interface AnalysisStatusProps {
  status: 'partial' | 'complete';
  note?: string;
  onRefresh?: () => void;
}

export function AnalysisStatus({ status, note, onRefresh }: AnalysisStatusProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    if (status === 'partial') {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        // Show refresh button after 30 seconds
        if (timeElapsed >= 30) {
          setShowRefresh(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, timeElapsed]);

  if (status === 'complete') {
    return (
      <div className="fixed top-4 right-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 shadow-lg z-50">
        <div className="flex items-center space-x-3">
          <FiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <div>
            <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
              Analysis Complete
            </h4>
            <p className="text-xs text-green-600 dark:text-green-400">
              Full AI analysis finished
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-start space-x-3">
        <FiClock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Analysis in Progress
          </h4>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            {note || 'Fast analysis completed. Full AI analysis running in background.'}
          </p>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-blue-500 dark:text-blue-400">
              {timeElapsed}s elapsed
            </div>
            
            {showRefresh && onRefresh && (
              <button
                onClick={onRefresh}
                className="inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
              >
                <FiRefreshCw className="h-3 w-3" />
                <span>Refresh for Full Results</span>
              </button>
            )}
          </div>
          
          <div className="mt-2 w-full bg-blue-200 dark:bg-blue-700 rounded-full h-1">
            <div 
              className="bg-blue-600 dark:bg-blue-400 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((timeElapsed / 60) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnalysisStatusInline({ status, note }: { status: 'partial' | 'complete'; note?: string }) {
  if (status === 'complete') {
    return (
      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm">
        <FiCheckCircle className="h-4 w-4" />
        <span>Full Analysis Complete</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm">
      <FiClock className="h-4 w-4" />
      <span>Fast Analysis Complete</span>
      <span className="text-xs opacity-75">• Refresh for full results</span>
    </div>
  );
}

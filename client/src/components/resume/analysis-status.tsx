"use client";

import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiCheckCircle, FiClock, FiAlertCircle, FiUpload, FiCpu, FiFileText, FiStar } from 'react-icons/fi';

interface AnalysisStatusProps {
  status: 'partial' | 'complete';
  note?: string;
  onRefresh?: () => void;
}

interface AnalysisStep {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed' | 'failed';
}

export function AnalysisStatus({ status, note, onRefresh }: AnalysisStatusProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showRefresh, setShowRefresh] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Define all analysis steps
  const analysisSteps: AnalysisStep[] = [
    {
      id: 'upload',
      name: 'File Upload',
      description: 'Processing your resume file',
      icon: <FiUpload className="h-4 w-4" />,
      status: 'completed'
    },
    {
      id: 'extraction',
      name: 'Text Extraction',
      description: 'Extracting text from document',
      icon: <FiFileText className="h-4 w-4" />,
      status: 'completed'
    },
    {
      id: 'fast-analysis',
      name: 'Fast Analysis',
      description: 'Quick pattern-based scoring',
      icon: <FiStar className="h-4 w-4" />,
      status: 'active'
    },
    {
      id: 'ai-analysis',
      name: 'AI Analysis',
      description: 'Full AI-powered analysis',
      icon: <FiCpu className="h-4 w-4" />,
      status: 'pending'
    },
    {
      id: 'content-improvement',
      name: 'Content Enhancement',
      description: 'AI-powered content suggestions',
      icon: <FiCheckCircle className="h-4 w-4" />,
      status: 'pending'
    },
    {
      id: 'final-report',
      name: 'Report Generation',
      description: 'Compiling final analysis',
      icon: <FiFileText className="h-4 w-4" />,
      status: 'pending'
    }
  ];

  useEffect(() => {
    if (status === 'partial') {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Progress through steps based on time
        if (timeElapsed >= 3) {
          setCurrentStep(2); // Fast Analysis
        }
        if (timeElapsed >= 8) {
          setCurrentStep(3); // AI Analysis
        }
        if (timeElapsed >= 20) {
          setCurrentStep(4); // Content Improvement
        }
        if (timeElapsed >= 35) {
          setCurrentStep(5); // Final Report
        }
        
        // Show refresh button after 45 seconds
        if (timeElapsed >= 45) {
          setShowRefresh(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status, timeElapsed]);

  // Update step statuses based on current step
  const getStepStatus = (stepIndex: number): 'pending' | 'active' | 'completed' | 'failed' => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'active';
    return 'pending';
  };

  if (status === 'complete') {
    return null; // Don't show anything when complete
  }

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg z-50 max-w-md">
      <div className="flex items-start space-x-3">
        <FiClock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Resume Analysis in Progress
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {note || 'Processing your resume with AI-powered analysis...'}
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min((timeElapsed / 60) * 100, 100)}%` }}
            />
          </div>
          
          {/* Time Elapsed */}
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
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
          
          {/* Analysis Steps */}
          <div className="mt-4 space-y-3">
            {analysisSteps.map((step, index) => {
              const stepStatus = getStepStatus(index);
              return (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    stepStatus === 'completed' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : stepStatus === 'active'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                  }`}>
                    {stepStatus === 'completed' ? (
                      <FiCheckCircle className="h-3 w-3" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${
                      stepStatus === 'completed' 
                        ? 'text-green-700 dark:text-green-300' 
                        : stepStatus === 'active'
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.name}
                    </p>
                    <p className={`text-xs ${
                      stepStatus === 'completed' 
                        ? 'text-green-600 dark:text-green-400' 
                        : stepStatus === 'active'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {stepStatus === 'active' && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnalysisStatusInline({ status, note }: { status: 'partial' | 'complete'; note?: string }) {
  if (status === 'complete') {
    return null; // Don't show inline status when complete
  }

  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm">
      <FiClock className="h-4 w-4" />
      <span>Analysis in Progress</span>
      <span className="text-xs opacity-75">• Processing with AI</span>
    </div>
  );
}

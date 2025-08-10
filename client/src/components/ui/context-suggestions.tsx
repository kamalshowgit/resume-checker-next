"use client";

import React from 'react';
import { FiInfo, FiTarget, FiTrendingUp, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { useResumeContext } from '@/lib/context/resume-context';

const ContextSuggestions: React.FC = () => {
  const { state, actions } = useResumeContext();

  const suggestions = actions.getContextAwareSuggestions();
  const nextSteps = actions.getNextSteps();

  if (suggestions.length === 0 && nextSteps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Context-Aware Suggestions */}
      {suggestions.length > 0 && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-700 dark:bg-blue-900/20">
          <div className="mb-4 flex items-center space-x-2">
            <FiInfo className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Smart Suggestions
            </h3>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-400"></div>
                <p className="text-blue-800 dark:text-blue-200">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {nextSteps.length > 0 && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-700 dark:bg-green-900/20">
          <div className="mb-4 flex items-center space-x-2">
            <FiTarget className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              Recommended Next Steps
            </h3>
          </div>
          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-600 dark:bg-green-900 dark:text-green-400">
                    {index + 1}
                  </div>
                  <span className="text-green-800 dark:text-green-200">{step}</span>
                </div>
                <FiArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Tracking */}
      {state.resumeData && (
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-700 dark:bg-purple-900/20">
          <div className="mb-4 flex items-center space-x-2">
            <FiTrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
              Your Progress
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {state.userSession.resumeUploads}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {state.userSession.chatMessages}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Chat Messages</div>
            </div>
          </div>
          {state.resumeData.atsScore && (
            <div className="mt-4 rounded-lg bg-white p-3 dark:bg-purple-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Current ATS Score
                </span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {state.resumeData.atsScore}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-purple-200 dark:bg-purple-700">
                <div
                  className="h-2 rounded-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${state.resumeData.atsScore}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent Activity */}
      {state.recentActions.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center space-x-2">
            <FiCheckCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-2">
            {state.recentActions.slice(0, 5).map((action, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{action.action}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(action.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextSuggestions;

// Utility function to format time ago
function formatTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

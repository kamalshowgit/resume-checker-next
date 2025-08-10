"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFileText, FiMessageCircle, FiBarChart2, FiTarget, FiTrendingUp, FiSettings } from "react-icons/fi";
import { useResumeContext } from "@/lib/context/resume-context";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  context?: {
    hasResume?: boolean;
    score?: number;
    needsImprovement?: boolean;
  };
}

const ContextNavigation: React.FC = () => {
  const pathname = usePathname();
  const { state } = useResumeContext();

  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/",
      icon: <FiHome className="h-5 w-5" />,
      description: "Overview and insights",
      context: {
        hasResume: !!state.resumeData,
        score: state.resumeData?.atsScore,
        needsImprovement: (state.resumeData?.atsScore || 0) < 70
      }
    },
                    {
                  name: "Resume Analysis",
                  href: "/resume",
                  icon: <FiBarChart2 className="h-5 w-5" />,
                  description: "Detailed resume insights",
      context: {
        hasResume: !!state.resumeData,
        score: state.resumeData?.atsScore,
        needsImprovement: (state.resumeData?.atsScore || 0) < 70
      }
    },
    {
      name: "AI Chat",
      href: "/chat",
      icon: <FiMessageCircle className="h-5 w-5" />,
      description: "Get personalized advice",
      context: {
        hasResume: !!state.resumeData,
        score: state.resumeData?.atsScore,
        needsImprovement: (state.resumeData?.atsScore || 0) < 70
      }
    },
    {
      name: "Job Matches",
      href: "/jobs",
      icon: <FiTarget className="h-5 w-5" />,
      description: "Find relevant opportunities",
      context: {
        hasResume: !!state.resumeData,
        score: state.resumeData?.atsScore,
        needsImprovement: (state.resumeData?.atsScore || 0) < 70
      }
    },
    {
      name: "Progress Tracking",
      href: "/progress",
      icon: <FiTrendingUp className="h-5 w-5" />,
      description: "Monitor your improvement",
      context: {
        hasResume: !!state.resumeData,
        score: state.resumeData?.atsScore,
        needsImprovement: (state.resumeData?.atsScore || 0) < 70
      }
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <FiSettings className="h-5 w-5" />,
      description: "Preferences and account",
      context: {
        hasResume: !!state.resumeData,
        score: state.resumeData?.atsScore,
        needsImprovement: (state.resumeData?.atsScore || 0) < 70
      }
    }
  ];

  // Generate context-aware breadcrumbs
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', href: '/', current: pathname === '/' }];

    if (segments.length === 0) return breadcrumbs;

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      // Map segment to readable name
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === 'resume') name = 'Resume Analysis';
      if (segment === 'chat') name = 'AI Chat';
      if (segment === 'jobs') name = 'Job Matches';
      if (segment === 'progress') name = 'Progress Tracking';
      if (segment === 'settings') name = 'Settings';

      breadcrumbs.push({
        name,
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  // Generate context-aware suggestions
  const getContextSuggestions = () => {
    const suggestions = [];

    if (!state.resumeData) {
      suggestions.push({
        text: "Upload your resume to get started",
        href: "/resume",
        priority: "high"
      });
      return suggestions;
    }

    const score = state.resumeData.atsScore || 0;
    const keyPointsCount = state.resumeData.keyPoints?.length || 0;

    if (score < 70) {
      suggestions.push({
        text: `Improve your ATS score (currently ${score}%)`,
        href: "/resume",
        priority: "high"
      });
    }

    if (keyPointsCount < 5) {
      suggestions.push({
        text: "Add more quantifiable achievements",
        href: "/resume",
        priority: "medium"
      });
    }

    if (state.recentActions.length === 0) {
      suggestions.push({
        text: "Start chatting with AI for personalized advice",
        href: "/chat",
        priority: "medium"
      });
    }

    if (score >= 70) {
      suggestions.push({
        text: "Explore job opportunities that match your profile",
        href: "/jobs",
        priority: "low"
      });
    }

    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  };

  const breadcrumbs = generateBreadcrumbs();
  const contextSuggestions = getContextSuggestions();

  return (
    <div className="space-y-6">
      {/* Context-Aware Breadcrumbs */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="mx-2 h-4 w-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {breadcrumb.current ? (
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Context-Aware Navigation Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const hasResume = item.context?.hasResume;
          const score = item.context?.score;
          const needsImprovement = item.context?.needsImprovement;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative rounded-lg border p-4 transition-all hover:shadow-md ${
                isActive
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                      : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-blue-900/40 dark:group-hover:text-blue-400"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  
                  {/* Context Indicators */}
                  {hasResume && score !== undefined && (
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <FiTarget className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          ATS: {score}%
                        </span>
                      </div>
                      {needsImprovement && (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                          Needs improvement
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Context-Aware Badge */}
              {item.name === "Resume Analysis" && hasResume && (
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    Resume uploaded
                  </span>
                </div>
              )}

              {item.name === "AI Chat" && state.recentActions.some(action => action.action.includes('Chat')) && (
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    Active chat
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Context-Aware Suggestions */}
      {contextSuggestions.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/20">
          <h3 className="mb-3 font-medium text-blue-900 dark:text-blue-100">
            💡 Smart Suggestions
          </h3>
          <div className="space-y-2">
            {contextSuggestions.map((suggestion, index) => (
              <Link
                key={index}
                href={suggestion.href}
                className="flex items-center justify-between rounded-md bg-white p-3 text-sm text-blue-800 hover:bg-blue-100 transition-colors dark:bg-blue-800/30 dark:text-blue-200 dark:hover:bg-blue-800/50"
              >
                <span>{suggestion.text}</span>
                <span className="text-xs font-medium">→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/resume"
            className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
          >
            <FiFileText className="mr-1 h-3 w-3" />
            Upload Resume
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center rounded-md bg-green-100 px-3 py-1 text-sm font-medium text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50"
          >
            <FiMessageCircle className="mr-1 h-3 w-3" />
            Start Chat
          </Link>
          {state.resumeData && (
            <Link
              href="/progress"
              className="inline-flex items-center rounded-md bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
            >
              <FiTrendingUp className="mr-1 h-3 w-3" />
              View Progress
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContextNavigation;

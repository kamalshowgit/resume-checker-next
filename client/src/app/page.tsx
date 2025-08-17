"use client";

import { SEO } from '@/components/ui/seo';
import ContextAwareUploader from '@/components/resume/context-aware-uploader';
import ContextAwareChatbot from '@/components/resume/context-aware-chatbot';
import { ResumeAnalysis } from '@/components/resume/resume-analysis';
import { useResumeContext, ResumeProvider } from '@/lib/context/resume-context';

const HomeContent = () => {
  const { state } = useResumeContext();

  return (
    <>
      <SEO
        title="AI-Powered Resume Analysis & Optimization"
        description="Get detailed resume analysis with section-by-section scores and AI-powered career advice. Optimize your resume for ATS systems and improve your job search success."
        keywords={['resume analysis', 'ATS optimization', 'AI career advice', 'resume builder', 'job search']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto mobile-px mobile-py">
          {/* Hero Section - Mobile Optimized */}
          <div className="mb-8 sm:mb-12 text-center">
            <h1 className="mobile-text-3xl sm:mobile-text-4xl lg:mobile-text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              AI-Powered Resume
              <span className="block text-blue-600 dark:text-blue-400 mt-2">
                Analysis & Optimization
              </span>
            </h1>
            <p className="mx-auto mt-4 sm:mt-6 max-w-2xl mobile-text-base text-gray-600 dark:text-gray-400">
              Get detailed resume analysis with section-by-section scores and AI-powered career advice.
            </p>
          </div>

          {/* Main Content - Mobile Optimized */}
          <section className="mobile-py-16">
            <div className="mobile-container">
              <div className="mobile-grid mobile-grid-cols-1 lg:mobile-grid-cols-2 mobile-gap-12 items-center">
                {/* Left Column - Resume Upload */}
                <div className="mobile-space-y-6">
                  <h2 className="mobile-text-3xl sm:mobile-text-4xl font-bold text-gray-900">
                    Upload Your Resume for AI-Powered Analysis
                  </h2>
                  <p className="mobile-text-lg text-gray-600">
                    Get instant feedback on your resume's ATS compatibility, section scores, and AI-powered suggestions for improvement.
                  </p>
                  <div className="mobile-space-y-4">
                    <div className="flex items-start mobile-space-x-3">
                      <span className="text-green-500 mobile-text-xl">✅</span>
                      <span className="text-gray-700">ATS Score & Section Breakdown</span>
                    </div>
                    <div className="flex items-start mobile-space-x-3">
                      <span className="text-green-500 mobile-text-xl">✅</span>
                      <span className="text-gray-700">AI-Powered Content Suggestions</span>
                    </div>
                    <div className="flex items-start mobile-space-x-3">
                      <span className="text-green-500 mobile-text-xl">✅</span>
                      <span className="text-gray-700">Instant Results & Professional Insights</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Resume Uploader Component */}
                <div className="bg-white rounded-2xl shadow-lg mobile-p-6">
                  <ContextAwareUploader />
                </div>
              </div>
            </div>
          </section>

          {/* AI Career Advisor - Always visible */}
          <div id="chatbot">
            <ContextAwareChatbot />
          </div>
        </div>
      </div>
    </>
  );
};

export default function HomePage() {
  return (
    <ResumeProvider>
      <HomeContent />
    </ResumeProvider>
  );
}
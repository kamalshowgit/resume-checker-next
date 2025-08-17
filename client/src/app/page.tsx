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

          {/* Pricing Section - Mobile Optimized */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl sm:rounded-2xl mobile-p border border-blue-200 shadow-lg">
              <div className="text-center mb-6">
                <h2 className="mobile-text-2xl sm:mobile-text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  💰 Simple, Transparent Pricing
                </h2>
                <p className="mobile-text-base text-gray-600 dark:text-gray-400">
                  Start free, then pay only for what you need
                </p>
              </div>
              
              <div className="mobile-grid mobile-grid-cols-1 sm:mobile-grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="card-mobile border-green-200 relative overflow-hidden">
                  {/* Free Badge */}
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    FREE
                  </div>
                  <div className="text-center">
                    <div className="mobile-text-2xl sm:mobile-text-3xl lg:mobile-text-4xl font-bold text-green-600 mb-3">First Analysis</div>
                    <p className="mobile-text-base text-gray-600 dark:text-gray-400 mb-4">
                      Start with a completely free resume analysis. No credit card required.
                    </p>
                    <div className="bg-green-100 dark:bg-green-900/20 mobile-p rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-200">
                        ✅ Full ATS analysis<br/>
                        ✅ Optimization tips<br/>
                        ✅ No hidden fees<br/>
                        ✅ Instant results
                      </p>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-green-600">₹0</span>
                      <span className="text-gray-500"> / analysis</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-mobile border-blue-200 relative overflow-hidden">
                  {/* Popular Badge */}
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    POPULAR
                  </div>
                  <div className="text-center">
                    <div className="mobile-text-2xl sm:mobile-text-3xl lg:mobile-text-4xl font-bold text-blue-600 mb-3">Additional Analyses</div>
                    <p className="mobile-text-base text-gray-600 dark:text-gray-400 mb-4">
                      After your free analysis, each new resume analysis costs just ₹49.
                    </p>
                    <div className="bg-blue-100 dark:bg-blue-900/20 mobile-p rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        🔄 Multiple resumes<br/>
                        📝 Job applications<br/>
                        🚀 Resume improvements<br/>
                        💼 Career growth
                      </p>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-blue-600">₹49</span>
                      <span className="text-gray-500"> / analysis</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pricing Features */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-blue-600 text-xl">🔒</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Secure Payment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">PayPal secured transactions</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-green-600 text-xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Instant Access</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get results immediately</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-purple-600 text-xl">💎</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Premium Quality</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered insights</p>
                </div>
              </div>

              {/* Pricing Comparison Table */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-4">
                  📊 What's Included in Each Plan
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <th className="border border-gray-200 dark:border-gray-700 p-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                          Feature
                        </th>
                        <th className="border border-gray-200 dark:border-gray-700 p-3 text-center text-sm font-medium text-green-600">
                          Free Analysis
                        </th>
                        <th className="border border-gray-200 dark:border-gray-700 p-3 text-center text-sm font-medium text-blue-600">
                          Paid Analysis
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-gray-900">
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-900 dark:text-white">
                          ATS Score & Breakdown
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-green-600">✅</span>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-blue-600">✅</span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-900 dark:text-white">
                          Section-by-Section Analysis
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-green-600">✅</span>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-blue-600">✅</span>
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-900">
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-900 dark:text-white">
                          AI-Powered Suggestions
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-green-600">✅</span>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-blue-600">✅</span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-900 dark:text-white">
                          Job Profile Matching
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-green-600">✅</span>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-blue-600">✅</span>
                        </td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-900">
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-900 dark:text-white">
                          Enhanced AI Processing
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-gray-400">❌</span>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-blue-600">✅</span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-900 dark:text-white">
                          Priority Support
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-gray-400">❌</span>
                        </td>
                        <td className="border border-gray-200 dark:border-gray-700 p-3 text-center">
                          <span className="text-blue-600">✅</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <strong>Pro Tip:</strong> Make the most of your free analysis by uploading your best resume first!
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    🎯 <strong>Limited Time:</strong> First analysis completely FREE! No credit card required.
                  </p>
                </div>
                
                {/* Call to Action */}
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                  <h3 className="text-xl font-bold mb-2">Ready to Optimize Your Resume?</h3>
                  <p className="text-blue-100 mb-4">
                    Join thousands of professionals who have improved their job prospects with AI-powered resume analysis.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={() => document.getElementById('resume-upload')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      🚀 Start Free Analysis
                    </button>
                    <button 
                      onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
                      className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      💬 Get Career Advice
                    </button>
                  </div>
                  <p className="text-xs text-blue-200 mt-3">
                    No credit card required • Instant results • Professional insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Mobile Optimized */}
          <div className="flex flex-col">
            {/* Resume Upload Section - Only show when no resume is uploaded */}
            {!state.resumeData && (
              <div id="resume-upload" className="mb-6 sm:mb-8">
                <h2 className="mb-4 sm:mb-6 mobile-text-xl sm:mobile-text-2xl font-bold text-gray-900 dark:text-white">
                  Resume Analysis
                </h2>
                <ContextAwareUploader />
              </div>
            )}
            
            {state.resumeData ? (
              <div className="flex flex-col lg:flex-row">
                {/* Main Analysis Section - Takes most of the screen */}
                <div className="flex-grow mb-6 sm:mb-8 lg:mb-0 lg:pr-8">
                  <h2 className="mb-4 sm:mb-6 mobile-text-xl sm:mobile-text-2xl font-bold text-gray-900 dark:text-white">
                    Detailed Analysis
                  </h2>
                  <ResumeAnalysis 
                    analysisResults={{
                      overallScore: state.resumeData.atsScore || 0,
                      sectionScores: {
                        summary: state.resumeData.analysis?.sectionScores?.summary || 0,
                        workExperience: state.resumeData.analysis?.sectionScores?.workExperience || 0,
                        skills: state.resumeData.analysis?.sectionScores?.skills || 0,
                        education: state.resumeData.analysis?.sectionScores?.education || 0,
                        achievements: state.resumeData.analysis?.sectionScores?.achievements || 0,
                        contactInfo: state.resumeData.analysis?.sectionScores?.contactInfo || 0,
                        certifications: state.resumeData.analysis?.sectionScores?.certifications || 0,
                        languages: state.resumeData.analysis?.sectionScores?.languages || 0,
                        projects: state.resumeData.analysis?.sectionScores?.projects || 0,
                        volunteerWork: state.resumeData.analysis?.sectionScores?.volunteerWork || 0,
                      },
                      suggestions: {
                        summary: state.resumeData.analysis?.suggestions?.summary || 'Add a concise professional summary highlighting your key strengths.',
                        workExperience: state.resumeData.analysis?.suggestions?.workExperience || 'Include quantifiable achievements in your work experience.',
                        skills: state.resumeData.analysis?.suggestions?.skills || 'Add more industry-specific technical and soft skills.',
                        education: state.resumeData.analysis?.suggestions?.education || 'Format education section consistently with degrees and dates.',
                        achievements: state.resumeData.analysis?.suggestions?.achievements || 'Add measurable achievements with specific metrics.',
                        contactInfo: state.resumeData.analysis?.suggestions?.contactInfo || 'Ensure contact information is complete and professional.',
                        certifications: state.resumeData.analysis?.suggestions?.certifications || 'Add relevant professional certifications and training.',
                        languages: state.resumeData.analysis?.suggestions?.languages || 'Include language proficiencies if relevant to the role.',
                        projects: state.resumeData.analysis?.suggestions?.projects || 'Highlight key projects with measurable outcomes.',
                        volunteerWork: state.resumeData.analysis?.suggestions?.volunteerWork || 'Include volunteer experience that demonstrates relevant skills.',
                      },
                      improvedContent: state.resumeData.analysis?.improvedContent,
                      jobProfiles: state.resumeData.analysis?.jobProfiles || [],
                    }}
                    resumeText={state.resumeData.text || ''}
                    onContentUpdate={(updatedText) => {
                      console.log("Updated resume text:", updatedText);
                      // Here you would typically update the resume text in the context
                    }}
                    analysisStatus={state.resumeData.analysisStatus}
                    analysisNote={state.resumeData.analysisNote}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center mobile-p border-2 border-dashed border-gray-300 rounded-lg">
                <p className="mobile-text-base text-gray-600 dark:text-gray-400">
                  Upload your resume to see detailed analysis and get AI-powered career advice.
                </p>
              </div>
            )}
            
            {/* AI Career Advisor - Always visible */}
            <div id="chatbot">
              <ContextAwareChatbot />
            </div>
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
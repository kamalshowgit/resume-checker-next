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
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              AI-Powered Resume
              <span className="block text-blue-600 dark:text-blue-400">
                Analysis & Optimization
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Get detailed resume analysis with section-by-section scores and AI-powered career advice.
            </p>
          </div>

          {/* Pricing Section */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-blue-200">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  💰 Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Start free, then pay only for what you need
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-green-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-3">First Analysis: FREE</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Start with a completely free resume analysis. No credit card required.
                    </p>
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-sm text-green-800 dark:text-green-200">
                        ✅ Full ATS analysis<br/>
                        ✅ Optimization tips<br/>
                        ✅ No hidden fees<br/>
                        ✅ Instant results
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-3">₹49 per Analysis</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      After your free analysis, each new resume analysis costs just ₹49.
                    </p>
                    <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        💡 Multiple resumes<br/>
                        💡 Job applications<br/>
                        💡 Resume improvements<br/>
                        💡 Career growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  💡 <strong>Pro Tip:</strong> Make the most of your free analysis by uploading your best resume first!
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col">
            {/* Resume Upload Section - Only show when no resume is uploaded */}
            {!state.resumeData && (
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Resume Analysis
                </h2>
                <ContextAwareUploader />
              </div>
            )}
            
            {state.resumeData ? (
              <div className="flex flex-col lg:flex-row">
                {/* Main Analysis Section - Takes most of the screen */}
                <div className="flex-grow mb-8 lg:mb-0 lg:pr-8">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
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
              <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Upload your resume to see detailed analysis and get AI-powered career advice.
                </p>
              </div>
            )}
            
            {/* AI Career Advisor - Always visible */}
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
"use client";

import React from "react";
import { ResumeProvider, useResumeContext } from "../lib/context/resume-context";
import ContextAwareUploader from "../components/resume/context-aware-uploader";
import ContextAwareChatbot from "../components/resume/context-aware-chatbot";
import { ResumeAnalysis } from "../components/resume/resume-analysis";
import Head from "next/head";

const HomeContent = () => {
  const { state } = useResumeContext();
  
  return (
    <>
      <Head>
        <title>ResumeCheck - AI Resume Analysis & Career Guidance</title>
        <meta name="description" content="Professional AI-powered resume analysis tool with section-by-section scoring, ATS optimization, and personalized career guidance. Get detailed feedback and suggestions to improve your resume." />
        <meta name="keywords" content="resume analysis, AI resume checker, ATS optimization, resume scoring, career guidance, resume optimization, job application, professional development" />
        <meta name="author" content="ResumeCheck" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ResumeCheck - AI Resume Analysis & Career Guidance" />
        <meta property="og:description" content="Professional AI-powered resume analysis tool with section-by-section scoring, ATS optimization, and personalized career guidance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://resumecheck.com" />
        <meta property="og:image" content="https://resumecheck.com/og-image.jpg" />
        <meta property="og:site_name" content="ResumeCheck" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ResumeCheck - AI Resume Analysis & Career Guidance" />
        <meta name="twitter:description" content="Professional AI-powered resume analysis tool with section-by-section scoring, ATS optimization, and personalized career guidance." />
        <meta name="twitter:image" content="https://resumecheck.com/og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "ResumeCheck - AI Resume Analysis & Career Guidance",
              "description": "Professional AI-powered resume analysis tool with section-by-section scoring, ATS optimization, and personalized career guidance.",
              "url": "https://resumecheck.com",
              "mainEntity": {
                "@type": "SoftwareApplication",
                "name": "ResumeCheck",
                "description": "AI-powered resume analysis and optimization tool",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://resumecheck.com"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
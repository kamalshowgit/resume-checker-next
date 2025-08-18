"use client";

import React from "react";
import { SEO } from "@/components/ui/seo";
import { FiTarget, FiUsers, FiAward, FiTrendingUp, FiShield, FiZap } from "react-icons/fi";
import Head from "next/head";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About ResumeCheck - AI Resume Analysis Platform</title>
        <meta name="description" content="Learn about ResumeCheck's mission to revolutionize resume optimization with cutting-edge AI technology. Discover our team, technology, and commitment to helping professionals land their dream jobs." />
        <meta name="keywords" content="about ResumeCheck, AI resume technology, resume optimization platform, career development tools, ATS optimization company" />
        <meta name="author" content="ResumeCheck" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About ResumeCheck - AI Resume Analysis Platform" />
        <meta property="og:description" content="Learn about ResumeCheck's mission to revolutionize resume optimization with cutting-edge AI technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://resumecheck.com/about" />
        <meta property="og:image" content="https://resumecheck.com/og-image.jpg" />
        <meta property="og:site_name" content="ResumeCheck" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About ResumeCheck - AI Resume Analysis Platform" />
        <meta name="twitter:description" content="Learn about ResumeCheck's mission to revolutionize resume optimization with cutting-edge AI technology." />
        <meta name="twitter:image" content="https://resumecheck.com/og-image.jpg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About ResumeCheck",
              "description": "Learn about ResumeCheck's mission to revolutionize resume optimization with cutting-edge AI technology.",
              "url": "https://resumecheck.com/about",
              "mainEntity": {
                "@type": "Organization",
                "name": "ResumeCheck",
                "description": "AI-powered resume analysis and optimization platform",
                "url": "https://resumecheck.com",
                "foundingDate": "2024",
                "numberOfEmployees": "10-50",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "US"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "url": "mailto:rsmchckrspprt@gmail.com"
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
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About",
                    "item": "https://resumecheck.com/about"
                  }
                ]
              }
            })
          }}
        />
      </Head>
      
      <main className="flex min-h-screen flex-col bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
        {/* Hero Section */}
        <section className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                About ResumeCheck
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                Revolutionizing resume optimization with cutting-edge AI technology to help professionals land their dream jobs.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  We believe every professional deserves to present their best self to potential employers. 
                  Our AI-powered platform transforms resumes from simple documents into powerful career tools 
                  that get noticed by Applicant Tracking Systems (ATS) and hiring managers.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Why Choose ResumeCheck?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <FiTarget className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">ATS Optimization</h4>
                        <p className="text-gray-600 dark:text-gray-400">Ensure your resume passes through Applicant Tracking Systems</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiZap className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">AI-Powered Analysis</h4>
                        <p className="text-gray-600 dark:text-gray-400">Get intelligent suggestions for content improvement and optimization</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <FiShield className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Privacy First</h4>
                        <p className="text-gray-600 dark:text-gray-400">Your data is secure and never shared with third parties</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl">
                  <div className="text-center">
                    <FiTrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Industry Leading Technology
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Built with the latest AI models and machine learning algorithms to provide 
                      the most accurate resume analysis and optimization recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Trusted by Professionals Worldwide
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-gray-600 dark:text-gray-400">Resumes Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-400">Industries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
                  <div className="text-gray-600 dark:text-gray-400">Free Analyses</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Completely Free Forever! 🎉
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-2xl">
                <div className="text-4xl font-bold text-green-600 mb-4">Unlimited Analysis: FREE</div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  ResumeCheck is now completely free with unlimited resume analysis. No credit card required, no limits.
                </p>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Everything Included: ATS Scoring, AI Suggestions, Job Matching
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Get unlimited AI-powered resume analysis, section-by-section scoring, improvement suggestions, and job profile matching - all completely free!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                A dedicated team of AI engineers, career experts, and UX designers working together 
                to create the most effective resume optimization platform.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiUsers className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    AI Engineers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Experts in machine learning and natural language processing
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiAward className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Career Experts
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    HR professionals and career coaches with industry insights
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiZap className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    UX Designers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Creating intuitive and beautiful user experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

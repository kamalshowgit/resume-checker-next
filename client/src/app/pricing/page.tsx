"use client";

import React from "react";
import { Footer } from "@/components/ui/footer";
import { FiCheck, FiStar, FiZap, FiShield, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
      
      {/* Hero Section */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
              Start with a free resume check, then pay only for what you need. No hidden fees, no subscriptions.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Free Tier */}
              <div className="relative rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200 mb-4">
                    <FiStar className="h-4 w-4 mr-2" />
                    Perfect to Start
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Free Trial</h3>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">₹0</div>
                  <p className="text-gray-600 dark:text-gray-400">Your first resume analysis</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Complete ATS scoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Key points extraction</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Basic improvement suggestions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Resume content editing</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">AI career chat (5 messages)</span>
                  </li>
                </ul>
                
                <button className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  Get Started Free
                </button>
              </div>

              {/* Paid Tier */}
              <div className="relative rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-xl dark:border-blue-400 dark:bg-gray-800">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pay Per Check</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">₹49</div>
                  <p className="text-gray-600 dark:text-gray-400">Per resume analysis</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Everything in Free tier</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Advanced AI improvements</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Detailed section scoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Unlimited career chat</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FiCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Export optimized resume</span>
                  </li>
                </ul>
                
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Start Analysis - ₹49
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Feature Comparison
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              See what's included in each plan
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Free Trial</h3>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-blue-600 mb-4">Pay Per Check</h3>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="p-6">
                    <span className="text-gray-700 dark:text-gray-300">ATS Scoring</span>
                  </div>
                  <div className="p-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </div>
                  <div className="p-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="p-6">
                    <span className="text-gray-700 dark:text-gray-300">Key Points Extraction</span>
                  </div>
                  <div className="p-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </div>
                  <div className="p-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="p-6">
                    <span className="text-gray-700 dark:text-gray-300">AI Improvements</span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-gray-400">Basic</span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-blue-600 font-medium">Advanced</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="p-6">
                    <span className="text-gray-700 dark:text-gray-300">Career Chat</span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-gray-400">5 messages</span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-blue-600 font-medium">Unlimited</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                  <div className="p-6">
                    <span className="text-gray-700 dark:text-gray-300">Priority Support</span>
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-gray-400">Standard</span>
                  </div>
                  <div className="p-6 text-center">
                    <FiCheck className="h-5 w-5 text-green-500 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                How does the free trial work?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You get one complete resume analysis absolutely free. Upload your resume, get ATS scoring, 
                key points extraction, and basic improvement suggestions at no cost.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                What happens after my free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                After your free analysis, you can continue using the platform by paying ₹49 for each 
                additional resume analysis. No subscription required - pay only when you need it.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I analyze multiple resumes?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! You can analyze as many resumes as you want. Each analysis costs ₹49, 
                giving you the flexibility to optimize multiple versions of your resume.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is there a money-back guarantee?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're confident in our service. If you're not satisfied with your paid analysis, 
                contact us within 24 hours for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start with a free analysis and see the difference AI-powered optimization can make.
          </p>
          <button className="bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Start Free Analysis
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

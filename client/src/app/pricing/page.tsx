"use client";

import React from "react";
import { SEO } from "@/components/ui/seo";
import { FiCheck, FiStar, FiGift } from "react-icons/fi";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Free Forever",
      price: "₹0",
      period: "unlimited",
      description: "Complete AI-powered resume analysis with no limits",
      features: [
        "Unlimited resume analysis",
        "ATS scoring and feedback",
        "Section-by-section breakdown",
        "AI-powered suggestions",
        "Advanced improvement tips",
        "Job profile matching",
        "Content optimization",
        "Export optimized resume",
        "Priority support included"
      ],
      popular: true,
      cta: "Start Free Analysis",
      ctaVariant: "default"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "name": "ResumeCheck - Completely Free",
    "description": "AI-powered resume analysis completely free with no limits",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Forever",
        "price": "0",
        "priceCurrency": "INR",
        "description": "Unlimited resume analysis completely free"
      }
    ]
  };

  return (
    <>
      <SEO
        title="Pricing - ResumeCheck Completely Free"
        description="ResumeCheck is now completely free! Get unlimited AI-powered resume analysis, ATS optimization, and career guidance at no cost."
        keywords={[
          "free resume checker",
          "free resume analysis",
          "free ATS optimization",
          "free resume optimization",
          "free career tool",
          "free resume software"
        ]}
        canonicalUrl="https://resumecheck.com/pricing"
        breadcrumbs={[
          { name: "Home", url: "https://resumecheck.com" },
          { name: "Pricing", url: "https://resumecheck.com/pricing" }
        ]}
        structuredData={structuredData}
      />
      
      <main className="flex min-h-screen flex-col bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
        {/* Hero Section */}
        <section className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                Completely Free Forever! 🎉
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                ResumeCheck is now completely free with unlimited resume analysis and AI-powered optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="relative rounded-2xl border-2 border-green-600 bg-green-50 dark:bg-green-900/20 p-8">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <FiGift className="h-4 w-4" />
                    Free Forever
                  </span>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Free Forever
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                      ₹0
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      unlimited
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete AI-powered resume analysis with no limits
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pricingPlans[0].features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <FiCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-3 px-6 rounded-lg font-semibold transition-colors bg-green-600 text-white hover:bg-green-700">
                  Start Free Analysis
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Is ResumeCheck really free?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes! ResumeCheck is now completely free with no hidden costs. You can analyze unlimited resumes without any payment.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    What's included in the free analysis?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Everything! You get unlimited ATS scoring, section-by-section breakdown, AI-powered suggestions, job profile matching, and content optimization - all completely free.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    How many resumes can I analyze?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Unlimited! You can analyze as many resumes as you want, whenever you want, with no restrictions or limits.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Do I need to create an account?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No account required! Just upload your resume and get instant analysis. Your data is processed securely and privately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Optimize Your Resume?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Join thousands of professionals who have improved their job prospects with ResumeCheck - completely free!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Start Free Analysis
                </button>
                <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                  View All Features
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

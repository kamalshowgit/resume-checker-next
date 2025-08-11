"use client";

import React from "react";
import { Footer } from "@/components/ui/footer";
import { SEO } from "@/components/ui/seo";
import { FiCheck, FiStar } from "react-icons/fi";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Free Trial",
      price: "₹0",
      period: "first analysis",
      description: "Try our AI-powered resume analysis completely free",
      features: [
        "1 free resume analysis",
        "ATS scoring and feedback",
        "Section-by-section breakdown",
        "AI-powered suggestions",
        "Basic improvement tips"
      ],
      popular: false,
      cta: "Start Free Analysis",
      ctaVariant: "outline"
    },
    {
      name: "Premium Analysis",
      price: "₹49",
      period: "per analysis",
      description: "Unlock unlimited resume analyses with advanced features",
      features: [
        "Unlimited resume uploads",
        "Advanced AI analysis",
        "Detailed section scoring",
        "Comprehensive improvement suggestions",
        "Job profile matching",
        "Content optimization tips",
        "Priority support",
        "Export optimized resume"
      ],
      popular: true,
      cta: "Get Premium Access",
      ctaVariant: "default"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "name": "ResumeCheck Pricing Plans",
    "description": "Start with a free resume analysis, then pay ₹49 for additional analyses",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Trial",
        "price": "0",
        "priceCurrency": "INR",
        "description": "First resume analysis completely free"
      },
      {
        "@type": "Offer",
        "name": "Premium Analysis",
        "price": "49",
        "priceCurrency": "INR",
        "description": "₹49 per additional resume analysis"
      }
    ]
  };

  return (
    <>
      <SEO
        title="Pricing - ResumeCheck Plans & Pricing"
        description="Choose the perfect ResumeCheck plan for your resume optimization needs. Free plan available, Pro plan at $19/month, and Enterprise solutions for teams."
        keywords={[
          "resume checker pricing",
          "resume analysis cost",
          "ATS optimization pricing",
          "resume optimization plans",
          "career tool pricing",
          "resume software cost"
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
                Simple, Transparent Pricing
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                Start with a free analysis, then pay only ₹49 for each additional resume optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl border-2 p-8 ${
                      plan.popular
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                          <FiStar className="h-4 w-4" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 ml-2">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {plan.description}
                      </p>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <FiCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                        plan.ctaVariant === 'default'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
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
                    How does the pricing work?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your first resume analysis is completely free. After that, each additional analysis costs ₹49. There are no monthly subscriptions or hidden fees.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    What's included in the free analysis?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    The free analysis includes ATS scoring, section-by-section breakdown, AI-powered suggestions, and basic improvement tips for one resume.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We accept all major credit cards, UPI, net banking, and digital wallets. All payments are processed securely through Razorpay.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Can I analyze multiple resumes?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes! After your free analysis, you can analyze as many resumes as you want for ₹49 each. Perfect for job seekers applying to multiple positions.
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
                Join thousands of professionals who have improved their job prospects with ResumeCheck.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Start Free Analysis
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  View All Features
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

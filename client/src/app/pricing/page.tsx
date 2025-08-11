"use client";

import React from "react";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { SEO } from "@/components/ui/seo";
import { FiCheck, FiStar, FiZap } from "react-icons/fi";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with resume analysis",
      features: [
        "Basic resume analysis",
        "ATS scoring",
        "3 resume uploads per month",
        "Basic suggestions",
        "Email support"
      ],
      popular: false,
      cta: "Get Started Free",
      ctaVariant: "outline"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "Advanced features for serious job seekers",
      features: [
        "Everything in Free",
        "Unlimited resume uploads",
        "Advanced AI analysis",
        "Section-by-section scoring",
        "Detailed improvement suggestions",
        "Priority support",
        "Export optimized resume"
      ],
      popular: true,
      cta: "Start Pro Trial",
      ctaVariant: "default"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For HR teams and career counselors",
      features: [
        "Everything in Pro",
        "Team management",
        "Bulk resume analysis",
        "Custom scoring criteria",
        "API access",
        "Dedicated support",
        "White-label options"
      ],
      popular: false,
      cta: "Contact Sales",
      ctaVariant: "outline"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "name": "ResumeCheck Pricing Plans",
    "description": "Choose the perfect plan for your resume optimization needs",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Plan",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Basic resume analysis with ATS scoring"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "19",
        "priceCurrency": "USD",
        "description": "Advanced AI analysis with unlimited uploads"
      },
      {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "price": "99",
        "priceCurrency": "USD",
        "description": "Team management and bulk analysis"
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
        <Header />
        
        {/* Hero Section */}
        <section className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                Choose the plan that fits your career goals. Start free and upgrade when you&apos;re ready.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
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
                    Can I cancel my subscription anytime?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes, you can cancel your subscription at any time. You&apos;ll continue to have access to your plan until the end of your billing period.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Is there a free trial for paid plans?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Yes, we offer a 7-day free trial for our Pro plan. No credit card required to start your trial.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Do you offer refunds?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We offer a 30-day money-back guarantee. If you&apos;re not satisfied with our service, contact us for a full refund.
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

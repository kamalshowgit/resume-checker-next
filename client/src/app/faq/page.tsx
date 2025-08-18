"use client";

import React, { useState } from "react";
import { SEO } from "@/components/ui/seo";
import { FiChevronDown, FiChevronUp, FiSearch, FiHelpCircle } from "react-icons/fi";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "How does ResumeCheck work?",
      answer: "Simply upload your resume (PDF, Word, or text) and our AI will analyze it for ATS compatibility, provide section-by-section scoring, and give personalized improvement suggestions. It's completely free with no limits!"
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, DOC, DOCX, TXT, and RTF files. For best results, we recommend using PDF format as it maintains formatting consistency across different devices and platforms."
    },
    {
      question: "How accurate is the ATS scoring?",
      answer: "Our AI-powered scoring system analyzes resumes based on industry standards and ATS requirements. We provide detailed breakdowns for different sections to help you understand exactly where improvements are needed."
    },
    {
      question: "Can I analyze multiple resumes?",
      answer: "Yes! ResumeCheck is completely free with unlimited resume analysis. You can analyze as many resumes as you want, whenever you want, with no restrictions or limits."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! Just upload your resume and get instant analysis. Your data is processed securely and privately."
    },
    {
      question: "What sections does ResumeCheck analyze?",
      answer: "We analyze all major resume sections including summary, work experience, skills, education, achievements, contact information, and more. Each section gets a detailed score and improvement suggestions."
    }
  ];

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs.map((faq, index) => ({
    ...faq,
    question: faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ? faq.question : "",
    answer: faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ? faq.answer : ""
  })).filter(faq => faq.question !== "");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions - ResumeCheck"
        description="Find answers to common questions about ResumeCheck resume analysis, ATS optimization, account management, and technical support. Get help with resume optimization and career guidance."
        keywords={[
          "resume checker FAQ",
          "resume analysis questions",
          "ATS optimization help",
          "resume tool support",
          "career guidance FAQ",
          "resume optimization questions"
        ]}
        canonicalUrl="https://resumecheck.com/faq"
        breadcrumbs={[
          { name: "Home", url: "https://resumecheck.com" },
          { name: "FAQ", url: "https://resumecheck.com/faq" }
        ]}
        structuredData={structuredData}
      />
      
      <main className="flex min-h-screen flex-col bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
        {/* Hero Section */}
        <section className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                Find answers to common questions about ResumeCheck and resume optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for questions or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Pricing FAQ Section */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <FiHelpCircle className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Pricing & Payment
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">
                        How much does ResumeCheck cost?
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        <div className="mb-3">
                          <strong>First Analysis: FREE</strong> - Start with a completely free resume analysis. No credit card required.
                        </div>
                        <div>
                          <strong>Additional Analyses: ₹49 each</strong> - After your free analysis, each new resume analysis costs just ₹49. Perfect for job seekers applying to multiple positions.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">
                        Is the first analysis really free?
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Yes! Your first resume analysis is completely free with no hidden fees. You get the full analysis including ATS score, suggestions, and optimization tips at no cost.
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white mb-2">
                        When do I need to pay ₹49?
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        You only pay ₹49 when you want to analyze a second resume or more. The first analysis is always free. This pricing model is designed to help you get started without any barriers.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredFaqs.map((faq, index) => {
                const globalIndex = index;
                const isExpanded = expandedItems.includes(globalIndex);
                
                return (
                  <div key={index} className="mb-12">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <FiChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <FiChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {searchTerm && filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <FiHelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or browse our categories above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/support"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Visit Support Center
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

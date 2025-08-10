"use client";

import React, { useState } from "react";
import { Footer } from "@/components/ui/footer";
import { FiChevronDown, FiChevronUp, FiHelpCircle, FiFileText, FiCreditCard, FiShield, FiZap } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    question: "What is ResumeCheck?",
    answer: "ResumeCheck is an AI-powered resume optimization platform that helps professionals improve their resumes for better job applications. We provide ATS scoring, content analysis, and AI-powered improvement suggestions.",
    category: "general"
  },
  {
    question: "How does AI resume analysis work?",
    answer: "Our AI analyzes your resume using advanced natural language processing to identify areas for improvement, check ATS compatibility, extract key achievements, and suggest content enhancements that will make your resume stand out to hiring managers.",
    category: "general"
  },
  {
    question: "What file formats do you support?",
    answer: "We support PDF, Word (.doc/.docx), Text (.txt), and RTF files. For best results, we recommend using PDF format as it maintains formatting consistency across different devices and platforms.",
    category: "general"
  },
  
  // Pricing Questions
  {
    question: "How much does it cost?",
    answer: "Your first resume analysis is completely free! After that, each additional analysis costs ₹49. There are no hidden fees, no subscriptions, and no recurring charges. You only pay when you need another analysis.",
    category: "pricing"
  },
  {
    question: "Is the free trial really free?",
    answer: "Yes, absolutely! Your first resume analysis includes full ATS scoring, key points extraction, basic improvement suggestions, and resume content editing. No credit card required, no hidden costs.",
    category: "pricing"
  },
  {
    question: "Can I analyze multiple resumes?",
    answer: "Yes! You can analyze as many resumes as you want. Each analysis costs ₹49, giving you the flexibility to optimize multiple versions of your resume for different job applications or industries.",
    category: "pricing"
  },
  {
    question: "Do you offer refunds?",
    answer: "We're confident in our service quality. If you're not satisfied with your paid analysis, contact us within 24 hours for a full refund. Your satisfaction is our priority.",
    category: "pricing"
  },
  
  // Technical Questions
  {
    question: "What is ATS scoring?",
    answer: "ATS (Applicant Tracking System) scoring measures how well your resume will perform when scanned by automated hiring software. Our AI analyzes keywords, formatting, and content structure to give you a score and specific improvement suggestions.",
    category: "technical"
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our AI is trained on thousands of successful resumes and industry best practices. It provides highly accurate analysis with specific, actionable recommendations. The system continuously learns and improves to deliver better results.",
    category: "technical"
  },
  {
    question: "How long does analysis take?",
    answer: "Most resume analyses are completed within 30-60 seconds. The time depends on the length and complexity of your resume, but you'll typically have results in under a minute.",
    category: "technical"
  },
  {
    question: "Can I edit my resume after analysis?",
    answer: "Yes! Our platform includes a built-in resume editor where you can make changes based on AI suggestions. You can edit individual lines, see improvement recommendations, and optimize your content in real-time.",
    category: "technical"
  },
  
  // Privacy & Security
  {
    question: "Is my resume data secure?",
    answer: "Absolutely. We take data security seriously. Your resume is encrypted during transmission and storage, and we never share your personal information with third parties. Your data is only used for analysis and is deleted after processing.",
    category: "privacy"
  },
  {
    question: "Do you store my resume?",
    answer: "We temporarily store your resume for analysis purposes only. Your data is automatically deleted after processing to ensure maximum privacy and security. We don't keep permanent copies of your documents.",
    category: "privacy"
  },
  {
    question: "Can I delete my account and data?",
    answer: "Yes, you have full control over your data. You can delete your account and all associated data at any time through your account settings. We'll permanently remove all your information from our systems.",
    category: "privacy"
  },
  
  // Features & Services
  {
    question: "What's included in the career chat?",
    answer: "Our AI career chat provides personalized career advice, interview tips, job search strategies, and answers to career-related questions. Free users get 5 messages, while paid users enjoy unlimited access.",
    category: "features"
  },
  {
    question: "Can I export my optimized resume?",
    answer: "Yes! After analysis and optimization, you can export your improved resume in multiple formats including PDF, Word, and plain text. This feature is available for paid users.",
    category: "features"
  },
  {
    question: "Do you offer industry-specific advice?",
    answer: "Yes, our AI is trained on industry-specific best practices and can provide tailored recommendations for different sectors including technology, healthcare, finance, marketing, and more.",
    category: "features"
  },
  
  // Support & Help
  {
    question: "How can I get help if I have issues?",
    answer: "We offer multiple support channels including email support, live chat, and a comprehensive help center. Paid users get priority support with faster response times.",
    category: "support"
  },
  {
    question: "Do you offer bulk analysis for companies?",
    answer: "Yes, we offer enterprise solutions for companies that need to analyze multiple resumes. Contact us for custom pricing and features tailored to your organization's needs.",
    category: "support"
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = activeCategory === "all" 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const categories = [
    { id: "all", name: "All Questions", icon: FiHelpCircle },
    { id: "general", name: "General", icon: FiFileText },
    { id: "pricing", name: "Pricing", icon: FiCreditCard },
    { id: "technical", name: "Technical", icon: FiZap },
    { id: "privacy", name: "Privacy & Security", icon: FiShield },
    { id: "features", name: "Features", icon: FiZap },
    { id: "support", name: "Support", icon: FiHelpCircle }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
      
      {/* Hero Section */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
              Find answers to common questions about ResumeCheck and our AI-powered resume optimization service.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    {openItems.has(index) ? (
                      <FiChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.has(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <FiHelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try selecting a different category or contact us directly for help.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
            <button className="bg-gray-100 text-gray-900 py-3 px-8 rounded-lg font-medium hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              Live Chat
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

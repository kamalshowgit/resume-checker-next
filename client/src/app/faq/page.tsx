"use client";

import React, { useState } from "react";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { SEO } from "@/components/ui/seo";
import { FiChevronDown, FiChevronUp, FiSearch, FiHelpCircle } from "react-icons/fi";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: FiHelpCircle,
      questions: [
        {
          question: "How does ResumeCheck work?",
          answer: "ResumeCheck uses advanced AI technology to analyze your resume. Simply upload your resume file (PDF, Word, or text), and our system will provide detailed analysis including ATS scoring, section-by-section feedback, and specific improvement suggestions."
        },
        {
          question: "What file formats are supported?",
          answer: "We support PDF, Microsoft Word (.doc, .docx), and plain text files. PDF is recommended for best results as it preserves formatting and is most compatible with our analysis system."
        },
        {
          question: "Is my resume data secure?",
          answer: "Yes, your privacy and data security are our top priorities. All resume uploads are encrypted, processed securely, and automatically deleted after analysis. We never share your personal information with third parties."
        }
      ]
    },
    {
      title: "Resume Analysis",
      icon: FiHelpCircle,
      questions: [
        {
          question: "What is ATS scoring?",
          answer: "ATS (Applicant Tracking System) scoring measures how well your resume will perform when scanned by automated hiring systems. Our AI analyzes keyword matching, formatting, and content structure to give you a score and specific recommendations for improvement."
        },
        {
          question: "How accurate is the AI analysis?",
          answer: "Our AI analysis is trained on millions of successful resumes and industry best practices. It provides highly accurate feedback on content, structure, and optimization. However, we always recommend reviewing suggestions and applying them based on your specific situation."
        },
        {
          question: "Can I get feedback on specific sections?",
          answer: "Yes! Our analysis breaks down your resume into key sections (summary, experience, skills, education, etc.) and provides individual scores and specific improvement suggestions for each section."
        }
      ]
    },
    {
      title: "Account & Billing",
      icon: FiHelpCircle,
      questions: [
        {
          question: "Do I need to create an account?",
          answer: "You can use our basic resume analysis without creating an account. However, creating a free account allows you to save your analysis history, track improvements over time, and access additional features."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe, and we offer a 30-day money-back guarantee."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time through your account settings. You'll continue to have access to your plan until the end of your billing period."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: FiHelpCircle,
      questions: [
        {
          question: "What if the analysis doesn't work?",
          answer: "If you encounter any issues with the analysis, please check that your file is in a supported format and under 10MB. If problems persist, contact our support team and we'll help you resolve the issue."
        },
        {
          question: "How long does analysis take?",
          answer: "Most resume analyses are completed within 30 seconds to 2 minutes. Processing time depends on the file size and complexity of your resume content."
        },
        {
          question: "Can I use ResumeCheck on mobile?",
          answer: "Yes! ResumeCheck is fully responsive and works great on all devices including smartphones and tablets. You can upload resumes and view analysis results on any device."
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(category =>
      category.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    )
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
        <Header />
        
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
              {filteredCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    {category.questions.map((item, questionIndex) => {
                      const globalIndex = categoryIndex * 100 + questionIndex;
                      const isExpanded = expandedItems.includes(globalIndex);
                      
                      return (
                        <div
                          key={questionIndex}
                          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <span className="font-semibold text-gray-900 dark:text-white pr-4">
                              {item.question}
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
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              {searchTerm && filteredCategories.length === 0 && (
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

        <Footer />
      </main>
    </>
  );
}

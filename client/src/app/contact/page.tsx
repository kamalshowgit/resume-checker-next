"use client";

import React from "react";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { SEO } from "@/components/ui/seo";
import { FiMail, FiPhone, FiMapPin, FiClock, FiMessageCircle } from "react-icons/fi";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      details: "support@resumecheck.com",
      description: "Get help with your resume analysis"
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak with our support team"
    },
    {
      icon: FiMapPin,
      title: "Office",
      details: "San Francisco, CA",
      description: "Main headquarters location"
    },
    {
      icon: FiClock,
      title: "Support Hours",
      details: "Mon-Fri 9AM-6PM PST",
      description: "We're here when you need us"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ResumeCheck",
    "description": "Get in touch with our support team for help with resume analysis and optimization",
    "url": "https://resumecheck.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "ResumeCheck",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-555-123-4567",
          "contactType": "customer service",
          "areaServed": "US",
          "availableLanguage": "English"
        },
        {
          "@type": "ContactPoint",
          "email": "support@resumecheck.com",
          "contactType": "customer service"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - ResumeCheck Support & Help"
        description="Get in touch with ResumeCheck support team. We're here to help with resume analysis, technical issues, and career guidance. Contact us via email, phone, or contact form."
        keywords={[
          "contact ResumeCheck",
          "resume checker support",
          "resume analysis help",
          "ATS optimization support",
          "career guidance contact",
          "resume tool help"
        ]}
        canonicalUrl="https://resumecheck.com/contact"
        breadcrumbs={[
          { name: "Home", url: "https://resumecheck.com" },
          { name: "Contact", url: "https://resumecheck.com/contact" }
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
                Get in Touch
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                Have questions about resume analysis? Need help with your account? We&apos;re here to help you succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {contactInfo.map((info, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <info.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                      {info.details}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Send us a Message
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your first name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="resume-analysis">Resume Analysis Help</option>
                      <option value="account-issues">Account Issues</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="feature-request">Feature Request</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Describe your issue or question in detail..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FiMessageCircle className="h-5 w-5" />
                      Send Message
                    </button>
                    
                    <button
                      type="button"
                      className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Common Questions
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    How long does it take to get a response?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We typically respond to all inquiries within 24 hours during business days. For urgent technical issues, we aim to respond within 4 hours.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    What information should I include in my message?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please include your account email, a clear description of the issue, and any relevant screenshots or error messages. This helps us provide faster and more accurate support.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Can I get help with resume writing?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    While our primary focus is resume analysis and optimization, our support team can provide general guidance on resume writing best practices and help you understand our AI suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

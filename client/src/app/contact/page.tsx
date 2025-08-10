"use client";

import React, { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FiMail, FiPhone, FiMapPin, FiMessageCircle, FiClock, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    
    setIsSubmitting(false);
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
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
              Have questions about ResumeCheck? Need support? We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">support@resumecheck.com</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">24/7 email support</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Available 9 AM - 6 PM IST</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Get instant help</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">+91 98765 43210</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Mon-Fri 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Office Address</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          ResumeCheck Technologies Pvt. Ltd.<br />
                          Tech Park, Building A, Floor 3<br />
                          Bangalore, Karnataka 560001<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiClock className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Business Hours</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                          Saturday: 10:00 AM - 2:00 PM IST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMail className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Addresses</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          <strong>Support:</strong> support@resumecheck.com<br />
                          <strong>Sales:</strong> sales@resumecheck.com<br />
                          <strong>Partnerships:</strong> partnerships@resumecheck.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    Need Immediate Help?
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-4">
                    For urgent technical issues or billing problems, our support team is available 24/7 via email.
                  </p>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Emergency Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Answers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Check our FAQ section for common questions and answers
          </p>
          <a
            href="/faq"
            className="inline-flex items-center bg-gray-100 text-gray-900 py-3 px-8 rounded-lg font-medium hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            View FAQ
            <FiMessageCircle className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

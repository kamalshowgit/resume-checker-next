import React from 'react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Support Center
            </h1>
            <p className="text-lg text-gray-600">
              We&apos;re here to help you succeed with ResumeCheck
            </p>
          </div>

          <div className="space-y-6">
            {/* Quick Help */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Quick Help
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Getting Started
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Upload your resume</li>
                    <li>• Get instant AI analysis</li>
                    <li>• Review suggestions</li>
                    <li>• Apply improvements</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Common Issues
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• File upload problems</li>
                    <li>• Analysis errors</li>
                    <li>• Technical issues</li>
                    <li>• Feature requests</li>
                    <li>• General questions</li>
                    <li>• Resume analysis help</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Getting Started
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Step-by-Step Guide
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Create Your Account</p>
                        <p className="text-sm text-gray-600">Sign up with your email and create a password</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Upload Your Resume</p>
                        <p className="text-sm text-gray-600">Upload your resume in PDF, Word, or text format</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Get AI Analysis</p>
                        <p className="text-sm text-gray-600">Our AI analyzes your resume and provides insights</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Review & Improve</p>
                        <p className="text-sm text-gray-600">Review suggestions and apply improvements to your resume</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Troubleshooting
              </h2>
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Resume Analysis Issues
                  </h3>
                  <div className="space-y-3">
                    <strong>Problem:</strong> Analysis not working?
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                      <li>• Check file format (PDF, DOC, DOCX, TXT)</li>
                      <li>• Ensure file size is under 10MB</li>
                      <li>• Try refreshing the page</li>
                      <li>• Contact support if issue persists</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Payment Issues
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Problem:</strong> Payment not going through?
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Check card details</li>
                      <li>• Ensure sufficient funds</li>
                      <li>• Try a different payment method</li>
                      <li>• Contact your bank if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    How accurate is the AI analysis?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our AI provides helpful insights based on industry best practices.
                    While it&apos;s very good, always review suggestions before applying them to your resume.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Is my resume data secure?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yes! We use industry-standard encryption and never share your personal information.
                    Your resume is only used for analysis and is deleted after 12 months.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Can I cancel my subscription?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Absolutely! You can cancel anytime with no questions asked.
                    Your subscription will end at the end of the current billing period.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    What file formats do you support?
                  </h3>
                  <p className="text-sm text-gray-600">
                    We support PDF, Microsoft Word (DOC, DOCX), and plain text files.
                    PDF is recommended for best results.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    How long does analysis take?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Usually just a few seconds! Our AI is fast and efficient.
                    Complex resumes might take up to a minute.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Support */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Support
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Get Help Fast
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Email Support:</strong> rsmchckrspprt@gmail.com
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Response Time:</strong> Usually within 24 hours
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Live Chat:</strong> Available during business hours
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    What to Include
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      When contacting support, please include:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Your email address</li>
                      <li>• Description of the problem</li>
                      <li>• Steps you&apos;ve already tried</li>
                      <li>• Screenshots if helpful</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Information */}
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

            {/* Additional Resources */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Additional Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Helpful Pages
                  </h3>
                  <div className="space-y-2">
                    <Link href="/faq" className="block text-blue-600 hover:underline text-sm">
                      • FAQ Page - More detailed questions
                    </Link>
                    <Link href="/about" className="block text-blue-600 hover:underline text-sm">
                      • About Us - Learn more about ResumeCheck
                    </Link>
                    <Link href="/pricing" className="block text-blue-600 hover:underline text-sm">
                      • Pricing - View our plans and features
                    </Link>
                    <Link href="/contact" className="block text-blue-600 hover:underline text-sm">
                      • Contact - General inquiries
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Emergency Support
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Urgent Issues:</strong> For critical problems affecting your account or service.
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> urgent@resumecheck.com
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Response:</strong> Within 4 hours
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link
              href="/"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

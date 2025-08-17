import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Terms and conditions for using our AI-powered resume analysis service
            </p>
          </div>

          <div className="space-y-6">
            {/* Acceptance of Terms */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Acceptance of Terms
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  By accessing and using ResumeCheck, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our service.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Service Description
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    What We Provide
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• AI-powered resume analysis and scoring</li>
                    <li>• ATS optimization recommendations</li>
                    <li>• Key points extraction and career insights</li>
                    <li>• Resume improvement suggestions</li>
                    <li>• Career guidance and chat support</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Service Limitations
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our service is designed to assist with resume optimization but does not guarantee job offers, 
                    interviews, or career success. Results depend on many factors beyond our control.
                  </p>
                </div>
              </div>
            </section>

            {/* User Accounts */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                User Accounts
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Account Creation
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You must provide accurate and complete information</li>
                    <li>• You are responsible for maintaining account security</li>
                    <li>• You must be at least 18 years old or have parental consent</li>
                    <li>• One account per person is allowed</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Account Responsibilities
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Keep your login credentials secure</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• You are responsible for all activity under your account</li>
                    <li>• Do not share your account with others</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* AI Service Disclaimers */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                AI Service Disclaimers
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    AI Analysis Accuracy
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our AI provides suggestions based on machine learning algorithms. While we strive for accuracy, 
                    we cannot guarantee that all recommendations will be perfect or suitable for every situation.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    User Responsibility
                  </h3>
                  <p className="text-sm text-gray-600">
                    Users must review, validate, and implement AI suggestions using their own judgment. 
                    We recommend consulting with career professionals when needed.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    No Guaranteed Outcomes
                  </h3>
                  <p className="text-sm text-gray-600">
                    We do not guarantee that using our service will result in job offers, interviews, 
                    or career advancement. Success depends on many factors beyond our control.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Our Rights
                  </h3>
                  <p className="text-sm text-gray-600">
                    ResumeCheck and its content, including AI algorithms, software, and design, 
                    are protected by intellectual property laws and remain our property.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Your Rights
                  </h3>
                  <p className="text-sm text-gray-600">
                    You retain ownership of your resume content and personal information. 
                    You grant us a limited license to process your data for service provision.
                  </p>
                </div>
              </div>
            </section>

            {/* Payment and Subscriptions */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Payment and Subscriptions
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Pricing and Billing
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Prices are subject to change with notice</li>
                    <li>• Billing occurs on a recurring basis</li>
                    <li>• All fees are non-refundable unless required by law</li>
                    <li>• Taxes may apply based on your location</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Cancellation
                  </h3>
                  <p className="text-sm text-gray-600">
                    You may cancel your subscription at any time. Your access will continue until the end 
                    of the current billing period. No refunds for partial periods.
                  </p>
                </div>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Prohibited Uses
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Using the service for illegal or unauthorized purposes</li>
                  <li>• Attempting to gain unauthorized access to our systems</li>
                  <li>• Interfering with service operation or other users</li>
                  <li>• Uploading malicious content or viruses</li>
                  <li>• Violating any applicable laws or regulations</li>
                  <li>• Sharing account access with unauthorized users</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Limitation of Liability
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  ResumeCheck shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising from your use of our service. Our total liability is limited 
                  to the amount you paid for the service in the 12 months preceding the claim.
                </p>
              </div>
            </section>

            {/* Warranties and Disclaimers */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Warranties and Disclaimers
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  Our service is provided &quot;as is&quot; without warranties of any kind. We disclaim all warranties, 
                  express or implied, including but not limited to merchantability, fitness for a particular purpose, 
                  and non-infringement.
                </p>
              </div>
            </section>

            {/* Indemnification */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Indemnification
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  You agree to indemnify and hold harmless ResumeCheck from any claims, damages, or expenses 
                  arising from your use of the service or violation of these terms.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Termination
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Termination by You
                  </h3>
                  <p className="text-sm text-gray-600">
                    You may terminate your account at any time by contacting us or using the account deletion feature.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Termination by Us
                  </h3>
                  <p className="text-sm text-gray-600">
                    We may terminate or suspend your account for violations of these terms, 
                    fraudulent activity, or extended periods of inactivity.
                  </p>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Governing Law
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  These terms are governed by the laws of the jurisdiction where ResumeCheck operates. 
                  Any disputes will be resolved in the appropriate courts of that jurisdiction.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Changes to Terms
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  We may update these terms from time to time. We will notify you of significant changes 
                  through our website or email. Continued use of our service constitutes acceptance of updated terms.
                </p>
              </div>
            </section>

            {/* Pricing and Payment Terms */}
            <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                💰 Pricing and Payment Terms
              </h2>
              <div className="bg-white rounded-lg p-6 border border-blue-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-3">First Analysis: FREE</div>
                    <p className="text-sm text-gray-600 mb-3">
                      Your first resume analysis is completely free with no credit card required.
                    </p>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-xs text-green-800">
                        ✅ Full ATS analysis<br/>
                        ✅ Optimization tips<br/>
                        ✅ No hidden fees
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-3">₹49 per Analysis</div>
                    <p className="text-sm text-gray-600 mb-3">
                      After your free analysis, each new resume analysis costs ₹49.
                    </p>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-xs text-blue-800">
                        💡 Multiple resumes<br/>
                        💡 Job applications<br/>
                        💡 Resume improvements
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <strong>Payment:</strong> All payments are processed securely through PayPal. Prices are in Indian Rupees (₹).
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  If you have questions about these terms, please contact us at{' '}
                  <a href="mailto:rsmchckrspprt@gmail.com" className="text-blue-600 hover:underline">
                    rsmchckrspprt@gmail.com
                  </a>
                </p>
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

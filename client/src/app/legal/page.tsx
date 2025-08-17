import React from 'react';
import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Legal Information
            </h1>
            <p className="text-lg text-gray-600">
              Important legal information about our AI-powered resume analysis service
            </p>
          </div>

          <div className="space-y-6">
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
                    Our AI-powered resume analysis provides suggestions and insights based on machine learning algorithms. 
                    While we strive for accuracy, we cannot guarantee that all recommendations will be perfect or suitable for every situation.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    User Responsibility
                  </h3>
                  <p className="text-sm text-gray-600">
                    Users are responsible for reviewing, validating, and implementing any suggestions provided by our AI system. 
                    We recommend using our analysis as a starting point and consulting with career professionals when needed.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    No Guaranteed Results
                  </h3>
                  <p className="text-sm text-gray-600">
                    We do not guarantee that using our service will result in job offers, interviews, or career advancement. 
                    Success depends on many factors beyond our control.
                  </p>
                </div>
              </div>
            </section>

            {/* Service Disclaimers */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Service Disclaimers
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Service Availability
                  </h3>
                  <p className="text-sm text-gray-600">
                    We strive to maintain high service availability, but we cannot guarantee uninterrupted access. 
                    Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Data Processing
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our AI processes your resume data to provide analysis. While we implement security measures, 
                    no system is completely secure. Users should not upload highly sensitive information.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Limitation of Liability
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  ResumeCheck shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including but not limited to loss of profits, data, or business opportunities, arising from the use of our service.
                </p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                User Responsibilities
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Content Accuracy
                  </h3>
                  <p className="text-sm text-gray-600">
                    Users are responsible for ensuring the accuracy and truthfulness of information in their resumes. 
                    We do not verify the content you upload.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Professional Judgment
                  </h3>
                  <p className="text-sm text-gray-600">
                    Use your professional judgment when implementing our suggestions. 
                    What works for one person or industry may not work for another.
                  </p>
                </div>
              </div>
            </section>

            {/* Data and Privacy */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Data and Privacy
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  We handle your data according to our Privacy Policy. Your resume content is processed by our AI systems 
                  to provide analysis and is stored securely. We do not share your personal information with third parties.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  If you have questions about this legal information, please contact us at{' '}
                  <a href="mailto:rsmchckrspprt@gmail.com" className="text-blue-600 hover:underline">
                    rsmchckrspprt@gmail.com
                  </a>
                </p>
              </div>
            </section>

            {/* Updates */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Updates to Legal Information
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  We may update this legal information from time to time. We will notify users of significant changes 
                  through our website or email. Continued use of our service constitutes acceptance of updated terms.
                </p>
              </div>
            </section>

            {/* Pricing and Payment Information */}
            <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                💰 Pricing and Payment Information
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
                  <strong>Payment Processing:</strong> All payments are processed securely through PayPal. Prices are in Indian Rupees (₹).
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

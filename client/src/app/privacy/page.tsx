import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              How we protect and handle your personal information
            </p>
          </div>

          <div className="space-y-6">
            {/* Information Collection */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Personal Information
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Email address and account details</li>
                    <li>• Resume content and files you upload</li>
                    <li>• Usage data and preferences</li>
                    <li>• Communication history with our support team</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Technical Information
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• IP address and device information</li>
                    <li>• Browser type and version</li>
                    <li>• Pages visited and time spent</li>
                    <li>• Error logs and performance data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Service Provision
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Process and analyze your resume</li>
                    <li>• Provide AI-powered suggestions</li>
                    <li>• Generate ATS scores and insights</li>
                    <li>• Deliver career guidance and recommendations</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Service Improvement
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Enhance our AI algorithms</li>
                    <li>• Improve user experience</li>
                    <li>• Develop new features</li>
                    <li>• Fix technical issues</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Communication
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Send important service updates</li>
                    <li>• Respond to support requests</li>
                    <li>• Provide account notifications</li>
                    <li>• Share relevant career tips</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Information Sharing
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    We Do Not Sell Your Data
                  </h3>
                  <p className="text-sm text-gray-600">
                    We never sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Limited Sharing
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Service providers who help us operate (hosting, analytics)</li>
                    <li>• Legal requirements or law enforcement requests</li>
                    <li>• Business transfers (if we're acquired or merged)</li>
                    <li>• With your explicit consent</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Data Security
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Security Measures
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Industry-standard encryption for data transmission</li>
                    <li>• Secure data centers with physical security</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Access controls and authentication</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Data Retention
                  </h3>
                  <p className="text-sm text-gray-600">
                    We retain your data only as long as necessary to provide our services. 
                    Resume content is automatically deleted after 12 months of inactivity.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Rights and Choices
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Access and Control
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• View and download your data</li>
                    <li>• Update or correct information</li>
                    <li>• Delete your account and data</li>
                    <li>• Opt out of marketing communications</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Cookie Preferences
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can control cookie settings through your browser. Some features may not work 
                    properly if you disable certain cookies.
                  </p>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Children's Privacy
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  Our service is not intended for children under 13. We do not knowingly collect 
                  personal information from children under 13. If you believe we have collected 
                  such information, please contact us immediately.
                </p>
              </div>
            </section>

            {/* International Transfers */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                International Data Transfers
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  Your data may be processed in countries other than your own. We ensure appropriate 
                  safeguards are in place to protect your information according to this privacy policy.
                </p>
              </div>
            </section>

            {/* Policy Changes */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Changes to This Policy
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  We may update this privacy policy from time to time. We will notify you of any 
                  significant changes through our website or email. Your continued use of our service 
                  constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600">
                  If you have questions about this privacy policy or our data practices, please contact us at{' '}
                  <a href="mailto:privacy@resumecheck.com" className="text-blue-600 hover:underline">
                    privacy@resumecheck.com
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

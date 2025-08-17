"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto mobile-px mobile-py">
        <div className="mobile-grid mobile-grid-cols-1 sm:mobile-grid-cols-2 lg:mobile-grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <h3 className="mobile-text-lg font-semibold text-gray-900 dark:text-white">ResumeCheck</h3>
            <p className="mt-2 mobile-text-base text-gray-600 dark:text-gray-400">
              AI-powered resume analysis and career guidance tool.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="mobile-text-base font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="mt-2 mobile-space-y-sm text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="mobile-text-base font-semibold text-gray-900 dark:text-white">Legal</h4>
            <ul className="mt-2 mobile-space-y-sm text-sm">
              <li>
                <Link
                  href="/legal"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Legal Info
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="mobile-text-base font-semibold text-gray-900 dark:text-white">Contact</h4>
            <p className="mt-2 mobile-text-base text-gray-600 dark:text-gray-400">
              Have questions? Contact us at
              <Link
                href="mailto:rsmchckrspprt@gmail.com"
                className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
              >
                rsmchckrspprt@gmail.com
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center mobile-text-base text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ResumeCheck. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

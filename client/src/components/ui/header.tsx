"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { ServerStatus } from "./server-status";
import { Logo } from "./logo";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Logo />
          <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            ResumeCheck
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            FAQ
          </Link>
        </nav>

        {/* Right Side - Server Status and Theme Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <ServerStatus />
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {/* Mobile Navigation Links */}
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              About
            </Link>
            <Link
              href="/pricing"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/support"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Support
            </Link>
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Get started with your resume
              </div>
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="btn-mobile-primary text-sm"
              >
                Start Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm dark:shadow-gray-900/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Logo />
          <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            ResumeCheck
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm dark:hover:shadow-gray-900/20"
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm dark:hover:shadow-gray-900/20"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:shadow-sm dark:hover:shadow-gray-900/20"
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
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:shadow-sm dark:hover:shadow-gray-900/20"
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
        <div className="md:hidden border-t border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg dark:shadow-gray-900/30">
          <div className="px-4 py-2 space-y-1">
            {/* Mobile Navigation Links */}
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-200 hover:shadow-sm dark:hover:shadow-gray-900/20"
            >
              About
            </Link>
            <Link
              href="/pricing"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-200 hover:shadow-sm dark:hover:shadow-gray-900/20"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              onClick={closeMobileMenu}
              className="block px-3 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-lg transition-all duration-200 hover:shadow-sm dark:hover:shadow-gray-900/20"
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

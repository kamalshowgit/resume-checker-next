"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { ServerStatus } from "./server-status";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            ResumeCheck
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ServerStatus />
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              FAQ
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

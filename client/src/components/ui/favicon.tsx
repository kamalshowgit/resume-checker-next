import React from "react";

export function Favicon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="w-8 h-8"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="16" cy="16" r="16" fill="url(#faviconGradient)" />
      
      {/* Main checkmark symbol */}
      <path
        d="M8 16L13 21L24 10"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Mathematical optimization arrows */}
      <path
        d="M6 8L10 12M26 24L22 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      
      {/* Small mathematical dots representing data points */}
      <circle cx="16" cy="8" r="1.5" fill="white" opacity="0.8" />
      <circle cx="24" cy="16" r="1.5" fill="white" opacity="0.8" />
      <circle cx="8" cy="24" r="1.5" fill="white" opacity="0.8" />
    </svg>
  );
}

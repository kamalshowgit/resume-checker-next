import React from "react";

export function Logo() {
  return (
    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main checkmark symbol */}
        <path
          d="M6 12L10 16L18 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        />
        
        {/* Mathematical optimization arrows */}
        <path
          d="M4 6L8 10M20 18L16 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-200"
        />
        
        {/* Small mathematical dots representing data points */}
        <circle cx="12" cy="6" r="1" fill="currentColor" className="text-blue-200" />
        <circle cx="18" cy="12" r="1" fill="currentColor" className="text-blue-200" />
        <circle cx="6" cy="18" r="1" fill="currentColor" className="text-blue-200" />
      </svg>
    </div>
  );
}

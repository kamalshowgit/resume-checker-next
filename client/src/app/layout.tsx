import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ui/theme-provider';
import { Header } from '../components/ui/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'ResumeCheck - AI Resume Analysis & Career Guidance',
    template: '%s | ResumeCheck'
  },
  description: 'Professional AI-powered resume analysis tool with section-by-section scoring, ATS optimization, and personalized career guidance. Get detailed feedback and suggestions to improve your resume.',
  keywords: [
    'resume analysis',
    'AI resume checker',
    'ATS optimization',
    'resume scoring',
    'career guidance',
    'resume optimization',
    'job application',
    'professional development',
    'resume writing',
    'career advice'
  ],
  authors: [{ name: 'ResumeCheck Team' }],
  creator: 'ResumeCheck',
  publisher: 'ResumeCheck',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://resumecheck.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resumecheck.com',
    siteName: 'ResumeCheck',
    title: 'ResumeCheck - AI Resume Analysis & Career Guidance',
    description: 'Professional AI-powered resume analysis tool with section-by-section scoring, ATS optimization, and personalized career guidance.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ResumeCheck - AI Resume Analysis Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeCheck - AI Resume Analysis & Career Guidance',
    description: 'Professional AI-powered resume analysis tool with section-by-section scoring, ATS optimization, and personalized career guidance.',
    images: ['/og-image.jpg'],
    creator: '@resumecheck',
    site: '@resumecheck',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "ResumeCheck",
              "description": "AI-powered resume analysis and optimization tool",
              "url": "https://resumecheck.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "ResumeCheck"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

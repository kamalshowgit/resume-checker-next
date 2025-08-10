import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ui/theme-provider';
import { Header } from '../components/ui/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ResumeCheck - AI Resume Analysis & Career Guidance',
  description: 'Professional resume analysis tool with AI-powered suggestions and career guidance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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

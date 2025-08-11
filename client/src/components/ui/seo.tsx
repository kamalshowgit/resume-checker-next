import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  ogSiteName?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCreator?: string;
  twitterSite?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  author = 'ResumeCheck',
  robots = 'index, follow',
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogUrl,
  ogImage = 'https://resumecheck.com/og-image.jpg',
  ogSiteName = 'ResumeCheck',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage = 'https://resumecheck.com/og-image.jpg',
  twitterCreator = '@resumecheck',
  twitterSite = '@resumecheck',
  canonicalUrl,
  structuredData,
  breadcrumbs = [],
}) => {
  const baseUrl = 'https://resumecheck.com';
  const fullTitle = title.includes('ResumeCheck') ? title : `${title} | ResumeCheck`;
  
  // Default values
  const finalOgTitle = ogTitle || fullTitle;
  const finalOgDescription = ogDescription || description;
  const finalOgUrl = ogUrl || canonicalUrl || baseUrl;
  const finalTwitterTitle = twitterTitle || fullTitle;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;

  // Generate breadcrumb structured data
  const breadcrumbData = breadcrumbs.length > 0 ? {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // Default structured data if none provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": fullTitle,
    "description": description,
    "url": finalOgUrl,
    "publisher": {
      "@type": "Organization",
      "name": "ResumeCheck",
      "url": baseUrl
    }
  };

  // Merge breadcrumbs if available
  if (breadcrumbData) {
    defaultStructuredData.breadcrumb = breadcrumbData;
  }

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content={ogSiteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:site" content={twitterSite} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
    </Head>
  );
};

export default SEO;

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://resumecheck.com/sitemap.xml

# Disallow admin and API routes
Disallow: /api/admin/
Disallow: /api/payment/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /
Allow: /about
Allow: /pricing
Allow: /contact
Allow: /faq
Allow: /support
Allow: /privacy
Allow: /terms
Allow: /legal

# Crawl delay (optional)
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

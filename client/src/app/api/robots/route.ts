import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://resumecheck.com/sitemap.xml

# Disallow admin and API routes
Disallow: /admin
Disallow: /api/admin
Disallow: /api/payment
Disallow: /api/chat

# Allow public routes
Allow: /
Allow: /about
Allow: /contact
Allow: /faq
Allow: /pricing
Allow: /privacy
Allow: /terms
Allow: /support
Allow: /legal`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

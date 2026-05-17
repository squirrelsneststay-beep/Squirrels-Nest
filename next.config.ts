import type { NextConfig } from "next";

/**
 * Security headers — defends against common web vulns (clickjacking, MIME
 * sniffing, XSS reflection, leaky referrers). CSP is intentionally permissive
 * enough to allow Google Fonts + Next.js dev/HMR. Tighten before production
 * if anything beyond static fonts gets added.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    // CSP — tightened: next/font/google self-hosts fonts at build time, so
    // we don't need to allow fonts.googleapis.com or fonts.gstatic.com at all.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: blob:",
      "media-src 'self' blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // NOTE: this is the Next.js `headers()` CONFIG hook, which returns route
  // header definitions. It is NOT `headers()` from `next/headers` (which
  // reads incoming request headers and became async in Next 15+). The two
  // are unrelated; this signature is correct for next.config.
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
};

export default nextConfig;

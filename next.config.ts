import type { NextConfig } from "next";

/**
 * Security headers — defends against clickjacking, MIME sniffing, XSS
 * reflection, leaky referrers. CSP is split prod vs dev: dev keeps
 * 'unsafe-eval' so Turbopack/HMR work; prod drops it so injected script
 * strings cannot execute even if XSS slips through.
 */
const isProd = process.env.NODE_ENV === "production";

const scriptSrc = isProd
  ? "script-src 'self' 'unsafe-inline'"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
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

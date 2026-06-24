import type { NextConfig } from "next";

/**
 * Security headers — defends against clickjacking, MIME sniffing, XSS
 * reflection, leaky referrers. CSP is split prod vs dev: dev keeps
 * 'unsafe-eval' so Turbopack/HMR work; prod drops it so injected script
 * strings cannot execute even if XSS slips through.
 */
const isProd = process.env.NODE_ENV === "production";

// script-src policy (documented tradeoff):
// This is a STATICALLY prerendered App Router site. Next.js/React stream the
// page as several inline `self.__next_f.push(...)` hydration scripts whose
// contents are page- and content-specific, so they change on every page and
// every copy edit — they cannot be hash-pinned, and a nonce-based policy would
// force every page into dynamic rendering (no CDN caching, higher cost) per the
// Next.js CSP guide. So 'unsafe-inline' is required for those framework scripts
// (and for the one static no-flash theme setter in app/layout.tsx).
//
// CRITICAL: do NOT add a script hash/nonce here. Per the CSP spec, as soon as a
// hash or nonce appears in script-src, 'unsafe-inline' is IGNORED — which would
// block every un-hashed framework hydration script and break the site (the
// `self.__next_r` invariant + dead interactivity). Hash + 'unsafe-inline' is not
// "defense in depth"; it silently disables 'unsafe-inline'. In dev,
// Turbopack/React HMR also need 'unsafe-eval'.
const scriptSrc = isProd
  ? `script-src 'self' 'unsafe-inline'`
  : `script-src 'self' 'unsafe-inline' 'unsafe-eval'`;

const cspDirectives = [
  "default-src 'self'",
  scriptSrc,
  // styled-jsx + inline style={{…}} + GSAP-set styles all emit inline styles;
  // there is no hash/nonce path that survives static rendering, so
  // 'unsafe-inline' for STYLES is an accepted tradeoff (style-based attacks
  // are far lower impact than script injection, which we constrain above).
  "style-src 'self' 'unsafe-inline'",
  // Fonts are self-hosted woff2 from /_next/static — 'self' covers them.
  // No data: font URIs exist in the codebase, so it is omitted (least-priv).
  "font-src 'self'",
  // next/image serves optimised images same-origin from /_next/image.
  // data: kept for small inline SVG/icons; no blob: image usage exists.
  "img-src 'self' data:",
  // No <audio>/<video>, Worker, or blob: usage anywhere in app code or in
  // GSAP/Lenis — lock both down to 'self'.
  "media-src 'self'",
  "worker-src 'self'",
  "connect-src 'self'",
  // No <object>/<embed>/<applet> — kill the legacy plugin vector outright.
  "object-src 'none'",
  // The Location section embeds an OpenStreetMap area map; allow only that.
  "frame-src 'self' https://www.openstreetmap.org",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
];

// Only upgrade http→https in production. On localhost dev (http) this would
// try to upgrade asset/HMR requests to a non-existent https origin and break
// the dev server.
if (isProd) cspDirectives.push("upgrade-insecure-requests");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()" },
  // 2-year max-age + preload, ready for HSTS preload-list submission once the
  // custom domain is live on Vercel (Vercel terminates TLS for us). Only submit
  // to hstspreload.org AFTER every subdomain is confirmed HTTPS-only.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: cspDirectives.join("; "),
  },
];

const nextConfig: NextConfig = {
  // Pin the workspace/file-tracing root to THIS project. A stray
  // package-lock.json in the home directory made Next.js infer the wrong root,
  // which can over-include files in the serverless output trace on Vercel.
  // `turbopack.root` silences the build-time warning; `outputFileTracingRoot`
  // fixes the production server / Vercel output tracer. Both point here.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
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

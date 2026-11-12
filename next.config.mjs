const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * This site is statically prerendered, so there is no request-time hook in
 * which to mint a per-response nonce (that would require middleware, which
 * forces dynamic rendering). Next.js inlines its hydration payload as a
 * <script>, so script-src needs 'unsafe-inline' for the page to boot.
 * See the README security notes for the strict-nonce alternative.
 *
 * Inline style attributes are used deliberately by the motion system
 * (pointer/tilt/stagger values written as CSS custom properties), so
 * style-src also needs 'unsafe-inline'.
 */
const csp = [
  "default-src 'self'",
  // 'unsafe-eval' is required by React Refresh in dev only.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  // next/font self-hosts Google Fonts at build time — no external font origin.
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Belt-and-braces with frame-ancestors for older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Modern guidance: disable the legacy XSS auditor rather than enable it.
  { key: "X-XSS-Protection", value: "0" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "camera=()",
      "display-capture=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // Don't leak visited-link hints to third-party DNS resolvers.
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

// HSTS is meaningless (and harmful to local dev) over plain HTTP.
if (!isDev) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't advertise the framework/version to scanners.
  poweredByHeader: false,

  images: {
    // SVG is NOT enabled: the image optimizer can be driven to execute
    // script-bearing SVGs, and this site only ships a local JPEG.
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // No remotePatterns => the optimizer will not fetch arbitrary remote
    // hosts, which closes the SSRF/DoS surface on the image endpoint.
    remotePatterns: [],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

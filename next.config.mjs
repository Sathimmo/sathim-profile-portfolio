const isDev = process.env.NODE_ENV === "development";

/**
 * Where the RAGStudio chat widget is served from.
 *
 * The embed snippet loads <origin>/widget.js, and that script opens
 * <origin>/w/<widgetKey> in an iframe, so this origin has to be allowed in
 * both script-src and frame-src below. Set NEXT_PUBLIC_RAGSTUDIO_ORIGIN in
 * Vercel to the deployed RAGStudio URL; the default is the local dev server.
 */
const ragstudio =
  process.env.NEXT_PUBLIC_RAGSTUDIO_ORIGIN || "http://localhost:3000";

/*
 * A localhost/http origin in a production build means the widget will be dead
 * for every real visitor (there is no such host on their machine, and
 * upgrade-insecure-requests rewrites http:// anyway). Fail loudly at build
 * time rather than shipping a silently broken widget.
 */
if (!isDev && /^http:\/\/|localhost|127\.0\.0\.1/.test(ragstudio)) {
  console.warn(
    `\n[security] NEXT_PUBLIC_RAGSTUDIO_ORIGIN is "${ragstudio}" in a production build.\n` +
      `           The chat widget will not load for visitors. Set it to the deployed\n` +
      `           RAGStudio https:// URL in your Vercel project settings.\n`
  );
}

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
  `script-src 'self' 'unsafe-inline' ${ragstudio}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  // The widget origin is allowed for its own avatar/logo assets.
  `img-src 'self' data: blob: ${ragstudio}`,
  // next/font self-hosts Google Fonts at build time — no external font origin.
  "font-src 'self' data:",
  // widget.js runs in OUR document, so its API calls are governed by our
  // connect-src. Without the widget origin here the chat silently fails to
  // send. (Traffic inside the iframe is covered by RAGStudio's own policy.)
  `connect-src 'self' ${ragstudio}${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // The chat panel is an iframe on the RAGStudio origin. Nothing else may be framed.
  `frame-src ${ragstudio}`,
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

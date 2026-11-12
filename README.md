# Mork Sathim — Portfolio

Next.js 16 / React 19 portfolio site with a dependency-free motion layer.

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint (flat config)
```

> `next lint` was removed in Next 16 — the `lint` script calls `eslint` directly
> and the config lives in `eslint.config.mjs` (ESLint 9 flat config).

## Motion system

Animation uses CSS keyframes plus three small client primitives — no animation
library. See `components/ui/Reveal.tsx` (scroll reveal), `SpotlightCard.tsx`
(pointer spotlight + 3D tilt) and `MagneticLink.tsx`.

Pointer effects write CSS custom properties instead of React state, so they run
on the compositor without re-rendering. Every effect is disabled under
`prefers-reduced-motion`, read via `lib/usePrefersReducedMotion.ts`.

Reveal elements start at `opacity: 0` and are shown by JavaScript, so
`app/layout.tsx` carries a `<noscript>` rule that forces them visible.

## Security

### Response headers

Set in `next.config.mjs` and applied to every route:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | see below |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (production only) |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `X-XSS-Protection` | `0` (disables the legacy auditor, per current guidance) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation, payment, USB, sensors all denied |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |
| `X-DNS-Prefetch-Control` | `off` |

`poweredByHeader` is disabled so the framework version isn't advertised.

**These headers require a Next.js server** (`next start`, Vercel, or any Node
host). They are ignored by `output: 'export'` and by static hosts such as
GitHub Pages — those need the equivalent policy configured at the CDN/host.

### Content Security Policy

```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self';
object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';
frame-src 'none'; manifest-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests
```

Known weakness: `script-src` includes `'unsafe-inline'`. This page is
statically prerendered, and Next.js inlines its hydration payload as a
`<script>`, so without `'unsafe-inline'` the page will not hydrate. Removing it
requires minting a per-request nonce in `middleware.ts` and reading it via
`headers()`, which forces the route to render dynamically — a real tradeoff
against static delivery for a site with no user input, no forms, no
authentication and no third-party scripts.

`style-src` needs `'unsafe-inline'` because the motion system sets inline
style attributes (pointer/tilt/stagger values as CSS custom properties).

Fonts are self-hosted by `next/font` at build time, so no external origin is
needed. `'unsafe-eval'` and `ws:` are added in development only, for React
Refresh and HMR.

### Image optimization

`dangerouslyAllowSVG` is explicitly **off**. SVGs can carry script, and the
Next.js image optimizer has had RCE advisories involving SVG handling. The site
ships a single local JPEG, so there is no reason to enable it.

`remotePatterns` is empty, so the optimizer will not fetch arbitrary remote
hosts — this closes the SSRF and DoS surface on the image endpoint. Optimizer
responses are additionally served with `Content-Disposition: attachment` and
their own sandboxed CSP.

### Dependencies

Production dependencies report **0 known vulnerabilities** (`npm audit --omit=dev`).

Next.js was upgraded 14.2.0 → 16.4.6 (with React 18 → 19). The entire Next 14
line is affected by unpatched critical advisories, including RCE in the image
optimization API; the fixes only exist in 16.x.

Residual, accepted: a moderate ReDoS in `minimatch`, reached only through
`@typescript-eslint` via `eslint-config-next`. It is dev-only linter tooling,
is never shipped to visitors, and cannot be resolved without downgrading or
replacing the Next ESLint config. Re-check with `npm audit --omit=dev` before
each deploy.

### Other notes

- All external links use `rel="noopener noreferrer"` with `target="_blank"`.
- No secrets are tracked in git; `.env*.local` and `*.pem` are gitignored.
- There is no user input, form, database, API route, middleware or Server
  Action in this app — the server-side attack surface is essentially the static
  file handler and the image optimizer.

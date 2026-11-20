import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AmbientBackground from "@/components/ui/AmbientBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";

/**
 * RAGStudio chat widget.
 *
 * The origin MUST come from the same env var the CSP in next.config.mjs reads,
 * otherwise the policy allows one host while the tag loads another and the
 * widget is blocked. Set NEXT_PUBLIC_RAGSTUDIO_ORIGIN in Vercel to the
 * deployed RAGStudio URL; the default below only works on a dev machine.
 *
 * The token is a publishable embed key — it is visible in the page source to
 * every visitor by design — but it is read from the env so it can be rotated
 * without a code change.
 */
const ragstudioOrigin =
  process.env.NEXT_PUBLIC_RAGSTUDIO_ORIGIN || "http://localhost:3000";
const ragstudioToken =
  process.env.NEXT_PUBLIC_RAGSTUDIO_TOKEN ||
  "f_Scf86BO5ziH1Wuy6QD98fU3Nsm2jrLqwBWqW2aucQ";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Mork Sathim — Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in Spring Boot, Next.js, microservices, and native iOS apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Scroll reveals start hidden and are shown by JS. Without JS, show everything. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className}`}>
        <AmbientBackground />
        <ScrollProgress />
        <Navbar />
        {children}
        {/* lazyOnload: the widget is non-critical, so it loads during idle
            time instead of competing with the hero image and fonts. */}
        {/* <Script
          src={`${ragstudioOrigin}/widget.js`}
          data-ragstudio-token={ragstudioToken}
          strategy="lazyOnload"
        /> */}
        <script src="https://ragstudio.kshrd.app/widget.js" data-ragstudio-token="oPZ1wQK6-32eu2rcsn4lDANh7ENnHiGh_kJnr8kWj18" async></script>
      </body>
    </html>
  );
}

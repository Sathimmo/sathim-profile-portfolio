import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/ui/AmbientBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";

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
        <script src="http://localhost:3000/widget.js" data-ragstudio-token="f_Scf86BO5ziH1Wuy6QD98fU3Nsm2jrLqwBWqW2aucQ" async></script></body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-5">
      {/*
        Five labels do not fit a 320px viewport, so the pill is allowed to
        scroll horizontally rather than overflow the screen. On wider screens
        it shrinks to fit its content and the scrolling never engages.
      */}
      <nav
        className={`no-scrollbar pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border px-1.5 py-1.5 transition-colors duration-500 ease-smooth sm:gap-1 sm:px-2 ${
          scrolled
            ? "border-border bg-canvas-elevated/80 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] glass"
            : "border-transparent bg-transparent"
        }`}
      >
        {links.map((link) => {
          const isActive = active === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-colors duration-300 sm:px-4 sm:text-[13px] ${
                isActive ? "text-canvas" : "text-ink-muted hover:text-ink"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 -z-10 rounded-full bg-accent shadow-[0_0_20px_-4px_rgba(52,211,153,0.8)] animate-scale-in" />
              )}
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

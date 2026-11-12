"use client";

import { useEffect, useRef } from "react";

/** Thin gradient bar pinned to the top of the viewport that tracks read progress. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const node = ref.current;
      if (node) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        node.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent-dark via-accent to-accent-muted shadow-[0_0_12px_rgba(52,211,153,0.6)]"
      />
    </div>
  );
}

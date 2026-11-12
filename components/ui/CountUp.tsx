"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type CountUpProps = {
  /** Raw display value such as "2+", "4" or "100%". Non-digits are preserved. */
  value: string;
  duration?: number;
  className?: string;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({ value, duration = 1600, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const target = Number(value.match(/\d+/)?.[0] ?? NaN);
  const animatable = !reducedMotion && Number.isFinite(target);

  // Derive the label during render so no effect has to seed it.
  const display = animatable ? value.replace(/\d+/, String(count)) : value;

  useEffect(() => {
    const node = ref.current;
    if (!node || !animatable) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(easeOut(progress) * target));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [animatable, target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

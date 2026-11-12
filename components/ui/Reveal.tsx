"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  /** Entrance direction of the element. */
  direction?: Direction;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Start slightly scaled down for a "pop" entrance. */
  scale?: boolean;
  /** Replay the animation every time the element re-enters the viewport. */
  repeat?: boolean;
  as?: ElementType;
  className?: string;
  id?: string;
};

const offsets: Record<Direction, { x: string; y: string }> = {
  up: { x: "0", y: "28px" },
  down: { x: "0", y: "-28px" },
  left: { x: "34px", y: "0" },
  right: { x: "-34px", y: "0" },
  none: { x: "0", y: "0" },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  scale = false,
  repeat = false,
  as: Tag = "div",
  className = "",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Reduced motion skips the animation entirely and renders the final state.
  const visible = reducedMotion || inView;

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.unobserve(entry.target);
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [repeat, reducedMotion]);

  const { x, y } = offsets[direction];

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={visible ? "visible" : "hidden"}
      className={className}
      style={{
        "--reveal-x": x,
        "--reveal-y": y,
        "--reveal-delay": `${delay}ms`,
        "--reveal-scale": scale ? "0.94" : "1",
      } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

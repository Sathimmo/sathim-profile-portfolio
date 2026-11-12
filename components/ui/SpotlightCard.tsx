"use client";

import { useRef, type ElementType, type ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Maximum 3D tilt in degrees. Set to 0 to disable tilt and keep only the spotlight. */
  tilt?: number;
  [key: string]: unknown;
};

/**
 * Card wrapper that tracks the pointer to drive a radial spotlight
 * and a subtle 3D tilt. All visuals live in the `.card-fx` CSS class,
 * so this component only writes custom properties — no re-renders.
 */
export default function SpotlightCard({
  children,
  as: Tag = "div",
  className = "",
  tilt = 5,
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  };

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;

    // Touch and pen have no hover state: a tap would otherwise leave the card
    // tilted until the next interaction. Keep those devices flat.
    if (event.pointerType !== "mouse") return;

    if (frame.current) cancelAnimationFrame(frame.current);

    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      const rect = node.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      node.style.setProperty("--mx", `${px * 100}%`);
      node.style.setProperty("--my", `${py * 100}%`);

      if (tilt > 0) {
        node.style.setProperty("--ry", `${(px - 0.5) * 2 * tilt}deg`);
        node.style.setProperty("--rx", `${(0.5 - py) * 2 * tilt}deg`);
      }
    });
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onPointerUp={reset}
      className={`card-fx ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

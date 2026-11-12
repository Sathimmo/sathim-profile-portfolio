"use client";

import { useRef, type ReactNode } from "react";

type MagneticLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  /** Pull strength toward the cursor, in pixels. 0 disables the magnetic effect. */
  magnetic?: number;
};

/**
 * Anchor that drifts toward the pointer. Receives already-rendered children,
 * so server components can keep owning the icon/label markup.
 */
export default function MagneticLink({
  children,
  href,
  className = "",
  target,
  rel,
  magnetic = 5,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node || magnetic === 0) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--tx", `${x * magnetic * 2}px`);
    node.style.setProperty("--ty", `${y * magnetic * 2}px`);
    node.style.setProperty("--scale", "1.04");
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tx", "0px");
    node.style.setProperty("--ty", "0px");
    node.style.setProperty("--scale", "1");
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={className}
    >
      {children}
    </a>
  );
}

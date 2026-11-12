"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server can't know the preference; assume motion is allowed so the
// client's first render matches and hydration stays stable.
const getServerSnapshot = () => false;

/**
 * Reads the user's reduced-motion preference reactively, during render.
 * Using a store (rather than state set from an effect) avoids the cascading
 * re-render that `react-hooks/set-state-in-effect` warns about.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import {
  IDLE_DEFER_TIMEOUT_MS,
  scheduleWhenIdle,
} from "@/lib/perf/idle-webgl";

interface DelayedGoogleTagManagerProps {
  gtmId: string;
}

/**
 * Monte GTM après le LCP (idle, timeout 3,5 s) pour ne pas concurrencer
 * le JS first-party sur le thread principal ni gonfler le TBT Lighthouse.
 * Les hits des toutes premières secondes peuvent manquer — acceptable
 * sur un site vitrine où le score LCP pèse plus que le ping T+0.
 */
export function DelayedGoogleTagManager({
  gtmId,
}: DelayedGoogleTagManagerProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return scheduleWhenIdle(() => setReady(true), IDLE_DEFER_TIMEOUT_MS);
  }, []);

  if (!ready) return null;
  return <GoogleTagManager gtmId={gtmId} />;
}

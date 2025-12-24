"use client";

import { useEffect, useRef, useState } from "react";

type SessionState = "ok" | "expired";

export function useSessionWatcher(opts?: { intervalMs?: number; enabled?: boolean }) {
  const intervalMs = opts?.intervalMs ?? 30_000;
  const enabled = opts?.enabled ?? true;

  const [state, setState] = useState<SessionState>("ok");
  const runningRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (runningRef.current) return;
    runningRef.current = true;

    let stopped = false;
    let timer: number | null = null;

    const check = async () => {
      try {
        const res = await fetch("/api/session/status", { cache: "no-store" });
        const json = (await res.json()) as { valid?: boolean };

        if (stopped) return;

        if (json.valid === false) {
          setState("expired");
          // stop polling once expired (avoid spam)
          if (timer) window.clearInterval(timer);
          timer = null;
        } else {
          setState("ok");
        }
      } catch {

      }
    };

    check();
    timer = window.setInterval(check, intervalMs);

    return () => {
      stopped = true;
      if (timer) window.clearInterval(timer);
      runningRef.current = false;
    };
  }, [enabled, intervalMs]);

  return { state, isExpired: state === "expired" };
}

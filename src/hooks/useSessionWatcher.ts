"use client";

import { useAppContext } from "@/app/provider";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type SessionState = "ok" | "expired";

const API_BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE! + process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL!;


export function useSessionWatcher(opts?: { intervalMs?: number; enabled?: boolean }) {
  const { setSessionDialogStatus, isLogout } = useAppContext();
  const intervalMs = opts?.intervalMs ?? 20000;
  const enabled = opts?.enabled ?? true;

  const [state, setState] = useState<SessionState>("ok");
  const runningRef = useRef(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!enabled) return;
    if (runningRef.current) return;
    runningRef.current = true;

    let stopped = false;
    let timer: number | null = null;


    const isHome = pathname === "/";

    const check = async () => {
      try {
        const res = await fetch(API_BASE_ENDPOINT + "/session", { cache: "no-store", credentials: "include" });
        const json = (await res.json());

        if (stopped) return;

        if (json.statusCode === 401 && !isLogout && !isHome) {
          setSessionDialogStatus(true);
          setState("expired");
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

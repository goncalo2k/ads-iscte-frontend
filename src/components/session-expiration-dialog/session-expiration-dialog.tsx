"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionWatcher } from "@/hooks/useSessionWatcher";
import { useAppContext } from "@/app/provider";
import "./session-expiration-dialog.css";

export default function SessionExpiredDialog() {
  const router = useRouter();
  const { user, clearContext } = useAppContext();
  const { isExpired } = useSessionWatcher({
    intervalMs: 30_000,
    enabled: !!user,
  });

  const [busy, setBusy] = useState(false);

  const logoutUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
    const path = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL ?? "";
    return `${base}${path}/logout`;
  }, []);

  const clearSession = useCallback(async () => {
    clearContext();
    await fetch(logoutUrl, {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  }, [clearContext, logoutUrl]);

  const onRefresh = useCallback(() => {
    router.replace("/");
  }, [router]);

  const onLogoff = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      await clearSession();
    } finally {
      router.replace("/");
    }
  }, [busy, clearSession, router]);

  if (!isExpired) return null;

  return (
    <div className="session-expired-overlay" role="dialog" aria-modal="true">
      <div
        className="session-expired-backdrop"
        onClick={onRefresh}
      />

      <div
        className="session-expired-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="session-expired-title">Session expired</h3>

        <p className="session-expired-text">
          Your session is no longer valid. You can refresh to sign in again or log off.
        </p>

        <div className="session-expired-actions">
          <button onClick={onLogoff} disabled={busy}>
            {busy ? "Logging off..." : "Log off"}
          </button>
          <button onClick={onRefresh} disabled={busy}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

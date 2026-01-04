"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionWatcher } from "@/hooks/useSessionWatcher";
import { useAppContext } from "@/app/provider";
import "./session-expiration-dialog.css";

export default function SessionExpiredDialog() {
  const router = useRouter();
  const { user, sessionDialogStatus, setSessionDialogStatus, clearContext } = useAppContext();
  const { isExpired } = useSessionWatcher({
    intervalMs: 30_000,
    enabled: !!user,
  });

  const [busy, setBusy] = useState(false);

  const onRefresh = useCallback(async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL}/logout`, {
      method: "GET",
      credentials: "include"
    });

    setSessionDialogStatus(false);

    router.replace("/");
  }, [router]);

  if (!isExpired || !sessionDialogStatus) return null;

  return (
    sessionDialogStatus && <div className="session-expired-overlay" role="dialog" aria-modal="true">
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
          Your session is no longer valid. You must sign in again.
        </p>

        <div className="session-expired-actions">
          <button onClick={onRefresh} disabled={busy}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

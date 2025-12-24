"use client";

import { useSessionWatcher } from "@/hooks/useSessionWatcher";
import { useAppContext } from "@/app/provider";
import { useRouter } from "next/navigation";

export default async function SessionExpiredDialog() {
  const { clearContext } = useAppContext()
  const clearSession = async () => {
    clearContext();
    const bffRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL}/logout`, {
      method: "POST",
      credentials: "include"
    });

  }
  const router = useRouter();
  const { user } = useAppContext();
  const { isExpired } = useSessionWatcher({ intervalMs: 30_000, enabled: !!user });

  if (!isExpired) return null;

  const onRefresh = () => {
    // If your refresh is “go to login” or “silent refresh”, do that here.
    // safest: redirect to your auth start route
    router.replace("/");
  };

  const onLogoff = () => {
    clearSession()


    router.replace("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
      }}
    >
      <div style={{ padding: 20, borderRadius: 12, background: "var(--color-background-2)", border: "1px solid var(--color-background-3)", width: 420 }}>
        <h3 style={{ marginBottom: 8 }}>Session expired</h3>
        <p style={{ marginBottom: 16 }}>
          Your session is no longer valid. You can refresh to sign in again, or log off.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onLogoff}>Log off</button>
          <button onClick={onRefresh}>Refresh</button>
        </div>
      </div>
    </div>
  );
}

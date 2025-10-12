export async function checkSession(): Promise<{ ok: true; user: { id: string; username: string }; exp: number | null } | null> {
    const base = process.env.NEXT_PUBLIC_API_BASE!;
    const res = await fetch(`${base}/auth/github/session`, { credentials: 'include' });
    if (res.status === 401 || !res.ok) return null;
    return res.json();
}

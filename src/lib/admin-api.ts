'use client';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function getAdminSecret(): string | null {
    try {
        return localStorage.getItem('ADMIN_SECRET') ?? null;
    } catch {
        return null;
    }
}
export function setAdminSecret(v: string) {
    try {
        localStorage.setItem('ADMIN_SECRET', v);
    } catch {}
}
export function clearAdminSecret() {
    try {
        localStorage.removeItem('ADMIN_SECRET');
    } catch {}
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, '');

export async function adminFetch<T>(
    path: string,
    opts: {
        method?: Method;
        json?: any;
        formData?: FormData;
        requireSecret?: boolean;
    } = {}
): Promise<T> {
    const method = opts.method ?? 'GET';
    const headers: Record<string, string> = {};
    const body: BodyInit | undefined = opts.formData
        ? opts.formData
        : opts.json
        ? JSON.stringify(opts.json)
        : undefined;

    if (opts.json) headers['Content-Type'] = 'application/json';

    if (opts.requireSecret && method !== 'GET') {
        const secret = getAdminSecret();
        if (!secret) throw new Error('Admin secret is not set');
        headers['x-admin-secret'] = secret; // бэк принимает и Authorization, но так проще
    }

    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body,
        cache: 'no-store',
    });

    const text = await res.text();
    let data: any = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!res.ok) {
        const msg = (data && (data.message || data.error)) || res.statusText;
        throw new Error(Array.isArray(msg) ? msg.join('; ') : String(msg));
    }
    return data as T;
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/admin-api';

type TeamMember = {
    id: string;
    name: string;
    description: string;
    img?: string | null;
};

const API_BASE =
    (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '') || '';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}

export default function TeamListPage() {
    const [items, setItems] = useState<TeamMember[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoad] = useState(true);

    async function load() {
        setLoad(true);
        setError(null);
        try {
            const data = await adminFetch<TeamMember[]>('/team');
            setItems(data.map((t) => ({ ...t, img: norm(t.img) || null })));
        } catch (e: unknown) {
            const err = e as { message?: string };
            setError(err?.message || 'Ошибка загрузки');
        } finally {
            setLoad(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function remove(id: string) {
        if (!confirm('Удалить участника команды?')) return;
        try {
            await adminFetch(`/team/${id}`, {
                method: 'DELETE',
                requireSecret: true,
            });
            await load();
        } catch (e: unknown) {
            const err = e as { message?: string };
            alert(err?.message || 'Ошибка удаления');
        }
    }

    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Команда</h1>
                <Link
                    href="/admin/team/new"
                    className="rounded-xl px-3 py-2 bg-black text-white"
                >
                    Добавить
                </Link>
            </div>

            {loading && <div>Загрузка…</div>}
            {error && <div className="text-red-600">{error}</div>}

            <div className="flex flex-col gap-3">
                {items.map((t) => (
                    <div
                        key={t.id}
                        className="flex sm:items-center gap-3 border p-3 rounded-lg max-sm:flex-col"
                    >
                        <div className="flex gap-3 items-center">
                            <div className="font-semibold text-lg">
                                {t.name}
                            </div>
                        </div>

                        <div className="sm:ml-auto ml-0 flex gap-2 self-end sm:self-auto">
                            <Link
                                href={`/admin/team/${t.id}`}
                                className="underline"
                            >
                                Редактировать
                            </Link>
                            <button
                                onClick={() => remove(t.id)}
                                className="text-red-600 underline"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
                {!loading && items.length === 0 && (
                    <div className="opacity-60">Пусто</div>
                )}
            </div>
        </div>
    );
}

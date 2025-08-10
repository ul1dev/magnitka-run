'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';
import type { Race } from '@/components/home/types';
import Link from 'next/link';

export default function RacesListPage() {
    const [items, setItems] = useState<Race[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoad] = useState(true);

    async function load() {
        setLoad(true);
        setError(null);
        try {
            const data = await adminFetch<Race[]>('/races');
            setItems(data);
        } catch (e: any) {
            setError(e.message || 'Ошибка загрузки');
        } finally {
            setLoad(false);
        }
    }
    useEffect(() => {
        load();
    }, []);

    async function remove(id: string) {
        if (!confirm('Удалить забег?')) return;
        try {
            await adminFetch(`/races/${id}`, {
                method: 'DELETE',
                requireSecret: true,
            });
            await load();
        } catch (e: any) {
            alert(e.message || 'Ошибка удаления');
        }
    }

    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Забеги</h1>
                <Link
                    href="/admin/races/new"
                    className="rounded-xl px-3 py-2 bg-black text-white"
                >
                    Добавить
                </Link>
            </div>

            {loading && <div>Загрузка…</div>}
            {error && <div className="text-red-600">{error}</div>}

            <div className="flex flex-col gap-3">
                {items.map((r) => (
                    <div
                        key={r.id}
                        className="flex sm:items-center gap-3 border p-3 rounded-lg max-sm:flex-col"
                    >
                        <div className="flex gap-3">
                            <div className="font-semibold">{r.title}</div>
                            <div className="opacity-60">{r.date}</div>
                        </div>

                        <div className="ml-auto flex gap-2">
                            <Link
                                href={`/admin/races/${r.id}`}
                                className="underline"
                            >
                                Редактировать
                            </Link>
                            <button
                                onClick={() => remove(r.id)}
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

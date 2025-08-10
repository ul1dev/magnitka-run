'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';
import Link from 'next/link';

type Pacemaker = {
    id: string;
    name: string;
    description: string;
    img?: string | null;
};

export default function PacemakersListPage() {
    const [items, setItems] = useState<Pacemaker[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoad] = useState(true);

    async function load() {
        setLoad(true);
        setError(null);
        try {
            const data = await adminFetch<Pacemaker[]>('/pacemakers');
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
        if (!confirm('Удалить пейсера?')) return;
        try {
            await adminFetch(`/pacemakers/${id}`, {
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
                <h1 className="text-2xl font-bold">Пейсеры</h1>
                <Link
                    href="/admin/pacemakers/new"
                    className="rounded-xl px-3 py-2 bg-black text-white"
                >
                    Добавить
                </Link>
            </div>

            {loading && <div>Загрузка…</div>}
            {error && <div className="text-red-600">{error}</div>}

            <div className="flex flex-col gap-3">
                {items.map((p) => (
                    <div
                        key={p.id}
                        className="flex sm:items-center gap-3 border p-3 rounded-lg max-sm:flex-col"
                    >
                        <div className="flex gap-3 items-center">
                            <div className="font-semibold text-lg truncate max-w-[60ch]">
                                {p.name}
                            </div>
                        </div>

                        <div className="sm:ml-auto ml-0 flex gap-2 self-start sm:self-auto">
                            <Link
                                href={`/admin/pacemakers/${p.id}`}
                                className="underline"
                            >
                                Редактировать
                            </Link>
                            <button
                                onClick={() => remove(p.id)}
                                className="text-red-600 underline disabled:opacity-50"
                                disabled={loading}
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

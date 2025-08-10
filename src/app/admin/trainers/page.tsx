'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';
import Link from 'next/link';
import Image from 'next/image';

type Trainer = {
    id: string;
    name: string;
    description: string;
    img?: string | null;
};

export default function TrainersListPage() {
    const [items, setItems] = useState<Trainer[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoad] = useState(true);

    async function load() {
        setLoad(true);
        setError(null);
        try {
            const data = await adminFetch<Trainer[]>('/trainers');
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
        if (!confirm('Удалить тренера?')) return;
        try {
            await adminFetch(`/trainers/${id}`, {
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
                <h1 className="text-2xl font-bold">Тренеры</h1>
                <Link
                    href="/admin/trainers/new"
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
                            <div className="font-semibold text-lg">{t.name}</div>
                        </div>

                        <div className="sm:ml-auto ml-0 flex gap-2 self-end sm:self-auto">
                            <Link
                                href={`/admin/trainers/${t.id}`}
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

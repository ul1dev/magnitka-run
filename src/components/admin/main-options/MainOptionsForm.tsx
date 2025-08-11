'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';

type MainOptions = {
    regLink: string;
};

export default function MainOptionsForm() {
    const [initial, setInitial] = useState<MainOptions | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saveErr, setSaveErr] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            // публичный GET
            const data = await adminFetch<MainOptions>('/main-options');
            setInitial(data);
        } catch (e: unknown) {
            // если 404 — значит опции ещё не созданы, оставим пустую форму
            const er = e as { message?: string };
            // можно игнорировать, чтобы создать впервые
            setInitial(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        setSaveErr(null);

        const fd = new FormData(e.currentTarget);
        const regLink = String(fd.get('regLink') || '').trim();

        try {
            if (initial) {
                // PATCH защищённый
                await adminFetch('/main-options', {
                    method: 'PATCH',
                    json: { regLink },
                    requireSecret: true,
                });
            } else {
                // POST защищённый (первичное создание)
                await adminFetch('/main-options', {
                    method: 'POST',
                    json: { regLink },
                    requireSecret: true,
                });
            }
            alert('Сохранено');
            await load();
        } catch (e: unknown) {
            const er = e as { message?: string };
            setSaveErr(er?.message || 'Ошибка сохранения');
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div>Загрузка…</div>;
    if (err) return <div className="text-red-600">{err}</div>;

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            {saveErr && <div className="text-red-600">{saveErr}</div>}

            <div className="grid gap-2">
                <label className="text-sm opacity-70">
                    Ссылка на кнопке «Регистрация»*
                </label>
                <input
                    name="regLink"
                    defaultValue={initial?.regLink ?? ''}
                    required
                    className="border rounded-xl px-3 py-2"
                    placeholder="https://..."
                />
            </div>

            <div className="flex gap-3">
                <button
                    disabled={saving}
                    className="rounded-xl px-4 py-2 bg-black text-white disabled:opacity-50 w-full"
                    type="submit"
                >
                    Сохранить
                </button>
            </div>
        </form>
    );
}

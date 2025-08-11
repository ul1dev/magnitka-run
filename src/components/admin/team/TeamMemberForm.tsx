'use client';

import { useState } from 'react';
import { adminFetch } from '@/lib/admin-api';

type TeamMember = {
    id?: string;
    name: string;
    description: string;
    img?: string | null;
};

type Props = {
    initial?: Partial<TeamMember>;
    id?: string; // если редактирование
};

function FileInput({
    name,
    buttonText,
    accept = 'image/*',
    hint,
    onFiles,
}: {
    name: string;
    buttonText: string;
    accept?: string;
    hint?: string;
    onFiles?: (files: FileList | null) => void;
}) {
    const [filesText, setFilesText] = useState('Файл не выбран');

    return (
        <div className="grid gap-1">
            <div className="inline-flex items-center gap-3">
                <label className="relative">
                    <input
                        type="file"
                        name={name}
                        accept={accept}
                        className="sr-only"
                        onChange={(e) => {
                            const fl = e.currentTarget.files;
                            onFiles?.(fl || null);
                            if (!fl || fl.length === 0)
                                setFilesText('Файл не выбран');
                            else setFilesText(fl[0].name);
                        }}
                    />
                    <span className="cursor-pointer inline-block rounded-xl px-3 py-2 bg-black text-white">
                        {buttonText}
                    </span>
                </label>
                <span className="text-sm opacity-70 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60ch]">
                    {filesText}
                </span>
            </div>
            {hint && <div className="text-xs opacity-60">{hint}</div>}
        </div>
    );
}

const API_BASE =
    (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '') || '';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}

export default function TeamMemberForm({ initial, id }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const imgUrl = norm(initial?.img);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formEl = e.currentTarget;
        const fd = new FormData(formEl);

        try {
            if (id) {
                await adminFetch(`/team/${id}`, {
                    method: 'PATCH',
                    formData: fd,
                    requireSecret: true,
                });
            } else {
                await adminFetch(`/team`, {
                    method: 'POST',
                    formData: fd,
                    requireSecret: true,
                });
                formEl.reset();
            }
            alert('Сохранено');
        } catch (err: unknown) {
            const e = err as { message?: string };
            setError(e?.message || 'Ошибка сохранения');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="grid gap-4"
            encType="multipart/form-data"
        >
            {error && <div className="text-red-600">{error}</div>}

            {/* Имя */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Имя*</label>
                <input
                    name="name"
                    defaultValue={initial?.name}
                    className="border rounded-xl px-3 py-2"
                    required
                />
            </div>

            {/* Описание */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Описание*</label>
                <textarea
                    name="description"
                    defaultValue={initial?.description}
                    className="border rounded-xl px-3 py-2 h-28"
                    required
                />
            </div>

            {/* Фото (обязательное на бэке при создании) */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Фото*</label>

                {/* Превью существующего */}
                {imgUrl && (
                    <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imgUrl}
                            alt="Текущее фото"
                            className="w-28 h-28 object-cover rounded-lg border"
                        />
                        <span className="text-sm opacity-60">
                            Если выбрать новый файл, старое изображение будет
                            заменено.
                        </span>
                    </div>
                )}

                <FileInput
                    name="img"
                    buttonText="Выбрать файл"
                    hint={
                        id
                            ? 'Можно оставить пустым, чтобы сохранить текущее фото.'
                            : 'Обязательно выбрать фото при создании.'
                    }
                />
            </div>

            <div className="flex gap-3">
                <button
                    disabled={loading}
                    className="rounded-xl px-4 py-2 bg-black text-white disabled:opacity-50 w-full"
                    type="submit"
                >
                    {id ? 'Сохранить' : 'Создать'}
                </button>
            </div>
        </form>
    );
}

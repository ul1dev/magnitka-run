'use client';

import { useState } from 'react';
import { adminFetch } from '@/lib/admin-api';

type Props = {
    initial?: {
        id?: string;
        name?: string;
        description?: string;
        img?: string | null;
    };
    id?: string; // если редактирование
};

function FileInput({
    name,
    buttonText,
    accept = 'image/*',
    hint,
    onFiles,
    previewUrl, // <- добавили
}: {
    name: string;
    buttonText: string;
    accept?: string;
    hint?: string;
    onFiles?: (files: FileList | null) => void;
    previewUrl?: string | null;
}) {
    const [filesText, setFilesText] = useState('Файл не выбран');

    return (
        <div className="grid gap-2">
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
                <span
                    className="text-sm opacity-70 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60ch]"
                    title={filesText}
                >
                    {filesText}
                </span>
            </div>

            {/* превью текущей картинки */}
            {previewUrl ? (
                <div className="flex items-center gap-3">
                    <img
                        src={previewUrl}
                        alt=""
                        className="h-16 w-16 object-cover rounded-md border"
                    />
                    <span className="text-xs opacity-60">
                        Текущее изображение
                    </span>
                </div>
            ) : null}

            {hint && <div className="text-xs opacity-60">{hint}</div>}
        </div>
    );
}

export default function PacemakerForm({ initial, id }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formEl = e.currentTarget;
        const fd = new FormData(formEl);

        try {
            if (id) {
                await adminFetch(`/pacemakers/${id}`, {
                    method: 'PATCH',
                    formData: fd,
                    requireSecret: true,
                });
            } else {
                await adminFetch(`/pacemakers`, {
                    method: 'POST',
                    formData: fd,
                    requireSecret: true,
                });
                formEl.reset();
            }
            alert('Сохранено');
        } catch (err: any) {
            setError(err.message || 'Ошибка сохранения');
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
                <label className="text-sm opacity-70">Имя пейсера*</label>
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

            {/* Фото */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Фото пейсера</label>
                <FileInput
                    name="img"
                    buttonText="Выбрать файл"
                    previewUrl={initial?.img ?? undefined}
                    hint="При редактировании старая картинка будет удалена и заменена."
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

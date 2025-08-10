'use client';

import { useMemo, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';

type Props = {
    initial?: {
        id?: string;
        article?: string;
        price?: number;
        title?: string;
        info?: string;
        discountProcent?: number | null;
        description?: string | null;
        sizesTitle?: string | null;
        sizes?: { isUnavailable: boolean; value: string }[] | null;
    };
    id?: string; // если редактирование
};

type SizeRow = { value: string; isUnavailable: boolean };

function FileInput({
    name,
    buttonText,
    multiple,
    accept = 'image/*',
    hint,
    onFiles,
}: {
    name: string;
    buttonText: string;
    multiple?: boolean;
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
                        multiple={!!multiple}
                        className="sr-only"
                        onChange={(e) => {
                            const fl = e.currentTarget.files;
                            onFiles?.(fl);
                            if (!fl || fl.length === 0)
                                setFilesText('Файл не выбран');
                            else if (fl.length === 1) setFilesText(fl[0].name);
                            else setFilesText(`${fl.length} файлов выбрано`);
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
            {hint && <div className="text-xs opacity-60">{hint}</div>}
        </div>
    );
}

export default function ShopProductForm({ initial, id }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // размеры
    const initialSizes = useMemo<SizeRow[]>(
        () =>
            (initial?.sizes ?? [])?.map((s) => ({
                value: s?.value ?? '',
                isUnavailable: !!s?.isUnavailable,
            })) ?? [],
        [initial?.sizes]
    );
    const [sizes, setSizes] = useState<SizeRow[]>(
        initialSizes.length ? initialSizes : []
    );

    const addSize = () =>
        setSizes((p) => [...p, { value: '', isUnavailable: false }]);
    const removeSize = (idx: number) =>
        setSizes((p) => p.filter((_, i) => i !== idx));
    const updateSize = (idx: number, patch: Partial<SizeRow>) =>
        setSizes((p) =>
            p.map((row, i) => (i === idx ? { ...row, ...patch } : row))
        );

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formEl = e.currentTarget;
        const fd = new FormData(formEl);

        // если скидка не заполнена — не отправляем её
        const rawDiscount = (fd.get('discountProcent') ?? '').toString().trim();
        if (!rawDiscount) fd.delete('discountProcent');

        // сериализуем размеры в JSON (как ожидает бэкенд DTO)
        fd.set('sizes', JSON.stringify(sizes));

        try {
            if (id) {
                await adminFetch(`/shop/products/${id}`, {
                    method: 'PATCH',
                    formData: fd,
                    requireSecret: true,
                });
            } else {
                await adminFetch(`/shop/products`, {
                    method: 'POST',
                    formData: fd,
                    requireSecret: true,
                });
                formEl.reset();
                setSizes([]);
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

            {/* Артикул */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Артикул*</label>
                <input
                    name="article"
                    defaultValue={initial?.article}
                    className="border rounded-xl px-3 py-2"
                    required
                />
            </div>

            {/* Цена */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Цена, ₽*</label>
                <input
                    name="price"
                    type="number"
                    min={0}
                    step={1}
                    defaultValue={initial?.price ?? 0}
                    className="border rounded-xl px-3 py-2"
                    required
                />
            </div>

            {/* Название */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Название*</label>
                <input
                    name="title"
                    defaultValue={initial?.title}
                    className="border rounded-xl px-3 py-2"
                    required
                />
            </div>

            {/* Краткая информация */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Информация*</label>
                <textarea
                    name="info"
                    defaultValue={initial?.info}
                    className="border rounded-xl px-3 py-2 h-28"
                    required
                />
            </div>

            {/* Описание (детально) */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Описание</label>
                <textarea
                    name="description"
                    defaultValue={initial?.description ?? ''}
                    className="border rounded-xl px-3 py-2 h-28"
                />
            </div>

            {/* Заголовок размеров */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Заголовок размеров</label>
                <input
                    name="sizesTitle"
                    defaultValue={initial?.sizesTitle ?? ''}
                    className="border rounded-xl px-3 py-2"
                    placeholder="Например: Доступные размеры"
                />
            </div>

            {/* Скидка, % */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Скидка, %</label>
                <input
                    name="discountProcent"
                    type="number"
                    min={0}
                    step={1}
                    defaultValue={initial?.discountProcent ?? ''}
                    className="border rounded-xl px-3 py-2"
                    placeholder="Необязательно"
                />
            </div>

            {/* Картинки товара */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">
                    Изображения товара*
                </label>
                <FileInput
                    name="imgs[]"
                    multiple
                    buttonText="Выбрать файлы"
                    hint={
                        id
                            ? 'Если выбрать новые файлы и сохранить, старые картинки будут удалены и заменены.'
                            : 'При создании требуется минимум одна картинка.'
                    }
                />
            </div>

            {/* Размеры (конструктор) */}
            <div className="rounded-2xl border p-4 grid gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Размеры</h3>
                    <button
                        type="button"
                        onClick={addSize}
                        className="rounded-xl px-3 py-2 bg-black text-white"
                    >
                        Добавить размер
                    </button>
                </div>

                {sizes.map((s, idx) => (
                    <div
                        key={idx}
                        className="flex gap-6 max-md:gap-1 max-md:flex-col-reverse border rounded-xl p-3"
                    >
                        <div className="grid gap-3 w-full">
                            <div className="grid gap-2">
                                <label className="text-sm opacity-70">
                                    Значение
                                </label>
                                <input
                                    className="border rounded-xl px-3 py-2"
                                    placeholder="Например: S, M, L или 40, 41..."
                                    value={s.value}
                                    onChange={(e) =>
                                        updateSize(idx, {
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex gap-2">
                                <input
                                    id={`isavailable-${idx}`}
                                    type="checkbox"
                                    className="w-5 h-5 accent-black mx-1"
                                    checked={s.isUnavailable}
                                    onChange={(e) =>
                                        updateSize(idx, {
                                            isUnavailable: e.target.checked,
                                        })
                                    }
                                />
                                <label
                                    className="text-sm opacity-70"
                                    htmlFor={`isavailable-${idx}`}
                                >
                                    Недоступен
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end h-fit">
                            <button
                                type="button"
                                onClick={() => removeSize(idx)}
                                className="px-3 py-2 rounded-xl border text-red-600"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}

                {sizes.length === 0 && (
                    <div className="text-sm opacity-60">Размеры не заданы.</div>
                )}
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

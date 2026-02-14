'use client';

import { useEffect, useRef, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';

const API_BASE =
    (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '') || '';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') && API_BASE ? `${API_BASE}${u}` : u;
}

type GalleryImage = {
    id: string;
    src: string;
    size: number;
    order: number;
};

type MainPageData = {
    id?: string;
    mainBgImg: string | null;
    galleryFirstLineImgs: GalleryImage[] | null;
    gallerySecondLineImgs: GalleryImage[] | null;
    createdAt?: string;
    updatedAt?: string;
};

export default function MainPageForm() {
    const [data, setData] = useState<MainPageData | null>(null);
    const [loading, setLoading] = useState(true);

    /* ---- background image ---- */
    const [bgUploading, setBgUploading] = useState(false);
    const [bgFileName, setBgFileName] = useState('Файл не выбран');
    const bgInputRef = useRef<HTMLInputElement>(null);

    /* ---- gallery uploads ---- */
    const [firstLineUploading, setFirstLineUploading] = useState(false);
    const [secondLineUploading, setSecondLineUploading] = useState(false);
    const [firstLineFileName, setFirstLineFileName] =
        useState('Файл не выбран');
    const [secondLineFileName, setSecondLineFileName] =
        useState('Файл не выбран');
    const firstLineInputRef = useRef<HTMLInputElement>(null);
    const secondLineInputRef = useRef<HTMLInputElement>(null);

    /* =========== load =========== */
    async function load() {
        setLoading(true);
        try {
            const result = await adminFetch<MainPageData>('/main-page');
            setData(result);
        } catch {
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    /* =========== replace bg =========== */
    async function handleBgUpload() {
        const files = bgInputRef.current?.files;
        if (!files || files.length === 0) {
            alert('Выберите файл');
            return;
        }

        setBgUploading(true);
        try {
            const fd = new FormData();
            fd.append('mainBgImg', files[0]);
            const result = await adminFetch<MainPageData>(
                '/main-page/main-bg',
                {
                    method: 'PUT',
                    formData: fd,
                    requireSecret: true,
                },
            );
            setData(result);
            if (bgInputRef.current) bgInputRef.current.value = '';
            setBgFileName('Файл не выбран');
            alert('Фон обновлён');
        } catch (e: unknown) {
            const err = e as { message?: string };
            alert(err?.message || 'Ошибка загрузки');
        } finally {
            setBgUploading(false);
        }
    }

    /* =========== add gallery images =========== */
    async function handleGalleryAdd(line: 'first-line' | 'second-line') {
        const ref =
            line === 'first-line' ? firstLineInputRef : secondLineInputRef;
        const setUploading =
            line === 'first-line'
                ? setFirstLineUploading
                : setSecondLineUploading;
        const setFileName =
            line === 'first-line'
                ? setFirstLineFileName
                : setSecondLineFileName;

        const files = ref.current?.files;
        if (!files || files.length === 0) {
            alert('Выберите файлы');
            return;
        }

        setUploading(true);
        try {
            const fd = new FormData();
            for (let i = 0; i < files.length; i++) {
                fd.append('images[]', files[i]);
            }
            const result = await adminFetch<MainPageData>(
                `/main-page/${line}`,
                {
                    method: 'POST',
                    formData: fd,
                    requireSecret: true,
                },
            );
            setData(result);
            if (ref.current) ref.current.value = '';
            setFileName('Файл не выбран');
            alert('Изображения добавлены');
        } catch (e: unknown) {
            const err = e as { message?: string };
            alert(err?.message || 'Ошибка загрузки');
        } finally {
            setUploading(false);
        }
    }

    /* =========== delete gallery images =========== */
    async function handleGalleryDelete(
        line: 'first-line' | 'second-line',
        ids: string[],
    ) {
        if (!confirm('Удалить изображение?')) return;
        try {
            const result = await adminFetch<MainPageData>(
                `/main-page/${line}`,
                {
                    method: 'DELETE',
                    json: { ids },
                    requireSecret: true,
                },
            );
            setData(result);
        } catch (e: unknown) {
            const err = e as { message?: string };
            alert(err?.message || 'Ошибка удаления');
        }
    }

    /* =========== render =========== */
    if (loading) return <div>Загрузка…</div>;

    const bgUrl = data?.mainBgImg ? norm(data.mainBgImg) : null;
    const firstLine = data?.galleryFirstLineImgs || [];
    const secondLine = data?.gallerySecondLineImgs || [];

    return (
        <div className="grid gap-8">
            {/* ====== Фоновое изображение ====== */}
            <section className="grid gap-4">
                <h2 className="text-lg font-semibold">Фоновое изображение</h2>

                {bgUrl ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={bgUrl}
                            alt=""
                            className="h-32 w-auto max-w-xs object-cover rounded-md border"
                        />
                        <span className="text-xs opacity-60">Текущий фон</span>
                    </div>
                ) : (
                    <div className="text-sm opacity-60">
                        Фон не загружен, используется стандартный.
                    </div>
                )}

                <div className="flex items-center gap-3 flex-wrap">
                    <label className="relative">
                        <input
                            ref={bgInputRef}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => {
                                const fl = e.currentTarget.files;
                                if (!fl || fl.length === 0)
                                    setBgFileName('Файл не выбран');
                                else setBgFileName(fl[0].name);
                            }}
                        />
                        <span className="cursor-pointer inline-block rounded-xl px-3 py-2 bg-black text-white">
                            Выбрать файл
                        </span>
                    </label>

                    <span className="text-sm opacity-70 whitespace-nowrap overflow-hidden text-ellipsis max-w-[40ch]">
                        {bgFileName}
                    </span>

                    <button
                        type="button"
                        onClick={handleBgUpload}
                        disabled={bgUploading}
                        className="rounded-xl px-4 py-2 bg-green-600 text-white disabled:opacity-50"
                    >
                        {bgUploading ? 'Загрузка…' : 'Заменить фон'}
                    </button>
                </div>
            </section>

            <hr />

            {/* ====== Первая линия галереи ====== */}
            <GalleryLineSection
                title="Первая линия галереи"
                images={firstLine}
                inputRef={firstLineInputRef}
                uploading={firstLineUploading}
                fileName={firstLineFileName}
                onFileChange={(name) => setFirstLineFileName(name)}
                onAdd={() => handleGalleryAdd('first-line')}
                onDelete={(ids) => handleGalleryDelete('first-line', ids)}
            />

            <hr />

            {/* ====== Вторая линия галереи ====== */}
            <GalleryLineSection
                title="Вторая линия галереи"
                images={secondLine}
                inputRef={secondLineInputRef}
                uploading={secondLineUploading}
                fileName={secondLineFileName}
                onFileChange={(name) => setSecondLineFileName(name)}
                onAdd={() => handleGalleryAdd('second-line')}
                onDelete={(ids) => handleGalleryDelete('second-line', ids)}
            />
        </div>
    );
}

/* ---------- sub-component ---------- */
function GalleryLineSection({
    title,
    images,
    inputRef,
    uploading,
    fileName,
    onFileChange,
    onAdd,
    onDelete,
}: {
    title: string;
    images: { id: string; src: string; size: number; order: number }[];
    inputRef: React.RefObject<HTMLInputElement | null>;
    uploading: boolean;
    fileName: string;
    onFileChange: (name: string) => void;
    onAdd: () => void;
    onDelete: (ids: string[]) => void;
}) {
    return (
        <section className="grid gap-4">
            <h2 className="text-lg font-semibold">{title}</h2>

            {images.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="flex justify-between items-center gap-3 border rounded-xl p-2 min-w-0 w-full sm:w-auto"
                        >
                            <img
                                src={norm(img.src)}
                                alt=""
                                className="h-20 w-20 flex-shrink-0 object-cover rounded-md border"
                            />
                            <button
                                type="button"
                                onClick={() => onDelete([img.id])}
                                className="flex-shrink-0 rounded-xl px-3 py-2 border text-red-600 text-sm hover:bg-red-50 transition-colors"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-sm opacity-60">
                    Изображений пока нет, используются стандартные.
                </div>
            )}

            <div className="flex items-center gap-3 flex-wrap">
                <label className="relative">
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={(e) => {
                            const fl = e.currentTarget.files;
                            if (!fl || fl.length === 0)
                                onFileChange('Файл не выбран');
                            else if (fl.length === 1) onFileChange(fl[0].name);
                            else onFileChange(`${fl.length} файлов выбрано`);
                        }}
                    />
                    <span className="cursor-pointer inline-block rounded-xl px-3 py-2 bg-black text-white">
                        Выбрать файлы
                    </span>
                </label>

                <span className="text-sm opacity-70 whitespace-nowrap overflow-hidden text-ellipsis max-w-[40ch]">
                    {fileName}
                </span>

                <button
                    type="button"
                    onClick={onAdd}
                    disabled={uploading}
                    className="rounded-xl px-4 py-2 bg-green-600 text-white disabled:opacity-50"
                >
                    {uploading ? 'Загрузка…' : 'Добавить'}
                </button>
            </div>
        </section>
    );
}

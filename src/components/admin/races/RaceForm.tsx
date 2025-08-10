'use client';

import { useMemo, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';
import type { Race } from '@/components/home/types';

type Props = {
    initial?: Partial<Race>;
    id?: string; // если редактирование
};

type PartnerRow = { categoryText: string; link: string; file?: File | null };

function FileInput({
    name,
    multiple,
    accept = 'image/*',
    onFiles,
    buttonText,
    hint,
}: {
    name: string;
    multiple?: boolean;
    accept?: string;
    onFiles?: (files: FileList | null) => void;
    buttonText: string;
    hint?: string;
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
                            onFiles?.(fl || null);
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
                <span className="text-sm opacity-70 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60ch]">
                    {filesText}
                </span>
            </div>
            {hint && <div className="text-xs opacity-60">{hint}</div>}
        </div>
    );
}

type BtnPos =
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center';

const BTN_POSITIONS: ReadonlyArray<{ value: BtnPos; label: string }> = [
    { value: 'top-left', label: 'Сверху слева' },
    { value: 'top-right', label: 'Сверху справа' },
    { value: 'bottom-left', label: 'Снизу слева' },
    { value: 'bottom-right', label: 'Снизу справа' },
    { value: 'center', label: 'По центру' },
] as const;

export default function RaceForm({ initial, id }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // состояние переключателей
    const [isRegBtn, setIsRegBtn] = useState<boolean>(!!initial?.isRegBtn);
    const [isMoreBtn, setIsMoreBtn] = useState<boolean>(!!initial?.isMoreBtn);
    const [btnsPosition, setBtnsPos] = useState<Race['btnsPosition']>(
        initial?.btnsPosition ?? 'top-left'
    );

    // партнёры
    const initialPartners: PartnerRow[] = useMemo(() => {
        const src = (initial?.partners as any[]) || [];
        return src.map((p) => ({
            categoryText: p?.categoryText ?? '',
            link: p?.link ?? '',
            file: null,
        }));
    }, [initial?.partners]);

    const [partners, setPartners] = useState<PartnerRow[]>(
        initialPartners.length
            ? initialPartners
            : [{ categoryText: '', link: '', file: null }]
    );

    const addPartner = () =>
        setPartners((prev) => [
            ...prev,
            { categoryText: '', link: '', file: null },
        ]);
    const removePartner = (idx: number) =>
        setPartners((prev) => prev.filter((_, i) => i !== idx));
    const updatePartner = (idx: number, patch: Partial<PartnerRow>) =>
        setPartners((prev) =>
            prev.map((p, i) => (i === idx ? { ...p, ...patch } : p))
        );

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formEl = e.currentTarget;
        const fd = new FormData(formEl);

        fd.delete('isRegBtn_radio');
        fd.delete('isMoreBtn_radio');

        // булевы флаги и позиция кнопок — явно записываем
        fd.set('isRegBtn', String(isRegBtn));
        fd.set('isMoreBtn', String(isMoreBtn));
        if (isRegBtn || isMoreBtn) {
            fd.set('btnsPosition', btnsPosition ?? 'top-left');
        }

        // meta партнёров и файлы партнёров
        const partnersMeta = partners.map((p) => ({
            categoryText: p.categoryText,
            link: p.link,
        }));
        fd.set('partners', JSON.stringify(partnersMeta));
        partners.forEach((p) => {
            if (p.file) fd.append('partnersImgs[]', p.file);
        });

        try {
            if (id) {
                await adminFetch(`/races/${id}`, {
                    method: 'PATCH',
                    formData: fd,
                    requireSecret: true,
                });
            } else {
                await adminFetch(`/races`, {
                    method: 'POST',
                    formData: fd,
                    requireSecret: true,
                });
                formEl.reset();
                setPartners([{ categoryText: '', link: '', file: null }]);
                setIsRegBtn(false);
                setIsMoreBtn(false);
                setBtnsPos('top-left');
            }
            alert('Сохранено');
        } catch (err: any) {
            setError(err.message || 'Ошибка сохранения');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            {error && <div className="text-red-600">{error}</div>}

            {/* ====== Базовые поля (всегда видны) ====== */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Название забега*</label>
                <input
                    name="title"
                    defaultValue={initial?.title}
                    className="border rounded-xl px-3 py-2"
                    required
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm opacity-70">Дата забега*</label>
                <input
                    name="date"
                    defaultValue={initial?.date}
                    className="border rounded-xl px-3 py-2"
                    required
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm opacity-70">
                    Ссылка для регистрации*
                </label>
                <input
                    name="regBtnUrl"
                    defaultValue={initial?.regBtnUrl ?? ''}
                    className="border rounded-xl px-3 py-2"
                    required
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm opacity-70">
                    Название на карточке
                </label>
                <input
                    name="cardTitle"
                    defaultValue={initial?.cardTitle}
                    className="border rounded-xl px-3 py-2"
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm opacity-70">Даты на карточке</label>
                <input
                    name="cardDates"
                    defaultValue={initial?.cardDates}
                    className="border rounded-xl px-3 py-2"
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm opacity-70">Фон карточки</label>
                <FileInput name="cardBgImg" buttonText="Выбрать файл" />
            </div>

            <div className="grid gap-2">
                <label className="text-sm opacity-70">Цвет фона карточки</label>
                <input
                    name="bgColor"
                    defaultValue={initial?.bgColor ?? ''}
                    className="border rounded-xl px-3 py-2"
                    placeholder="#FFF..."
                />
            </div>

            {/* ====== Тумблеры ====== */}
            <div className="grid gap-2">
                <label className="text-sm opacity-70">Кнопка регистрации</label>
                <div className="flex gap-6">
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="radio"
                            name="isRegBtn_radio"
                            checked={isRegBtn}
                            onChange={() => setIsRegBtn(true)}
                        />
                        <span>Да</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="radio"
                            name="isRegBtn_radio"
                            checked={!isRegBtn}
                            onChange={() => setIsRegBtn(false)}
                        />
                        <span>Нет</span>
                    </label>
                </div>
            </div>

            <div className="grid gap-2">
                <label className="text-sm opacity-70">Кнопка «Подробнее»</label>
                <div className="flex gap-6">
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="radio"
                            name="isMoreBtn_radio"
                            checked={isMoreBtn}
                            onChange={() => setIsMoreBtn(true)}
                        />
                        <span>Да</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="radio"
                            name="isMoreBtn_radio"
                            checked={!isMoreBtn}
                            onChange={() => setIsMoreBtn(false)}
                        />
                        <span>Нет</span>
                    </label>
                </div>
            </div>

            {/* Если есть хотя бы одна кнопка — позиция кнопок */}
            {(isRegBtn || isMoreBtn) && (
                <div className="grid gap-2">
                    <label className="text-sm opacity-70">
                        Расположение кнопок
                    </label>
                    <select
                        className="border rounded-xl px-3 py-2"
                        value={btnsPosition}
                        onChange={(e) => setBtnsPos(e.target.value as BtnPos)}
                    >
                        {BTN_POSITIONS.map(({ value, label }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* ====== Поля для isRegBtn ====== */}
            {isRegBtn && (
                <>
                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет текста кнопки регистрации
                        </label>
                        <input
                            name="regBtnTextColor"
                            defaultValue={initial?.regBtnTextColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет фона кнопки регистрации
                        </label>
                        <input
                            name="regBtnBgColor"
                            defaultValue={initial?.regBtnBgColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет рамки кнопки регистрации
                        </label>
                        <input
                            name="regBtnBorderColor"
                            defaultValue={initial?.regBtnBorderColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>
                </>
            )}

            {/* ====== Поля для isMoreBtn ====== */}
            {isMoreBtn && (
                <>
                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет текста кнопки «Подробнее»
                        </label>
                        <input
                            name="moreBtnTextColor"
                            defaultValue={initial?.moreBtnTextColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет фона кнопки «Подробнее»
                        </label>
                        <input
                            name="moreBtnBgColor"
                            defaultValue={initial?.moreBtnBgColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет рамки кнопки «Подробнее»
                        </label>
                        <input
                            name="moreBtnBorderColor"
                            defaultValue={initial?.moreBtnBorderColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Описание забега
                        </label>
                        <textarea
                            name="description"
                            defaultValue={initial?.description ?? ''}
                            className="border rounded-xl px-3 py-2 h-28"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Фон на странице забега
                        </label>
                        <FileInput name="mainBgImg" buttonText="Выбрать файл" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет фона на странице забега
                        </label>
                        <input
                            name="mainBgColor"
                            defaultValue={initial?.mainBgColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет основного текста на странице забега
                        </label>
                        <input
                            name="mainTextColor"
                            defaultValue={initial?.mainTextColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Цвет текста дат на странице забега
                        </label>
                        <input
                            name="datesTextColor"
                            defaultValue={initial?.datesTextColor ?? ''}
                            className="border rounded-xl px-3 py-2"
                            placeholder="#FFF..."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Текст чисел даты на странице забега
                        </label>
                        <input
                            name="datesNumsText"
                            defaultValue={initial?.datesNumsText ?? ''}
                            className="border rounded-xl px-3 py-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Текст месяца на странице забега
                        </label>
                        <input
                            name="datesMonthText"
                            defaultValue={initial?.datesMonthText ?? ''}
                            className="border rounded-xl px-3 py-2"
                        />
                    </div>

                    {/* О забеге — изображения */}
                    {/*
                      <div className="grid gap-2">
                        <label className="text-sm opacity-70">Изображения «О забеге» (aboutImgs[])</label>
                        <FileInput name="aboutImgs[]" multiple buttonText="Выбрать файлы" hint="Можно выбрать несколько файлов." />
                      </div>
                    */}

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Дата и место проведения
                        </label>
                        <textarea
                            name="dateAndPlaceText"
                            defaultValue={initial?.dateAndPlaceText ?? ''}
                            className="border rounded-xl px-3 py-2 h-28"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Пакет участника (описание)
                        </label>
                        <textarea
                            name="participantPackageText"
                            defaultValue={initial?.participantPackageText ?? ''}
                            className="border rounded-xl px-3 py-2 h-28"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Пакет участника (изображения)
                        </label>
                        <FileInput
                            name="participantPackageImgs[]"
                            multiple
                            buttonText="Выбрать файлы"
                            hint="Можно выбрать несколько файлов."
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Маршруты (описание)
                        </label>
                        <textarea
                            name="routesText"
                            defaultValue={initial?.routesText}
                            className="border rounded-xl px-3 py-2 h-28"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm opacity-70">
                            Маршруты (изображения)
                        </label>
                        <FileInput
                            name="routesImgs[]"
                            multiple
                            buttonText="Выбрать файлы"
                            hint="Можно выбрать несколько файлов."
                        />
                    </div>

                    {/* Партнёры */}
                    <div className="rounded-2xl border p-4 max-sm:p-2 grid gap-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Партнёры</h3>
                            <button
                                type="button"
                                onClick={addPartner}
                                className="rounded-xl px-3 py-2 bg-black text-white"
                            >
                                Добавить партнёра
                            </button>
                        </div>

                        {partners.map((p, idx) => (
                            <div
                                key={idx}
                                className="border rounded-xl p-3 flex gap-6 max-sm:flex-col-reverse max-sm:gap-1"
                            >
                                <div className="grid gap-3 w-full">
                                    <div className="grid gap-2">
                                        <label className="text-sm opacity-70">
                                            Категория партнёра
                                        </label>
                                        <input
                                            className="border rounded-xl px-3 py-2"
                                            placeholder="Например, Генеральный партнёр"
                                            value={p.categoryText}
                                            onChange={(e) =>
                                                updatePartner(idx, {
                                                    categoryText:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-sm opacity-70">
                                            Ссылка
                                        </label>
                                        <input
                                            className="border rounded-xl px-3 py-2"
                                            placeholder="https://..."
                                            value={p.link}
                                            onChange={(e) =>
                                                updatePartner(idx, {
                                                    link: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <label className="text-sm opacity-70">
                                            Картинка партнёра
                                        </label>
                                        <FileInput
                                            name="partnersImgs[]"
                                            buttonText="Выбрать файл"
                                            onFiles={(fl) =>
                                                updatePartner(idx, {
                                                    file: fl?.[0] ?? null,
                                                })
                                            }
                                            hint="При редактировании старые изображения партнёров будут удалены и заменены."
                                        />
                                    </div>
                                </div>

                                <div className="flex h-fit justify-end">
                                    <button
                                        type="button"
                                        onClick={() => removePartner(idx)}
                                        className="px-3 py-2 rounded-xl border text-red-600"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        ))}

                        {partners.length === 0 && (
                            <div className="text-sm opacity-60">
                                Партнёров пока нет.
                            </div>
                        )}
                    </div>
                </>
            )}

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

'use client';

import { FC, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toUtcPlusHours } from './assets';

interface Option {
    label: string;
    value: string;
}

const trainingDirections: Option[] = [
    { label: 'Индивидуальные', value: 'individual' },
    { label: 'Групповые', value: 'group' },
    { label: 'Дистанционные (онлайн)', value: 'online' },
    { label: 'Корпоративные тренировки', value: 'corporate' },
];

const trainingLevels: Option[] = [
    { label: 'Начинающий (никогда не занимался)', value: 'beginner' },
    { label: 'Средний (занимался ранее)', value: 'intermediate' },
    { label: 'Продвинутый (регулярные тренировки)', value: 'advanced' },
];

interface FormValues {
    name: string;
    phone: string;
    email?: string;
    directions: string;
    level: string;
    datetime: Date | undefined;
    comments: string;
    consent: boolean;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '');

const TrainingSignUpForm: FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onTouched',
        defaultValues: { datetime: undefined },
    });

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            const base =
                API_BASE ||
                (typeof window !== 'undefined' ? window.location.origin : '');
            if (!base)
                throw new Error('API URL не задан (NEXT_PUBLIC_API_BASE)');

            if (!data.datetime) throw new Error('Выберите дату и время');

            const payload = {
                name: data.name,
                phone: data.phone,
                email: data.email || undefined,
                directions: data.directions,
                level: data.level,
                datetime: toUtcPlusHours(data.datetime!, 5),
                comments: data.comments || undefined,
                consent: data.consent,
            };

            const res = await fetch(`${base}/trainings/signups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let msg = `Ошибка отправки (HTTP ${res.status})`;
                try {
                    const j = await res.json();
                    msg = j?.message || msg;
                } catch {}
                throw new Error(msg);
            }

            router.push('/training/signup/success');
        } catch (e: any) {
            setSubmitError(e.message || 'Ошибка! Попробуйте позже.');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass = (fieldError?: boolean) =>
        `bg-white border ${
            fieldError ? 'border-red-500' : 'border-[#EEEEEE]'
        } rounded-lg p-2 w-full mt-1 text-base max-sm:text-sm`;

    const labelClass = 'font-medium text-base max-sm:text-sm';
    const errorClass = 'text-red-500 text-sm max-sm:text-xs mt-1';

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
                <label className={labelClass} htmlFor="name">
                    Ваше имя:
                </label>
                <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Иван..."
                    {...register('name', { required: 'Это поле обязательно' })}
                    className={inputClass(!!errors.name)}
                />
                {errors.name && (
                    <p className={errorClass}>{errors.name.message}</p>
                )}
            </div>

            <div>
                <label className={labelClass} htmlFor="phone">
                    Контактный телефон:
                </label>
                <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="89000000000"
                    {...register('phone', { required: 'Это поле обязательно' })}
                    className={inputClass(!!errors.phone)}
                />
                {errors.phone && (
                    <p className={errorClass}>{errors.phone.message}</p>
                )}
            </div>

            <div>
                <label className={labelClass} htmlFor="email">
                    Электронная почта (необязательно):
                </label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="yourmail@gmail.com"
                    {...register('email', {
                        pattern: {
                            value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                            message: 'Неверный формат электронной почты',
                        },
                    })}
                    className={inputClass(!!errors.email)}
                />
                {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                )}
            </div>

            <div>
                <p className={`${labelClass} mb-1`}>
                    Выберите направление тренировки:
                </p>
                <div className="flex flex-col gap-1 text-base max-sm:text-sm">
                    {trainingDirections.map((opt: Option) => (
                        <label
                            key={opt.value}
                            className="inline-flex items-center"
                        >
                            <input
                                type="radio"
                                value={opt.value}
                                {...register('directions', {
                                    required: 'Выберите направление тренировки',
                                })}
                                className="mr-2"
                                autoComplete="off"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
                {errors.directions && (
                    <p className={errorClass}>
                        {errors.directions.message as string}
                    </p>
                )}
            </div>

            <div>
                <p className={`${labelClass} mb-1`}>Ваш уровень подготовки:</p>
                <div className="flex flex-col gap-1 text-base max-sm:text-sm">
                    {trainingLevels.map((opt: Option) => (
                        <label
                            key={opt.value}
                            className="inline-flex items-center"
                        >
                            <input
                                type="radio"
                                value={opt.value}
                                {...register('level', {
                                    required: 'Выберите уровень подготовки',
                                })}
                                className="mr-2"
                                autoComplete="off"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
                {errors.level && (
                    <p className={errorClass}>{errors.level.message}</p>
                )}
            </div>

            <div>
                <label className={labelClass}>Выберите дату и время:</label>
                <Controller
                    control={control}
                    name="datetime"
                    rules={{ required: 'Выберите дату и время' }}
                    render={({ field }) => (
                        <Datetime
                            value={field.value}
                            onChange={(date: any) =>
                                field.onChange(
                                    date?.toDate?.() ??
                                        (date instanceof Date
                                            ? date
                                            : undefined)
                                )
                            }
                            dateFormat="DD.MM.YYYY"
                            timeFormat="HH:mm"
                            inputProps={{
                                className: inputClass(!!errors.datetime),
                                placeholder: 'дд.мм.гггг чч:мм',
                            }}
                        />
                    )}
                />
                {errors.datetime && (
                    <p className={errorClass}>{errors.datetime.message}</p>
                )}
            </div>

            <div>
                <label className={labelClass} htmlFor="comments">
                    Комментарии или пожелания:
                </label>
                <textarea
                    id="comments"
                    autoComplete="off"
                    rows={4}
                    {...register('comments')}
                    className="bg-white border border-[#EEEEEE] rounded-lg p-2 w-full mt-1"
                />
            </div>

            <div>
                <div className="inline-flex items-center">
                    <input
                        id="consent"
                        type="checkbox"
                        {...register('consent', {
                            required: 'Необходимо согласие',
                        })}
                        className="mr-2 w-4 h-4 max-sm:w-6 max-sm:h-6"
                        autoComplete="off"
                    />
                    <label className={labelClass} htmlFor="consent">
                        Я соглашаюсь с{' '}
                        <Link
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700 underline"
                        >
                            условиями обработки персональных данных
                        </Link>
                    </label>
                </div>
                {errors.consent && (
                    <p className={errorClass}>{errors.consent.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full text-center rounded-2xl max-sm:rounded-xl bg-[#ea0029] max-sm:text-base max-2xl:text-xl text-2xl text-white font-semibold max-sm:py-3 max-2xl:py-4 py-5 hover:bg-[#d10026] transition-colors duration-300 cursor-pointer disabled:opacity-60"
            >
                {submitting ? 'Отправка...' : 'Отправить заявку'}
            </button>

            {submitError && <div className="text-red-600">{submitError}</div>}
        </form>
    );
};

export default TrainingSignUpForm;

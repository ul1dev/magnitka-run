'use client';

import { FC } from 'react';
import 'react-datetime/css/react-datetime.css';
import Link from 'next/link';

interface Option {
    label: string;
    value: string;
}

const deliveryMethods: Option[] = [
    {
        label: 'Забрать товар самостоятельно из офиса. По будням с 10:00 до 19:00. Адрес: г. Магнитогорск пр. К Маркса, д. 168А, пом. 7.',
        value: 'self-pickup',
    },
    {
        label: 'Доставка курьером или до пункта выдачи СДЭК — бесплатно при заказе от 5000 рублей.',
        value: 'sdek',
    },
];

interface Props {
    register: (...args: any) => any;
    errors: any;
}

const CheckoutForm: FC<Props> = ({ register, errors }) => {
    const inputClass = (fieldError?: boolean) =>
        `bg-white border ${
            fieldError ? 'border-red-500' : 'border-[#EEEEEE]'
        } rounded-lg p-2 w-full mt-1 text-base max-sm:text-sm`;

    const labelClass = 'font-medium text-base max-sm:text-sm';
    const errorClass = 'text-red-500 text-sm max-sm:text-xs mt-1';

    return (
        <div className="flex flex-col gap-5">
            <h3 className="font-bold text-2xl max-sm:text-xl -mb-3">
                Получатель
            </h3>

            <div>
                <label className={labelClass} htmlFor="name">
                    Имя и фамилия:
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

            {/* Контактный телефон */}
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

            {/* Электронная почта */}
            <div>
                <label className={labelClass} htmlFor="email">
                    Электронная почта:
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
                        required: 'Это поле обязательно',
                    })}
                    className={inputClass(!!errors.email)}
                />
                {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                )}
            </div>

            {/* Согласие */}
            <div>
                <div className="inline-flex items-center">
                    <input
                        id="consent"
                        type="checkbox"
                        {...register('consent', {
                            required: 'Необходимо согласие',
                        })}
                        className="mr-2 w-4 h-4 max-sm:w-5 max-sm:h-5"
                        autoComplete="off"
                    />
                    <label className={labelClass} htmlFor="consent">
                        Я соглашаюсь с{' '}
                        <Link
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700 underline"
                        >
                            условиями покупки товара
                        </Link>
                    </label>
                </div>
                {errors.consent && (
                    <p className={errorClass}>{errors.consent.message}</p>
                )}
            </div>

            <h3 className="font-bold text-2xl max-sm:text-xl -mb-4 mt-4">
                Доставка товара
            </h3>

            <div>
                <div className="flex flex-col gap-1 text-base max-sm:text-sm">
                    {deliveryMethods.map((opt: Option) => (
                        <label
                            key={opt.value}
                            className="inline-flex items-center"
                        >
                            <input
                                type="radio"
                                value={opt.value}
                                {...register('deliveryMethod', {
                                    required: 'Выберите способ доставки',
                                })}
                                className="mr-2"
                                autoComplete="off"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
                {errors.deliveryMethod && (
                    <p className={errorClass}>
                        {errors.deliveryMethod.message as string}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;

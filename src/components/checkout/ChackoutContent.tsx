'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import CheckoutBar from './CheckoutBar';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';

export interface CCFormValues {
    name: string;
    phone: string;
    email: string;
    deliveryMethod: string;
    consent: boolean;
}

const API_URL =
    (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '') || '';

export default function ChackoutContent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CCFormValues>({
        mode: 'onTouched',
        defaultValues: { deliveryMethod: 'self-pickup' },
    });

    const { clearCart, items, itemsLength } = useCart();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        const locStItems = JSON.parse(
            localStorage.getItem('cart') ?? '[]'
        )?.length;

        if (itemsLength < 1 && !locStItems) {
            router.push('/shop');
        }
    }, [router]);

    const onSubmit: SubmitHandler<CCFormValues> = async (data) => {
        console.log('onSubmit click');

        setSubmitting(true);
        setSubmitError(null);

        try {
            if (!API_URL) {
                throw new Error('API URL не задан (NEXT_PUBLIC_API_BASE)');
            }
            if (!items?.length) {
                throw new Error('Корзина пуста');
            }

            // формируем payload под DTO бэка
            const payload = {
                name: data.name,
                phone: data.phone,
                email: data.email,
                deliveryMethod: data.deliveryMethod,
                products: items.map((item) => ({
                    id: item.product.id,
                    count: item.count,
                    size: item.size || undefined,
                })),
            };

            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Без Admin-Secret — создание заказа публичное
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                // попробуем вытащить сообщение об ошибке с бэка
                let message = 'Не удалось создать заказ';
                try {
                    const err = await res.json();
                    message = err?.message || message;
                } catch {
                    /* ignore */
                }
                throw new Error(message);
            }

            const json: { order: any; paymentLink?: string } = await res.json();
            const link = json?.paymentLink || '';

            if (!link) {
                throw new Error('Платёжная ссылка не получена');
            }

            // очистим корзину и редиректим на оплату
            clearCart();
            router.push(link);
        } catch (e: any) {
            setSubmitError(e.message || 'Ошибка! Попробуйте позже.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            className="flex max-lg:flex-col gap-10 max-lg:gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full">
                <CheckoutForm register={register} errors={errors} />
            </div>
            <div className="lg:min-w-sm">
                <CheckoutBar submitting={submitting} />
            </div>
        </form>
    );
}

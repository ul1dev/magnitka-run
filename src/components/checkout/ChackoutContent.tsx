'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import CheckoutBar from './CheckoutBar';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/useCart';
import CheckoutForm from './CheckoutForm';
import { useEffect } from 'react';

export interface CCFormValues {
    name: string;
    phone: string;
    email: string;
    deliveryMethod: string;
    consent: boolean;
}

export default function ChackoutContent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CCFormValues>({
        mode: 'onTouched',
        defaultValues: { deliveryMethod: 'self-pickup' },
    });
    const { clearCart, itemsLength } = useCart();

    const router = useRouter();

    useEffect(() => {
        const locStItems = JSON.parse(
            localStorage.getItem('cart') ?? '[]'
        )?.length;

        if (itemsLength < 1 && !locStItems) {
            router.push('/shop');
        }
    }, []);

    const onSubmit: SubmitHandler<CCFormValues> = (data) => {
        console.log('Submitted:', data);

        const isSuccess = true;

        if (isSuccess) {
            clearCart();
            router.push('/shop/checkout/success');
        } else {
            alert('Ошибка! Попробуйте позже.');
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
                <CheckoutBar />
            </div>
        </form>
    );
}

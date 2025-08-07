import ChackoutContent from '@/components/checkout/ChackoutContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Оформление заказа',
};

export default async function ShopCheckout() {
    return (
        <main className="mt-40 max-2xl:mt-34 max-xl:mt-30 max-lg:mt-26 max-sm:mt-24 mb-40 max-2xl:mb-36 max-xl:mb-54 max-lg:mb-68 max-md:mb-24 max-sm:mb-32 max-w-5xl mx-auto max-[1100px]:mx-10 max-lg:mx-7 max-sm:mx-5 max-[450px]:!mx-3">
            <h1 className="text-4xl max-sm:text-3xl font-bold mb-8 max-lg:mb-4 max-sm:mb-2">
                Оформление заказа
            </h1>

            <ChackoutContent />
        </main>
    );
}

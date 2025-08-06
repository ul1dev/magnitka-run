import CartBar from '@/components/cart/CartBar';
import CartProducts from '@/components/cart/CartProducts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Корзина',
};

export default async function ShopCart() {
    return (
        <main className="mt-40 max-2xl:mt-34 max-xl:mt-30 max-lg:mt-26 max-sm:mt-24 mb-20 max-2xl:mb-12 max-xl:mb-10 max-lg:mb-8 max-sm:mb-6 max-w-5xl mx-auto max-[1100px]:mx-10 max-lg:mx-7 max-sm:mx-5 max-[450px]:!mx-3">
            <h1 className="text-4xl max-sm:text-3xl font-bold mb-8 max-lg:mb-4 max-sm:mb-2">
                Корзина
            </h1>
            <div className="flex max-md:flex-col gap-10 max-lg:gap-4">
                <div className="w-full">
                    <CartProducts />
                </div>
                <div className="min-w-xs">
                    <CartBar />
                </div>
            </div>
        </main>
    );
}

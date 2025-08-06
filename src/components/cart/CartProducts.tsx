'use client';

import { useCart } from '@/store/useCart';

export default function CartProducts() {
    const { items } = useCart();

    return (
        <div className="flex flex-col gap-4">
            {items.map(({ product }) => (
                <div
                    key={product.id}
                    className="border-1 border-[#EEEEEE] p-8 max-lg:p-4 rounded-lg w-full"
                >
                    <p className="font-bold text-3xl max-lg:text-2xl"></p>
                </div>
            ))}
        </div>
    );
}

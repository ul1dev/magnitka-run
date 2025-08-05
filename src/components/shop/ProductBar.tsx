'use client';

import { ShopProduct } from './types';

interface Props {
    product: ShopProduct;
}

export default function ProductBar({
    product: { price, discountProcent },
}: Props) {
    const finalPrice = discountProcent
        ? Math.ceil((price * (100 - discountProcent)) / 100)
        : price;

    return (
        <div className="border-1 border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
            <p className="text-2xl font-bold">{finalPrice} ₽</p>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { ShopProduct } from './types';
import Image from 'next/image';

interface Props {
    product: ShopProduct;
}

export default function ProductCard({ product }: Props) {
    const { id, imgs, title, price, discountProcent, createdAt } = product;

    // проверить, новинка ли товар (≤7 дней) и нет ли у него скидки
    const created = new Date(createdAt).getTime();
    const isNew =
        !discountProcent && Date.now() - created <= 7 * 24 * 60 * 60 * 1000;

    // финальная цена с учётом скидки (округляем вверх)
    const finalPrice = discountProcent
        ? Math.ceil((price * (100 - discountProcent)) / 100)
        : price;

    return (
        <Link
            href={`/shop/products/${id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
        >
            <div className="relative">
                <Image
                    src={imgs[0]}
                    alt={title}
                    className="w-full h-96 max-2xl:h-72 max-xl:h-60 max-sm:h-72 object-cover"
                    width={1000}
                    height={1000}
                    unoptimized
                />
                {(discountProcent || isNew) && (
                    <span
                        className={`absolute top-4 left-4 max-xl:top-2 max-xl:left-2 text-base leading-5 max-lg:text-xs max-lg:leading-4 font-semibold uppercase px-2 pt-1 pb-0.5 rounded ${
                            discountProcent ? 'bg-green-600' : 'bg-red-500'
                        } text-white`}
                    >
                        {discountProcent ? `-${discountProcent}%` : 'New'}
                    </span>
                )}
            </div>

            <div className="p-3 flex flex-col flex-1">
                <h3 className="font-medium text-lg max-2xl:text-base max-lg:text-sm mb-2">
                    {title}
                </h3>
                <div className="mt-auto">
                    <span className="text-xl max-2xl:text-lg max-lg:text-base font-bold">
                        {finalPrice} ₽
                    </span>
                </div>
            </div>
        </Link>
    );
}

'use client';

import { useCart } from '@/store/useCart';
import Image from 'next/image';
import Link from 'next/link';

export default function CartProducts() {
    const { items, itemsLength, removeItem, incItemCount, decItemCount } =
        useCart();

    return (
        <div className="flex flex-col gap-4">
            {items.map(
                ({
                    product: {
                        id,
                        imgs,
                        title,
                        price,
                        sizesTitle = 'Выбор',
                        sizes,
                        discountProcent = 0,
                    },
                    count,
                    size,
                }) => (
                    <div
                        key={`${id}-${size}`}
                        className="border border-[#EEEEEE] p-6 max-lg:p-4 max-sm:p-3 rounded-lg w-full flex gap-4 justify-between md:items-center max-md:flex-col max-md:relative"
                    >
                        <div className="flex gap-4 max-[400px]:gap-2">
                            <Link href={`/shop/products/${id}`}>
                                <Image
                                    src={imgs[0]}
                                    alt="product-img"
                                    width={100}
                                    height={100}
                                    className="rounded w-25 h-25"
                                />
                            </Link>

                            <div>
                                <Link href={`/shop/products/${id}`}>
                                    <p className="text-sm max-lg:text-sm max-w-[150px]">
                                        {title}
                                    </p>
                                </Link>

                                {sizes && (
                                    <p className="text-xs text-gray-500 mt-10 max-md:mt-2">
                                        {sizesTitle?.slice(0, 1).toUpperCase()}
                                        {sizesTitle
                                            ?.slice(1)
                                            .toLowerCase()}:{' '}
                                        {size.toUpperCase()}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-5 max-md:justify-end">
                            <div className="flex items-center border-[#EEEEEE] border rounded">
                                <p
                                    className="text-xl cursor-pointer py-1 px-3"
                                    onClick={() => decItemCount(id, size)}
                                >
                                    -
                                </p>
                                <p className="border-x-1 border-[#EEEEEE] py-1 px-3 h-full">
                                    {count}
                                </p>
                                <p
                                    className="text-xl cursor-pointer py-1 px-3"
                                    onClick={() => incItemCount(id, size)}
                                >
                                    +
                                </p>
                            </div>

                            <p className="font-bold text-xl">
                                {Math.ceil(
                                    ((price * (100 - discountProcent)) / 100) *
                                        count
                                )}{' '}
                                ₽
                            </p>

                            <div
                                className="cursor-pointer max-md:absolute max-md:top-2 max-md:right-2 max-sm:top-1 max-[400px]:!right-1"
                                onClick={() => removeItem(id, size)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-8 h-8 max-sm:w-7 max-sm:w-7 rotate-45"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            )}

            {itemsLength < 1 && <p>Корзина пуста</p>}
        </div>
    );
}

'use client';

import classNames from 'classnames';
import { ShopProduct } from './types';
import { useState } from 'react';

interface Props {
    product: ShopProduct;
}

export default function ProductBar({
    product: { price, discountProcent, description, sizesTitle, sizes },
}: Props) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const finalPrice = discountProcent
        ? Math.ceil((price * (100 - discountProcent)) / 100)
        : price;

    const handleSelectSize = (size: {
        isUnavailable: boolean;
        value: string;
    }) => {
        if (size.isUnavailable) return;

        setSelectedSize(size.value);
    };

    const handleAddToCart = () => {};

    return (
        <div className="border-1 border-[#EEEEEE] p-8 max-lg:p-4 rounded-lg">
            <p className="font-bold text-3xl max-lg:text-2xl">{finalPrice} ₽</p>

            {discountProcent && (
                <div className="flex gap-2 items-center mt-1">
                    <p className="text-gray-500 line-through text-base max-lg:text-sm">
                        {finalPrice} ₽
                    </p>
                    <span
                        className={`text-sm leading-4 max-lg:text-xs max-lg:leading-4 font-semibold uppercase px-1.5 pt-[5px] pb-0.5 max-lg:pt-1 rounded bg-green-600 text-white`}
                    >
                        {discountProcent}%
                    </span>
                </div>
            )}
            <p className="mt-4 max-lg:text-sm">{description}</p>

            <div className="mt-3">
                <p className="font-bold text-sm">Выберите {sizesTitle}</p>
                <div className="flex flex-wrap gap-2 max-sm:gap-1.5 mt-1">
                    {sizes?.map((size, i) => (
                        <div
                            key={i}
                            className={classNames(
                                'uppercase font-bold cursor-pointer rounded pt-1.5 pb-0.5 px-4 max-sm:text-sm max-sm:pt-2.5 max-sm:pb-2 max-sm:leading-3',
                                {
                                    'opacity-50': size.isUnavailable,
                                    'bg-[#003593] text-white shadow-md':
                                        selectedSize === size.value,
                                    'bg-blue-100 text-black':
                                        selectedSize !== size.value,
                                }
                            )}
                            onClick={() => handleSelectSize(size)}
                        >
                            {size.value}
                        </div>
                    ))}
                </div>
            </div>

            <button
                className={classNames(
                    'mt-8 w-full cursor-pointer text-white max-lg:py-3 py-4 rounded font-bold text-xl max-lg:text-lg',
                    {
                        'bg-[#003593]': selectedSize,
                        'bg-gray-300': !selectedSize,
                    }
                )}
                onClick={handleAddToCart}
            >
                Добавить в корзину
            </button>
        </div>
    );
}

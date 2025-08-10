'use client';

import { useCart } from '@/store/useCart';

interface Props {
    submitting: boolean;
}

export default function CheckoutBar({ submitting }: Props) {
    const {
        itemsLength,
        totalPrice,
        totalPriceWithDiscount,
        totalDiscountAmount,
    } = useCart();

    return (
        <div className="border border-[#EEEEEE] rounded-lg">
            <div className="p-6 max-lg:p-4 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                    <p>Всего товаров: {itemsLength}</p>
                    <p>{totalPrice} ₽</p>
                </div>

                {totalDiscountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                        <p>Скидка:</p>
                        <p className="text-[#ea0029]">
                            -{totalDiscountAmount} ₽
                        </p>
                    </div>
                )}

                <div className="flex justify-between items-end text-lg font-bold leading-5 mt-1">
                    <p>Итого:</p>
                    <p className="text-xl">{totalPriceWithDiscount} ₽</p>
                </div>
            </div>

            <button
                className="text-center w-full cursor-pointer text-white max-lg:py-3 py-4 rounded-b-lg font-bold text-xl max-lg:text-lg bg-[#003593] disabled:opacity-60"
                type="submit"
                disabled={submitting}
            >
                {submitting ? 'Отправка...' : 'Оплатить'}
            </button>
        </div>
    );
}

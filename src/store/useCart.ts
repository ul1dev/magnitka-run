import {
    addItem,
    clearCart,
    decItemCount,
    incItemCount,
    removeItem,
} from './cartSlice';
import type { CartItem } from './cartSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useCart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    let itemsLength = 0;
    let totalPrice = 0;
    let totalDiscountAmount = 0; // <-- в рублях

    for (let item of items) {
        const { price, discountProcent = 0 } = item.product;

        itemsLength += item.count;
        const lineTotal = price * item.count;
        totalPrice += lineTotal;

        // вычисляем скидку именно по этому товару
        totalDiscountAmount += (lineTotal * discountProcent) / 100;
    }

    // цена после всех скидок
    const totalPriceWithDiscount = Math.ceil(totalPrice - totalDiscountAmount);

    return {
        items,
        itemsLength,
        totalPrice,
        totalDiscountAmount,
        totalPriceWithDiscount,
        addItem: (item: CartItem) => dispatch(addItem(item)),
        removeItem: (id: string, size: string) =>
            dispatch(removeItem({ id, size })),
        incItemCount: (id: string, size: string) =>
            dispatch(incItemCount({ id, size })),
        decItemCount: (id: string, size: string) =>
            dispatch(decItemCount({ id, size })),
        clearCart: () => dispatch(clearCart()),
    };
};

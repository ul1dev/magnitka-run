import { addItem, clearCart, removeItem } from './cartSlice';
import type { CartItem } from './cartSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useCart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    let itemsLength = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    for (let item of items) {
        itemsLength += item.count;
        totalPrice += item.product.price;

        if (item.product.discountProcent) {
            totalDiscount += item.product.discountProcent;
        }
    }

    const totalPriceWithDiscount = Math.ceil(
        (totalPrice * (100 - totalDiscount)) / 100
    );

    return {
        items,
        itemsLength,
        totalPrice,
        totalDiscount,
        totalPriceWithDiscount,
        addItem: (item: CartItem) => dispatch(addItem(item)),
        removeItem: (id: string, size: string) =>
            dispatch(removeItem({ id, size })),
        clearCart: () => dispatch(clearCart()),
    };
};

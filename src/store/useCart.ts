import { addItem, clearCart, removeItem } from './cartSlice';
import type { CartItem } from './cartSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useCart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    let itemsLength = 0;

    for (let item of items) {
        itemsLength += item.count;
    }

    return {
        items,
        itemsLength,
        addItem: (item: CartItem) => dispatch(addItem(item)),
        removeItem: (id: string, size: string) =>
            dispatch(removeItem({ id, size })),
        clearCart: () => dispatch(clearCart()),
    };
};

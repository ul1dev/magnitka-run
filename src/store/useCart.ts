import { addItem, clearCart, removeItem } from './cartSlice';
import type { CartItem } from './cartSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useCart = () => {
    const items = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    return {
        items,
        addItem: (item: CartItem) => dispatch(addItem(item)),
        removeItem: (id: string, size: string) =>
            dispatch(removeItem({ id, size })),
        clearCart: () => dispatch(clearCart()),
    };
};


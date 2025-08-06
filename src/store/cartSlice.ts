import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopProduct } from '@/components/shop/types';

export interface CartItem {
    product: ShopProduct;
    size: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            state.items.push(action.payload);
        },
        removeItem(
            state,
            action: PayloadAction<{ id: string; size: string }>,
        ) {
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.product.id === action.payload.id &&
                        item.size === action.payload.size
                    ),
            );
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


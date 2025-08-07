import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopProduct } from '@/components/shop/types';

export interface CartItem {
    product: ShopProduct;
    size: string;
    count: number;
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
        hydrateFromStorage(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
        addItem(state, action: PayloadAction<CartItem>) {
            let isItemInCart = false;
            let oldCount = 0;
            const itemId = action.payload.product.id;

            for (let item of state.items) {
                if (
                    item.product.id === itemId &&
                    item.size === action.payload.size
                ) {
                    isItemInCart = true;
                    oldCount = item.count;
                }
            }

            if (isItemInCart) {
                state.items = state.items.filter(
                    (item) =>
                        !(
                            item.product.id === itemId &&
                            item.size === action.payload.size
                        )
                );
                state.items.push({
                    ...action.payload,
                    count: action.payload.count + oldCount,
                });
            } else {
                state.items.push(action.payload);
            }
        },
        removeItem(state, action: PayloadAction<{ id: string; size: string }>) {
            state.items = state.items.filter(
                (item) =>
                    !(
                        item.product.id === action.payload.id &&
                        item.size === action.payload.size
                    )
            );
        },
        incItemCount(
            state,
            action: PayloadAction<{ id: string; size: string }>
        ) {
            state.items = state.items.map((item) =>
                item.product.id === action.payload.id &&
                item.size === action.payload.size
                    ? { ...item, count: item.count + 1 }
                    : item
            );
        },
        decItemCount(
            state,
            action: PayloadAction<{ id: string; size: string }>
        ) {
            state.items = state.items
                .map((item) =>
                    item.product.id === action.payload.id &&
                    item.size === action.payload.size
                        ? { ...item, count: item.count - 1 }
                        : item
                )
                .filter((item) => item.count > 0);
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const {
    addItem,
    removeItem,
    clearCart,
    hydrateFromStorage,
    incItemCount,
    decItemCount,
} = cartSlice.actions;
export default cartSlice.reducer;

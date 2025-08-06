import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const loadCart = () => {
    if (typeof window === 'undefined') return undefined;

    try {
        const serialized = localStorage.getItem('cart');
        if (!serialized) return undefined;
        return { cart: { items: JSON.parse(serialized) } };
    } catch {
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: loadCart(),
});

if (typeof window !== 'undefined') {
    store.subscribe(() => {
        const state = store.getState();
        try {
            localStorage.setItem('cart', JSON.stringify(state.cart.items));
        } catch {
            // ignore write errors
        }
    });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


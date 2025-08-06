import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: undefined,
});

if (typeof window !== 'undefined') {
    store.subscribe(() => {
        const state = store.getState();
        try {
            localStorage.setItem('cart', JSON.stringify(state.cart.items));
        } catch {}
    });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

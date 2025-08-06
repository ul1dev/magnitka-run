'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { hydrateFromStorage } from '@/store/cartSlice';
import { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        try {
            const data = localStorage.getItem('cart');
            if (data) {
                store.dispatch(hydrateFromStorage(JSON.parse(data)));
            }
        } catch {}
    }, []);

    return <Provider store={store}>{children}</Provider>;
}

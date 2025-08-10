import ProductList from '@/components/shop/ProductList';
import type { ShopProduct } from '@/components/shop/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Магазин',
};

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ??
    'http://localhost:5000';

// нормализация путей к картинкам
function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}
function normArr(a?: (string | null | undefined)[]): string[] {
    if (!a) return [];
    return a.map(norm).filter((x): x is string => Boolean(x));
}

async function getProducts(): Promise<ShopProduct[]> {
    try {
        const res = await fetch(`${API_BASE}/shop/products`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);

        const raw = (await res.json()) as ShopProduct[];

        const items = raw.map((p) => ({
            ...p,
            imgs: normArr(p.imgs),
        }));

        // сортировка: новые сверху
        items.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

        return items;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export default async function Shop() {
    const products = await getProducts();

    return (
        <main className="mt-40 max-2xl:mt-34 max-xl:mt-30 max-lg:mt-26 max-sm:mt-24 mb-20 max-2xl:mb-12 max-xl:mb-10 max-lg:mb-8 max-sm:mb-6 mx-20 max-lg:mx-10 max-sm:mx-4">
            <h1 className="text-4xl max-sm:text-3xl font-bold mb-8 max-lg:mb-4 max-sm:mb-2">
                Наши товары
            </h1>
            <ProductList products={products} />
        </main>
    );
}

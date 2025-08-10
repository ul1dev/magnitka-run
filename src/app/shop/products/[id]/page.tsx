import ProductBar from '@/components/shop/ProductBar';
import ProductGalary from '@/components/shop/ProductGalary';
import ProductInfo from '@/components/shop/ProductInfo';
import type { ShopProduct } from '@/components/shop/types';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: { id: string };
}

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ??
    'http://localhost:8080';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}
function normArr(a?: (string | null | undefined)[]): string[] {
    if (!a) return [];
    return a.map(norm).filter((x): x is string => Boolean(x));
}

async function fetchProduct(id: string): Promise<ShopProduct | null> {
    const res = await fetch(
        `${API_BASE}/shop/products/${encodeURIComponent(id)}`,
        {
            cache: 'no-store',
        }
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to load product ${id}: ${res.status}`);

    const p = (await res.json()) as ShopProduct;
    return {
        ...p,
        imgs: normArr(p.imgs),
    };
}

export async function generateMetadata({
    params: { id },
}: PageProps): Promise<Metadata> {
    try {
        const product = await fetchProduct(id);
        if (!product) return { title: 'Товар не найден' };
        return { title: `Магазин | ${product.title}` };
    } catch {
        return { title: 'Магазин | Товар' };
    }
}

export default async function ShopProductsItem({ params: { id } }: PageProps) {
    const product = await fetchProduct(id);
    if (!product) notFound();

    return (
        <main className="mt-40 max-2xl:mt-34 max-xl:mt-30 max-lg:mt-26 max-sm:mt-24 mb-20 max-2xl:mb-12 max-xl:mb-10 max-lg:mb-8 max-sm:mb-6 max-w-5xl mx-auto max-[1100px]:mx-10 max-lg:mx-7 max-sm:mx-5 max-[450px]:!mx-3">
            <Link
                href="/shop"
                className="flex gap-2 max-lg:gap-1 items-center mb-3 max-lg:text-sm"
            >
                <svg
                    width="13"
                    height="8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4.5.5L1 4m0 0l3.5 3.5M1 4h12" stroke="#000000" />
                </svg>
                К товарам
            </Link>

            <p className="text-xs max-sm:text-[10px] text-gray-400">
                Артикул {product.article}
            </p>

            <h1 className="text-4xl max-lg:text-3xl max-sm:text-2xl max-[450px]:!text-xl font-bold mb-8 max-lg:mb-4 max-sm:mb-2 mt-1">
                {product.title}
            </h1>

            <div className="flex max-md:flex-col gap-10 max-lg:gap-4">
                <div className="w-full">
                    <ProductGalary imgs={product.imgs} />
                </div>
                <div className="w-full">
                    <ProductBar product={product} />
                </div>
            </div>

            <div className="mt-10 max-sm:mt-8">
                <ProductInfo product={product} />
            </div>
        </main>
    );
}

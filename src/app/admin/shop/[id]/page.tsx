'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { adminFetch } from '@/lib/admin-api';
import ShopProductForm from '@/components/admin/shop/ShopProductForm';

type Product = {
    id: string;
    article: string;
    price: number;
    title: string;
    info: string;
    imgs: string[];
    discountProcent?: number | null;
    description?: string | null;
    sizesTitle?: string | null;
    sizes?: { isUnavailable: boolean; value: string }[] | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ?? '';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') && API_BASE ? `${API_BASE}${u}` : u;
}
function normArr(a?: (string | null | undefined)[]): string[] {
    if (!a) return [];
    return a.map(norm).filter((x): x is string => Boolean(x));
}

export default function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const p = await adminFetch<Product>(`/shop/products/${id}`);
                setProduct({
                    ...p,
                    imgs: normArr(p.imgs),
                });
            } catch (e: any) {
                setErr(e.message || 'Ошибка загрузки');
            }
        })();
    }, [id]);

    if (err) return <div className="text-red-600">{err}</div>;
    if (!product) return <div>Загрузка…</div>;

    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Редактировать товар</h1>
            <ShopProductForm initial={product} id={product.id} />
        </div>
    );
}

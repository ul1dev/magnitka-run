'use client';

import ProductCard from './ProductCard';
import { ShopProduct } from './types';

interface Props {
    products: ShopProduct[];
}

export default function ProductList({ products }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-xl:gap-4">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}

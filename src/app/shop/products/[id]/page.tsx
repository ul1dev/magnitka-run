import ProductBar from '@/components/shop/ProductBar';
import ProductGalary from '@/components/shop/ProductGalary';
import ProductInfo from '@/components/shop/ProductInfo';
import { Metadata } from 'next';

interface PageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params: { id },
}: PageProps): Promise<Metadata> {
    // const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });

    // if (!res.ok) {
    //     // if the API returned 404, tell Next.js to render the 404 page
    //     notFound();
    // }

    // const product: ShopProduct = await res.json();

    return {
        title: 'Магазин | Рюкзак Московский Марафон x GOSHA OREKHOV BAGS',
    };
}

export default async function ShopProductsItem({ params: { id } }: PageProps) {
    // const res = await fetch(`https://your-backend.com/api/products/${id}`, {
    //     cache: 'no-store',
    // });
    // const product: ShopProduct = await res.json();

    const product = {
        id: '76ee9607-7850-417f-b68c-f1a5cf859bc6',
        article: '2025-GO-MM',
        price: 14000,
        title: 'Рюкзак Московский Марафон x GOSHA OREKHOV BAGS',
        info: `Размер: 46х30х16 см (в развернутом виде длина 64 см)<br />
Объем: 25л (с развернутым клапаном 30л)<br />
Вес: 1100 гр.<br />
Дизайн: Беговое сообщество x Gosha Orekhov<br />
Страна производства: Россия, Санкт-Петербург`,
        imgs: [
            'https://shop.runc.run/uploads/products/906A9198.jpg',
            'https://shop.runc.run/uploads/products/906A9144.jpg',
            'https://shop.runc.run/uploads/products/906A9147.jpg',
            'https://shop.runc.run/uploads/products/906A9154.jpg',
        ],
        description:
            'Рюкзак Московский Марафон x GOSHA OREKHOV BAGS, модель Technic Rolltop M с продуманным кроем и функционалом. В нём сочетается аутентичность локального бренда и внимание к качеству каждой детали. Производство — Санкт-Петербург.',
        sizesTitle: 'цвет',
        sizes: [
            { isUnavailable: false, value: 'Черный' },
            { isUnavailable: false, value: 'Желтый' },
            { isUnavailable: true, value: 'Красный' },
        ],
        createdAt: '2025-08-05T12:03:18.154Z',
        updatedAt: '2025-08-05T12:03:18.154Z',
        discountProcent: 10,
    };

    return (
        <main className="mt-40 max-2xl:mt-34 max-xl:mt-30 max-lg:mt-26 max-sm:mt-24 mb-20 max-2xl:mb-12 max-xl:mb-10 max-lg:mb-8 max-sm:mb-6 max-w-5xl mx-auto max-[1100px]:mx-10 max-lg:mx-7 max-sm:mx-5 max-[450px]:!mx-3">
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

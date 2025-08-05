import ProductList from '@/components/shop/ProductList';
import { ShopProduct } from '@/components/shop/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Магазин',
};

export default async function Shop() {
    // const res = await fetch('https://your-backend.com/api/products', {
    //     cache: 'no-store',
    // });
    // const products: ShopProduct[] = await res.json();

    const products: ShopProduct[] = [
        {
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
            sizes: [{ isUnavailable: false, value: '' }],
            createdAt: '2025-08-05T12:03:18.154Z',
            updatedAt: '2025-08-05T12:03:18.154Z',
            discountProcent: 10,
        },
        {
            id: '450be48a-f7df-4e82-85e1-8115af5458df',
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
            sizes: [{ isUnavailable: false, value: '' }],
            createdAt: '2025-08-05T12:03:18.154Z',
            updatedAt: '2025-08-05T12:03:18.154Z',
            // discountProcent: 10,
        },
        {
            id: 'ab71f33a-e0b2-4bcf-a200-d9d5468600ec',
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
            sizes: [{ isUnavailable: false, value: '' }],
            createdAt: '2025-08-05T12:03:18.154Z',
            updatedAt: '2025-08-05T12:03:18.154Z',
            // discountProcent: 10,
        },
        {
            id: 'e68cdbb8-9e64-4b30-9cd9-827c822a33cd',
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
            sizes: [{ isUnavailable: false, value: '' }],
            createdAt: '2025-08-05T12:03:18.154Z',
            updatedAt: '2025-08-05T12:03:18.154Z',
            // discountProcent: 10,
        },
        {
            id: '4516218b-f3fd-4885-8535-f0d8b93db7a4',
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
            sizes: [{ isUnavailable: false, value: '' }],
            createdAt: '2025-08-05T12:03:18.154Z',
            updatedAt: '2025-08-05T12:03:18.154Z',
            // discountProcent: 10,
        },
        {
            id: 'd9ff6eb0-2222-4a4a-b87c-f133e696b1a2',
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
            sizes: [{ isUnavailable: false, value: '' }],
            createdAt: '2025-08-05T12:03:18.154Z',
            updatedAt: '2025-08-05T12:03:18.154Z',
            // discountProcent: 10,
        },
    ];

    // сортируем по createdAt от новых к старым
    const sorted = products.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <main className="mt-40 max-2xl:mt-34 max-xl:mt-30 max-lg:mt-26 max-sm:mt-24 mb-20 max-2xl:mb-12 max-xl:mb-10 max-lg:mb-8 max-sm:mb-6 mx-20 max-lg:mx-10 max-sm:mx-4">
            <h1 className="text-4xl max-sm:text-3xl font-bold mb-8 max-lg:mb-4 max-sm:mb-2">
                Наши товары
            </h1>
            <ProductList products={sorted} />
        </main>
    );
}

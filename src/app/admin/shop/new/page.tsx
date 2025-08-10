import ShopProductForm from '@/components/admin/shop/ShopProductForm';

export default function NewProductPage() {
    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Создать товар</h1>
            <ShopProductForm />
        </div>
    );
}

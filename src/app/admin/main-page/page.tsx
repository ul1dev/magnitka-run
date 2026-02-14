'use client';

import MainPageForm from '@/components/admin/main-page/MainPageForm';

export default function AdminMainPage() {
    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Главная страница</h1>
            <MainPageForm />
        </div>
    );
}

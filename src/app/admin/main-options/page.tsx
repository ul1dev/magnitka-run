'use client';

import MainOptionsForm from '@/components/admin/main-options/MainOptionsForm';

export default function MainOptionsPage() {
    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Общие параметры</h1>
            <MainOptionsForm />
        </div>
    );
}

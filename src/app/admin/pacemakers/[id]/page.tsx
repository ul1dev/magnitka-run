'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { adminFetch } from '@/lib/admin-api';
import PacemakerForm from '@/components/admin/pacemakers/PacemakerForm';

type Pacemaker = {
    id: string;
    name: string;
    description: string;
    img?: string | null;
};

export default function EditPacemakerPage() {
    const { id } = useParams<{ id: string }>();
    const [pacemaker, setPacemaker] = useState<Pacemaker | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const p = await adminFetch<Pacemaker>(`/pacemakers/${id}`);
                setPacemaker(p);
            } catch (e: any) {
                setErr(e.message || 'Ошибка загрузки');
            }
        })();
    }, [id]);

    if (err) return <div className="text-red-600">{err}</div>;
    if (!pacemaker) return <div>Загрузка…</div>;

    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Редактировать пейсера</h1>
            <PacemakerForm initial={pacemaker} id={pacemaker.id} />
        </div>
    );
}

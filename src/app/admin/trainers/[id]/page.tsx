'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { adminFetch } from '@/lib/admin-api';
import TrainerForm from '@/components/admin/trainers/TrainerForm';

type Trainer = {
    id: string;
    name: string;
    description: string;
    img?: string | null;
};

export default function EditTrainerPage() {
    const { id } = useParams<{ id: string }>();
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const t = await adminFetch<Trainer>(`/trainers/${id}`);
                setTrainer(t);
            } catch (e: any) {
                setErr(e.message || 'Ошибка загрузки');
            }
        })();
    }, [id]);

    if (err) return <div className="text-red-600">{err}</div>;
    if (!trainer) return <div>Загрузка…</div>;

    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Редактировать тренера</h1>
            <TrainerForm initial={trainer} id={trainer.id} />
        </div>
    );
}

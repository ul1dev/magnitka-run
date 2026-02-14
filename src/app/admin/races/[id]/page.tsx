'use client';

import RaceForm from '@/components/admin/races/RaceForm';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';
import type { Race } from '@/components/home/types';
import { useParams } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ?? '';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') && API_BASE ? `${API_BASE}${u}` : u;
}
function normArr(a?: (string | null | undefined)[]): string[] | undefined {
    if (!a) return undefined;
    return a.map(norm).filter((x): x is string => Boolean(x));
}
function normRace(r: Race): Race {
    return {
        ...r,
        cardBgImg: norm(r.cardBgImg),
        mainBgImg: norm(r.mainBgImg),
        aboutImgs: normArr(r.aboutImgs),
        participantPackageImgs: normArr(r.participantPackageImgs),
        routesImgs: normArr(r.routesImgs),
        partners: r.partners?.map((p) => ({ ...p, img: norm(p.img) || '' })),
        pressBlocks: r.pressBlocks?.map((pb) => ({
            ...pb,
            img: norm(pb.img) || '',
        })),
    };
}

export default function EditRacePage() {
    const { id } = useParams<{ id: string }>();
    const [race, setRace] = useState<Race | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const r = await adminFetch<Race>(`/races/${id}`);
                setRace(normRace(r));
            } catch (e: any) {
                setErr(e.message || 'Ошибка загрузки');
            }
        })();
    }, [id]);

    if (err) return <div className="text-red-600">{err}</div>;
    if (!race) return <div>Загрузка…</div>;

    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Редактировать забег</h1>
            <RaceForm initial={race} id={race.id} />
        </div>
    );
}

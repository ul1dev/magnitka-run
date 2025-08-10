import { notFound } from 'next/navigation';
import type { Race } from '@/components/home/types';
import RaceStart from '@/components/race/Start';
import RaceInfo from '@/components/race/Info';
import type { Metadata } from 'next';

interface PageProps {
    params: { id: string };
}

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ??
    'http://localhost:8080';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}
function normArr(a?: (string | null | undefined)[]): string[] | undefined {
    if (!a) return undefined;
    return a.map(norm).filter((x): x is string => Boolean(x));
}

async function fetchRace(id: string): Promise<Race | null> {
    const res = await fetch(`${API_BASE}/races/${encodeURIComponent(id)}`, {
        cache: 'no-store',
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to load race ${id}: ${res.status}`);

    const r = (await res.json()) as Race;

    // нормализуем пути к картинкам
    return {
        ...r,
        cardBgImg: norm(r.cardBgImg),
        mainBgImg: norm(r.mainBgImg),
        aboutImgs: normArr(r.aboutImgs),
        participantPackageImgs: normArr(r.participantPackageImgs),
        routesImgs: normArr(r.routesImgs),
        partners: r.partners?.map((p) => ({
            ...p,
            img: norm(p.img) || '', // в типе img: string
        })),
    };
}

export async function generateMetadata({
    params: { id },
}: PageProps): Promise<Metadata> {
    try {
        const race = await fetchRace(id);
        if (!race) return { title: 'Забег не найден' };
        return { title: race.title || 'Забег' };
    } catch {
        return { title: 'Забег' };
    }
}

export default async function RacePage({ params: { id } }: PageProps) {
    const race = await fetchRace(id);
    if (!race) notFound();

    return (
        <div className="bg-white">
            <RaceStart race={race} />
            <RaceInfo race={race} />
        </div>
    );
}

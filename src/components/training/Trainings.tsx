'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import TrainingTrainingsFormats from './TrainingsFormats';
import TrainingTrainingsTrainers from './TrainingsTrainers';
import TrainingTrainingsPacemakers from './TrainingsPacemakers';

export interface Trainer {
    id: string;
    img?: string;
    name: string;
    description: string;
}

export interface Pacemaker {
    id: string;
    img?: string;
    name: string;
    description: string;
}

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, '') ??
    'http://localhost:8080';

function norm(u?: string | null): string | undefined {
    if (!u) return undefined;
    return u.startsWith('/') ? `${API_BASE}${u}` : u;
}

const TrainingTrainings: FC = () => {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [pacemakers, setPacemakers] = useState<Pacemaker[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const [tRes, pRes] = await Promise.all([
                    fetch(`${API_BASE}/trainers`, { cache: 'no-store' }),
                    fetch(`${API_BASE}/pacemakers`, { cache: 'no-store' }),
                ]);
                if (!tRes.ok) throw new Error(`trainers ${tRes.status}`);
                if (!pRes.ok) throw new Error(`pacemakers ${pRes.status}`);

                const [tData, pData] = (await Promise.all([
                    tRes.json(),
                    pRes.json(),
                ])) as [Trainer[], Pacemaker[]];

                if (!alive) return;
                setTrainers(tData.map((t) => ({ ...t, img: norm(t.img) })));
                setPacemakers(pData.map((p) => ({ ...p, img: norm(p.img) })));
            } catch (e: any) {
                if (!alive) return;
                setError(e?.message || 'Ошибка загрузки данных');
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    const trainingNavItems = [{ id: 'formats', label: 'Форматы тренировок' }];

    if (trainers.length) {
        trainingNavItems.push({ id: 'trainers', label: 'Тренеры' });
    }

    if (pacemakers.length) {
        trainingNavItems.push({ id: 'pacemakers', label: 'Пейсеры Магнитки' });
    }

    return (
        <div className="flex max-w-6xl mx-auto p-10 max-sm:p-5 max-[450px]:!px-2">
            <nav className="w-1/3 pr-8 max-lg:hidden">
                <ul className="sticky top-34 border rounded-lg border-[#EEEEEE]">
                    {trainingNavItems.map((item, i) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="block"
                        >
                            <li
                                className={classNames('py-3 px-5 text-lg', {
                                    'border-b-1 border-[#EEEEEE]':
                                        trainingNavItems.length - 1 !== i,
                                })}
                            >
                                {item.label}
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            <div className="lg:w-3/4 space-y-16 max-sm:space-y-8">
                <TrainingTrainingsFormats />
                <TrainingTrainingsTrainers trainers={trainers} />
                <TrainingTrainingsPacemakers pacemakers={pacemakers} />
            </div>
        </div>
    );
};

export default TrainingTrainings;

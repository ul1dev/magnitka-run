'use client';

import { FC, useMemo } from 'react';
import { Race } from '../home/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    race: Race;
}

interface Partner {
    img: string;
    categoryText: string;
    link?: string;
}

const RaceInfoPartners: FC<Props> = ({ race }) => {
    const groupedPartners = useMemo(() => {
        if (!race.partners?.length) return {};

        return race.partners.reduce((acc, partner: Partner) => {
            const key = partner.categoryText.toLowerCase();
            if (!acc[key]) {
                acc[key] = {
                    // сохраняем оригинальное написание первой встретившейся категории
                    label: partner.categoryText,
                    items: [] as Partner[],
                };
            }
            acc[key].items.push(partner);
            return acc;
        }, {} as Record<string, { label: string; items: Partner[] }>);
    }, [race.partners]);

    return (
        <section className="scroll-mt-34" id="partners">
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Партнёры
            </h2>

            <div className="flex flex-col gap-5">
                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col gap-6 max-sm:gap-4">
                    {Object.values(groupedPartners).map((group) => (
                        <div key={group.label}>
                            <h3 className="text-xl max-sm:text-lg font-semibold mb-1">
                                {group.label}
                            </h3>
                            <div className="flex flex-wrap items-center gap-6 max-sm:gap-4">
                                {group.items.map((partner, idx) => (
                                    <Link key={idx} href={partner.link ?? '#'}>
                                        <Image
                                            src={partner.img}
                                            alt={`${group.label} logo`}
                                            className="w-32 max-sm:w-24 object-contain"
                                            width={100}
                                            height={100}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RaceInfoPartners;

'use client';

import { FC } from 'react';
import { Race } from '../home/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
    race: Race;
}

const RaceInfoPress: FC<Props> = ({ race }) => {
    if (!race.pressBlocks?.length) return null;

    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="press"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Пресса
            </h2>

            <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                <div className="flex flex-col divide-y divide-[#EEEEEE]">
                    {race.pressBlocks.map((block, idx) => (
                        <Link
                            key={idx}
                            href={block.url}
                            target="_blank"
                            className="group flex flex-col gap-2 pt-6 pb-4.5 max-sm:pt-4 max-sm:pb-2.5 first:pt-0 last:pb-0"
                        >
                            {block.img && (
                                <Image
                                    src={block.img}
                                    alt={`Статья ${idx + 1}`}
                                    className="w-full rounded-lg border border-[#EEEEEE] group-hover:shadow-md transition-shadow"
                                    width={300}
                                    height={225}
                                    unoptimized
                                />
                            )}
                            <span className="text-[#003593] text-lg max-sm:text-sm font-medium break-all line-clamp-2">
                                🔗{' '}
                                <span className="group-hover:underline">
                                    {block.url}
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RaceInfoPress;

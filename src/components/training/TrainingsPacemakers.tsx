'use client';

import Image from 'next/image';
import { FC } from 'react';
import { Pacemaker } from './Trainings';

interface Props {
    pacemakers: Pacemaker[];
}

const TrainingTrainingsPacemakers: FC<Props> = ({ pacemakers }) => {
    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="pacemakers"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Пейсеры Магнитки
            </h2>

            <div className="flex flex-col gap-5 max-sm:gap-3">
                {pacemakers.map((pacemaker, i) => (
                    <div
                        className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col"
                        key={pacemaker.id}
                    >
                        {pacemaker.img && (
                            <Image
                                src={pacemaker.img}
                                alt={`pacemaker-${i}`}
                                className="w-1/2 max-[500px]:w-full rounded-lg mb-5 max-sm:mb-4"
                                width={200}
                                height={200}
                                unoptimized
                            />
                        )}

                        <h3 className="text-2xl max-sm:text-xl font-semibold mb-2 max-sm:mb-1">
                            {pacemaker.name}
                        </h3>
                        <div
                            className="flex flex-col gap-2 max-sm:text-sm"
                            dangerouslySetInnerHTML={{
                                __html: pacemaker.description,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrainingTrainingsPacemakers;

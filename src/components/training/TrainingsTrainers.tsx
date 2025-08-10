'use client';

import Image from 'next/image';
import { FC } from 'react';

import { Trainer } from './Trainings';

interface Props {
    trainers: Trainer[];
}

const TrainingTrainingsTrainers: FC<Props> = ({ trainers }) => {
    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="trainers"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Тренеры
            </h2>

            <div className="flex flex-col gap-5 max-sm:gap-3">
                {trainers.map((trainer, i) => (
                    <div
                        className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col"
                        key={trainer.id}
                    >
                        {trainer.img && (
                            <Image
                                src={trainer.img}
                                alt={`trainer-${i}`}
                                className="w-1/2 max-[500px]:w-full rounded-lg mb-5 max-sm:mb-4"
                                width={200}
                                height={200}
                            />
                        )}

                        <h3 className="text-2xl max-sm:text-xl font-semibold mb-2 max-sm:mb-1">
                            {trainer.name}
                        </h3>
                        <div
                            className="flex flex-col gap-2 max-sm:text-sm"
                            dangerouslySetInnerHTML={{
                                __html: trainer.description,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrainingTrainingsTrainers;

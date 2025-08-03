'use client';

import Link from 'next/link';
import { FC } from 'react';

import bgImg from '@/app/static/images/_16.jpg.webp';

const TrainingStart: FC = () => {
    return (
        <div className="bg-white flex justify-between rounded-3xl max-sm:rounded-2xl mx-8 mt-36 max-lg:mt-28 max-sm:mt-24 mb-16 max-xl:mb-10 max-lg:mb-6 max-sm:mb-4 max-sm:mx-4 max-[450px]:!mx-2 h-[750px] max-2xl:h-[650px] relative">
            <div className="xl:w-1/2 p-10 flex flex-col justify-center max-xl:items-center max-xl:mx-auto gap-14 z-10">
                <h1 className="font-extrabold uppercase max-xl:text-center max-xl:text-white text-5xl max-2xl:text-3xl max-xl:text-4xl max-lg:text-3xl max-[450px]:!text-2xl">
                    Тренировки <br /> с беговым движением <br /> "Азия-европа"
                </h1>
                <Link
                    href="https://myrace.info/events/1056"
                    className="w-fit max-lg:rounded-xl rounded-2xl bg-[#ea0029] max-lg:text-base max-2xl:text-xl text-2xl text-white font-semibold max-lg:px-22 max-lg:py-3 max-2xl:px-24 max-2xl:py-4 px-26 py-5 hover:bg-[#d10026] transition-colors duration-300"
                    target="_blank"
                >
                    Перейти
                </Link>
            </div>

            <div
                style={{
                    backgroundImage: `url(${bgImg.src})`,
                }}
                className="xl:w-1/2 bg-cover bg-center bg-no-repeat rounded-3xl max-sm:rounded-2xl max-xl:absolute max-xl:inset-0 z-1"
            ></div>
        </div>
    );
};

export default TrainingStart;

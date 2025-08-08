'use client';

import { useInView } from 'react-intersection-observer';
import { Race } from './types';
import { FC } from 'react';
import RaceCard from './RaceCard';
import CardBtn from './CardBtn';
import Link from 'next/link';

interface Props {
    items: Race[];
}

const HomeRaces: FC<Props> = ({ items }) => {
    const { ref: animateRef, inView: animateInView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div
            ref={animateRef}
            className="bg-white rounded-[50px] max-2xl:rounded-4xl max-lg:rounded-3xl -mt-10 px-8 max-2xl:px-6 max-sm:px-4 max-[500px]:!px-3 pt-20 max-lg:pt-14 max-sm:pt-12 max-[500px]:!pt-10 max-[450px]:!pt-8 pb-10 max-lg:pb-6 max-sm:pb-4 max-[500px]:!pb-3 relative z-10"
        >
            <h2
                className={`font-extrabold uppercase text-7xl max-2xl:text-5xl max-lg:text-4xl max-[500px]:!text-3xl max-[450px]:!text-2xl max-[360px]:!text-xl max-sm:text-center animate__animated ${
                    animateInView ? 'animate__fadeInRight' : 'hidden'
                }`}
            >
                Почувствуй ритм <br /> движения
            </h2>
            <p className="mt-2 max-sm:text-center text-xl max-2xl:text-base max-lg:text-sm max-[500px]:!text-xs ">
                Участвуй в забегах, созданных для тебя и твоих близких.
            </p>

            <div className="grid grid-cols-2 max-lg:grid-cols-1 justify-between mt-12 max-sm:mt-8 gap-6 max-sm:gap-4">
                {items.map((item) => (
                    <RaceCard key={item.id} item={item} />
                ))}

                {items.length % 2 !== 0 && (
                    <div className="w-full h-86 max-2xl:h-62 bg-[#003593] rounded-2xl pl-16 pr-24 py-24 max-2xl:py-16 max-2xl:pl-12 max-2xl:pr-16 flex flex-col justify-between max-lg:hidden">
                        <div className="flex w-full">
                            <p className="text-5xl max-2xl:text-4xl max-xl:text-3xl uppercase text-white font-extrabold">
                                Скоро!
                            </p>
                        </div>

                        <div className="flex w-full justify-end">
                            <Link
                                href="https://t.me/Asiaeuropemgn"
                                target="_blank"
                            >
                                <CardBtn
                                    borderColor="#FFFFFF"
                                    textColor="#FFFFFF"
                                >
                                    Подписаться
                                </CardBtn>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeRaces;

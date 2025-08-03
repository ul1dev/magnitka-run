'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Race } from '../home/types';
import { formatTextToHtml } from '@/assets/format-text-to-html';

interface Props {
    race: Race;
}

const RaceStart: FC<Props> = ({ race }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        // Функция расчета оставшегося времени
        const calculateTimeLeft = () => {
            const [yearStr, monthStr, dayStr] = race.date.split('-');
            const day = parseInt(dayStr, 10);
            const month = parseInt(monthStr, 10) - 1; // месяцы в JS от 0 до 11
            const year = parseInt(yearStr, 10);
            const now = new Date();

            // Устанавливаем целевую дату в текущем году
            let target = new Date(year, month, day);
            // Если дата уже прошла — переносим на следующий год
            if (target <= now) {
                target = new Date(year + 1, month, day);
            }

            const diff = target.getTime() - now.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({
                days: String(days).padStart(2, '0'),
                hours: String(hours).padStart(2, '0'),
                minutes: String(minutes).padStart(2, '0'),
                seconds: String(seconds).padStart(2, '0'),
            });
        };

        calculateTimeLeft();
        const timerId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timerId);
    }, [race?.date]);

    return (
        <div
            className="flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center w-full h-screen gap-3 px-2"
            style={{
                backgroundImage: `url(${race.mainBgImg})`,
                backgroundColor: race.mainBgColor,
            }}
        >
            <h2
                className={`font-extrabold uppercase mt-32 text-7xl max-2xl:text-5xl max-lg:text-4xl max-[500px]:!text-3xl max-[450px]:!text-2xl max-[360px]:!text-xl text-center animate__animated animate__fadeInRight`}
                style={{ color: race.mainTextColor }}
                dangerouslySetInnerHTML={{
                    __html: formatTextToHtml(race.title),
                }}
            ></h2>
            <Link
                href={race.regBtnUrl ?? '#'}
                className="max-xl:rounded-xl rounded-2xl bg-[#ea0029] max-xl:text-base max-2xl:text-xl text-2xl text-white font-semibold max-xl:px-14 max-xl:py-3 max-2xl:px-16 max-2xl:py-4 px-18 py-5 hover:bg-[#d10026] transition-colors duration-300"
                target="_blank"
            >
                Регистрация
            </Link>

            <div className="flex gap-4 max-md:gap-3 max-[450px]:!gap-2 mt-20 max-md:mt-14">
                <div
                    className={`text-center rounded-2xl max-xl:rounded-xl p-4 max-xl:p-3 max-md:p-2`}
                    style={{
                        backgroundColor: race.mainTextColor,
                        color: race.datesTextColor,
                    }}
                >
                    <p className="font-bold text-5xl -mb-2 max-[450px]:!-mb-1.5 max-xl:text-4xl max-md:text-3xl max-[450px]:!text-2xl">
                        {race.datesNumsText}
                    </p>
                    <p className="max-xl:text-sm max-md:text-xs max-[450px]:!text-[10px]">
                        {race.datesMonthText}
                    </p>
                </div>
                <div
                    className={`rounded-2xl max-xl:rounded-xl p-4 max-xl:p-3 max-md:p-2 max-[450px]:!p-1 border-2 max-2xl:border-1`}
                    style={{
                        borderColor: race.mainTextColor,
                        color: race.mainTextColor,
                    }}
                >
                    <div className="flex items-center font-bold text-center space-x-4 max-xl:space-x-3 max-md:space-x-2 text-5xl max-xl:text-4xl max-md:text-3xl max-[450px]:!text-2xl mt-3 max-xl:mt-2 max-[450px]:!mt-2.5">
                        <span className="min-w-[50px] max-[450px]:!min-w-[35px]">
                            {timeLeft.days}
                        </span>
                        <span>:</span>
                        <span className="min-w-[50px] max-[450px]:!min-w-[35px]">
                            {timeLeft.hours}
                        </span>
                        <span>:</span>
                        <span className="min-w-[50px] max-[450px]:!min-w-[35px]">
                            {timeLeft.minutes}
                        </span>
                        <span>:</span>
                        <span className="min-w-[50px] max-[450px]:!min-w-[35px]">
                            {timeLeft.seconds}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RaceStart;

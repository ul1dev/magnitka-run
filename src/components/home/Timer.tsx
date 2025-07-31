'use client';

import { FC, useEffect, useState } from 'react';

interface HomeTimerProps {
    targetDate?: string;
    eventTitle?: string;
}

const HomeTimer: FC<HomeTimerProps> = ({
    targetDate = '06.09',
    eventTitle = 'До старта полумарафона Азия-Европа',
}) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
    });

    useEffect(() => {
        // Функция расчета оставшегося времени
        const calculateTimeLeft = () => {
            const [dayStr, monthStr] = targetDate.split('.');
            const day = parseInt(dayStr, 10);
            const month = parseInt(monthStr, 10) - 1; // месяцы в JS от 0 до 11
            const now = new Date();
            let year = now.getFullYear();

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
    }, [targetDate]);

    return (
        <div className="bg-[#ea0029] text-white flex min-[900px]:items-center justify-between rounded-2xl max-[900px]:gap-6 max-[900px]:flex-col py-12 pl-8 pr-16 max-2xl:py-8 max-[900px]:!py-12 max-xl:pr-12 max-xl:pl-6 max-xl:py-6 mx-8 max-sm:mx-4 max-[400px]:!mx-2 max-[400px]:!px-3 max-[400px]:!py-8 mb-40 max-2xl:mb-32 max-xl:mb-28 max-sm:mb-20">
            <div className="uppercase font-extrabold text-5xl max-w-4xl max-[1800px]:text-4xl max-[1800px]:max-w-3xl max-2xl:text-3xl max-2xl:max-w-xl max-xl:text-2xl max-xl:max-w-lg max-lg:text-xl max-lg:max-w-md max-[900px]:!text-3xl max-[900px]:!max-w-xl max-[640px]:!text-2xl max-[640px]:!max-w-lg max-[500px]:!text-xl max-[500px]:!max-w-md max-[450px]:!text-lg max-[450px]:!max-w-sm max-[360px]:!text-base max-[360px]:!max-w-xs">
                {eventTitle}
            </div>

            <div className="flex items-center font-extrabold space-x-5 text-7xl leading-14 max-2xl:text-5xl max-2xl:leading-10 max-xl:text-4xl max-xl:leading-8 max-lg:text-3xl max-lg:leading-6 max-[900px]:!text-5xl max-[900px]:!leading-10 max-[640px]:!text-4xl max-[640px]:!leading-8 max-[530px]:!text-3xl max-[530px]:!leading-6 max-[450px]:!text-2xl max-[450px]:!leading-5 max-[360px]:!text-xl max-[360px]:!leading-4">
                <span>{timeLeft.days}</span>
                <span>:</span>
                <span>{timeLeft.hours}</span>
                <span>:</span>
                <span>{timeLeft.minutes}</span>
                <span>:</span>
                <span>{timeLeft.seconds}</span>
            </div>
        </div>
    );
};

export default HomeTimer;

'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
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

const TrainingTrainings: FC = () => {
    const trainers: Trainer[] = [
        {
            id: '22670748-c563-4c2b-8053-73d18e463155',
            img: 'https://res.cloudinary.com/dnur7812w/image/upload/v1754309263/trainer1_xu8m9v.jpg',
            name: 'Егор Николаев',
            description: `МСМК по легкой атлетике, многократный Чемпион России, полуфиналист ОИ 2012г. Лондона на 1500, трехкратный Чемпион Европы, беговой стаж более 20 лет, был в составе сборной России более 15 лет, в 2020 получил диплом по квалификации «Тренер».<br />
За свою карьеру спортсмена пробежал от 800 м до марафона, был призером на Чемпионате Европу по кроссу.`,
        },
    ];

    const pacemakers: Pacemaker[] = [
        {
            id: '22670748-c563-4c2b-8053-73d18e463155',
            img: 'https://res.cloudinary.com/dnur7812w/image/upload/v1754309263/trainer1_xu8m9v.jpg',
            name: 'Егор Николаев',
            description: `МСМК по легкой атлетике, многократный Чемпион России, полуфиналист ОИ 2012г. Лондона на 1500, трехкратный Чемпион Европы, беговой стаж более 20 лет, был в составе сборной России более 15 лет, в 2020 получил диплом по квалификации «Тренер».<br />
За свою карьеру спортсмена пробежал от 800 м до марафона, был призером на Чемпионате Европу по кроссу.`,
        },
    ];

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

'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

const TrainingTrainings: FC = () => {
    const trainingNavItems = [
        { id: 'formats', label: 'Форматы тренировок' },
        { id: 'trainers', label: 'Тренеры' },
        { id: 'pacemakers', label: 'Пейсеры Магнитки' },
    ];

    return (
        <div className="flex max-w-6xl mx-auto p-10 max-sm:p-5 max-[450px]:!px-2">
            <nav className="w-1/3 pr-8 max-lg:hidden">
                <ul className="sticky top-34 border-1 rounded-lg border-[#EEEEEE]">
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
                ihsadhasdhasdohashd
            </div>
        </div>
    );
};

export default TrainingTrainings;

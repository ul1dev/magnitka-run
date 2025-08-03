'use client';

import Link from 'next/link';
import { FC } from 'react';
import { Race } from '../home/types';
import classNames from 'classnames';

import RaceInfoAbout from './InfoAbout';
import RaceInfoParticipants from './InfoParticipants';
import RaceInfoVolunteers from './InfoVolunteers';
import RaceInfoPartners from './InfoPartners';
import RaceInfoContacts from './InfoContacts';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface Props {
    race: Race;
}

const RaceInfo: FC<Props> = ({ race }) => {
    const navItems = [
        { id: 'about', label: 'О забеге' },
        { id: 'participants', label: 'Участникам' },
        { id: 'volunteers', label: 'Волонтерам' },
        { id: 'contacts', label: 'Контакты' },
    ];

    if (race?.partners?.length) {
        navItems.push({ id: 'partners', label: 'Партнеры' });
    }

    return (
        <div className="flex max-w-6xl mx-auto p-10 max-sm:p-5 max-[450px]:!px-2">
            <nav className="w-1/3 pr-8 max-lg:hidden">
                <ul className="sticky top-34 border-1 rounded-lg border-[#EEEEEE]">
                    {navItems.map((item, i) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="block"
                        >
                            <li
                                className={classNames('py-3 px-5 text-lg', {
                                    'border-b-1 border-[#EEEEEE]':
                                        navItems.length - 1 !== i,
                                })}
                            >
                                {item.label}
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            <div className="lg:w-3/4 space-y-16 max-sm:space-y-8">
                <RaceInfoAbout race={race} />
                <RaceInfoParticipants race={race} />
                <RaceInfoVolunteers />
                <RaceInfoContacts />
                <RaceInfoPartners race={race} />
            </div>
        </div>
    );
};

export default RaceInfo;

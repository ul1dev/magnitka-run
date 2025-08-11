'use client';

import { FC } from 'react';
import { TeamMember } from './types';
import HomeTeamCard from './TeamCard';

interface Props {
    items: TeamMember[];
}

const HomeTeams: FC<Props> = ({ items }) => {
    return (
        <div className="bg-white rounded-[50px] max-2xl:rounded-4xl max-lg:rounded-3xl px-8 max-2xl:px-6 max-sm:px-4 max-[500px]:!px-3 py-10 max-lg:py-6 max-sm:py-4 max-[500px]:!py-3 mb-40 max-2xl:mb-32 max-xl:mb-28 max-sm:mb-20">
            <h2
                className={`font-extrabold uppercase text-center text-7xl max-2xl:text-5xl max-lg:text-4xl max-[500px]:!text-3xl max-[450px]:!text-2xl max-[360px]:!text-xl max-sm:text-center animate__animated`}
            >
                Наша команда
            </h2>

            <div className="flex flex-wrap justify-center gap-6 max-md:gap-3 mt-10 max-lg:mt-5">
                {items.map((item) => (
                    <div key={item.id}>
                        <HomeTeamCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeTeams;

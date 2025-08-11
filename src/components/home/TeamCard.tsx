'use client';

import { FC } from 'react';
import { TeamMember } from './types';
import Image from 'next/image';

interface Props {
    item: TeamMember;
}

const HomeTeamCard: FC<Props> = ({ item }) => {
    return (
        <div className="border border-[#EEEEEE] p-6 max-sm:p-4 rounded-lg flex flex-col items-center max-w-xs max-lg:max-w-3xs">
            {item.img && (
                <Image
                    src={item.img}
                    alt={`team-member-${item.id}`}
                    className="w-full rounded-lg mb-5 max-sm:mb-4"
                    width={200}
                    height={200}
                    unoptimized
                />
            )}

            <h3 className="text-2xl max-sm:text-xl font-semibold">
                {item.name}
            </h3>

            {item.description && (
                <div
                    className="flex flex-col gap-2 max-sm:text-sm mt-2 max-sm:mt-1"
                    dangerouslySetInnerHTML={{
                        __html: item.description,
                    }}
                ></div>
            )}
        </div>
    );
};

export default HomeTeamCard;

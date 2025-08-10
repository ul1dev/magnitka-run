'use client';

import { FC } from 'react';
import { Race } from '../home/types';
import { formatTextToHtml } from '@/assets/format-text-to-html';

import styles from './RaceInfo.module.scss';

interface Props {
    race: Race;
}

const RaceInfoAbout: FC<Props> = ({ race }) => {
    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="about"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                О забеге
            </h2>
            <div className="flex flex-col gap-5 max-sm:gap-3">
                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                    <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                        {race.title}
                    </h3>
                    <div
                        className={`${styles.listedText} flex flex-col gap-2 max-sm:text-sm`}
                        dangerouslySetInnerHTML={{
                            __html: formatTextToHtml(race.description),
                        }}
                    ></div>
                </div>
            </div>
        </section>
    );
};

export default RaceInfoAbout;

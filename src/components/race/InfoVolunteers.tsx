'use client';

import Link from 'next/link';
import { FC } from 'react';

const RaceInfoVolunteers: FC = () => {
    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="volunteers"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Волонтерам
            </h2>
            <div className="flex flex-col gap-5 max-sm:gap-3">
                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 max-sm:text-lg max-sm:mb-3">
                        Стать волонтёром
                    </h3>
                    <div className="max-sm:text-sm">
                        Набор волонтёров{' '}
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfODT3RwzPnemfOHKCWMLsBWPp8DQgAET24JuJn8Othr0XFqQ/viewform"
                            className="text-[#e62229] underline"
                            target="_blank"
                        >
                            открыт.
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RaceInfoVolunteers;

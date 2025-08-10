'use client';

import classNames from 'classnames';
import { FC } from 'react';

interface Props {
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    children: React.ReactNode;
    isBigOnSm?: boolean;
}

const CardBtn: FC<Props> = ({
    bgColor,
    textColor = '#000000',
    borderColor,
    children,
    isBigOnSm,
}) => {
    return (
        <button
            className={classNames(
                `cursor-pointer rounded-full font-semibold
                text-2xl py-3 px-16 min-w-62
                max-2xl:text-xl max-2xl:py-2 max-2xl:px-12 max-2xl:min-w-50
                max-xl:text-lg max-xl:py-1.5 max-xl:min-w-48
                max-lg:text-2xl max-lg:py-3 max-lg:px-16 max-lg:min-w-62
                max-md:text-xl max-md:py-2 max-md:px-12 max-md:min-w-50`,
                {
                    'border-2 max-2xl:border': borderColor,
                    [`max-sm:text-xl max-sm:py-3 max-sm:px-4 max-sm:w-full max-sm:min-w-20
                      max-[550px]:!text-lg max-[550px]:!py-2
                      max-[500px]:!text-base max-[500px]:!py-1.5`]: isBigOnSm,
                    [`max-sm:text-lg max-sm:py-1.5 max-sm:min-w-48
                max-[500px]:!text-base max-[500px]:!px-10 max-[500px]:!min-w-40
                max-[400px]:!text-sm max-[400px]:!px-8 max-[400px]:!min-w-34`]:
                        !isBigOnSm,
                }
            )}
            style={{
                backgroundColor: bgColor || 'transparent',
                borderColor: borderColor || 'transparent',
                color: textColor,
            }}
        >
            {children}
        </button>
    );
};

export default CardBtn;

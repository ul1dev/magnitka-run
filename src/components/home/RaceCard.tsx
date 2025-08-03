'use client';

import Link from 'next/link';
import CardBtn from './CardBtn';
import { Race } from './types';
import { FC } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { formatTextToHtml } from '@/assets/format-text-to-html';

interface Props {
    item: Race;
}

const RaceCard: FC<Props> = ({ item }) => {
    const router = useRouter();

    const {
        id,
        cardTitle,
        cardDates,
        isRegBtn,
        regBtnUrl,
        regBtnTextColor,
        regBtnBgColor,
        regBtnBorderColor,
        isMoreBtn,
        moreBtnTextColor,
        moreBtnBgColor,
        moreBtnBorderColor,
        bgColor,
        cardBgImg,
        btnsPosition,
    } = item;

    const [yPos, xPos] = btnsPosition?.split('-') || [];

    const raceUrl = `/races/${id}`;

    const handleClick = () => {
        if (isMoreBtn) {
            router.push(raceUrl);
        }
    };

    return (
        <div
            className={classNames(
                'w-full h-86 max-2xl:h-62 max-lg:h-86 max-md:h-62 max-[550px]:!h-48 bg-cover bg-center rounded-3xl max-2xl:rounded-2xl',
                {
                    'duration-700 hover:scale-102 transition-all cursor-pointer':
                        isMoreBtn,
                }
            )}
            style={{
                backgroundImage: `url(${cardBgImg})`,
                backgroundColor: bgColor,
            }}
            onClick={handleClick}
        >
            <div
                className={classNames('flex h-full', {
                    'justify-between py-24 px-16 max-2xl:py-16 max-xl:px-8 max-lg:py-24 max-lg:px-16 max-md:py-16 max-md:px-8 max-sm:flex-col max-sm:py-8 max-[550px]:!px-4 max-[550px]:!py-6 max-[500px]:!pt-8 max-[500px]:!pb-4':
                        cardTitle,
                    'h-full p-6 max-[500px]:p-4 max-[400px]:p-3': !cardTitle,
                    'justify-end': xPos === 'right',
                    'justify-start': xPos === 'left',
                    'items-start': yPos === 'top',
                    'items-end': yPos === 'bottom',
                    'items-center': btnsPosition === 'center',
                    'justify-center': btnsPosition === 'center',
                })}
            >
                <div className="uppercase text-white font-extrabold">
                    {cardTitle && (
                        <h3
                            className="text-5xl max-[1900px]:text-[38px] max-[1700px]:text-3xl max-[1400px]:text-2xl max-xl:text-xl max-lg:text-4xl max-[850px]:!text-3xl max-[550px]:!text-2xl max-[550px]:leading-6 max-[500px]:!text-xl"
                            dangerouslySetInnerHTML={{
                                __html: formatTextToHtml(cardTitle),
                            }}
                        ></h3>
                    )}
                    {cardDates && (
                        <p
                            className="mt-2 text-4xl max-[1900px]:text-3xl max-[1700px]:text-2xl max-[1400px]:text-xl max-xl:text-lg max-lg:text-3xl max-[850px]:!text-2xl max-[550px]:!text-xl max-[550px]:leading-5 max-[500px]:!text-lg"
                            dangerouslySetInnerHTML={{
                                __html: formatTextToHtml(cardDates),
                            }}
                        ></p>
                    )}
                </div>

                <div
                    className={classNames(
                        'flex sm:flex-col gap-3 max-[500px]:gap-1.5 max-[400px]:gap-1',
                        {
                            'max-sm:mt-6': cardTitle,
                        }
                    )}
                >
                    {isRegBtn && (
                        <Link href={regBtnUrl ?? '#'} className="w-full">
                            <CardBtn
                                borderColor={regBtnBorderColor}
                                textColor={regBtnTextColor}
                                bgColor={regBtnBgColor}
                                isBigOnSm={Boolean(cardTitle)}
                            >
                                Регистрация
                            </CardBtn>
                        </Link>
                    )}

                    {isMoreBtn && (
                        <Link href={raceUrl ?? '#'} className="w-full">
                            <CardBtn
                                borderColor={moreBtnBorderColor}
                                textColor={moreBtnTextColor}
                                bgColor={moreBtnBgColor}
                                isBigOnSm={Boolean(cardTitle)}
                            >
                                Подробнее
                            </CardBtn>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RaceCard;

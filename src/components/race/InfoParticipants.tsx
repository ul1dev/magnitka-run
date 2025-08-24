'use client';

import { FC, useEffect } from 'react';
import { Race } from '../home/types';
import { formatTextToHtml } from '@/assets/format-text-to-html';

import styles from './RaceInfo.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { Fancybox } from '@fancyapps/ui/dist/fancybox';

interface Props {
    race: Race;
}

const RaceInfoParticipants: FC<Props> = ({ race }) => {
    useEffect(() => {
        Fancybox.bind('[data-fancybox]', {});
        return () => Fancybox.destroy();
    }, []);

    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="participants"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Участникам
            </h2>

            <div className="flex flex-col gap-5 max-sm:gap-3">
                {race.dateAndPlaceText && (
                    <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                        <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                            Дата и место проведения
                        </h3>
                        <div
                            className={`${styles.listedText} flex flex-col gap-2 max-sm:text-sm`}
                            dangerouslySetInnerHTML={{
                                __html: formatTextToHtml(race.dateAndPlaceText),
                            }}
                        ></div>
                    </div>
                )}

                {(race.routesText || race.routesImgs?.length) && (
                    <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                        <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                            Маршрут
                        </h3>

                        <div className="flex flex-col gap-4 max-sm:gap-3">
                            {race.routesImgs?.length && (
                                <div className="flex justify-between flex-wrap gap-4 max-sm:gap-2">
                                    {race.routesImgs.map((img, i) => (
                                        <Link
                                            key={i}
                                            href={img}
                                            data-fancybox="gallery"
                                            className="w-full"
                                        >
                                            <Image
                                                src={img}
                                                alt={`route-image-${i}`}
                                                width={300}
                                                height={200}
                                                className="object-cover w-full"
                                                unoptimized
                                            />
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {race.routesText && (
                                <div
                                    className={`${styles.listedText} flex flex-col gap-2 max-sm:text-sm`}
                                    dangerouslySetInnerHTML={{
                                        __html: formatTextToHtml(
                                            race.routesText
                                        ),
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                )}

                {(race.participantPackageImgs?.length ||
                    race.participantPackageText) && (
                    <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                        <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                            Пакет участника
                        </h3>

                        <div className="flex flex-col gap-4 max-sm:gap-3">
                            {race.participantPackageImgs?.length && (
                                <div className="flex flex-wrap gap-4 max-sm:gap-2">
                                    {race.participantPackageImgs.map(
                                        (img, i) => (
                                            <Link
                                                key={i}
                                                href={img}
                                                data-fancybox="gallery"
                                                className="w-82 max-sm:w-62 max-[500px]:!w-full"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`participant-image-${i}`}
                                                    width={300}
                                                    height={200}
                                                    className="object-cover w-full"
                                                    unoptimized
                                                />
                                            </Link>
                                        )
                                    )}
                                </div>
                            )}

                            {race.participantPackageText && (
                                <div
                                    className={`${styles.listedText} flex flex-col gap-2 max-sm:text-sm`}
                                    dangerouslySetInnerHTML={{
                                        __html: formatTextToHtml(
                                            race.participantPackageText
                                        ),
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                )}

                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                    <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                        Как зарегистрироваться?
                    </h3>
                    <ol className="list-disc pl-5 max-sm:text-sm">
                        <li>
                            Пройти онлайн регистрацию на сайте{' '}
                            <Link
                                href={race.regBtnUrl ?? '#'}
                                className="text-[#e62229] underline"
                                target="_blank"
                            >
                                Myrace
                            </Link>
                        </li>
                        <li>
                            Подать заявку на участие непосредственно самим
                            участником{' '}
                            <span className="text-[#737373]">
                                (либо законным представителем)
                            </span>
                        </li>
                        <li>
                            Внести организационный взнос на сайте{' '}
                            <Link
                                href={race.regBtnUrl ?? '#'}
                                className="text-[#e62229] underline"
                                target="_blank"
                            >
                                Myrace
                            </Link>
                            .{' '}
                            <span className="text-[#737373]">
                                Регистрируясь и оплачивая стартовый взнос
                                (приобретение билета), участник соглашается на
                                обработку персональных данных
                            </span>
                        </li>
                        <li>Получить стартовый пакет</li>
                        <li>
                            Предъявить документы:
                            <ul className="list-decimal ml-5 my-1 text-[#737373]">
                                <li>
                                    Удостоверение личности (паспорт/водительское
                                    удостоверение)
                                </li>
                                <li>Медицинскую справку</li>
                                <li>Спортивную страховку</li>
                            </ul>
                        </li>
                        <li>
                            Ознакомиться и согласиться с{' '}
                            <Link
                                href={
                                    'https://drive.google.com/file/d/1HaLyZpEv4-SQ3Cw8iYjaowdiWdjk3JsB/view'
                                }
                                className="text-[#e62229] underline"
                                target="_blank"
                            >
                                Положением
                            </Link>
                        </li>
                    </ol>
                </div>

                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                    <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                        Организационный взнос
                    </h3>
                    <div className="max-sm:text-sm">
                        Размер организационного взноса зависит от дистанции,
                        формата участия и типа выбранного билета участником
                        мероприятия. Стоимость взноса может меняться в
                        зависимости от даты приобретения билета.
                    </div>
                </div>

                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                    <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                        Условия возврата и переноса
                    </h3>
                    <ol className="list-disc pl-5 max-sm:text-sm">
                        <li>
                            Участник имеет право отказаться от участия в
                            мероприятии и потребовать возврат организационного
                            взноса (если возможность возврат билета
                            предусмотрена категорией билета), за исключением
                            комиссии запользование платёжной системы и услуг
                            билетного агрегатора. Размеркомиссии указан на сайте{' '}
                            <Link
                                href={race.regBtnUrl ?? '#'}
                                className="text-[#e62229] underline"
                                target="_blank"
                            >
                                Myrace.info
                            </Link>
                        </li>
                        <li>
                            Отказ от участия с последующим возвратом стоимости
                            билета возможно непозднее, чем за 10 дней до даты
                            проведения мероприятия.
                        </li>
                        <li>
                            Участник имеет право, в случае невозможности участия
                            (болезнь и иные причины) в Забеге, передать право
                            участия другому лицу не позднее чем за 10 (десять)
                            календарных дней до проведения, на сайте{' '}
                            <Link
                                href={race.regBtnUrl ?? '#'}
                                className="text-[#e62229] underline"
                                target="_blank"
                            >
                                Myrace.info
                            </Link>
                        </li>
                    </ol>
                </div>

                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg">
                    <h3 className="text-xl max-sm:text-lg font-semibold mb-4 max-sm:mb-3">
                        Медицинские требования
                    </h3>
                    <ol className="list-disc pl-5 max-sm:text-sm">
                        <li>
                            Для допуска к участию в забеге необходимо
                            предоставить медицинскую справку
                        </li>
                        <li>
                            Справка должна быть выдана учреждением с лицензией
                            на осуществление медицинской деятельности
                        </li>
                        <li>
                            Содержит печать медицинского учреждения, подпись и
                            печать врача, дату выдачи, Ф.И.О. участника
                        </li>
                        <li>
                            Подтверждает наличие у участника спортивного
                            мероприятия 1 или 2 группы здоровья, либо оформлена
                            по форме из Приложения Nº2 к Приказу Минздрава РФ
                            Nº1144н от 23.10.2020 г.
                        </li>
                        <li>
                            Справка действительна в день забега, в течение
                            указанного в ней срока, но не более 1 года с даты
                            выдачи
                        </li>
                        <li>
                            Участник должен оставить справку в обмен на
                            стартовый номер участника. Забрать справку после
                            забега нельзя. Копия медицинской справки принимается
                            только, если участник предъявит оригинал
                        </li>
                        <li>
                            При этом участник принимает на себя всю
                            ответственность за подлинность медицинской справки,
                            получение ее в установленном законом порядке на
                            основании проведенного медицинского обследования в
                            уполномоченном медицинском учреждении и относит на
                            себя все негативные последствие связанные с
                            нарушением данного условия.
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default RaceInfoParticipants;

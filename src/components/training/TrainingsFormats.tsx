'use client';

import Image from 'next/image';
import { FC } from 'react';

import img1 from '@/app/static/images/_17.jpg.webp';
import img2 from '@/app/static/images/_18.jpg.webp';
import img3 from '@/app/static/images/_19.jpg.webp';
import img4 from '@/app/static/images/_20.jpg.webp';
import Link from 'next/link';

const TrainingTrainingsFormats: FC = () => {
    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="formats"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Форматы тренировок
            </h2>

            <div className="flex flex-col gap-5 max-sm:gap-3">
                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col">
                    <Image
                        src={img1}
                        alt="personal-trainings"
                        className="w-full rounded-lg"
                    />

                    <h3 className="text-2xl max-sm:text-xl font-semibold mb-2 max-sm:mb-1 mt-5 max-sm:mt-4">
                        Индивидуальные тренировки
                    </h3>
                    <div className="flex flex-col gap-2 max-sm:text-sm">
                        <p>
                            Разовые занятия или полноценный план подготовки с
                            тренером бегового движения «Азия-Европа». <br />
                            Разнообразные варианты взаимодействия: консультации
                            по подготовке к конкретной дистанции, определение
                            текущего уровня готовности и составление
                            индивидуальной программы, включение силовой
                            подготовки бегуна в тренировочный процесс.
                        </p>
                        <p>
                            Даты и время проведения тренировок согласуем с вашим
                            графиком.
                        </p>
                    </div>

                    <Link
                        href="/training/signup"
                        className="w-full text-center max-sm:rounded-xl rounded-2xl bg-[#ea0029] max-sm:text-base max-2xl:text-xl text-2xl text-white font-semibold max-sm:px-22 max-sm:py-3 max-2xl:px-24 max-2xl:py-4 px-26 py-5 hover:bg-[#d10026] transition-colors duration-300 mt-10 max-sm:mt-8"
                    >
                        Записаться
                    </Link>
                </div>
                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col">
                    <Image
                        src={img2}
                        alt="personal-trainings"
                        className="w-full rounded-lg"
                    />

                    <h3 className="text-2xl max-sm:text-xl font-semibold mb-2 max-sm:mb-1 mt-5 max-sm:mt-4">
                        Групповые тренировки
                    </h3>
                    <div className="flex flex-col gap-2 max-sm:text-sm">
                        <p>
                            Тренировки в группе – классный формат, позволяющий
                            чувствовать себя частью нашего бегового движения.
                            Совместные занятия повышают мотивацию спортсменов и
                            снижают воспринимаемые усилия.
                        </p>
                        <p>
                            Мы обязательно сообщим о таких событиях в социальных
                            сетях. Не пропустите анонсы наших групповых занятий!
                        </p>
                    </div>

                    <Link
                        href="/training/signup"
                        className="w-full text-center max-sm:rounded-xl rounded-2xl bg-[#ea0029] max-sm:text-base max-2xl:text-xl text-2xl text-white font-semibold max-sm:px-22 max-sm:py-3 max-2xl:px-24 max-2xl:py-4 px-26 py-5 hover:bg-[#d10026] transition-colors duration-300 mt-10 max-sm:mt-8"
                    >
                        Записаться
                    </Link>
                </div>
                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col">
                    <Image
                        src={img3}
                        alt="personal-trainings"
                        className="w-full rounded-lg"
                    />

                    <h3 className="text-2xl max-sm:text-xl font-semibold mb-2 max-sm:mb-1 mt-5 max-sm:mt-4">
                        Дистанционные тренировки
                    </h3>
                    <div className="flex flex-col gap-2 max-sm:text-sm">
                        <p>
                            Тренировки «онлайн» - один из самых популярных
                            форматов взаимодействия. <br />
                            Вы не привязаны к локации и времени тренировок, но
                            при этом индивидуальный подход при составлении
                            программы, качественная обратная связь и
                            корректировка плана доступны в этом формате
                            взаимодействия.
                        </p>
                        <p>Подходит бегунам любого уровня.</p>
                    </div>

                    <Link
                        href="/training/signup"
                        className="w-full text-center max-sm:rounded-xl rounded-2xl bg-[#ea0029] max-sm:text-base max-2xl:text-xl text-2xl text-white font-semibold max-sm:px-22 max-sm:py-3 max-2xl:px-24 max-2xl:py-4 px-26 py-5 hover:bg-[#d10026] transition-colors duration-300 mt-10 max-sm:mt-8"
                    >
                        Записаться
                    </Link>
                </div>
                <div className="border border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col">
                    <Image
                        src={img4}
                        alt="personal-trainings"
                        className="w-full rounded-lg"
                    />

                    <h3 className="text-2xl max-sm:text-xl font-semibold mb-2 max-sm:mb-1 mt-5 max-sm:mt-4">
                        Корпоративные тренировки
                    </h3>
                    <div className="flex flex-col gap-2 max-sm:text-sm">
                        <p>
                            Инвестиция в будущее Вашей компании начинается с
                            инвестиций в спорт!
                        </p>
                        <p>
                            Компании, которые вкладываются в спортивные
                            программы для своих сотрудников, получают не только
                            энергичных и мотивированных работников, но и
                            сплоченную команду. Физическая активность помогает
                            снизить стресс, укрепить иммунитет и повысить
                            продуктивность. Совместные тренировки формируют
                            командный дух.
                        </p>
                        <p>
                            Корпоративный спорт — это не просто про здоровье.
                            Это про эффективность, мотивацию и лояльность ваших
                            сотрудников. Выигрывают все! 💪🚀
                        </p>
                        <p>
                            Присоединяйтесь к культурному движению, инвестируйте
                            в спорт и увидите, как ваша команда станет еще
                            сильнее и успешнее!
                        </p>
                    </div>

                    <Link
                        href="/training/signup"
                        className="w-full text-center max-sm:rounded-xl rounded-2xl bg-[#ea0029] max-sm:text-base max-2xl:text-xl text-2xl text-white font-semibold max-sm:px-22 max-sm:py-3 max-2xl:px-24 max-2xl:py-4 px-26 py-5 hover:bg-[#d10026] transition-colors duration-300 mt-10 max-sm:mt-8"
                    >
                        Записаться
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TrainingTrainingsFormats;

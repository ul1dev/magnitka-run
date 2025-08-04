'use client';

import Link from 'next/link';
import { FC, useRef, useState, useEffect } from 'react';

const TrainingFAQ: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    const toggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(
                isOpen ? `${contentRef.current.scrollHeight}px` : '0px'
            );
        }
    }, [isOpen]);

    return (
        <div
            className="bg-white cursor-pointer rounded-2xl max-sm:rounded-xl mt-24 max-xl:mt-16 max-lg:mt-12 max-sm:mt-8 mb-28 max-xl:mb-20 max-lg:mb-18 max-sm:mb-14 p-6 max-sm:p-4 max-w-5xl mx-auto max-[1100px]:!mx-10 max-[640px]:!mx-5 max-[450px]:!mx-2"
            onClick={toggle}
        >
            <div className="flex justify-between items-center select-none">
                <h2 className="text-2xl font-semibold max-sm:text-xl">
                    Как записаться на тренировку?
                </h2>
                <div
                    className={`transform transition-transform duration-300 hover:bg-gray-100 rounded-full ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-9 h-9 max-sm:w-7 max-sm:w-7"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            </div>

            <div
                ref={contentRef}
                style={{ maxHeight }}
                className="overflow-hidden transition-[max-height] duration-300 ease-out text-gray-700"
            >
                <div className="mt-4 max-sm:mt-2 max-sm:text-sm">
                    <p>
                        Чтобы записаться на тренировку, выполните следующие
                        шаги:
                    </p>
                    <ul className="list-decimal list-outside pl-5">
                        <li>Выберите направление</li>
                        <li>
                            Ознакомьтесь с нашими программами тренировок в
                            разделе Беговая подготовка.
                        </li>
                        <li>
                            <p>
                                Выберите подходящий для тебя формат тренировок
                            </p>
                            <p>Вы можете записаться:</p>
                            <ol className="list-disc list-outside pl-5">
                                <li>
                                    Через онлайн-форму на сайте.{' '}
                                    <Link
                                        href="/training/signup"
                                        className="text-[#e62229] underline"
                                        target="_blank"
                                    >
                                        Записаться
                                    </Link>
                                    ;
                                </li>
                                <li>
                                    По телефону, указанному в разделе Контакты;
                                </li>
                                <li>
                                    Через мессенджеры (WhatsApp / Telegram),
                                    если они подключены.
                                </li>
                            </ol>
                        </li>
                        <li>
                            Подтвердите запись заполнив небольшую форму для
                            обратной связи.
                        </li>
                        <li>
                            После отправки заявки наш менеджер свяжется с вами
                            для подтверждения времени и даты.
                        </li>
                        <li>
                            <p>Приходите на тренировку!</p>
                            <p>
                                Возьмите с собой спортивную форму и хорошее
                                настроение 😊
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TrainingFAQ;

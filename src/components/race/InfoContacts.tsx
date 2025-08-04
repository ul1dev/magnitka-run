'use client';

import Link from 'next/link';
import { FC } from 'react';

const RaceInfoContacts: FC = () => {
    return (
        <section
            className="scroll-mt-34 max-xl:scroll-mt-28 max-lg:scroll-mt-24 max-sm:scroll-mt-20"
            id="contacts"
        >
            <h2 className="font-extrabold text-3xl mb-4 max-sm:text-2xl max-sm:mb-3">
                Контакты
            </h2>
            <div className="flex flex-col gap-5 max-sm:gap-3">
                <div className="border-1 border-[#EEEEEE] p-8 max-sm:p-4 rounded-lg flex flex-col gap-5 max-sm:gap-3">
                    <div>
                        <h3 className="text-xl font-semibold mb-3 max-sm:text-lg max-sm:mb-1">
                            Телефон
                        </h3>
                        <Link
                            href="tel:79128050814"
                            className="text-[#003593] font-extrabold text-lg max-sm:text-base"
                            target="_blank"
                        >
                            +7 912 805 08 14
                        </Link>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 max-sm:text-lg max-sm:mb-1">
                            Электронная почта
                        </h3>
                        <Link
                            href="mailto:Asiaeuropemgn@gmail.com"
                            className="text-[#003593] font-extrabold text-lg max-sm:text-base"
                            target="_blank"
                        >
                            Asiaeuropemgn@gmail.com
                        </Link>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 max-sm:text-lg max-sm:mb-1">
                            Почтовый адрес
                        </h3>
                        <p className="text-[#003593] font-extrabold text-lg max-sm:text-base">
                            пр. К Маркса, д. 168А, пом. 7, г. Магнитогорск
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 max-sm:text-lg max-sm:mb-1">
                            Телеграм канал
                        </h3>
                        <Link
                            href="https://t.me/Asiaeuropemgn"
                            className="text-[#003593] font-extrabold text-lg max-sm:text-base"
                            target="_blank"
                        >
                            @Asiaeuropemgn
                        </Link>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 max-sm:text-lg max-sm:mb-1">
                            Група VK
                        </h3>
                        <Link
                            href="https://vk.com/aemgn"
                            className="text-[#003593] font-extrabold text-lg max-sm:text-base"
                            target="_blank"
                        >
                            @aemgn
                        </Link>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-3 max-sm:text-lg max-sm:mb-1">
                            WhatsApp
                        </h3>
                        <Link
                            href="https://wa.me/79128050814"
                            className="text-[#003593] font-extrabold text-lg max-sm:text-base"
                            target="_blank"
                        >
                            +7 912 805 08 14
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RaceInfoContacts;

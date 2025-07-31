'use client';

import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/app/static/images/logotype.svg';

export default function Footer() {
    return (
        <footer className="bg-[#003593] rounded-t-[50px] max-2xl:rounded-t-4xl max-lg:rounded-t-3xl px-8 max-lg:px-4 pt-16 max-[500px]:!pb-10 max-xl:pb-20 pb-28 text-white">
            <div className="flex max-md:flex-col max-md:gap-10 max-lg:gap-14 max-xl:gap-20 gap-28 max-md:max-w-md max-md:mx-auto">
                <div className="flex flex-col items-start justify-between">
                    <Image
                        src={logoImg}
                        alt="Азия‑Европа Полумарафон"
                        width={240}
                        height={48}
                        className="max-[400px]:!w-3xs max-[500px]:!w-2xs max-md:w-xs max-lg:w-3xs max-xl:w-xs w-sm max-md:mx-auto"
                    />
                    <h2 className="hidden md:block max-lg:text-3xl max-xl:text-[42px] text-5xl font-extrabold mt-6">
                        #КУЛЬТУРАБЕГА
                    </h2>
                </div>

                <div className="flex md:flex-col max-[500px]:gap-4 gap-8 justify-between break-all max-xl:text-sm max-lg:text-xs max-md:text-base max-[500px]:!text-sm max-[440px]:!text-xs">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="/">Забеги</Link>
                        </li>
                        <li>
                            <Link href="/training">Тренировки</Link>
                        </li>
                        <li>
                            <Link href="/shop">Фирменный магазин</Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="/">Политика конфиденциальности</Link>
                        </li>
                        <li>
                            <Link href="/">Пользовательское соглашение</Link>
                        </li>
                    </ul>
                </div>

                <div className="flex md:flex-col max-[500px]:gap-4 gap-8 justify-between break-all max-xl:text-sm max-lg:text-xs max-md:text-base max-[500px]:!text-sm max-[440px]:!text-xs">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="mailto:Asiaeuropemgn@gmail.com">
                                Asiaeuropemgn@gmail.com
                            </Link>
                        </li>
                        <li>09:00–18:00</li>
                        <li>
                            <Link href="tel:+79128050814">
                                +7 912 805 08 14
                            </Link>
                        </li>
                        <li>выходной воскресенье</li>
                    </ul>
                    <ul className="flex flex-col gap-2">
                        <li>пр. К Маркса, д. 168А, пом. 7</li>
                        <li>г. Магнитогорск</li>
                    </ul>
                </div>

                <div className="md:hidden text-center min-[400px]:mt-2">
                    <h2 className="text-4xl max-[500px]:text-3xl max-[400px]:text-2xl font-extrabold">
                        #КУЛЬТУРАБЕГА
                    </h2>
                </div>
            </div>
        </footer>
    );
}

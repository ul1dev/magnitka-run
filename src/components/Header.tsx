'use client';

import Image from 'next/image';

import logoIcon from '@/app/static/images/logo_blue.svg';
import Link from 'next/link';

const Header = () => {
    return (
        <header
            className="bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] py-3 px-8 rounded-lg flex justify-between items-center fixed top-0 left-0 right-0 my-6 mx-8"
            style={{ zIndex: 1000 }}
        >
            <Link href="/">
                <Image
                    src={logoIcon}
                    alt="logo"
                    width={65}
                    height={40}
                    className="w-22"
                />
            </Link>

            <ul className="flex gap-6 text-lg -mr-28">
                <Link href="/">
                    <li>Наши забеги</li>
                </Link>
                <Link href="/training">
                    <li>Беговая подготовка</li>
                </Link>
                <Link href="/shop">
                    <li>Магазин</li>
                </Link>
            </ul>

            <Link
                href="https://myrace.info/events/1056"
                className="rounded-2xl bg-[#ea0029] text-2xl text-white font-semibold px-22 py-5 hover:bg-[#d10026] transition-colors duration-300"
            >
                Регистрация
            </Link>
        </header>
    );
};

export default Header;

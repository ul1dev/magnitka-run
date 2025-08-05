'use client';

import Image from 'next/image';

import logoIcon from '@/app/static/images/logo_blue.svg';
import Link from 'next/link';
import HamburgerButton from './HamburgerButton';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <>
            <header className="bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] max-lg:py-5 max-lg:px-6 py-3 px-8 min-lg:rounded-lg flex justify-between items-center fixed top-0 left-0 right-0 max-lg:m-0 max-xl:my-4 max-xl:mx-6 my-6 mx-8 z-50 min-w-xs max-w-[2250px] min-[2350px]:mx-auto">
                <Link href="/">
                    <Image
                        src={logoIcon}
                        alt="logo"
                        width={65}
                        height={40}
                        className="max-lg:w-14 max-xl:w-18 max-2xl:w-20 w-22"
                    />
                </Link>
                <ul className="text-black max-lg:hidden flex gap-6 max-xl:text-sm max-2xl:text-base text-lg -mr-28">
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
                    className="max-lg:hidden max-xl:rounded-xl rounded-2xl bg-[#ea0029] max-xl:text-base max-2xl:text-xl text-2xl text-white font-semibold max-xl:px-18 max-xl:py-3 max-2xl:px-20 max-2xl:py-4 px-22 py-5 hover:bg-[#d10026] transition-colors duration-300"
                >
                    Регистрация
                </Link>

                <HamburgerButton
                    onClick={() => setMenuOpen(true)}
                    className="lg:!hidden"
                />
            </header>

            <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
};

export default Header;

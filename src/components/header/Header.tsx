'use client';

import Image from 'next/image';
import logoIcon from '@/app/static/images/logo_blue.svg';
import Link from 'next/link';
import HamburgerButton from './HamburgerButton';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
import { useCart } from '@/store/useCart';
import { usePathname } from 'next/navigation';

const API_BASE =
    (process.env.NEXT_PUBLIC_API_BASE || '').replace(/\/$/, '') || '';

const DEFAULT_REG_LINK = 'https://myrace.info/events/1056';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { itemsLength: cartItemsLength } = useCart();
    const pathname = usePathname();

    const [regLink, setRegLink] = useState<string>(DEFAULT_REG_LINK);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    useEffect(() => {
        let aborted = false;

        async function load() {
            if (!API_BASE) return;
            try {
                const res = await fetch(`${API_BASE}/main-options`, {
                    cache: 'no-store',
                });
                if (!res.ok) return;
                const data: { regLink?: string } = await res.json();
                const link = data?.regLink;
                if (
                    !aborted &&
                    typeof link === 'string' &&
                    /^https?:\/\//i.test(link)
                ) {
                    setRegLink(link);
                }
            } catch {}
        }

        load();
        return () => {
            aborted = true;
        };
    }, []);

    return (
        <>
            <header className="bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] max-lg:py-5 max-lg:px-6 py-3 px-8 min-lg:rounded-lg flex justify-between items-center fixed top-0 left-0 right-0 max-lg:m-0 max-xl:my-4 max-xl:mx-6 my-6 mx-8 z-50 min-w-xs max-w-[2250px] min-[2350px]:mx-auto">
                {cartItemsLength > 0 && pathname.includes('/shop') && (
                    <Link
                        href="/shop/cart"
                        className="lg:hidden bg-[#003593] hover:bg-[#002b76] transition-colors duration-300 relative p-2 rounded-md"
                    >
                        <div className="absolute -top-1.5 -right-1.5 bg-[#ea0029] rounded-full text-white px-1.5 pt-0.5 text-[10px]">
                            {cartItemsLength}
                        </div>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_6372_11991)">
                                <path
                                    d="M14.6667 6.00001H11.4734L8.55341 1.62668C8.42675 1.44001 8.21342 1.34668 8.00008 1.34668C7.78675 1.34668 7.57341 1.44001 7.44675 1.63335L4.52675 6.00001H1.33341C0.966748 6.00001 0.666748 6.30001 0.666748 6.66668C0.666748 6.72668 0.673415 6.78668 0.693415 6.84668L2.38675 13.0267C2.54008 13.5867 3.05341 14 3.66675 14H12.3334C12.9467 14 13.4601 13.5867 13.6201 13.0267L15.3134 6.84668L15.3334 6.66668C15.3334 6.30001 15.0334 6.00001 14.6667 6.00001ZM8.00008 3.20001L9.86675 6.00001H6.13341L8.00008 3.20001ZM12.3334 12.6667L3.67341 12.6733L2.20675 7.33335H13.8001L12.3334 12.6667ZM8.00008 8.66668C7.26675 8.66668 6.66675 9.26668 6.66675 10C6.66675 10.7333 7.26675 11.3333 8.00008 11.3333C8.73341 11.3333 9.33342 10.7333 9.33342 10C9.33342 9.26668 8.73341 8.66668 8.00008 8.66668Z"
                                    fill="#FFFFFF"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_6372_11991">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Link>
                )}

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

                {cartItemsLength > 0 && pathname.includes('/shop') ? (
                    <Link
                        href="/shop/cart"
                        className="max-lg:hidden max-xl:rounded-xl rounded-2xl bg-[#003593] max-xl:text-base max-2xl:text-xl text-2xl text-white font-semibold max-xl:px-18 max-xl:py-3 max-2xl:px-20 max-2xl:py-4 px-22 py-5 hover:bg-[#002b76] transition-colors duration-300 relative"
                    >
                        <div className="absolute -top-1 -right-1 bg-[#ea0029] rounded-full text-sm text-white max-2xl:text-xs px-2.5 py-0.5 max-2xl:px-2 max-2xl:pt-1">
                            {cartItemsLength}
                        </div>
                        Корзина
                    </Link>
                ) : (
                    <Link
                        href={regLink || DEFAULT_REG_LINK}
                        className="max-lg:hidden max-xl:rounded-xl rounded-2xl bg-[#ea0029] max-xl:text-base max-2xl:text-xl text-2xl text-white font-semibold max-xl:px-18 max-xl:py-3 max-2xl:px-20 max-2xl:py-4 px-22 py-5 hover:bg-[#d10026] transition-colors duration-300"
                        target="_blank"
                    >
                        Регистрация
                    </Link>
                )}

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

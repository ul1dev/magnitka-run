'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TelegramIcon from '@/components/icons/TelegramIcon';
import VKIcon from '@/components/icons/VKIcon';
import ChatIcon from '@/components/icons/ChatIcon';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Забеги' },
        { href: '/training', label: 'Тренировки' },
        { href: '/shop', label: 'Магазин' },
    ];

    return (
        <div
            className={`fixed inset-0 z-[100] flex ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
        >
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isOpen ? 'opacity-50' : 'opacity-0'
                }`}
                onClick={onClose}
            />

            <aside
                className={`
          relative
          ml-auto
          h-full
          w-[300px]
          bg-[#003593]
          transform
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col
        `}
            >
                <div className="flex items-center justify-end p-3">
                    <button
                        onClick={onClose}
                        aria-label="Close menu"
                        className="cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <nav className="px-6 py-2 flex-1">
                    <ul className="space-y-3 text-white text-xl">
                        {navItems.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`
                    block
                    transition-opacity
                    duration-200
                    ${pathname === href ? 'opacity-70' : 'opacity-100'}
                  `}
                                    onClick={onClose}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="px-6 pb-6">
                    <div className="flex mb-5 gap-5">
                        <Link
                            href="https://t.me/Asiaeuropemgn"
                            className="w-[30px] h-[30px]"
                            target="_blank"
                        >
                            <TelegramIcon />
                        </Link>
                        <Link
                            href="https://vk.com/aemgn"
                            className="w-[30px] h-[30px]"
                            target="_blank"
                        >
                            <VKIcon />
                        </Link>
                        <Link
                            href="https://t.me/ae_mgn"
                            className="w-[30px] h-[30px]"
                            target="_blank"
                        >
                            <ChatIcon />
                        </Link>
                    </div>
                    <p className="text-white text-xs">
                        © {new Date().getUTCFullYear()} Азия-Европа
                    </p>
                </div>
            </aside>
        </div>
    );
}

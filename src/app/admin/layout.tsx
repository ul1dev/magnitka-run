import SecretGate from '@/components/admin/SecretGate';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SecretGate>
            <div className="grid md:grid-cols-[220px_1fr] gap-6">
                <aside className="rounded-2xl border bg-white p-4">
                    <nav className="flex flex-col gap-2 max-md:gap-4 max-md:items-center">
                        <Link href="/admin" className="hover:underline">
                            Панель управления
                        </Link>
                        <Link
                            href="/admin/main-page"
                            className="hover:underline"
                        >
                            Главная
                        </Link>
                        <Link
                            href="/admin/main-options"
                            className="hover:underline"
                        >
                            Общие параметры
                        </Link>
                        <Link href="/admin/races" className="hover:underline">
                            Забеги
                        </Link>
                        <Link
                            href="/admin/trainers"
                            className="hover:underline"
                        >
                            Тренеры
                        </Link>
                        <Link
                            href="/admin/pacemakers"
                            className="hover:underline"
                        >
                            Пейсеры
                        </Link>
                        <Link href="/admin/shop" className="hover:underline">
                            Магазин
                        </Link>
                        <Link href="/admin/team" className="hover:underline">
                            Команда
                        </Link>
                    </nav>
                </aside>
                <main>{children}</main>
            </div>
        </SecretGate>
    );
}

'use client';

import {
    getAdminSecret,
    setAdminSecret,
    clearAdminSecret,
} from '@/lib/admin-api';
import { useEffect, useState } from 'react';

export default function SecretGate({
    children,
}: {
    children: React.ReactNode;
}) {
    const [secret, setSecretState] = useState<string | null>(null);
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => setSecretState(getAdminSecret()), []);

    const expected = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '').trim();

    const tryLogin = () => {
        const input = value.trim();
        if (!expected) {
            setError('Пароль не задан в .env');
            return;
        }
        if (!input) {
            setError('Введите пароль');
            return;
        }
        if (input !== expected) {
            setError('Неверный пароль');
            return;
        }
        // ок
        setError(null);
        setAdminSecret(input);
        setSecretState(input);
    };

    if (!secret) {
        return (
            <div className="max-w-lg mx-auto my-52 p-6 rounded-2xl border bg-white">
                <h1 className="text-2xl font-bold mb-4">Вход в админку</h1>
                <input
                    className="w-full border rounded-xl px-3 py-2 mb-2"
                    placeholder="Пароль..."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setError(null);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') tryLogin();
                    }}
                    type="password"
                    autoFocus
                />
                {error && (
                    <div className="text-sm text-red-600 mb-3">{error}</div>
                )}
                <button
                    className="rounded-xl px-4 py-2 bg-black text-white w-full"
                    onClick={tryLogin}
                >
                    Войти
                </button>
            </div>
        );
    }

    return (
        <div className="my-32 max-2xl:my-28 max-xl:my-24 max-lg:my-20 p-4 max-sm:px-1">
            <div className="mb-4 flex items-center gap-3">
                <span className="text-sm opacity-60">Пароль установлен</span>
                <button
                    className="text-sm underline"
                    onClick={() => {
                        clearAdminSecret();
                        location.reload();
                    }}
                >
                    Сбросить
                </button>
            </div>
            {children}
        </div>
    );
}

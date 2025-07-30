'use client';

import Head from 'next/head';
import { FC } from 'react';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const LayoutComponent: FC<LayoutProps> = ({ title, children }) => (
    <>
        <Head>
            <title>{title}</title>
        </Head>

        {children}
    </>
);

export default LayoutComponent;

import type { Metadata } from 'next';
import './styles/globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Беговое сообщество - Азия-Европа в Магнитогорске',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    property="og:url"
                    content="https://xn--80aadgmgkenqn5dg.xn--p1ai"
                />
                <meta property="og:image" content="/static/images/_15.jpg" />
                <link
                    rel="icon"
                    type="image/x-icon"
                    sizes="32x32"
                    href="/static/meta/photo.svg"
                    media="(prefers-color-scheme: light)"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/static/meta/logo.png"
                    media="(prefers-color-scheme: dark)"
                />
                <link
                    rel="apple-touch-icon"
                    type="image/png"
                    href="/static/meta/IMG_6906.PNG"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/static/meta/IMG_6906.PNG"
                />
            </head>
            <body>
                <Header />

                <main>{children}</main>

                <Footer />
            </body>
        </html>
    );
}

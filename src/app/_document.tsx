import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Беговое сообщество - Азия-Европа в Магнитогорске</title>
                <meta
                    property="og:url"
                    content="https://xn--80aadgmgkenqn5dg.xn--p1ai"
                />
                <meta
                    property="og:title"
                    content="Беговое сообщество - Азия-Европа в Магнитогорске"
                />
                <meta property="og:description" content="" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/static/images/_15.jpg" />
                <link rel="canonical" href="/" />
                <meta name="format-detection" content="telephone=no" />
                <meta http-equiv="x-dns-prefetch-control" content="on" />
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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* другие опции конфига */
    images: {
        domains: [
            'wnmarathon.runc.run',
            'runc.run',
            'res.cloudinary.com',
            'shop.runc.run',
            'localhost',
            'магниткабежит.рф',
            'xn--80aadgmgkenqn5dg.xn--p1ai',
        ], // разрешаем подгружать изображения с этого хоста
        // или, если нужен более гибкий контроль:
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: '*.runc.run',
        //         port: '',
        //         pathname: '/**',
        //     },
        // ],
    },
};

export default nextConfig;

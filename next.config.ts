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
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

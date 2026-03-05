import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* другие опции конфига */
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'wnmarathon.runc.run', pathname: '/**' },
            { protocol: 'https', hostname: 'runc.run', pathname: '/**' },
            { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
            { protocol: 'https', hostname: 'shop.runc.run', pathname: '/**' },
            { protocol: 'https', hostname: 'магниткабежит.рф', pathname: '/**' },
            { protocol: 'https', hostname: 'xn--80aadgmgkenqn5dg.xn--p1ai', pathname: '/**' },
            { protocol: 'http', hostname: 'localhost', pathname: '/**' },
            { protocol: 'https', hostname: 'localhost', pathname: '/**' },
        ],
    },
};

export default nextConfig;

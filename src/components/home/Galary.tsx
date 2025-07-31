'use client';

import { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import img1 from '@/app/static/images/_13.jpg.webp';
import img2 from '@/app/static/images/_15.jpg';
import img3 from '@/app/static/images/_20.jpg.webp';
import img4 from '@/app/static/images/ZEA_0745_1.jpg.webp';
import img5 from '@/app/static/images/_5.jpg.webp';
import img6 from '@/app/static/images/_4.jpg.webp';

const topImages = [
    { src: img1, size: 270 },
    { src: img2, size: 270 },
    { src: img3, size: 270 },
    { src: img4, size: 270 },
    { src: img5, size: 350 },
    { src: img6, size: 450 },
];
const bottomImages = [
    { src: img1, size: 270 },
    { src: img2, size: 270 },
    { src: img3, size: 270 },
    { src: img4, size: 270 },
    { src: img5, size: 350 },
    { src: img6, size: 450 },
];

const Galary: FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [reps, setReps] = useState(1);
    const [spacing, setSpacing] = useState(16);

    useEffect(() => {
        const updateSpacing = () => {
            const w = window.innerWidth;
            if (w >= 1024) setSpacing(16);
            else if (w >= 640) setSpacing(12);
            else setSpacing(10);
        };
        updateSpacing();
        window.addEventListener('resize', updateSpacing);
        return () => window.removeEventListener('resize', updateSpacing);
    }, []);

    const singleWidthTop =
        topImages.reduce((sum, img) => sum + img.size, 0) +
        spacing * (topImages.length - 1);
    const singleWidthBottom =
        bottomImages.reduce((sum, img) => sum + img.size, 0) +
        spacing * (bottomImages.length - 1);

    useEffect(() => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        const needed = Math.ceil(containerWidth / singleWidthTop) + 1;
        setReps(needed);
    }, [singleWidthTop]);

    const baseTop = Array.from({ length: reps }).flatMap(() => topImages);
    const fullTop = [...baseTop, ...baseTop];
    const baseBottom = Array.from({ length: reps }).flatMap(() => bottomImages);
    const fullBottom = [...baseBottom, ...baseBottom];

    const cycleWidthTop = singleWidthTop * reps;
    const cycleWidthBottom = singleWidthBottom * reps;

    return (
        <div className="pt-40 pb-20">
            <h2 className="font-extrabold uppercase text-center text-7xl max-2xl:text-5xl max-lg:text-4xl max-[500px]:text-3xl max-[450px]:text-2xl max-[360px]:text-xl">
                Галерея моментов
            </h2>

            <div className="mt-10 space-y-6 max-lg:space-y-4">
                <div ref={containerRef} className="relative overflow-hidden">
                    <div className="flex whitespace-nowrap animate-top">
                        {fullTop.map((img, idx) => (
                            <Image
                                key={idx}
                                src={img.src}
                                alt={`Moment ${idx}`}
                                width={img.size}
                                height={340}
                                style={{ marginRight: `${spacing}px` }}
                                className="object-cover flex-shrink-0 rounded-2xl"
                            />
                        ))}
                    </div>
                </div>

                {/* Нижний ряд: слева направо */}
                <div ref={containerRef} className="relative overflow-hidden">
                    <div className="flex whitespace-nowrap animate-bottom">
                        {fullBottom.map((img, idx) => (
                            <Image
                                key={idx + fullBottom.length}
                                src={img.src}
                                alt={`Moment reverse ${idx}`}
                                width={img.size}
                                height={340}
                                style={{ marginRight: `${spacing}px` }}
                                className="object-cover flex-shrink-0 rounded-2xl"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-top {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-${cycleWidthTop}px);
                    }
                }
                @keyframes marquee-bottom {
                    from {
                        transform: translateX(-${cycleWidthBottom}px);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                .animate-top {
                    animation: marquee-top 80s linear infinite;
                }
                .animate-bottom {
                    animation: marquee-bottom 80s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Galary;

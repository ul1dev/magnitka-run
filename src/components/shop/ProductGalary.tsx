'use client';

import { useEffect, useRef } from 'react';
// Carousel и плагины
import {
    type CarouselOptions,
    type CarouselInstance,
    Carousel,
} from '@fancyapps/ui/dist/carousel';
import { Arrows } from '@fancyapps/ui/dist/carousel/carousel.arrows.js';
import { Zoomable } from '@fancyapps/ui/dist/carousel/carousel.zoomable.js';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.js';
import { Toolbar } from '@fancyapps/ui/dist/carousel/carousel.toolbar.js';
import { Autoplay } from '@fancyapps/ui/dist/carousel/carousel.autoplay.js';
import { Expand } from '@fancyapps/ui/dist/carousel/carousel.expand.js';
// Fancybox
import { Fancybox } from '@fancyapps/ui/dist/fancybox';
// Стили
import '@fancyapps/ui/dist/carousel/carousel.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    imgs: string[];
}

export default function ProductGallery({ imgs }: Props) {
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!carouselRef.current) return;

        // Опции карусели
        const options: Partial<CarouselOptions> = {
            infinite: false,
            Autoplay: false,
            Thumbs: {
                //@ts-ignore
                carousel: { preload: 2 },
                position: 'bottom',
                modern: true, // современный стиль миниатюр
            },
            Toolbar: {
                //@ts-ignore
                display: ['zoom', 'fullscreen', 'close'],
            },
            //@ts-ignore
            Zoomable: true,
            Arrows: true,
            Expand: true,
        };

        const plugins = { Arrows, Zoomable, Thumbs, Toolbar, Autoplay, Expand };

        // Инициализируем Carousel
        const carousel: CarouselInstance = Carousel(
            carouselRef.current,
            options,
            plugins
        ).init();

        // Инициализируем Fancybox для синхронизации с каруселью
        Fancybox.bind('[data-fancybox="gallery"]', {
            // дополнительные опции Fancybox по желанию
        });

        return () => {
            carousel.destroy();
            Fancybox.destroy();
        };
    }, [imgs]);

    return (
        <div ref={carouselRef} className="f-carousel w-full">
            {imgs.map((src, i) => (
                <div key={i} className="f-carousel__slide">
                    <Link
                        href={src}
                        data-fancybox="gallery"
                        className="block w-full h-full"
                    >
                        <Image
                            src={src}
                            alt={`Slide ${i + 1}`}
                            className="w-full h-128 max-lg:h-96 max-md:h-120 max-sm:h-96 max-[400px]:!h-88 object-cover rounded-lg"
                            width={1000}
                            height={1000}
                            unoptimized
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}

'use client';

import Link from 'next/link';
import { ShopProduct } from './types';

interface Props {
    product: ShopProduct;
}

export default function ProductInfo({ product: { info } }: Props) {
    return (
        <div className="max-w-2xl flex flex-col gap-5 max-lg:gap-4">
            <div>
                <h3 className="uppercase font-bold text-xl max-lg:text-lg">
                    Информация
                </h3>
                <p
                    dangerouslySetInnerHTML={{ __html: info }}
                    className="text-[#000000B3] text-base max-lg:text-sm"
                ></p>
            </div>
            <div>
                <h3 className="uppercase font-bold text-xl max-lg:text-lg">
                    Доставка
                </h3>
                <p className="text-[#000000B3] text-base max-lg:text-sm">
                    Бесплатная доставка по России при покупке от 5 000 ₽.{' '}
                    <Link
                        href="https://runc.run/uploads/page_section_card_files/Delivery_terms.pdf"
                        className="underline text-blue-600"
                    >
                        Условия доставки.
                    </Link>
                </p>
            </div>
            <div>
                <h3 className="uppercase font-bold text-xl max-lg:text-lg">
                    Возврат
                </h3>
                <p className="text-[#000000B3] text-base max-lg:text-sm">
                    Вы можете вернуть неподошедший товар в течение 14 дней с
                    даты получения. Действует ограничение на возврат носков, а
                    также технически сложных изделий.{' '}
                    <Link
                        href="https://runc.run/uploads/page_section_card_files/Return_policy.pdf"
                        className="underline text-blue-600"
                    >
                        Условия возврата.
                    </Link>
                </p>
            </div>
        </div>
    );
}

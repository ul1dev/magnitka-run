import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Запись на тренировку',
};

export default function ShopCheckoutSuccess() {
    return (
        <div className="mt-54 max-2xl:mt-48 max-xl:mt-56 max-lg:mt-58 max-sm:mt-42 mb-32 max-2xl:mb-30 max-xl:mb-36 max-lg:mb-42 max-sm:mb-26 max-w-3xl mx-auto max-lg:mx-30 max-md:mx-10 max-sm:mx-5 max-[450px]:!mx-2 bg-white rounded-2xl max-xl:rounded-xl p-5 max-[450px]:p-3">
            <h1 className="text-center font-extrabold text-3xl max-lg:text-2xl max-sm:text-xl max-[450px]:!text-lg">
                Спасибо за покупку!
            </h1>
            <p className="text-center max-sm:text-sm max-[450px]:!text-xs text-gray-600 pt-2 max-sm:pt-1 max-w-lg max-sm:max-w-md max-[450px]:!max-w-sm mx-auto mb-10 max-sm:mb-8">
                В ближайшее мы свяжемся с вами для подтверждения заказа.
            </p>
            <Link
                href="/"
                className="w-fit block text-center rounded-2xl max-sm:rounded-xl bg-[#ea0029] max-sm:text-base max-2xl:text-xl text-2xl text-white font-semibold max-sm:py-3 max-2xl:py-4 py-5 hover:bg-[#d10026] transition-colors duration-300 max-sm:px-22 max-2xl:px-24 px-26 mx-auto"
            >
                На главную
            </Link>
        </div>
    );
}

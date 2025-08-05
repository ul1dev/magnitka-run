import TrainingSignUpForm from '@/components/training-signup/Form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Запись на тренировку',
};

export default function TrainingSignUp() {
    return (
        <div className="mt-40 max-2xl:mt-34 max-xl:mt-30 max-lg:mt-26 max-sm:mt-24 mb-20 max-2xl:mb-12 max-xl:mb-10 max-lg:mb-8 max-sm:mb-6 max-w-3xl mx-auto max-lg:mx-30 max-md:mx-10 max-sm:mx-5 max-[450px]:!mx-2 bg-white rounded-2xl max-xl:rounded-xl p-5 max-[450px]:p-3">
            <h1 className="text-center font-extrabold text-3xl max-lg:text-2xl max-sm:text-xl max-[450px]:!text-lg">
                Запись на тренировку
            </h1>
            <p className="text-center max-sm:text-sm max-[450px]:!text-xs text-gray-600 pt-2 max-sm:pt-1 max-w-lg max-sm:max-w-md max-[450px]:!max-w-sm mx-auto mb-5 max-sm:mb-3">
                Пожалуйста, заполните форму ниже — и мы свяжемся с вами для
                подтверждения записи.
            </p>
            <TrainingSignUpForm />
        </div>
    );
}

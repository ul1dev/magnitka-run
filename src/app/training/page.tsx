import TrainingStart from '@/components/training/Start';
import TrainingTrainings from '@/components/training/Trainings';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Беговая подготовка',
};

export default function Training() {
    return (
        <>
            <TrainingStart />
            <TrainingTrainings />
        </>
    );
}

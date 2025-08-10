import TrainerForm from '@/components/admin/trainers/TrainerForm';

export default function NewTrainerPage() {
    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Создать тренера</h1>
            <TrainerForm />
        </div>
    );
}

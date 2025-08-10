import RaceForm from '@/components/admin/races/RaceForm';

export default function NewRacePage() {
    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Создать забег</h1>
            <RaceForm />
        </div>
    );
}

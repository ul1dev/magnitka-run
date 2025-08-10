import PacemakerForm from '@/components/admin/pacemakers/PacemakerForm';

export default function NewPacemakerPage() {
    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">Создать пейсера</h1>
            <PacemakerForm />
        </div>
    );
}

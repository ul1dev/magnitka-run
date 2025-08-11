'use client';

import TeamMemberForm from '@/components/admin/team/TeamMemberForm';

export default function NewTeamMemberPage() {
    return (
        <div className="rounded-2xl border bg-white p-6 max-sm:px-2">
            <h1 className="text-2xl font-bold mb-4">
                Добавить участника команды
            </h1>
            <TeamMemberForm />
        </div>
    );
}

'use client';

import { useRouter } from 'next/navigation';

export function OrganizationSwitcher({ currentId, organizations }: { currentId: string; organizations: { id: string; name: string }[] }) {
  const router = useRouter();
  return <select className="orgSelect" value={currentId} onChange={(event) => router.push(`/app/${event.target.value}`)} aria-label="Selecionar cliente">
    {organizations.map((organization) => <option key={organization.id} value={organization.id}>{organization.name}</option>)}
  </select>;
}

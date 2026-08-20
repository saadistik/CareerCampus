import { useState } from 'react'
import { AppShell } from '../components/AppShell'
import { CareersTab } from './admin/CareersTab'
import { JobsTab } from './admin/JobsTab'
import { ResourcesTab } from './admin/ResourcesTab'

const tabs = [
  { id: 'careers', label: 'Careers' },
  { id: 'jobs', label: 'Job listings' },
  { id: 'resources', label: 'Learning resources' },
] as const

type TabId = (typeof tabs)[number]['id']

export function AdminPage() {
  const [tab, setTab] = useState<TabId>('careers')

  return (
    <AppShell>
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Admin panel &middot; role-gated</span>
        <h1 className="mt-1 text-2xl font-light">Manage site content</h1>
      </div>

      <div className="mb-4 inline-block rounded-md bg-warning-soft px-3.5 py-2 text-sm font-semibold text-warning">
        Visible only to accounts with the admin role — enforced by Supabase RLS
      </div>

      <div className="mb-5 flex gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-3.5 py-2.5 text-sm font-semibold ${
              tab === t.id ? 'border-accent text-accent-strong' : 'border-transparent text-ink-soft'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'careers' && <CareersTab />}
      {tab === 'jobs' && <JobsTab />}
      {tab === 'resources' && <ResourcesTab />}
    </AppShell>
  )
}

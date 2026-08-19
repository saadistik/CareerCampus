import { useEffect, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import type { Job } from '../lib/types'

export function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobType, setJobType] = useState<string>('all')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
      setJobs((data ?? []) as Job[])
    }
    load()
  }, [])

  const filtered = jobType === 'all' ? jobs : jobs.filter((j) => j.job_type === jobType)
  const types = ['all', 'full-time', 'part-time', 'internship']

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Job listings</span>
        <h1 className="mt-1 text-2xl font-light">Roles matched to your recommended careers</h1>
        <p className="mt-2 max-w-[64ch] text-sm text-ink-soft">Curated and static for the MVP — no live job-board API in this phase.</p>
      </div>

      <div className="mb-5 flex gap-2 rounded-lg border border-border bg-white p-3.5">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setJobType(t)}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold capitalize ${
              jobType === t ? 'bg-accent-soft text-accent-strong' : 'bg-surface-alt text-ink-soft'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {filtered.map((job) => (
          <div key={job.id} className="rounded-lg border border-border bg-white p-4.5">
            <h3 className="text-base font-semibold">{job.title}</h3>
            <div className="mb-2.5 mt-0.5 text-xs font-semibold text-ink-faint">
              {job.company} &middot; {job.location} &middot; {job.job_type}
            </div>
            <p className="mb-3 text-sm text-ink-soft">{job.description}</p>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-ink-faint">No listings in this category yet.</p>}
      </div>
    </AppShell>
  )
}

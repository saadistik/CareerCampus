import { useEffect, useMemo, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import type { Job } from '../lib/types'

export function JobListings() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobType, setJobType] = useState<string>('all')
  const [category, setCategory] = useState<string>('all')
  const [location, setLocation] = useState<string>('all')

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
      setJobs((data ?? []) as Job[])
    }
    load()
  }, [])

  const categories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category).filter(Boolean))).sort() as string[],
    [jobs]
  )
  const locations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location).filter(Boolean))).sort() as string[],
    [jobs]
  )

  const filtered = jobs.filter((j) => {
    if (jobType !== 'all' && j.job_type !== jobType) return false
    if (category !== 'all' && j.category !== category) return false
    if (location !== 'all' && j.location !== location) return false
    return true
  })

  const types = ['all', 'full-time', 'part-time', 'internship']

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Job listings</span>
        <h1 className="mt-1 text-2xl font-light">Roles matched to your recommended careers</h1>
        <p className="mt-2 max-w-[64ch] text-sm text-ink-soft">Curated and static for the MVP — no live job-board API in this phase.</p>
      </div>

      <div className="mb-5 flex flex-wrap items-end gap-4 rounded-lg border border-border bg-white p-3.5">
        <div className="min-w-[180px]">
          <label className="mb-1 block text-xs font-semibold text-ink-soft">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3 py-1.5 text-sm"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[180px]">
          <label className="mb-1 block text-xs font-semibold text-ink-soft">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md border border-border bg-bg px-3 py-1.5 text-sm"
          >
            <option value="all">All locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
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
        {(category !== 'all' || location !== 'all' || jobType !== 'all') && (
          <button
            onClick={() => {
              setCategory('all')
              setLocation('all')
              setJobType('all')
            }}
            className="text-sm font-semibold text-ink-faint underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="mb-3 text-xs font-semibold text-ink-faint">
        {filtered.length} of {jobs.length} listings
      </p>

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
        {filtered.length === 0 && <p className="text-sm text-ink-faint">No listings match these filters.</p>}
      </div>
    </AppShell>
  )
}

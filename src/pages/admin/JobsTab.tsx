import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Career, Job } from '../../lib/types'

const emptyForm = {
  title: '',
  company: '',
  location: '',
  job_type: 'full-time' as NonNullable<Job['job_type']>,
  category: '',
  description: '',
  career_id: '',
}

export function JobsTab() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [careers, setCareers] = useState<Career[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  async function load() {
    const { data: jobData } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs((jobData ?? []) as Job[])
    const { data: careerData } = await supabase.from('careers').select('*').order('title')
    setCareers((careerData ?? []) as Career[])
  }

  useEffect(() => {
    load()
  }, [])

  function openAdd() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function openEdit(j: Job) {
    setForm({
      title: j.title,
      company: j.company,
      location: j.location ?? '',
      job_type: j.job_type ?? 'full-time',
      category: j.category ?? '',
      description: j.description ?? '',
      career_id: j.career_id ?? '',
    })
    setEditingId(j.id)
    setShowForm(true)
  }

  async function handleSubmit() {
    if (!form.title || !form.company) return
    const payload = {
      title: form.title,
      company: form.company,
      location: form.location,
      job_type: form.job_type,
      category: form.category,
      description: form.description,
      career_id: form.career_id || null,
    }
    if (editingId) {
      await supabase.from('jobs').update(payload).eq('id', editingId)
    } else {
      await supabase.from('jobs').insert(payload)
    }
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    load()
  }

  async function handleDelete(id: string) {
    await supabase.from('jobs').delete().eq('id', id)
    load()
  }

  const careerTitle = (id: string | null) => careers.find((c) => c.id === id)?.title ?? '—'

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-alt text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
              <th className="px-3.5 py-2.5">Title</th>
              <th className="px-3.5 py-2.5">Company</th>
              <th className="px-3.5 py-2.5">Type</th>
              <th className="px-3.5 py-2.5">Linked career</th>
              <th className="px-3.5 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-t border-border hover:bg-surface-alt">
                <td className="px-3.5 py-3">{j.title}</td>
                <td className="px-3.5 py-3">
                  {j.company} <span className="text-ink-faint">&middot; {j.location}</span>
                </td>
                <td className="px-3.5 py-3 capitalize">{j.job_type}</td>
                <td className="px-3.5 py-3">{careerTitle(j.career_id)}</td>
                <td className="px-3.5 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(j)} className="text-sm font-semibold text-ink-soft">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(j.id)} className="text-sm font-semibold text-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3.5 py-6 text-center text-sm text-ink-faint">
                  No job listings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!showForm ? (
        <button onClick={openAdd} className="mt-4 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
          + Add job listing
        </button>
      ) : (
        <div className="mt-4 max-w-[560px] rounded-lg border border-border bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold">{editingId ? 'Edit job listing' : 'Add job listing'}</h3>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Title</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Company</label>
              <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Location</label>
              <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Type</label>
              <select
                value={form.job_type}
                onChange={(e) => setForm((f) => ({ ...f, job_type: e.target.value as NonNullable<Job['job_type']> }))}
                className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Category</label>
              <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Linked career</label>
              <select
                value={form.career_id}
                onChange={(e) => setForm((f) => ({ ...f, career_id: e.target.value }))}
                className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
              >
                <option value="">None</option>
                {careers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setShowForm(false); setEditingId(null) }} className="rounded-md border border-border px-4 py-2 text-sm font-semibold">
              Cancel
            </button>
            <button onClick={handleSubmit} className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
              {editingId ? 'Save changes' : 'Add job listing'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

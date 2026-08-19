import { useEffect, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import type { Career } from '../lib/types'

export function AdminPage() {
  const [careers, setCareers] = useState<Career[]>([])
  const [skillCounts, setSkillCounts] = useState<Record<string, number>>({})
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')

  async function load() {
    const { data: careerData } = await supabase.from('careers').select('*').order('created_at', { ascending: false })
    setCareers((careerData ?? []) as Career[])

    const { data: skillData } = await supabase.from('career_skills').select('career_id')
    const counts: Record<string, number> = {}
    for (const row of skillData ?? []) {
      counts[row.career_id] = (counts[row.career_id] ?? 0) + 1
    }
    setSkillCounts(counts)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleAdd() {
    if (!title) return
    await supabase.from('careers').insert({
      title,
      category,
      description,
      salary_min: salaryMin ? Number(salaryMin) : null,
      salary_max: salaryMax ? Number(salaryMax) : null,
      status: 'draft',
    })
    setTitle('')
    setCategory('')
    setDescription('')
    setSalaryMin('')
    setSalaryMax('')
    setShowForm(false)
    load()
  }

  async function toggleStatus(career: Career) {
    await supabase
      .from('careers')
      .update({ status: career.status === 'published' ? 'draft' : 'published' })
      .eq('id', career.id)
    load()
  }

  async function handleDelete(id: string) {
    await supabase.from('careers').delete().eq('id', id)
    load()
  }

  return (
    <AppShell>
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Admin panel &middot; role-gated</span>
        <h1 className="mt-1 text-2xl font-light">Manage career data</h1>
      </div>

      <div className="mb-4 inline-block rounded-md bg-warning-soft px-3.5 py-2 text-sm font-semibold text-warning">
        Visible only to accounts with the admin role — enforced by Supabase RLS
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-alt text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
              <th className="px-3.5 py-2.5">Career title</th>
              <th className="px-3.5 py-2.5">Category</th>
              <th className="px-3.5 py-2.5">Required skills</th>
              <th className="px-3.5 py-2.5">Status</th>
              <th className="px-3.5 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {careers.map((c) => (
              <tr key={c.id} className="border-t border-border hover:bg-surface-alt">
                <td className="px-3.5 py-3">{c.title}</td>
                <td className="px-3.5 py-3">{c.category}</td>
                <td className="px-3.5 py-3">{skillCounts[c.id] ?? 0} skills</td>
                <td className="px-3.5 py-3">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${c.status === 'published' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'}`}>
                    {c.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-3.5 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => toggleStatus(c)} className="text-sm font-semibold text-accent">
                      {c.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="text-sm font-semibold text-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="mt-4 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
          + Add career
        </button>
      ) : (
        <div className="mt-4 max-w-[520px] rounded-lg border border-border bg-white p-5">
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Salary min (RM)</label>
              <input value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Salary max (RM)</label>
              <input value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="rounded-md border border-border px-4 py-2 text-sm font-semibold">
              Cancel
            </button>
            <button onClick={handleAdd} className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
              Add career (as draft)
            </button>
          </div>
        </div>
      )}
    </AppShell>
  )
}

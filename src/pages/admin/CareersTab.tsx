import { Fragment, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Career, CareerSkill } from '../../lib/types'

const emptyForm = { title: '', category: '', description: '', salary_min: '', salary_max: '' }

export function CareersTab() {
  const [careers, setCareers] = useState<Career[]>([])
  const [skillCounts, setSkillCounts] = useState<Record<string, number>>({})
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  const [skillsOpenFor, setSkillsOpenFor] = useState<string | null>(null)
  const [skills, setSkills] = useState<CareerSkill[]>([])
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillWeight, setNewSkillWeight] = useState('1')

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

  async function loadSkills(careerId: string) {
    const { data } = await supabase.from('career_skills').select('*').eq('career_id', careerId).order('weight', { ascending: false })
    setSkills((data ?? []) as CareerSkill[])
  }

  function openAdd() {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  function openEdit(c: Career) {
    setForm({
      title: c.title,
      category: c.category ?? '',
      description: c.description ?? '',
      salary_min: c.salary_min?.toString() ?? '',
      salary_max: c.salary_max?.toString() ?? '',
    })
    setEditingId(c.id)
    setShowForm(true)
  }

  async function handleSubmit() {
    if (!form.title) return
    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
    }
    if (editingId) {
      await supabase.from('careers').update(payload).eq('id', editingId)
    } else {
      await supabase.from('careers').insert({ ...payload, status: 'draft' })
    }
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
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
    if (skillsOpenFor === id) setSkillsOpenFor(null)
    load()
  }

  async function toggleSkillsPanel(careerId: string) {
    if (skillsOpenFor === careerId) {
      setSkillsOpenFor(null)
      return
    }
    setSkillsOpenFor(careerId)
    setNewSkillName('')
    setNewSkillWeight('1')
    await loadSkills(careerId)
  }

  async function addSkill(careerId: string) {
    if (!newSkillName.trim()) return
    await supabase.from('career_skills').insert({
      career_id: careerId,
      skill_name: newSkillName.trim(),
      weight: Number(newSkillWeight) || 1,
    })
    setNewSkillName('')
    setNewSkillWeight('1')
    await loadSkills(careerId)
    load()
  }

  async function updateSkillWeight(skillId: string, weight: string, careerId: string) {
    await supabase.from('career_skills').update({ weight: Number(weight) || 0 }).eq('id', skillId)
    await loadSkills(careerId)
  }

  async function removeSkill(skillId: string, careerId: string) {
    await supabase.from('career_skills').delete().eq('id', skillId)
    await loadSkills(careerId)
    load()
  }

  return (
    <div>
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
              <Fragment key={c.id}>
                <tr className="border-t border-border hover:bg-surface-alt">
                  <td className="px-3.5 py-3">{c.title}</td>
                  <td className="px-3.5 py-3">{c.category}</td>
                  <td className="px-3.5 py-3">
                    <button onClick={() => toggleSkillsPanel(c.id)} className="font-semibold text-accent">
                      {skillCounts[c.id] ?? 0} skills {skillsOpenFor === c.id ? '▲' : '▼'}
                    </button>
                  </td>
                  <td className="px-3.5 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${c.status === 'published' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'}`}>
                      {c.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-3.5 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(c)} className="text-sm font-semibold text-ink-soft">
                        Edit
                      </button>
                      <button onClick={() => toggleStatus(c)} className="text-sm font-semibold text-accent">
                        {c.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="text-sm font-semibold text-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                {skillsOpenFor === c.id && (
                  <tr className="border-t border-border bg-surface-alt">
                    <td colSpan={5} className="px-3.5 py-4">
                      <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-ink-faint">
                        Required skills &amp; weights &mdash; feeds the matching engine
                      </p>
                      {skills.length === 0 && <p className="mb-3 text-sm text-ink-faint">No skills set for this career yet.</p>}
                      {skills.length > 0 && (
                        <table className="mb-3 w-full max-w-[520px] text-sm">
                          <tbody>
                            {skills.map((s) => (
                              <tr key={s.id} className="border-b border-border last:border-none">
                                <td className="py-1.5 pr-3">{s.skill_name}</td>
                                <td className="w-24 py-1.5 pr-3">
                                  <input
                                    type="number"
                                    step="0.5"
                                    value={s.weight}
                                    onChange={(e) => updateSkillWeight(s.id, e.target.value, c.id)}
                                    className="w-20 rounded-md border border-border bg-white px-2 py-1 text-sm"
                                  />
                                </td>
                                <td className="py-1.5 text-right">
                                  <button onClick={() => removeSkill(s.id, c.id)} className="text-xs font-semibold text-danger">
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      <div className="flex max-w-[520px] gap-2">
                        <input
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          placeholder="Skill name, e.g. Excel"
                          className="flex-1 rounded-md border border-border bg-white px-3 py-1.5 text-sm"
                        />
                        <input
                          type="number"
                          step="0.5"
                          value={newSkillWeight}
                          onChange={(e) => setNewSkillWeight(e.target.value)}
                          className="w-20 rounded-md border border-border bg-white px-3 py-1.5 text-sm"
                        />
                        <button onClick={() => addSkill(c.id)} className="rounded-md bg-ink px-3.5 py-1.5 text-sm font-semibold text-white">
                          + Add
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {!showForm ? (
        <button onClick={openAdd} className="mt-4 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
          + Add career
        </button>
      ) : (
        <div className="mt-4 max-w-[520px] rounded-lg border border-border bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold">{editingId ? 'Edit career' : 'Add career'}</h3>
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Category</label>
            <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div className="mb-3">
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Salary min (RM)</label>
              <input value={form.salary_min} onChange={(e) => setForm((f) => ({ ...f, salary_min: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Salary max (RM)</label>
              <input value={form.salary_max} onChange={(e) => setForm((f) => ({ ...f, salary_max: e.target.value }))} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setShowForm(false); setEditingId(null) }} className="rounded-md border border-border px-4 py-2 text-sm font-semibold">
              Cancel
            </button>
            <button onClick={handleSubmit} className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
              {editingId ? 'Save changes' : 'Add career (as draft)'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { LearningResource } from '../../lib/types'

export function ResourcesTab() {
  const [resources, setResources] = useState<LearningResource[]>([])
  const [skillName, setSkillName] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  async function load() {
    const { data } = await supabase.from('learning_resources').select('*').order('skill_name')
    setResources((data ?? []) as LearningResource[])
  }

  useEffect(() => {
    load()
  }, [])

  async function handleAdd() {
    if (!skillName.trim() || !title.trim()) return
    await supabase.from('learning_resources').insert({
      skill_name: skillName.trim(),
      title: title.trim(),
      url: url.trim() || null,
    })
    setSkillName('')
    setTitle('')
    setUrl('')
    load()
  }

  async function handleDelete(id: string) {
    await supabase.from('learning_resources').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <p className="mb-4 max-w-[64ch] text-sm text-ink-soft">
        These show up on a student's skill-gap page as suggested resources for a skill they're
        missing. Skill name should match a required skill on a career exactly (case-insensitive) to
        show up correctly.
      </p>

      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-alt text-left text-xs font-bold uppercase tracking-wide text-ink-faint">
              <th className="px-3.5 py-2.5">Skill</th>
              <th className="px-3.5 py-2.5">Resource title</th>
              <th className="px-3.5 py-2.5">Link</th>
              <th className="px-3.5 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-surface-alt">
                <td className="px-3.5 py-3">{r.skill_name}</td>
                <td className="px-3.5 py-3">{r.title}</td>
                <td className="px-3.5 py-3 text-ink-faint">{r.url || '—'}</td>
                <td className="px-3.5 py-3">
                  <button onClick={() => handleDelete(r.id)} className="text-sm font-semibold text-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {resources.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3.5 py-6 text-center text-sm text-ink-faint">
                  No learning resources yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 max-w-[560px] rounded-lg border border-border bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold">Add a resource</h3>
        <div className="mb-3 grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Skill name</label>
            <input value={skillName} onChange={(e) => setSkillName(e.target.value)} placeholder="e.g. Statistics" className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Resource title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Statistics 101 — short course" className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Link (optional)</label>
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
        </div>
        <button onClick={handleAdd} className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white">
          + Add resource
        </button>
      </div>
    </div>
  )
}

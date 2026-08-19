import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { rankCareers } from '../lib/matching'
import type { Career, CareerMatch, CareerSkill } from '../lib/types'

export function Recommendations() {
  const { profile } = useAuth()
  const [ranked, setRanked] = useState<CareerMatch[]>([])
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { data: careers } = await supabase.from('careers').select('*').eq('status', 'published')
    const { data: skills } = await supabase.from('career_skills').select('*')

    if (careers && skills) {
      const byCareer: Record<string, CareerSkill[]> = {}
      for (const s of skills as CareerSkill[]) {
        byCareer[s.career_id] = byCareer[s.career_id] ?? []
        byCareer[s.career_id].push(s)
      }
      setRanked(rankCareers(careers as Career[], byCareer, profile?.skills ?? []))
    }

    if (user) {
      const { data: saved } = await supabase.from('saved_careers').select('career_id').eq('user_id', user.id)
      setSavedIds(new Set((saved ?? []).map((s) => s.career_id)))
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  async function toggleSave(careerId: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    if (savedIds.has(careerId)) {
      await supabase.from('saved_careers').delete().eq('user_id', user.id).eq('career_id', careerId)
    } else {
      await supabase.from('saved_careers').insert({ user_id: user.id, career_id: careerId })
    }
    load()
  }

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Recommendations</span>
        <h1 className="mt-1 text-2xl font-light">Careers ranked by fit</h1>
        <p className="mt-2 max-w-[64ch] text-sm text-ink-soft">
          Score = share of each career's weighted required skills that your profile already covers.
        </p>
      </div>

      {loading && <p className="text-sm text-ink-faint">Loading…</p>}

      {ranked.map((c, i) => (
        <div
          key={c.id}
          className={`mb-2.5 flex items-center gap-4.5 rounded-lg border bg-white p-4.5 ${
            i === 0 ? 'border-accent shadow-[0_0_0_1px_var(--color-accent)]' : 'border-border'
          }`}
        >
          <span className="w-4.5 font-mono text-sm text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
          <div className="flex-1">
            <h3 className="text-base font-semibold">{c.title}</h3>
            <p className="text-sm text-ink-soft">{c.description}</p>
            <div className="mt-2 flex gap-2">
              <span className="rounded-md bg-surface-alt px-2.5 py-1 text-xs font-semibold text-ink-soft">
                RM {c.salary_min?.toLocaleString()}–{c.salary_max?.toLocaleString()} / mo
              </span>
              {i === 0 && <span className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-strong">Best match</span>}
            </div>
          </div>
          <div className="text-center">
            <span className="block font-mono text-xl font-bold text-accent">{c.matchPercent}%</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-wide text-ink-faint">match</span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => toggleSave(c.id)}
              className="rounded-md border border-border px-3.5 py-1.5 text-sm font-semibold text-ink-soft"
            >
              {savedIds.has(c.id) ? 'Saved' : 'Save'}
            </button>
            <Link to={`/careers/${c.id}/gap`} className="rounded-md bg-ink px-3.5 py-1.5 text-center text-sm font-semibold text-white">
              Skill gap
            </Link>
          </div>
        </div>
      ))}
    </AppShell>
  )
}

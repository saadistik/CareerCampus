import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { rankCareers } from '../lib/matching'
import type { Career, CareerSkill } from '../lib/types'

export function Dashboard() {
  const { profile } = useAuth()
  const [topMatch, setTopMatch] = useState<{ title: string; percent: number } | null>(null)
  const [savedCount, setSavedCount] = useState(0)
  const [hasResume, setHasResume] = useState(false)
  const [activity, setActivity] = useState<{ label: string; when: string }[]>([])

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: careers } = await supabase.from('careers').select('*').eq('status', 'published')
      const { data: skills } = await supabase.from('career_skills').select('*')
      if (careers && skills) {
        const byCareer: Record<string, CareerSkill[]> = {}
        for (const s of skills as CareerSkill[]) {
          byCareer[s.career_id] = byCareer[s.career_id] ?? []
          byCareer[s.career_id].push(s)
        }
        const ranked = rankCareers(careers as Career[], byCareer, profile?.skills ?? [])
        if (ranked[0]) setTopMatch({ title: ranked[0].title, percent: ranked[0].matchPercent })
      }

      const { count: saved } = await supabase
        .from('saved_careers')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
      setSavedCount(saved ?? 0)

      const { data: resume } = await supabase.from('resumes').select('user_id').eq('user_id', user.id).maybeSingle()
      setHasResume(!!resume)

      const { data: responses } = await supabase
        .from('assessment_responses')
        .select('question_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3)
      setActivity(
        (responses ?? []).map((r) => ({
          label: `Answered assessment question ${r.question_id.replace('q', '#')}`,
          when: new Date(r.created_at).toLocaleDateString(),
        }))
      )
    }
    load()
  }, [profile])

  const fields = [profile?.full_name, profile?.education_level, profile?.field_of_study, profile?.skills?.length]
  const completeness = Math.round((fields.filter(Boolean).length / fields.length) * 100)

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Dashboard</span>
        <h1 className="mt-1 text-2xl font-light">Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}</h1>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-3.5">
        <div className="rounded-lg border border-border bg-white p-4">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-faint">Profile</span>
          <span className="font-mono text-xl font-bold">{completeness}%</span> complete
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-faint">Top match</span>
          <span className="font-mono text-xl font-bold text-accent">{topMatch ? topMatch.title : '—'}</span>
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-faint">Saved careers</span>
          <span className="font-mono text-xl font-bold">{savedCount}</span>
        </div>
        <div className="rounded-lg border border-border bg-white p-4">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-faint">Resume</span>
          <span className="font-mono text-xl font-bold">{hasResume ? 'Draft' : 'Not started'}</span>
        </div>
      </div>

      <div className="grid grid-cols-[1.3fr_1fr] gap-4.5">
        <div className="rounded-lg border border-border bg-white p-5">
          <h3 className="mb-2.5 text-sm font-semibold">Recent activity</h3>
          {activity.length === 0 && <p className="text-sm text-ink-faint">Nothing yet — take the assessment to get started.</p>}
          {activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border py-2.5 text-sm last:border-none">
              <span>{a.label}</span>
              <span className="rounded-md bg-surface-alt px-2.5 py-1 text-xs font-semibold text-ink-soft">{a.when}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-white p-5">
          <h3 className="mb-2.5 text-sm font-semibold">Quick actions</h3>
          <Link to="/assessment" className="mb-2 block rounded-md border border-border py-2.5 text-center text-sm font-semibold">
            Retake assessment
          </Link>
          <Link to="/jobs" className="mb-2 block rounded-md border border-border py-2.5 text-center text-sm font-semibold">
            Browse job listings
          </Link>
          <Link to="/resume" className="block rounded-md bg-ink py-2.5 text-center text-sm font-semibold text-white">
            {hasResume ? 'Finish resume' : 'Start resume'}
          </Link>
        </div>
      </div>
    </AppShell>
  )
}

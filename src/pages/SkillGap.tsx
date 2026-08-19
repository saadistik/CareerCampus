import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { missingSkills } from '../lib/matching'
import type { Career, CareerSkill, LearningResource } from '../lib/types'

export function SkillGap() {
  const { id } = useParams<{ id: string }>()
  const { profile } = useAuth()
  const [career, setCareer] = useState<Career | null>(null)
  const [required, setRequired] = useState<CareerSkill[]>([])
  const [resources, setResources] = useState<LearningResource[]>([])
  const [gapCount, setGapCount] = useState(0)

  useEffect(() => {
    async function load() {
      if (!id) return
      const { data: careerData } = await supabase.from('careers').select('*').eq('id', id).single()
      setCareer(careerData as Career)

      const { data: skillsData } = await supabase.from('career_skills').select('*').eq('career_id', id)
      const skills = (skillsData ?? []) as CareerSkill[]
      setRequired(skills)

      const gaps = missingSkills(skills, profile?.skills ?? [])
      setGapCount(gaps.length)
      if (gaps.length > 0) {
        const { data: res } = await supabase
          .from('learning_resources')
          .select('*')
          .in('skill_name', gaps.map((g) => g.skill_name))
        setResources((res ?? []) as LearningResource[])
      } else {
        setResources([])
      }
    }
    load()
  }, [id, profile])

  const userSkillsLower = (profile?.skills ?? []).map((s) => s.toLowerCase())
  const has = (skillName: string) =>
    userSkillsLower.some((us) => us === skillName.toLowerCase() || us.includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(us))

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Skill gap &middot; {career?.title ?? '…'}</span>
        <h1 className="mt-1 text-2xl font-light">What you have vs. what the role needs</h1>
      </div>

      <div className="max-w-[720px] rounded-lg border border-border bg-white p-5.5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <h3 className="mb-2.5 text-sm font-semibold">Your skills</h3>
            {required.map((r) => (
              <div key={r.id} className="flex items-center gap-2.5 border-b border-border py-2 text-sm last:border-none">
                <span className={`h-2 w-2 rounded-full ${has(r.skill_name) ? 'bg-success' : 'bg-danger'}`} />
                {r.skill_name}
                {!has(r.skill_name) && (
                  <span className="ml-auto rounded-md bg-danger-soft px-2 py-0.5 text-xs font-semibold text-danger">gap</span>
                )}
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-2.5 text-sm font-semibold">Required for {career?.title}</h3>
            {required.map((r) => (
              <div key={r.id} className="flex items-center gap-2.5 border-b border-border py-2 text-sm last:border-none">
                <span className="h-2 w-2 rounded-full bg-success" />
                {r.skill_name}
              </div>
            ))}
          </div>
        </div>

        <h3 className="mt-5 text-sm font-semibold">Suggested resources for your gaps</h3>
        {gapCount === 0 && <p className="mt-2 text-sm text-ink-faint">No gaps — you've got the required skills covered.</p>}
        {gapCount > 0 && resources.length === 0 && (
          <p className="mt-2 text-sm text-ink-faint">No resources catalogued yet for these skills — an admin can add some.</p>
        )}
        <ul>
          {resources.map((r) => (
            <li key={r.id} className="border-b border-border py-2 text-sm text-ink-soft last:border-none">
              {r.title}
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  )
}

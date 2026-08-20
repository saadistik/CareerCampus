import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'

const INTEREST_OPTIONS = ['Data & analytics', 'Building products', 'Teaching & mentoring', 'Design', 'Research']
const SKILL_OPTIONS = [
  'SQL', 'Python', 'Communication', 'Data visualisation', 'Statistics', 'User interviews', 'Figma',
  'Data analysis', 'Empathy mapping', 'Requirements gathering', 'Process mapping', 'Stakeholder management',
  'JavaScript', 'Problem solving', 'Git', 'System design', 'Roadmapping', 'Prioritisation',
  'Content creation', 'Social media', 'Excel', 'Organisation', 'Networking',
]

function Chip({ label, picked, onClick }: { label: string; picked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3.5 py-1.5 text-sm font-medium ${
        picked ? 'border-transparent bg-accent-soft text-accent-strong' : 'border-border bg-bg text-ink-soft'
      }`}
    >
      {label}
    </button>
  )
}

export function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [educationLevel, setEducationLevel] = useState("Bachelor's — final year")
  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const [workExperience, setWorkExperience] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!profile) return
    setFullName(profile.full_name ?? '')
    setEducationLevel(profile.education_level ?? "Bachelor's — final year")
    setFieldOfStudy(profile.field_of_study ?? '')
    setWorkExperience(profile.work_experience ?? '')
    setInterests(profile.interests ?? [])
    setSkills(profile.skills ?? [])
  }, [profile])

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  async function handleSave() {
    if (!user) return
    setSaving(true)
    await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        education_level: educationLevel,
        field_of_study: fieldOfStudy,
        work_experience: workExperience,
        interests,
        skills,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
    await refreshProfile()
    setSaving(false)
    navigate('/assessment')
  }

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Step 1 of 2 &middot; Onboarding</span>
        <h1 className="mt-1 text-2xl font-light">Set up your profile</h1>
        <p className="mt-2 max-w-[64ch] text-sm text-ink-soft">
          This feeds the assessment and the matching engine — the more complete it is, the sharper the recommendations.
        </p>
      </div>

      <div className="max-w-[720px] rounded-lg border border-border bg-white p-6">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Full name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Education level</label>
            <select value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm">
              <option>Bachelor's — final year</option>
              <option>Bachelor's — earlier year</option>
              <option>Diploma</option>
              <option>Master's</option>
            </select>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Field of study</label>
            <input value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Work experience</label>
            <input value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} placeholder="e.g. 1 internship · 6 months" className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Interests</label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((opt) => (
              <Chip key={opt} label={opt} picked={interests.includes(opt)} onClick={() => toggle(interests, setInterests, opt)} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Skills</label>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map((opt) => (
              <Chip key={opt} label={opt} picked={skills.includes(opt)} onClick={() => toggle(skills, setSkills, opt)} />
            ))}
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save & continue to assessment'}
        </button>
      </div>
    </AppShell>
  )
}

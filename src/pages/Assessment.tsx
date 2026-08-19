import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import { ASSESSMENT_QUESTIONS } from '../lib/assessment'

export function AssessmentPage() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const question = ASSESSMENT_QUESTIONS[index]
  const isLast = index === ASSESSMENT_QUESTIONS.length - 1

  async function handleNext() {
    if (picked === null || !user) return
    setSaving(true)
    const option = question.options[picked]

    await supabase.from('assessment_responses').upsert({
      user_id: user.id,
      question_id: question.id,
      answer: option.label,
    })

    const mergedSkills = Array.from(new Set([...(profile?.skills ?? []), ...option.tags]))
    await supabase.from('profiles').update({ skills: mergedSkills, updated_at: new Date().toISOString() }).eq('id', user.id)
    await refreshProfile()

    setSaving(false)
    setPicked(null)
    if (isLast) {
      navigate('/recommendations')
    } else {
      setIndex((i) => i + 1)
    }
  }

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Step 2 of 2 &middot; Onboarding</span>
        <h1 className="mt-1 text-2xl font-light">Skills &amp; interest assessment</h1>
      </div>

      <div className="mb-2 flex justify-between text-xs font-semibold text-ink-faint">
        <span>Question {index + 1} of {ASSESSMENT_QUESTIONS.length}</span>
        <span>~{Math.max(1, ASSESSMENT_QUESTIONS.length - index)} min left</span>
      </div>
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-surface-alt">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${((index) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="max-w-[640px] rounded-lg border border-border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">{question.question}</h3>
        {question.options.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setPicked(i)}
            className={`mb-2.5 flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm ${
              picked === i ? 'border-accent bg-accent-soft' : 'border-border bg-bg'
            }`}
          >
            <span
              className={`h-3.5 w-3.5 flex-shrink-0 rounded-full border ${
                picked === i ? 'border-accent bg-accent' : 'border-border'
              }`}
            />
            {opt.label}
          </button>
        ))}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-ink-soft disabled:opacity-40"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={picked === null || saving}
            className="rounded-md bg-ink px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? 'Saving…' : isLast ? 'See my recommendations' : 'Next question'}
          </button>
        </div>
      </div>
    </AppShell>
  )
}

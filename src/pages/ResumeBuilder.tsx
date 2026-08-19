import { useEffect, useRef, useState } from 'react'
import { AppShell } from '../components/AppShell'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'
import type { ExperienceEntry, EducationEntry, ProjectEntry } from '../lib/types'

const emptyExperience: ExperienceEntry = { role: '', company: '', location: '', startDate: '', endDate: '', bullets: [] }
const emptyEducation: EducationEntry = { degree: '', school: '', location: '', graduationDate: '', gpa: '' }
const emptyProject: ProjectEntry = { name: '', tech: '', bullets: [], link: '' }

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-ink-soft">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-bg px-3 py-1.5 text-sm"
      />
    </div>
  )
}

export function ResumeBuilder() {
  const { user, profile } = useAuth()
  const previewRef = useRef<HTMLDivElement>(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [summary, setSummary] = useState('')
  const [education, setEducation] = useState<EducationEntry[]>([emptyEducation])
  const [experience, setExperience] = useState<ExperienceEntry[]>([emptyExperience])
  const [projects, setProjects] = useState<ProjectEntry[]>([])
  const [skills, setSkills] = useState('')
  const [template, setTemplate] = useState<'modern' | 'classic'>('modern')
  const [saving, setSaving] = useState(false)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    async function load() {
      if (!user) return
      const { data } = await supabase.from('resumes').select('*').eq('user_id', user.id).maybeSingle()
      if (data) {
        setFullName(data.full_name ?? profile?.full_name ?? '')
        setEmail(data.email ?? user.email ?? '')
        setPhone(data.phone ?? '')
        setLocation(data.location ?? '')
        setLinkedin(data.linkedin ?? '')
        setSummary(data.summary ?? '')
        setEducation(data.education?.length ? data.education : [emptyEducation])
        setExperience(data.experience?.length ? data.experience : [emptyExperience])
        setProjects(data.projects ?? [])
        setSkills((data.skills ?? []).join(', '))
        setTemplate(data.template ?? 'modern')
      } else {
        setFullName(profile?.full_name ?? '')
        setEmail(user.email ?? '')
        setSkills((profile?.skills ?? []).join(', '))
      }
    }
    load()
  }, [user, profile])

  async function handleSave() {
    if (!user) return
    setSaving(true)
    await supabase.from('resumes').upsert({
      user_id: user.id,
      full_name: fullName,
      email,
      phone,
      location,
      linkedin,
      summary,
      education: education.filter((e) => e.degree || e.school),
      experience: experience.filter((e) => e.role || e.company),
      projects: projects.filter((p) => p.name),
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      template,
      updated_at: new Date().toISOString(),
    })
    setSaving(false)
  }

  async function handleDownload() {
    if (!previewRef.current) return
    setExporting(true)
    await handleSave()
    const { default: html2canvas } = await import('html2canvas')
    const { jsPDF } = await import('jspdf')
    const canvas = await html2canvas(previewRef.current, { scale: 2, backgroundColor: '#ffffff' })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgHeight = (canvas.height * pageWidth) / canvas.width
    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight)
    } else {
      // paginate: slice the tall canvas into page-height chunks
      let renderedHeight = 0
      const pxPerPt = canvas.width / pageWidth
      const pageHeightPx = pageHeight * pxPerPt
      while (renderedHeight < canvas.height) {
        const sliceCanvas = document.createElement('canvas')
        sliceCanvas.width = canvas.width
        sliceCanvas.height = Math.min(pageHeightPx, canvas.height - renderedHeight)
        const ctx = sliceCanvas.getContext('2d')!
        ctx.drawImage(canvas, 0, -renderedHeight)
        const sliceData = sliceCanvas.toDataURL('image/png')
        if (renderedHeight > 0) pdf.addPage()
        pdf.addImage(sliceData, 'PNG', 0, 0, pageWidth, (sliceCanvas.height * pageWidth) / canvas.width)
        renderedHeight += pageHeightPx
      }
    }
    pdf.save(`${(fullName || 'resume').replace(/\s+/g, '_')}.pdf`)
    setExporting(false)
  }

  function updateEducation(i: number, patch: Partial<EducationEntry>) {
    setEducation((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)))
  }
  function updateExperience(i: number, patch: Partial<ExperienceEntry>) {
    setExperience((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)))
  }
  function updateProject(i: number, patch: Partial<ProjectEntry>) {
    setProjects((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)))
  }

  const contactLine = [email, phone, location, linkedin].filter(Boolean).join('  •  ')

  return (
    <AppShell>
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Resume builder</span>
        <h1 className="mt-1 text-2xl font-light">Build your resume</h1>
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setTemplate('modern')}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold ${template === 'modern' ? 'bg-accent-soft text-accent-strong' : 'bg-surface-alt text-ink-soft'}`}
        >
          Modern
        </button>
        <button
          onClick={() => setTemplate('classic')}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold ${template === 'classic' ? 'bg-accent-soft text-accent-strong' : 'bg-surface-alt text-ink-soft'}`}
        >
          Classic
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-[1fr_1fr]">
        {/* FORM */}
        <div className="max-h-[calc(100vh-220px)] space-y-5 overflow-y-auto rounded-lg border border-border bg-white p-5">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">Contact</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Full name" value={fullName} onChange={setFullName} />
              <Field label="Email" value={email} onChange={setEmail} />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="+60 12-345 6789" />
              <Field label="Location" value={location} onChange={setLocation} placeholder="Kuala Lumpur, Malaysia" />
              <Field label="LinkedIn / portfolio" value={linkedin} onChange={setLinkedin} placeholder="linkedin.com/in/yourname" />
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">Summary</h3>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="One or two sentences: who you are, your focus area, and what you're looking for."
              className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-ink-faint">Education</h3>
              <button onClick={() => setEducation((p) => [...p, emptyEducation])} className="text-xs font-semibold text-accent">
                + Add
              </button>
            </div>
            {education.map((ed, i) => (
              <div key={i} className="mb-3 rounded-md border border-border p-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Degree" value={ed.degree} onChange={(v) => updateEducation(i, { degree: v })} placeholder="B.Sc. Computer Science" />
                  <Field label="School" value={ed.school} onChange={(v) => updateEducation(i, { school: v })} placeholder="UNIMY" />
                  <Field label="Location" value={ed.location} onChange={(v) => updateEducation(i, { location: v })} />
                  <Field label="Graduation" value={ed.graduationDate} onChange={(v) => updateEducation(i, { graduationDate: v })} placeholder="Aug 2026" />
                  <Field label="GPA (optional)" value={ed.gpa} onChange={(v) => updateEducation(i, { gpa: v })} />
                </div>
                {education.length > 1 && (
                  <button onClick={() => setEducation((p) => p.filter((_, idx) => idx !== i))} className="mt-2 text-xs font-semibold text-danger">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-ink-faint">Experience</h3>
              <button onClick={() => setExperience((p) => [...p, emptyExperience])} className="text-xs font-semibold text-accent">
                + Add
              </button>
            </div>
            {experience.map((ex, i) => (
              <div key={i} className="mb-3 rounded-md border border-border p-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Role" value={ex.role} onChange={(v) => updateExperience(i, { role: v })} placeholder="Data Intern" />
                  <Field label="Company" value={ex.company} onChange={(v) => updateExperience(i, { company: v })} placeholder="ACME Analytics" />
                  <Field label="Location" value={ex.location} onChange={(v) => updateExperience(i, { location: v })} />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Start" value={ex.startDate} onChange={(v) => updateExperience(i, { startDate: v })} placeholder="Jun 2025" />
                    <Field label="End" value={ex.endDate} onChange={(v) => updateExperience(i, { endDate: v })} placeholder="Present" />
                  </div>
                </div>
                <label className="mb-1 mt-2.5 block text-xs font-semibold text-ink-soft">Bullet points (one per line)</label>
                <textarea
                  rows={3}
                  value={ex.bullets.join('\n')}
                  onChange={(v) => updateExperience(i, { bullets: v.target.value.split('\n') })}
                  placeholder={'Built a dashboard that cut weekly reporting time by 40%\nAutomated a data pull that used to take 3 hours manually'}
                  className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
                />
                {experience.length > 1 && (
                  <button onClick={() => setExperience((p) => p.filter((_, idx) => idx !== i))} className="mt-2 text-xs font-semibold text-danger">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wide text-ink-faint">Projects</h3>
              <button onClick={() => setProjects((p) => [...p, emptyProject])} className="text-xs font-semibold text-accent">
                + Add
              </button>
            </div>
            {projects.map((pr, i) => (
              <div key={i} className="mb-3 rounded-md border border-border p-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Project name" value={pr.name} onChange={(v) => updateProject(i, { name: v })} />
                  <Field label="Tech stack" value={pr.tech} onChange={(v) => updateProject(i, { tech: v })} placeholder="Python, Pandas, SQL" />
                  <Field label="Link (optional)" value={pr.link} onChange={(v) => updateProject(i, { link: v })} />
                </div>
                <label className="mb-1 mt-2.5 block text-xs font-semibold text-ink-soft">Bullet points (one per line)</label>
                <textarea
                  rows={2}
                  value={pr.bullets.join('\n')}
                  onChange={(v) => updateProject(i, { bullets: v.target.value.split('\n') })}
                  className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
                />
                <button onClick={() => setProjects((p) => p.filter((_, idx) => idx !== i))} className="mt-2 text-xs font-semibold text-danger">
                  Remove
                </button>
              </div>
            ))}
            {projects.length === 0 && <p className="text-xs text-ink-faint">Optional &mdash; add a project if you have one worth showing.</p>}
          </div>

          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">Skills</h3>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="SQL, Python, Communication"
              className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm"
            />
          </div>

          <div className="flex gap-2 border-t border-border pt-4">
            <button onClick={handleSave} disabled={saving} className="rounded-md border border-border px-4 py-2 text-sm font-semibold disabled:opacity-60">
              {saving ? 'Saving…' : 'Save draft'}
            </button>
            <button onClick={handleDownload} disabled={exporting} className="flex-1 rounded-md bg-ink py-2 text-sm font-semibold text-white disabled:opacity-60">
              {exporting ? 'Preparing PDF…' : 'Download as PDF'}
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto rounded-lg border border-border bg-surface-alt p-4">
          <div
            ref={previewRef}
            className={`mx-auto w-full max-w-[620px] bg-white p-10 ${template === 'classic' ? 'font-serif' : ''}`}
          >
            <h2 className="text-[1.7rem] font-bold leading-tight">{fullName || 'Your name'}</h2>
            {contactLine && <p className="mt-1 text-[0.8rem] text-ink-soft">{contactLine}</p>}

            {summary && (
              <>
                <div className={`mt-4 border-b pb-1 text-[0.68rem] font-bold uppercase tracking-wide ${template === 'classic' ? 'border-ink text-ink' : 'border-border text-accent'}`}>
                  Summary
                </div>
                <p className="mt-2 text-[0.83rem] leading-relaxed text-ink-soft">{summary}</p>
              </>
            )}

            {education.some((e) => e.degree || e.school) && (
              <>
                <div className={`mt-4 border-b pb-1 text-[0.68rem] font-bold uppercase tracking-wide ${template === 'classic' ? 'border-ink text-ink' : 'border-border text-accent'}`}>
                  Education
                </div>
                {education.filter((e) => e.degree || e.school).map((ed, i) => (
                  <div key={i} className="mt-2.5">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[0.88rem] font-semibold">
                        {ed.degree}
                        {ed.school ? `, ${ed.school}` : ''}
                      </p>
                      <span className="whitespace-nowrap text-[0.76rem] text-ink-faint">{ed.graduationDate}</span>
                    </div>
                    <div className="flex items-baseline justify-between text-[0.76rem] text-ink-faint">
                      <span>{ed.location}</span>
                      {ed.gpa && <span>GPA {ed.gpa}</span>}
                    </div>
                  </div>
                ))}
              </>
            )}

            {skills && (
              <>
                <div className={`mt-4 border-b pb-1 text-[0.68rem] font-bold uppercase tracking-wide ${template === 'classic' ? 'border-ink text-ink' : 'border-border text-accent'}`}>
                  Skills
                </div>
                <p className="mt-2 text-[0.83rem] text-ink-soft">{skills}</p>
              </>
            )}

            {experience.some((e) => e.role || e.company) && (
              <>
                <div className={`mt-4 border-b pb-1 text-[0.68rem] font-bold uppercase tracking-wide ${template === 'classic' ? 'border-ink text-ink' : 'border-border text-accent'}`}>
                  Experience
                </div>
                {experience.filter((e) => e.role || e.company).map((ex, i) => (
                  <div key={i} className="mt-2.5">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[0.88rem] font-semibold">
                        {ex.role}
                        {ex.company ? ` — ${ex.company}` : ''}
                      </p>
                      <span className="whitespace-nowrap text-[0.76rem] text-ink-faint">
                        {ex.startDate}
                        {ex.startDate || ex.endDate ? ' – ' : ''}
                        {ex.endDate}
                      </span>
                    </div>
                    {ex.location && <p className="text-[0.76rem] italic text-ink-faint">{ex.location}</p>}
                    <ul className="mt-1 list-disc space-y-0.5 pl-4">
                      {ex.bullets.filter(Boolean).map((b, bi) => (
                        <li key={bi} className="text-[0.83rem] leading-relaxed text-ink-soft">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}

            {projects.some((p) => p.name) && (
              <>
                <div className={`mt-4 border-b pb-1 text-[0.68rem] font-bold uppercase tracking-wide ${template === 'classic' ? 'border-ink text-ink' : 'border-border text-accent'}`}>
                  Projects
                </div>
                {projects.filter((p) => p.name).map((pr, i) => (
                  <div key={i} className="mt-2.5">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[0.88rem] font-semibold">
                        {pr.name}
                        {pr.tech ? <span className="font-normal text-ink-faint"> &middot; {pr.tech}</span> : null}
                      </p>
                      {pr.link && <span className="whitespace-nowrap text-[0.76rem] text-accent">{pr.link}</span>}
                    </div>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4">
                      {pr.bullets.filter(Boolean).map((b, bi) => (
                        <li key={bi} className="text-[0.83rem] leading-relaxed text-ink-soft">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

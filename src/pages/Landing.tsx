import { Link } from 'react-router-dom'
import { MarketingNav } from '../components/MarketingNav'
import { Footer } from '../components/Footer'
import { HeroGraphic } from '../components/HeroGraphic'

function MiniRankBars() {
  const rows = [
    { label: 'Data Analyst', pct: 87 },
    { label: 'UX Researcher', pct: 74 },
    { label: 'Business Analyst', pct: 61 },
  ]
  return (
    <div className="mt-5 space-y-2.5">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex justify-between text-[0.72rem] font-medium text-ink-soft">
            <span>{r.label}</span>
            <span className="font-mono font-semibold text-ink">{r.pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-alt">
            <div
              className="h-full rounded-full"
              style={{ width: `${r.pct}%`, background: 'linear-gradient(90deg, var(--color-grad-1), var(--color-grad-2))' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillRing() {
  const pct = 71
  return (
    <div className="mt-5 flex items-center gap-5">
      <div
        className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: `conic-gradient(var(--color-accent) ${pct}%, var(--color-surface-alt) 0)` }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
          <span className="font-mono text-sm font-bold">5/7</span>
        </div>
      </div>
      <div className="text-sm text-ink-soft">
        <p className="font-semibold text-ink">Data visualisation</p>
        <p className="font-semibold text-ink">Statistics</p>
        <p className="mt-1 text-xs text-ink-faint">2 skills left to close</p>
      </div>
    </div>
  )
}

function ResumeThumb() {
  return (
    <div className="mt-5 flex items-center gap-4">
      <div className="w-24 flex-shrink-0 rounded-md border border-border bg-white p-2.5 shadow-sm">
        <div className="mb-1.5 h-1.5 w-3/4 rounded-full bg-ink/70" />
        <div className="mb-2 h-1 w-1/2 rounded-full bg-ink-faint/50" />
        <div className="mb-1 h-1 w-full rounded-full bg-surface-alt" />
        <div className="mb-1 h-1 w-full rounded-full bg-surface-alt" />
        <div className="mb-2 h-1 w-2/3 rounded-full bg-surface-alt" />
        <div className="mb-1 h-1 w-full rounded-full bg-surface-alt" />
        <div className="h-1 w-4/5 rounded-full bg-surface-alt" />
      </div>
      <p className="text-sm text-ink-soft">Pre-filled from your profile, two templates, one click to PDF.</p>
    </div>
  )
}

function JobStack() {
  return (
    <div className="relative mt-6 h-24">
      <div className="absolute left-8 top-3 w-48 -rotate-2 rounded-md border border-border bg-white p-2.5 shadow-sm">
        <p className="text-xs font-semibold">Reporting Analyst</p>
        <p className="text-[0.68rem] text-ink-faint">CIMB &middot; Part-time</p>
      </div>
      <div className="absolute left-4 top-8 w-48 rotate-1 rounded-md border border-border bg-white p-2.5 shadow-sm">
        <p className="text-xs font-semibold">Data Analyst Intern</p>
        <p className="text-[0.68rem] text-ink-faint">Grab &middot; Internship</p>
      </div>
      <div className="absolute left-0 top-14 w-48 -rotate-1 rounded-md border border-accent bg-white p-2.5 shadow-md">
        <p className="text-xs font-semibold">Junior Data Analyst</p>
        <p className="text-[0.68rem] text-ink-faint">Maybank &middot; Full-time</p>
      </div>
    </div>
  )
}

function AssessmentDots() {
  const answered = 6
  const total = 10
  return (
    <div className="mt-5">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${i < answered ? 'bg-accent' : 'bg-surface-alt'}`}
          />
        ))}
      </div>
      <p className="mt-2.5 text-xs font-medium text-ink-faint">Question {answered} of {total} &middot; every answer sharpens your matches</p>
    </div>
  )
}

const steps = [
  { n: '01', title: 'Tell us about you', body: 'Profile, then a 10-question assessment. Two minutes, no fluff.' },
  { n: '02', title: 'Get ranked matches', body: 'Careers scored against your skills, not a generic quiz result.' },
  { n: '03', title: 'Close the gaps', body: 'See exactly which skills separate you from each role.' },
  { n: '04', title: 'Go apply', body: 'Export a resume, browse roles tied to your top matches.' },
]

export function Landing() {
  return (
    <div className="overflow-x-hidden">
      <MarketingNav />

      {/* HERO */}
      <section className="relative overflow-hidden px-11 pt-24">
        <HeroGraphic className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full" />
        <div className="relative z-10 mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
              <span className="h-0.5 w-4 bg-accent" /> Career advisor for university students
            </span>
            <h1 className="max-w-[15ch] text-[2.6rem] font-medium leading-[1.08] tracking-tight md:text-[3.5rem]">
              Find the career <span className="text-accent">that fits</span>, not just the one your degree implies.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg font-medium text-ink-soft">
              Answer a short assessment, see your best-matching career paths{' '}
              <span className="text-accent-strong">ranked by fit</span>, close the{' '}
              <span className="text-accent-strong">skill gaps</span> between you and them, then build
              the resume and browse the roles to go with it.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Link to="/auth?mode=register" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white">
                Start free assessment
              </Link>
              <a href="#how" className="border-b border-border pb-0.5 text-sm font-semibold">
                See how it works &rarr;
              </a>
            </div>
          </div>

          {/* layered hero visual */}
          <div className="relative h-[360px]">
            <div className="absolute right-2 top-0 w-56 rotate-3 rounded-lg border border-border bg-white p-3.5 shadow-lg">
              <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-wide text-ink-faint">Skill gap</p>
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: `conic-gradient(var(--color-accent) 71%, var(--color-surface-alt) 0)` }}
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[0.6rem] font-bold">5/7</div>
                </div>
                <p className="text-xs text-ink-soft">2 skills to close for Data Analyst</p>
              </div>
            </div>

            <div className="absolute left-0 top-16 w-[300px] -rotate-1 rounded-lg border border-border bg-white p-1 shadow-xl">
              <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Your results</span>
                <span className="text-xs font-medium text-ink-faint">Updated just now</span>
              </div>
              <div className="px-4 pb-4">
                <div className="flex items-baseline justify-between border-b border-border py-2.5">
                  <span className="text-sm font-medium text-ink-soft">Top match</span>
                  <span className="font-mono text-base font-semibold text-accent-strong">Data Analyst</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border py-2.5">
                  <span className="text-sm font-medium text-ink-soft">Match score</span>
                  <span className="font-mono text-base font-semibold">87%</span>
                </div>
                <div className="my-3.5 h-1.5 overflow-hidden rounded-full bg-surface-alt">
                  <div
                    className="h-full w-[87%] rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-grad-1), var(--color-grad-2))' }}
                  />
                </div>
                <div className="flex items-baseline justify-between py-2.5">
                  <span className="text-sm font-medium text-ink-soft">Skills to close</span>
                  <span className="font-mono text-base font-semibold">2 of 7</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 right-4 w-44 rotate-2 rounded-lg border border-accent bg-white p-3 shadow-lg">
              <p className="text-[0.68rem] font-bold uppercase tracking-wide text-accent-strong">Best match</p>
              <p className="mt-1 text-sm font-semibold">Data Analyst</p>
              <p className="text-[0.7rem] text-ink-faint">RM 3,800&ndash;6,500 / mo</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-border bg-surface-alt px-11 py-10">
        <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            ['10', 'assessment questions'],
            ['5', 'career paths mapped'],
            ['25', 'weighted skill signals'],
            ['Free', 'to get started'],
          ].map(([n, label]) => (
            <div key={label}>
              <p className="font-mono text-3xl font-bold text-ink">{n}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-faint">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE BENTO */}
      <section id="how" className="px-11 py-24">
        <div className="mx-auto max-w-[1140px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">What's inside</span>
          <h2 className="mt-3 max-w-[26ch] text-3xl font-light tracking-tight">Everything between "I don't know what I want to do" and a finished application.</h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-6 md:col-span-2">
              <h3 className="text-base font-semibold">Ranked career recommendations</h3>
              <p className="mt-1.5 max-w-[46ch] text-sm text-ink-soft">
                Career paths ranked by percentage match, each with salary range and a skill-gap breakdown &mdash;
                not a personality-quiz label.
              </p>
              <MiniRankBars />
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold">Skills &amp; interest assessment</h3>
              <p className="mt-1.5 text-sm text-ink-soft">10 questions build the profile the matching engine reads from.</p>
              <AssessmentDots />
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold">Skill gap dashboard</h3>
              <p className="mt-1.5 text-sm text-ink-soft">See exactly what's missing for any recommended career.</p>
              <SkillRing />
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold">Resume builder</h3>
              <p className="mt-1.5 text-sm text-ink-soft">Pre-fills from your profile.</p>
              <ResumeThumb />
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold">Job listings</h3>
              <p className="mt-1.5 text-sm text-ink-soft">Curated roles tied to your top matches.</p>
              <JobStack />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border px-11 py-24">
        <div className="mx-auto max-w-[1140px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">The flow</span>
          <h2 className="mt-3 max-w-[24ch] text-3xl font-light tracking-tight">From first click to a finished resume.</h2>

          <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" />
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white font-mono text-sm font-semibold text-accent-strong">
                  {s.n}
                </div>
                <h3 className="text-sm font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-11 pb-24">
        <div
          className="relative mx-auto max-w-[1140px] overflow-hidden rounded-2xl px-12 py-16 text-center"
          style={{ background: 'linear-gradient(135deg, #0A2540 0%, #1c1650 60%, #3a1d6e 100%)' }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--color-grad-2), transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-[-4rem] h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--color-grad-3), transparent 70%)' }}
          />
          <h2 className="relative mx-auto max-w-[20ch] text-3xl font-light tracking-tight text-white">
            Stop guessing. See where your skills actually point.
          </h2>
          <p className="relative mx-auto mt-4 max-w-[44ch] text-white/70">
            Free, takes about five minutes, and the first result you'll see is a ranked list &mdash; not a quiz score.
          </p>
          <Link
            to="/auth?mode=register"
            className="relative mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            Start free assessment
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

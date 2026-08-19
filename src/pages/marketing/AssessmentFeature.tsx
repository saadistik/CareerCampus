import { Link } from 'react-router-dom'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'
import { ASSESSMENT_QUESTIONS } from '../../lib/assessment'

const sample = ASSESSMENT_QUESTIONS.slice(0, 3)

export function AssessmentFeature() {
  return (
    <div className="overflow-x-hidden">
      <MarketingNav />

      <section className="relative px-11 pb-16 pt-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 55% 60% at 82% 15%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 60% at 82% 15%, black, transparent)',
          }}
        />
        <div className="relative mx-auto max-w-[760px] text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
            <span className="h-0.5 w-4 bg-accent" /> Skills &amp; interest assessment
          </span>
          <h1 className="mx-auto max-w-[18ch] text-[2.4rem] font-medium leading-[1.1] tracking-tight md:text-[3.1rem]">
            Ten questions. No horoscope-style results.
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg text-ink-soft">
            Every question maps directly to skill and interest tags that feed the matching engine &mdash;
            there's no filler, and nothing you answer is thrown away.
          </p>
          <div className="mt-8 flex items-center justify-center gap-5">
            <Link to="/auth?mode=register" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white">
              Start the assessment
            </Link>
            <Link to="/features/recommendations" className="border-b border-border pb-0.5 text-sm font-semibold">
              See how matching works &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="px-11 py-20">
        <div className="mx-auto max-w-[1000px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">What it looks like</span>
          <h2 className="mt-3 max-w-[28ch] text-3xl font-light tracking-tight">Three of the ten questions.</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {sample.map((q, i) => (
              <div key={q.id} className="rounded-xl border border-border bg-white p-6">
                <span className="font-mono text-xs font-semibold text-ink-faint">
                  Question {i + 1} of {ASSESSMENT_QUESTIONS.length}
                </span>
                <h3 className="mt-3 text-base font-semibold leading-snug">{q.question}</h3>
                <ul className="mt-4 space-y-2">
                  {q.options.slice(0, 2).map((opt) => (
                    <li key={opt.label} className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-ink-soft">
                      {opt.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-11 py-20">
        <div className="mx-auto max-w-[1000px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">Where your answers go</span>
          <h2 className="mt-3 max-w-[28ch] text-3xl font-light tracking-tight">Every answer is a tag, not a data point that vanishes.</h2>
          <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-border md:block" />
            {[
              { n: '01', title: 'You pick an answer', body: 'Each option carries 2–3 underlying skill or interest tags — never just a letter grade.' },
              { n: '02', title: 'Tags join your profile', body: 'They merge into the same skills list your manually-entered profile uses, deduplicated.' },
              { n: '03', title: 'The engine reads it', body: 'Recommendations re-score the moment you finish — no separate step, no waiting.' },
            ].map((s) => (
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

      <section className="px-11 pb-24">
        <div
          className="relative mx-auto max-w-[1140px] overflow-hidden rounded-2xl px-12 py-16 text-center"
          style={{ background: 'linear-gradient(135deg, #0A2540 0%, #1c1650 60%, #3a1d6e 100%)' }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--color-grad-2), transparent 70%)' }}
          />
          <h2 className="relative mx-auto max-w-[20ch] text-3xl font-light tracking-tight text-white">
            Two minutes in, five ranked careers out.
          </h2>
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

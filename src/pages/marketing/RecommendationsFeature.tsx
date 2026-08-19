import { Link } from 'react-router-dom'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'

const ranked = [
  { title: 'Data Analyst', pct: 87, salary: 'RM 3,800–6,500 / mo', blurb: 'Turn raw business data into decisions — SQL, dashboards, clear write-ups.' },
  { title: 'UX Researcher', pct: 74, salary: 'RM 3,500–6,000 / mo', blurb: 'Study how people use products and turn findings into design decisions.' },
  { title: 'Business Analyst', pct: 61, salary: 'RM 4,000–7,000 / mo', blurb: 'Bridge business needs and technical teams with process and requirements work.' },
]

export function RecommendationsFeature() {
  return (
    <div className="overflow-x-hidden">
      <MarketingNav />

      <section className="relative px-11 pb-16 pt-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 55% 60% at 18% 15%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 60% at 18% 15%, black, transparent)',
          }}
        />
        <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-16 md:grid-cols-[1fr_1fr]">
          <div>
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
              <span className="h-0.5 w-4 bg-accent" /> Career recommendations
            </span>
            <h1 className="max-w-[14ch] text-[2.4rem] font-medium leading-[1.1] tracking-tight md:text-[3.1rem]">
              Ranked by fit, <span className="text-accent">not by vibes</span>.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-ink-soft">
              The score is the share of a career's weighted required skills that your profile
              already covers — the same formula every time, visible to you, not a black box.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Link to="/auth?mode=register" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white">
                See my matches
              </Link>
              <Link to="/features/assessment" className="border-b border-border pb-0.5 text-sm font-semibold">
                Take the assessment first &rarr;
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {ranked.map((r, i) => (
              <div
                key={r.title}
                className={`flex items-center gap-4 rounded-lg border bg-white p-4 ${i === 0 ? 'border-accent shadow-[0_0_0_1px_var(--color-accent)]' : 'border-border'}`}
              >
                <span className="w-5 font-mono text-sm text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{r.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-soft">{r.salary}</p>
                </div>
                <span className="font-mono text-lg font-bold text-accent">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-11 py-20">
        <div className="mx-auto max-w-[1000px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">The formula</span>
          <h2 className="mt-3 max-w-[26ch] text-3xl font-light tracking-tight">How a match percentage actually gets calculated.</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-6">
              <span className="font-mono text-xs font-bold text-accent-strong">STEP 1</span>
              <h3 className="mt-2 text-base font-semibold">Each career has weighted skills</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                Data Analyst needs SQL (weight 2), Python (2), Communication (1), Data visualisation
                (1.5), Statistics (1.5) — total weight 8.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <span className="font-mono text-xs font-bold text-accent-strong">STEP 2</span>
              <h3 className="mt-2 text-base font-semibold">Your profile covers some of them</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                If your skills list contains SQL, Python and Communication, you cover 5 of the 8
                points of weight.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <span className="font-mono text-xs font-bold text-accent-strong">STEP 3</span>
              <h3 className="mt-2 text-base font-semibold">Covered ÷ total = your score</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                5 ÷ 8 = 63%. Every career gets scored the same way, then sorted highest first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-11 pb-24">
        <div
          className="relative mx-auto max-w-[1140px] overflow-hidden rounded-2xl px-12 py-16 text-center"
          style={{ background: 'linear-gradient(135deg, #0A2540 0%, #1c1650 60%, #3a1d6e 100%)' }}
        >
          <div
            className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--color-grad-3), transparent 70%)' }}
          />
          <h2 className="relative mx-auto max-w-[22ch] text-3xl font-light tracking-tight text-white">
            See where your own skills actually rank.
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

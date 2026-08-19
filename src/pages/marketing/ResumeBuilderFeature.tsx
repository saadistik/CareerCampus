import { Link } from 'react-router-dom'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'

export function ResumeBuilderFeature() {
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
        <div className="relative mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
              <span className="h-0.5 w-4 bg-accent" /> Resume builder
            </span>
            <h1 className="max-w-[13ch] text-[2.4rem] font-medium leading-[1.1] tracking-tight md:text-[3.1rem]">
              A resume that already knows your profile.
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-ink-soft">
              Everything you entered while setting up your profile pre-fills the form. Edit what's
              off, pick a template, download a PDF — no re-typing your own history.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <Link to="/auth?mode=register" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white">
                Build my resume
              </Link>
              <Link to="/features/job-listings" className="border-b border-border pb-0.5 text-sm font-semibold">
                See matching jobs &rarr;
              </Link>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 rounded-lg border-2 border-accent bg-white p-6 shadow-lg">
              <span className="text-[0.65rem] font-bold uppercase tracking-wide text-accent-strong">Modern</span>
              <h2 className="mt-3 text-base font-semibold">Aisha Rahman</h2>
              <p className="text-xs text-ink-soft">Aspiring Data Analyst</p>
              <div className="mt-4 border-t border-border pt-3 text-[0.66rem] font-bold uppercase tracking-wide text-accent">Skills</div>
              <p className="mt-1 text-xs text-ink-soft">SQL &middot; Python &middot; Communication</p>
            </div>
            <div className="flex-1 rounded-lg border border-border bg-white p-6">
              <span className="text-[0.65rem] font-bold uppercase tracking-wide text-ink-faint">Classic</span>
              <h2 className="mt-3 font-serif text-base font-semibold">Aisha Rahman</h2>
              <p className="font-serif text-xs text-ink-soft">Aspiring Data Analyst</p>
              <div className="mt-4 border-t border-border pt-3 font-serif text-[0.66rem] font-bold uppercase tracking-wide text-ink-soft">Skills</div>
              <p className="mt-1 font-serif text-xs text-ink-soft">SQL, Python, Communication</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-11 py-20">
        <div className="mx-auto max-w-[1000px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">How it fills itself in</span>
          <h2 className="mt-3 max-w-[26ch] text-3xl font-light tracking-tight">Three fields, one source of truth.</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold">Summary &amp; skills</h3>
              <p className="mt-1.5 text-sm text-ink-soft">Pulled straight from your profile and assessment-tagged skills — edit freely, nothing's locked.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold">Experience &amp; education</h3>
              <p className="mt-1.5 text-sm text-ink-soft">Add entries once; they stay saved to your account for the next time you export.</p>
            </div>
            <div className="rounded-xl border border-border bg-white p-6">
              <h3 className="text-base font-semibold">One-click PDF</h3>
              <p className="mt-1.5 text-sm text-ink-soft">Rendered client-side and downloaded instantly &mdash; no email required, no waiting on a server.</p>
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
            className="pointer-events-none absolute -right-16 bottom-[-4rem] h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--color-grad-3), transparent 70%)' }}
          />
          <h2 className="relative mx-auto max-w-[20ch] text-3xl font-light tracking-tight text-white">
            Your resume, ready before you finish your coffee.
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

import { Link } from 'react-router-dom'
import { MarketingNav } from '../../components/MarketingNav'
import { Footer } from '../../components/Footer'

const jobs = [
  { title: 'Junior Data Analyst', company: 'Maybank', location: 'Kuala Lumpur', type: 'Full-time' },
  { title: 'Data Analyst Intern', company: 'Grab', location: 'Petaling Jaya', type: 'Internship' },
  { title: 'Business Intelligence Assistant', company: 'AirAsia', location: 'Kuala Lumpur', type: 'Full-time' },
  { title: 'Reporting Analyst', company: 'CIMB', location: 'Kuala Lumpur', type: 'Part-time' },
]

export function JobListingsFeature() {
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
        <div className="relative mx-auto max-w-[760px] text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-strong">
            <span className="h-0.5 w-4 bg-accent" /> Job listings
          </span>
          <h1 className="mx-auto max-w-[18ch] text-[2.4rem] font-medium leading-[1.1] tracking-tight md:text-[3.1rem]">
            Roles tied to your matches, not a firehose.
          </h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg text-ink-soft">
            Curated listings filtered by category, location, and type &mdash; connected to the same
            careers your assessment ranked, not a generic job-board feed.
          </p>
          <div className="mt-8 flex items-center justify-center gap-5">
            <Link to="/auth?mode=register" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white">
              Browse job listings
            </Link>
            <Link to="/features/recommendations" className="border-b border-border pb-0.5 text-sm font-semibold">
              See ranked careers first &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="px-11 py-20">
        <div className="mx-auto max-w-[1000px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">A sample</span>
          <h2 className="mt-3 max-w-[26ch] text-3xl font-light tracking-tight">Roles for a Data Analyst match.</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <div key={job.title} className="rounded-xl border border-border bg-white p-5">
                <h3 className="text-base font-semibold">{job.title}</h3>
                <p className="mt-1 text-xs font-semibold text-ink-faint">
                  {job.company} &middot; {job.location} &middot; {job.type}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-11 py-20">
        <div className="mx-auto max-w-[1000px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent-strong">Honest scope</span>
          <h2 className="mt-3 max-w-[30ch] text-3xl font-light tracking-tight">Curated for the MVP, not a live job-board API.</h2>
          <p className="mt-4 max-w-[60ch] text-ink-soft">
            Listings are researched and added by the team, tagged to the career they support. That
            means every listing is relevant to a real recommendation &mdash; it also means the list
            is smaller than a live aggregator. Live API integration is planned for a later phase.
          </p>
        </div>
      </section>

      <section className="px-11 pb-24">
        <div
          className="relative mx-auto max-w-[1140px] overflow-hidden rounded-2xl px-12 py-16 text-center"
          style={{ background: 'linear-gradient(135deg, #0A2540 0%, #1c1650 60%, #3a1d6e 100%)' }}
        >
          <div
            className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--color-grad-2), transparent 70%)' }}
          />
          <h2 className="relative mx-auto max-w-[22ch] text-3xl font-light tracking-tight text-white">
            Find roles that match where you're actually headed.
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

import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const links = [
  { to: '/features/assessment', label: 'Assessment' },
  { to: '/features/recommendations', label: 'Recommendations' },
  { to: '/features/resume-builder', label: 'Resume builder' },
  { to: '/features/job-listings', label: 'Job listings' },
]

export function MarketingNav() {
  const location = useLocation()
  return (
    <nav className="flex items-center justify-between border-b border-border px-11 py-5">
      <div className="flex items-center gap-9">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-[1.02rem] font-semibold tracking-tight">CareerCompass</span>
        </Link>
        <ul className="hidden gap-7 whitespace-nowrap text-sm font-medium lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={
                  location.pathname === l.to ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-5 whitespace-nowrap">
        <Link to="/auth" className="text-sm font-medium text-ink-soft hover:text-ink">
          Sign in
        </Link>
        <Link to="/auth?mode=register" className="rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white">
          Start free assessment
        </Link>
      </div>
    </nav>
  )
}

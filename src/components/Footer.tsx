import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const productLinks = [
  { label: 'Assessment', href: '#how' },
  { label: 'Recommendations', href: '#how' },
  { label: 'Resume builder', href: '#how' },
  { label: 'Job listings', href: '#how' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-[1140px] px-11 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Logo size={26} />
              <span className="text-base font-semibold tracking-tight">CareerCompass</span>
            </div>
            <p className="mt-4 max-w-[34ch] text-sm text-ink-soft">
              A career advisor that scores your fit against real roles instead of handing back a
              quiz label — then helps you close the gap and apply.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Product</p>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-ink-soft hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Account</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/auth" className="text-sm text-ink-soft hover:text-ink">
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=register" className="text-sm text-ink-soft hover:text-ink">
                  Create an account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-ink-faint md:flex-row">
          <span>&copy; {new Date().getFullYear()} CareerCompass. All rights reserved.</span>
          <span>Rule-based career matching, built to be transparent about how it scores you.</span>
        </div>
      </div>
    </footer>
  )
}

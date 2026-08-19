import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Logo } from './Logo'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/recommendations', label: 'Recommendations' },
  { to: '/resume', label: 'Resume builder' },
  { to: '/jobs', label: 'Job listings' },
]

export function AppShell({ children }: { children: ReactNode }) {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="grid min-h-screen grid-cols-[216px_1fr] grid-rows-[60px_1fr]">
      <div className="col-start-1 row-start-1 flex items-center gap-2 border-r border-b border-border px-4">
        <Logo size={24} />
        <span className="font-semibold text-sm">CareerCompass</span>
      </div>

      <div className="col-start-2 row-start-1 flex items-center justify-between border-b border-border px-6">
        <span className="text-sm text-ink-soft">
          {profile?.role === 'admin' ? 'Admin' : 'Student'} workspace
        </span>
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
            {(profile?.full_name || 'U').slice(0, 1).toUpperCase()}
          </div>
          <button onClick={handleSignOut} className="text-sm font-medium text-ink-soft hover:text-ink">
            Sign out
          </button>
        </div>
      </div>

      <nav className="col-start-1 row-start-2 border-r border-border p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-md border-l-2 px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'border-accent bg-accent-soft text-accent-strong'
                      : 'border-transparent text-ink-soft hover:bg-surface-alt'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {profile?.role === 'admin' && (
          <>
            <div className="mt-4 px-3 text-[0.66rem] font-bold uppercase tracking-wider text-ink-faint">
              Staff only
            </div>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `mt-1 block rounded-md border-l-2 px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'border-warning bg-warning-soft text-warning'
                    : 'border-transparent text-ink-soft hover:bg-surface-alt'
                }`
              }
            >
              Admin panel
            </NavLink>
          </>
        )}
      </nav>

      <main className="col-start-2 row-start-2 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

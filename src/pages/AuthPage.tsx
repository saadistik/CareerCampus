import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Logo } from '../components/Logo'

export function AuthPage() {
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState<'signin' | 'register'>(
    searchParams.get('mode') === 'register' ? 'register' : 'signin'
  )
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setBusy(true)
    if (mode === 'signin') {
      const { error } = await signIn(email, password)
      setBusy(false)
      if (error) return setError(error)
      navigate('/dashboard')
    } else {
      const { error } = await signUp(email, password, fullName)
      setBusy(false)
      if (error) return setError(error)
      navigate('/profile')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-alt px-5">
      <div className="w-[380px] rounded-lg border border-border bg-white p-7 shadow-[0_1px_2px_rgba(10,37,64,0.05),0_4px_14px_-8px_rgba(10,37,64,0.16)]">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <Logo size={22} />
          <span className="text-sm font-semibold">CareerCompass</span>
        </Link>

        <div className="mb-5 flex gap-1 rounded-md bg-surface-alt p-0.5">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 rounded py-2 text-sm font-semibold ${mode === 'signin' ? 'bg-white shadow-sm' : 'text-ink-soft'}`}
          >
            Sign in
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 rounded py-2 text-sm font-semibold ${mode === 'register' ? 'bg-white shadow-sm' : 'text-ink-soft'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Full name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm"
              />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}
          {notice && <p className="text-sm text-success">{notice}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-ink py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <p className="mt-3.5 text-center text-xs text-ink-faint">
          Authenticated by Supabase Auth &middot; session issued as a JWT
        </p>
      </div>
    </div>
  )
}

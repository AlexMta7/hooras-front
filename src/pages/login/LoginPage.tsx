import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { TextField, PasswordField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/auth/AuthProvider'
import { toastMutationError } from '@/lib/mutations'
import heroImage from '@/assets/hero.png'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login({ username, password })
      await navigate({ to: '/' })
    } catch (error) {
      toastMutationError(error, 'Invalid credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-dvh items-center justify-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
      <div className="grid h-full max-h-[720px] w-full max-w-5xl grid-rows-[minmax(10rem,14rem)_minmax(0,1fr)] overflow-hidden rounded-3xl border border-border bg-muted shadow-[var(--shadow-sm-2)] md:grid-cols-[minmax(0,48%)_minmax(360px,1fr)] md:grid-rows-1">
        <div className="relative min-h-0 bg-muted">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-h-0 items-center justify-center overflow-y-auto rounded-3xl bg-card p-6 sm:p-8 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-[length:var(--text-display-sm)] font-semibold text-foreground">
                Sign in
              </h1>
              <p className="mt-2 text-muted-foreground">Access the Social Hours Platform</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
              <PasswordField
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

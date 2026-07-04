import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { TextField, PasswordField } from '@/components/forms'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/auth/AuthProvider'
import { toastMutationError } from '@/lib/mutations'

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
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-sm-2)]">
        <div className="mb-8 text-center">
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
  )
}

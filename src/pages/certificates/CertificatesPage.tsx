import { useState } from 'react'
import { useGenerateCertificate } from '@/api/hooks'
import { TextField } from '@/components/forms'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import type { Certificate } from '@/api/types'
import { ApiError } from '@/api/client'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'

export function CertificatesPage() {
  const generateMutation = useGenerateCertificate()
  const [studentRef, setStudentRef] = useState('')
  const [assignmentId, setAssignmentId] = useState('')
  const [result, setResult] = useState<Certificate | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setResult(null)
    try {
      const certificate = await generateMutation.mutateAsync({
        studentRef,
        assignmentId: assignmentId || undefined,
      })
      setResult(certificate)
      toastMutationSuccess('Certificate generated')
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setErrorMessage(error.message)
      }
      toastMutationError(error, 'Unable to generate certificate.')
    }
  }

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader title="Certificates" description="Generate completion certificates for students." />

      <form
        onSubmit={handleGenerate}
        className="max-w-lg rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
      >
        <div className="space-y-4">
          <TextField
            label="Student reference"
            name="studentRef"
            value={studentRef}
            onChange={(e) => setStudentRef(e.target.value)}
            required
          />
          <TextField
            label="Assignment ID (optional)"
            name="assignmentId"
            value={assignmentId}
            onChange={(e) => setAssignmentId(e.target.value)}
          />
        </div>
        <Button type="submit" className="mt-4" disabled={generateMutation.isPending}>
          {generateMutation.isPending ? 'Generating…' : 'Generate certificate'}
        </Button>
      </form>

      {errorMessage ? (
        <div className="mt-6 rounded-3xl border border-destructive/30 bg-destructive/10 p-6 text-destructive">
          {errorMessage}
        </div>
      ) : null}

      {result ? (
        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
          <h2 className="text-lg font-semibold text-foreground">Certificate generated</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Verification code</dt>
              <dd className="font-mono text-foreground">{result.verificationCode ?? '—'}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="capitalize text-foreground">{result.status}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Generated at</dt>
              <dd className="text-foreground">
                {new Date(result.generatedAt).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}
    </div>
  )
}

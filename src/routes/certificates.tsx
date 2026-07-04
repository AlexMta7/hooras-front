import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { CertificatesPage } from '@/pages/certificates/CertificatesPage'

export const Route = createFileRoute('/certificates')({
  component: () => (
    <RequireAuth>
      <RequireRole roles={['coordinator', 'admin']}>
        <CertificatesPage />
      </RequireRole>
    </RequireAuth>
  ),
})

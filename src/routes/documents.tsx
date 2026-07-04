import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { DocumentsPage } from '@/pages/documents/DocumentsPage'

export const Route = createFileRoute('/documents')({
  component: () => (
    <RequireAuth>
      <DocumentsPage />
    </RequireAuth>
  ),
})

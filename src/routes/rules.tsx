import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { RulesPage } from '@/pages/rules/RulesPage'

export const Route = createFileRoute('/rules')({
  component: () => (
    <RequireAuth>
      <RequireRole roles={['coordinator', 'admin']}>
        <RulesPage />
      </RequireRole>
    </RequireAuth>
  ),
})

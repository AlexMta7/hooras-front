import { createFileRoute } from '@tanstack/react-router'
import { RequireAuth } from '@/auth/RequireAuth'
import { RequireRole } from '@/auth/RequireRole'
import { ProfilePage } from '@/pages/profile/ProfilePage'

export const Route = createFileRoute('/profile')({
  component: () => (
    <RequireAuth>
      <RequireRole roles={['student']}>
        <ProfilePage />
      </RequireRole>
    </RequireAuth>
  ),
})

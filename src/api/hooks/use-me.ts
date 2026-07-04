import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/hooks/query-keys'
import type { CurrentUser, StudentProfile } from '@/api/types'

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => api.get<CurrentUser>('/api/v1/me'),
  })
}

export function useStudentProfile(enabled = true) {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => api.get<StudentProfile>('/api/v1/me/profile'),
    enabled,
  })
}

export function useRefreshProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.post<StudentProfile>('/api/v1/me/profile/refresh'),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile, data)
    },
  })
}

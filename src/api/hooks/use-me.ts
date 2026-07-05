import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/hooks/query-keys'

export function useMe() {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: () => api.get('/api/v1/me'),
  })
}

export function useStudentProfile(enabled = true) {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => api.get('/api/v1/me/profile'),
    enabled,
  })
}

export function useRefreshProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.post('/api/v1/me/profile/refresh'),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile, data)
    },
  })
}

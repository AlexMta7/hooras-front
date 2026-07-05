import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys, type QueryParams } from '@/api/hooks/query-keys'
import type { ApplicationInput, ApplicationStatus } from '@/api/types'

export interface ApplicationFilters {
  status?: ApplicationStatus
  projectId?: string
}

export function useApplications(filters?: ApplicationFilters) {
  const params = filters?.status ? { status: filters.status } : undefined
  return useQuery({
    queryKey: queryKeys.applications(filters as QueryParams | undefined),
    queryFn: () => api.get('/api/v1/applications', { params }),
    select: (applications) =>
      filters?.projectId
        ? applications.filter((application) => application.projectId === filters.projectId)
        : applications,
  })
}

export function useCreateApplication(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ApplicationInput) =>
      api.post('/api/v1/projects/{projectId}/applications', { path: { projectId }, body }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['applications'] })
      void queryClient.invalidateQueries({ queryKey: queryKeys.projectApplications(projectId) })
    },
  })
}

export function useApproveApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (applicationId: string) =>
      api.post('/api/v1/applications/{applicationId}/approve', { path: { applicationId } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['applications'] })
      void queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useRejectApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ applicationId, reason }: { applicationId: string; reason?: string }) =>
      api.post('/api/v1/applications/{applicationId}/reject', {
        path: { applicationId },
        body: { reason },
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['applications'] })
      void queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

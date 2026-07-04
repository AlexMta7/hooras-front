import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys, type QueryParams } from '@/api/hooks/query-keys'
import type { ApplicationInput, ApplicationStatus, ProjectApplication } from '@/api/types'

export interface ApplicationFilters {
  status?: ApplicationStatus
  projectId?: string
}

export function useApplications(filters?: ApplicationFilters) {
  const params = filters as QueryParams | undefined
  return useQuery({
    queryKey: queryKeys.applications(params),
    queryFn: () => api.get<ProjectApplication[]>('/api/v1/applications', params),
  })
}

export function useCreateApplication(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ApplicationInput) =>
      api.post<ProjectApplication>(`/api/v1/projects/${projectId}/applications`, body),
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
      api.post<ProjectApplication>(`/api/v1/applications/${applicationId}/approve`),
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
      api.post<ProjectApplication>(`/api/v1/applications/${applicationId}/reject`, { reason }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['applications'] })
      void queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys } from '@/api/hooks/query-keys'
import type { ProgressReport, ProjectReport } from '@/api/types'

export function useProgressReport(enabled = true) {
  return useQuery({
    queryKey: queryKeys.progressReport,
    queryFn: () => api.get<ProgressReport>('/api/v1/reports/progress'),
    enabled,
  })
}

export function useProjectReport(enabled = true) {
  return useQuery({
    queryKey: queryKeys.projectReport,
    queryFn: () => api.get<ProjectReport>('/api/v1/reports/projects'),
    enabled,
  })
}

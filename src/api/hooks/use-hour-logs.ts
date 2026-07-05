import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys, type QueryParams } from '@/api/hooks/query-keys'
import type { ApprovalStatus, HourLogInput } from '@/api/types'

export interface HourLogFilters {
  assignmentId?: string
  status?: ApprovalStatus
}

export function useHourLogs(filters?: HourLogFilters) {
  const params = filters as QueryParams | undefined
  return useQuery({
    queryKey: queryKeys.hourLogs(params),
    queryFn: () => api.get('/api/v1/hour-logs', { params }),
  })
}

export function useCreateHourLog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: HourLogInput) => api.post('/api/v1/hour-logs', { body }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['hour-logs'] })
    },
  })
}

export function useApproveHourLog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (hourLogId: string) =>
      api.post('/api/v1/hour-logs/{hourLogId}/approve', { path: { hourLogId } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['hour-logs'] })
    },
  })
}

export function useRejectHourLog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ hourLogId, reason }: { hourLogId: string; reason?: string }) =>
      api.post('/api/v1/hour-logs/{hourLogId}/reject', {
        path: { hourLogId },
        body: { reason: reason ?? '' },
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['hour-logs'] })
    },
  })
}

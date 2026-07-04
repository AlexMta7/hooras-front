import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys, type QueryParams } from '@/api/hooks/query-keys'
import type { Assignment } from '@/api/types'

export interface AssignmentFilters {
  studentRef?: string
  projectId?: string
}

export function useAssignments(filters?: AssignmentFilters) {
  const params = filters as QueryParams | undefined
  return useQuery({
    queryKey: queryKeys.assignments(params),
    queryFn: () => api.get<Assignment[]>('/api/v1/assignments', params),
  })
}

export function useSetAssignmentSupervisor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      assignmentId,
      supervisorRef,
    }: {
      assignmentId: string
      supervisorRef: string
    }) =>
      api.put<Assignment>(`/api/v1/assignments/${assignmentId}/supervisor`, { supervisorRef }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}

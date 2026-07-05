import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys, type QueryParams } from '@/api/hooks/query-keys'

export interface AssignmentFilters {
  studentRef?: string
  projectId?: string
}

export function useAssignments(filters?: AssignmentFilters) {
  const params = filters as QueryParams | undefined
  return useQuery({
    queryKey: queryKeys.assignments(params),
    queryFn: () => api.get('/api/v1/assignments', { params }),
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
      api.put('/api/v1/assignments/{assignmentId}/supervisor', {
        path: { assignmentId },
        body: { supervisorRef },
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}

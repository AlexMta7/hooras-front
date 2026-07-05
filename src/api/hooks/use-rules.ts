import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys, type QueryParams } from '@/api/hooks/query-keys'
import type { RequirementRuleInput, RuleEvaluationRequest } from '@/api/types'

export interface RuleFilters {
  facultyCode?: string
  programCode?: string
  degreeLevel?: string
}

export function useRules(filters?: RuleFilters) {
  const params = filters as QueryParams | undefined
  return useQuery({
    queryKey: queryKeys.rules(params),
    queryFn: () => api.get('/api/v1/rules', { params }),
  })
}

export function useCreateRule() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: RequirementRuleInput) => api.post('/api/v1/rules', { body }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['rules'] })
    },
  })
}

export function useEvaluateRules() {
  return useMutation({
    mutationFn: (body: RuleEvaluationRequest) =>
      api.post('/api/v1/rules/evaluate', { body }),
  })
}

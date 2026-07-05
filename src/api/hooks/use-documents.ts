import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import { queryKeys, type QueryParams } from '@/api/hooks/query-keys'
import type { DocumentRequirementInput, DocumentUploadInput } from '@/api/types'

export interface DocumentFilters {
  ownerRef?: string
  status?: string
}

export function useDocumentRequirements() {
  return useQuery({
    queryKey: queryKeys.documentRequirements,
    queryFn: () => api.get('/api/v1/document-requirements'),
  })
}

export function useDocuments(filters?: DocumentFilters) {
  const params = filters as QueryParams | undefined
  return useQuery({
    queryKey: queryKeys.documents(params),
    queryFn: () => api.get('/api/v1/documents', { params }),
  })
}

export function useCreateDocumentRequirement() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: DocumentRequirementInput) =>
      api.post('/api/v1/document-requirements', { body }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.documentRequirements })
    },
  })
}

export function useRegisterDocumentUpload() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: DocumentUploadInput) => api.post('/api/v1/documents', { body }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export function useApproveDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (documentId: string) =>
      api.post('/api/v1/documents/{documentId}/approve', { path: { documentId } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export function useRejectDocument() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ documentId, reason }: { documentId: string; reason?: string }) =>
      api.post('/api/v1/documents/{documentId}/reject', {
        path: { documentId },
        body: { reason: reason ?? '' },
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

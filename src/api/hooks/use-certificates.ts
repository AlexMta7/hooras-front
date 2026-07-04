import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/client'
import type { Certificate } from '@/api/types'

export interface GenerateCertificateInput {
  studentRef: string
  assignmentId?: string
}

export function useGenerateCertificate() {
  return useMutation({
    mutationFn: (body: GenerateCertificateInput) =>
      api.post<Certificate>('/api/v1/certificates/generate', body),
  })
}

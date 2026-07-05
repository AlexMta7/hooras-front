import { useMutation } from '@tanstack/react-query'
import { api } from '@/api/client'

export interface GenerateCertificateInput {
  studentRef: string
  assignmentId?: string
}

export function useGenerateCertificate() {
  return useMutation({
    mutationFn: (body: GenerateCertificateInput) =>
      api.post('/api/v1/certificates/generate', { body }),
  })
}

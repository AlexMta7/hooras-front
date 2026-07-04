import { ApiError } from '@/api/client'
import { toast } from '@/hooks/use-toast'

export function getMutationErrorMessage(error: unknown, fallback = 'Something went wrong.') {
  if (error instanceof ApiError) {
    return error.message || fallback
  }
  if (error instanceof Error) return error.message
  return fallback
}

export function toastMutationSuccess(title: string, description?: string) {
  toast({ title, description })
}

export function toastMutationError(error: unknown, fallback?: string) {
  toast({
    title: 'Error',
    description: getMutationErrorMessage(error, fallback),
    variant: 'destructive',
  })
}

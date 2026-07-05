import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'
import type { ProjectInput } from '@/api/types'

// ---------------------------------------------------------------------------
// Types — mirror the backend's JobSearchResult / ContactInfo shapes
// ---------------------------------------------------------------------------

export interface JobSearchFilters {
  query: string
  categories?: string[]
  location?: string
  limit?: number
}

export interface JobSearchResult {
  title: string
  url: string
  description: string
  company: string
  location?: string
  categories: string[]
  contactInfo?: ContactInfo
}

export interface JobSearchResponse {
  results: JobSearchResult[]
  total: number
}

export interface ContactInfo {
  email?: string
  phone?: string
  website?: string
  contactPage?: string
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Mutation hook to search job listings via the backend proxy to Firecrawl.
 */
export function useJobSearch() {
  return useMutation({
    mutationFn: (filters: JobSearchFilters): Promise<JobSearchResponse> =>
      api.postJson<JobSearchResponse>('/api/v1/job-search/search', {
        body: filters,
      }),
  })
}

/**
 * Mutation hook to scrape contact information from a given URL.
 */
export function useScrapeContact() {
  return useMutation({
    mutationFn: (url: string): Promise<ContactInfo> =>
      api.postJson<ContactInfo>('/api/v1/job-search/scrape-contact', {
        body: { url },
      }),
  })
}

/**
 * Mutation hook to import a job search result as a draft project.
 */
export function useImportJobAsProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ProjectInput) =>
      api.post('/api/v1/projects', { body }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

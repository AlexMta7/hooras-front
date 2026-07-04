type QueryParams = Record<string, string | number | boolean | undefined | null>

export type { QueryParams }

export const queryKeys = {
  me: ['me'] as const,
  profile: ['me', 'profile'] as const,
  projects: (filters?: QueryParams) => ['projects', filters] as const,
  project: (id: string) => ['projects', id] as const,
  projectApplications: (projectId: string) => ['projects', projectId, 'applications'] as const,
  applications: (filters?: QueryParams) => ['applications', filters] as const,
  assignments: (filters?: QueryParams) => ['assignments', filters] as const,
  hourLogs: (filters?: QueryParams) => ['hour-logs', filters] as const,
  documentRequirements: ['document-requirements'] as const,
  documents: (filters?: QueryParams) => ['documents', filters] as const,
  rules: (filters?: QueryParams) => ['rules', filters] as const,
  progressReport: ['reports', 'progress'] as const,
  projectReport: ['reports', 'projects'] as const,
}

import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  TextField,
  SelectField,
  MultiSelectField,
  CalendarField,
  NumberField,
  SwitchField,
} from '@/components/forms'
import { Editor } from '@/components/editor'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { useCreateProject, useProject, useUpdateProject } from '@/api/hooks'
import type { ProjectInput } from '@/api/types'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'

const MODALITY_OPTIONS = [
  { label: 'Onsite', value: 'onsite' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
]

const CATEGORY_OPTIONS = [
  { label: 'Community', value: 'community' },
  { label: 'Environmental', value: 'environmental' },
  { label: 'Research', value: 'research' },
  { label: 'Administrative', value: 'administrative' },
  { label: 'Other', value: 'other' },
]

const emptyForm: ProjectInput = {
  title: '',
  description: '',
  organizationName: '',
  location: '',
  modality: 'onsite',
  categories: [],
  capacity: undefined,
  startsAt: '',
  endsAt: '',
  applicationDeadline: '',
  publicSafe: false,
}

interface ProjectFormPageProps {
  projectId?: string
}

export function ProjectFormPage({ projectId }: ProjectFormPageProps) {
  const navigate = useNavigate()
  const isEdit = Boolean(projectId)
  const projectQuery = useProject(projectId ?? '')
  const createMutation = useCreateProject()
  const updateMutation = useUpdateProject(projectId ?? '')

  const [form, setForm] = useState<ProjectInput>(emptyForm)

  useEffect(() => {
    if (!isEdit || !projectQuery.data) return
    const project = projectQuery.data
    setForm({
      title: project.title,
      description: project.description,
      organizationName: project.organizationName,
      location: project.location ?? '',
      modality: project.modality ?? 'onsite',
      categories: project.categories,
      capacity: project.capacity,
      startsAt: project.startsAt ?? '',
      endsAt: project.endsAt ?? '',
      applicationDeadline: project.applicationDeadline ?? '',
      publicSafe: project.publicSafe,
    })
  }, [isEdit, projectQuery.data])

  const updateField = <K extends keyof ProjectInput>(name: K, value: ProjectInput[K]) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEdit && projectId) {
        await updateMutation.mutateAsync(form)
        toastMutationSuccess('Project updated')
        await navigate({ to: '/projects/$projectId', params: { projectId } })
      } else {
        const created = await createMutation.mutateAsync(form)
        toastMutationSuccess('Project created')
        await navigate({ to: '/projects/$projectId', params: { projectId: created.id } })
      }
    } catch (error) {
      toastMutationError(error, 'Unable to save project.')
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader
        title={isEdit ? 'Edit project' : 'New project'}
        description="Define project details for students to discover and apply."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
            />
            <TextField
              label="Organization"
              name="organizationName"
              value={form.organizationName}
              onChange={(e) => updateField('organizationName', e.target.value)}
              required
            />
            <TextField
              label="Location"
              name="location"
              value={form.location ?? ''}
              onChange={(e) => updateField('location', e.target.value)}
            />
            <SelectField
              label="Modality"
              name="modality"
              value={form.modality ?? 'onsite'}
              options={MODALITY_OPTIONS}
              onChange={(e) => updateField('modality', e.target.value as ProjectInput['modality'])}
            />
            <NumberField
              label="Capacity"
              name="capacity"
              value={form.capacity}
              onChange={(e) => updateField('capacity', Number(e.target.value) || undefined)}
            />
            <MultiSelectField
              label="Categories"
              name="categories"
              value={form.categories}
              options={CATEGORY_OPTIONS}
              onChange={(e) => updateField('categories', e.target.value as string[])}
            />
            <CalendarField
              label="Starts at"
              name="startsAt"
              value={form.startsAt}
              onChange={(e) => updateField('startsAt', String(e.target.value))}
            />
            <CalendarField
              label="Ends at"
              name="endsAt"
              value={form.endsAt}
              onChange={(e) => updateField('endsAt', String(e.target.value))}
            />
            <CalendarField
              label="Application deadline"
              name="applicationDeadline"
              value={form.applicationDeadline}
              onChange={(e) => updateField('applicationDeadline', String(e.target.value))}
            />
            <SwitchField
              label="Public safe"
              name="publicSafe"
              checked={form.publicSafe}
              onChange={(e) => updateField('publicSafe', e.target.value)}
            />
          </div>

          <div className="mt-6">
            <Editor
              label="Description"
              name="description"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => void navigate({ to: isEdit && projectId ? '/projects/$projectId' : '/projects', params: projectId ? { projectId } : undefined })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

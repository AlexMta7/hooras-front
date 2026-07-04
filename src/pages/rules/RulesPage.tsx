import { useState } from 'react'
import { useRules, useCreateRule, useEvaluateRules } from '@/api/hooks'
import { TextField, NumberField, SwitchField } from '@/components/forms'
import { QueryState } from '@/components/feedback'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/layout/StatusBadge'
import { Button } from '@/components/ui/button'
import { PreviewEditor } from '@/components/editor'
import type { RequirementRuleInput, RuleEvaluationResult } from '@/api/types'
import { toastMutationError, toastMutationSuccess } from '@/lib/mutations'

export function RulesPage() {
  const [facultyCode, setFacultyCode] = useState('')
  const [programCode, setProgramCode] = useState('')
  const [degreeLevel, setDegreeLevel] = useState('')

  const filters = {
    ...(facultyCode ? { facultyCode } : {}),
    ...(programCode ? { programCode } : {}),
    ...(degreeLevel ? { degreeLevel } : {}),
  }

  const rulesQuery = useRules(Object.keys(filters).length ? filters : undefined)
  const createMutation = useCreateRule()
  const evaluateMutation = useEvaluateRules()

  const [form, setForm] = useState<RequirementRuleInput>({
    name: '',
    requiredHours: 40,
    active: true,
    scope: {},
  })
  const [evaluateStudentRef, setEvaluateStudentRef] = useState('')
  const [evaluation, setEvaluation] = useState<RuleEvaluationResult | null>(null)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync(form)
      toastMutationSuccess('Rule created')
      setForm({ name: '', requiredHours: 40, active: true, scope: {} })
    } catch (error) {
      toastMutationError(error)
    }
  }

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await evaluateMutation.mutateAsync({ studentRef: evaluateStudentRef })
      setEvaluation(result)
    } catch (error) {
      toastMutationError(error)
    }
  }

  return (
    <div className="mx-auto max-w-[var(--page-max-width)] px-4 py-10 sm:px-10">
      <PageHeader title="Rules" description="Configure eligibility rules and evaluate students." />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <TextField label="Faculty code" name="facultyCode" value={facultyCode} onChange={(e) => setFacultyCode(e.target.value)} />
        <TextField label="Program code" name="programCode" value={programCode} onChange={(e) => setProgramCode(e.target.value)} />
        <TextField label="Degree level" name="degreeLevel" value={degreeLevel} onChange={(e) => setDegreeLevel(e.target.value)} />
      </div>

      <form
        onSubmit={handleCreate}
        className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">Create rule</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <NumberField
            label="Required hours"
            name="requiredHours"
            value={form.requiredHours}
            onChange={(e) => setForm((prev) => ({ ...prev, requiredHours: e.target.value }))}
          />
          <SwitchField
            label="Active"
            name="active"
            checked={form.active}
            onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.value }))}
          />
        </div>
        <Button type="submit" className="mt-4" disabled={createMutation.isPending}>
          Create rule
        </Button>
      </form>

      <form
        onSubmit={handleEvaluate}
        className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-sm)]"
      >
        <h2 className="mb-4 text-lg font-semibold text-foreground">Evaluate student</h2>
        <TextField
          label="Student reference"
          name="studentRef"
          value={evaluateStudentRef}
          onChange={(e) => setEvaluateStudentRef(e.target.value)}
        />
        <Button type="submit" className="mt-4" disabled={evaluateMutation.isPending}>
          Evaluate
        </Button>
        {evaluation ? (
          <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-4">
            <div className="mb-2">
              <StatusBadge status={evaluation.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              Required hours: {evaluation.requiredHours}
            </p>
            {evaluation.explanation ? (
              <div className="mt-3">
                <PreviewEditor content={evaluation.explanation} />
              </div>
            ) : null}
          </div>
        ) : null}
      </form>

      <QueryState
        isLoading={rulesQuery.isLoading}
        isError={rulesQuery.isError}
        error={rulesQuery.error}
        isEmpty={!rulesQuery.data?.length}
        onRetry={() => void rulesQuery.refetch()}
        emptyTitle="No rules found"
      >
        <ul className="space-y-3">
          {rulesQuery.data?.map((rule) => (
            <li
              key={rule.id}
              className="rounded-3xl border border-border bg-card px-6 py-4 shadow-[var(--shadow-sm)]"
            >
              <p className="font-medium text-foreground">{rule.name}</p>
              <p className="text-sm text-muted-foreground">{rule.requiredHours} required hours</p>
            </li>
          ))}
        </ul>
      </QueryState>
    </div>
  )
}

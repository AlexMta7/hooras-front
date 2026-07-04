import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[var(--page-max-width)] flex-col items-center justify-center px-4 py-12 text-center sm:px-10">
      <p className="text-[length:var(--text-display)] font-bold leading-[var(--leading-display)] text-foreground sm:text-[length:var(--text-heading-lg)] sm:leading-[var(--leading-heading-lg)]">
        404
      </p>
      <h1 className="mt-4 text-[length:var(--text-subheading)] font-semibold leading-[var(--leading-subheading)] text-foreground">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-[length:var(--text-body)] text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  )
}

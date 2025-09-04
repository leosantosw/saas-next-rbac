'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { createProjectAction } from './actions'

export function ProjectForm() {
  const [{ success, message, errors }, handleSignIn, isPending] =
    useFormState(createProjectAction)

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Project saved!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input id="name" name="name" type="name" />
        {errors?.name && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" inputMode="url" />
        {errors?.description && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}

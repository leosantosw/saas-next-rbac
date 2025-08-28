'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { GithubForm } from '../GithubForm'
import { SignUpAction } from './actions'

export default function SignUpForm() {
  const [{ success, message, errors }, handleCreateAccount, isPending] =
    useFormState(SignUpAction)

  return (
    <div className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign up failed!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleCreateAccount} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="name" />
          {errors?.name && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" />
          {errors?.email && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
          {errors?.password && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirm_password">Confirm your password</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
          />
          {errors?.confirm_password && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {errors.confirm_password[0]}
            </p>
          )}
        </div>

        <Button className="w-full cursor-pointer" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button className="w-full cursor-pointer" size="sm" variant="link">
          <Link href="/auth/sign-in">Already have an account? Sign in</Link>
        </Button>
      </form>

      <Separator />

      <GithubForm label="Sign up with Github" />
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import githubIcon from '@/assets/github-icon.svg'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { signInWithGithub } from '../actions'
import { useFormState } from '@/hooks/use-form-state'
import { createNewAccount } from './actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, Loader2 } from 'lucide-react'

export default function SignInPage() {
  const [{ success, message, errors }, handleCreateAccount, isPending] =
    useFormState(createNewAccount)

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

      <form action={signInWithGithub}>
        <Button className="w-full cursor-pointer" variant="outline">
          <Image
            src={githubIcon}
            alt="Github"
            className="mr-2 size-4 dark:invert"
          />
          Sign up with Github
        </Button>
      </form>
    </div>
  )
}

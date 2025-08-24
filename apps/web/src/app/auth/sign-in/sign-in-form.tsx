'use client'

import githubIcon from '@/assets/github-icon.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'
import { signInWithEmailAndPassword } from './actions'
import { Loader2 } from 'lucide-react'

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    null
  )
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="text" />
        {state?.error.email && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {state?.error.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
        {state?.error.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            {state?.error.password[0]}
          </p>
        )}
        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with e-mail'
        )}
      </Button>

      <Button className="w-full" size="sm" variant="link">
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />
      <Button className="w-full" variant="outline">
        <Image
          src={githubIcon}
          alt="Github"
          className="mr-2 size-4 dark:invert"
        />
        Sign in with Github
      </Button>
    </form>
  )
}
